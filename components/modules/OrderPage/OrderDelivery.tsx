/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import {
  $chosenPickupAddressData,
  $courierTab,
  $pickupTab,
} from '@/context/order/state'
import { setCourierTab, setMapInstance, setPickupTab } from '@/context/order'
import { getGeolocationFx, setUserGeolocation } from '@/context/user'
import { $userGeolocation } from '@/context/user/state'
import { useLang } from '@/hooks/useLang'
import { basePropsForMotion } from '@/constants/motion'
import { OrderTitle } from './OrderTitle'
import { OrderTabControls } from './OrderTabControls'
import { AddressesList } from './AddressesList'
import { addScriptToHead } from '@/lib/utils/common'
import {
  handleResultClearing,
  handleResultSelection,
  handleResultsFound,
  handleSelectPickupAddress,
  initSearchMarker,
  SearchMarkersManager,
} from '@/lib/utils/ttMap'
import { useTTMap } from '@/hooks/useTTMap'
import { IAddressBBox } from '@/types/order'

import styles from '@/styles/order/index.module.scss'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'

export const OrderDelivery = () => {
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>
  const labelRef = useRef() as MutableRefObject<HTMLLabelElement>

  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const userGeolocation = useUnit($userGeolocation)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)

  const { handleSelectAddress } = useTTMap()
  const { lang, translations } = useLang()

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }

    setPickupTab(true)
    setCourierTab(false)

    if (chosenPickupAddressData.address_line1) {
      handleLoadMap(
        chosenPickupAddressData.city,
        {
          lat: chosenPickupAddressData.lat as number,
          lng: chosenPickupAddressData.lon as number,
        },
        true
      )
      return
    }

    if (userGeolocation?.features) {
      handleLoadMap(userGeolocation?.features[0].properties.city)
      return
    }

    handleLoadMap()
  }

  const handleCourierTab = () => {
    if (courierTab) {
      return
    }
    setCourierTab(true)
    setPickupTab(false)
  }

  useEffect(() => {
    getUserGeolocation()
  }, [])

  useEffect(() => {
    if (shouldLoadMap) {
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.1.2-public-preview.15/services/services-web.min.js'
      )
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js'
      )
      handleLoadMap()
    }
  }, [shouldLoadMap])

  const getUserGeolocation = () => {
    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords

      const result = await getGeolocationFx({ lat: latitude, lon: longitude })

      if (!result) {
        return
      }

      setUserGeolocation(result.data)
      setShouldLoadMap(true)
    }

    const errorCb = async (error: GeolocationPositionError) => {
      setShouldLoadMap(true)
      toast.error(`${error.code} ${error.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, errorCb)
  }

  const handleLoadMap = async (
    initialSearchValue = '',
    initialPosition = { lat: 55.755819, lng: 37.617644 },
    withMarker = false
  ) => {
    const tomtomMaps = await import(`@tomtom-international/web-sdk-maps`)

    const map = tomtomMaps.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current,
      center: initialPosition,
      zoom: 10,
    })

    setMapInstance(map)
    withMarker &&
      handleSelectAddress(
        chosenPickupAddressData.bbox as IAddressBBox,
        {
          lat: chosenPickupAddressData.lat as number,
          lon: chosenPickupAddressData.lon as number,
        },
        map
      )

    const options = {
      searchOptions: {
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
        language: 'ru-RU',
        limit: 5,
      },
      autocompleteOptions: {
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
        language: 'ru-RU',
      },
    }

    initSearchMarker(tomtomMaps)

    //@ts-ignore
    const tomtomSearchBox = new tt.plugins.SearchBox(tt.services, options)

    const searchBoxHTML = tomtomSearchBox.getSearchBoxHTML()
    searchBoxHTML.classList.add('delivery-search-input')
    labelRef.current.append(searchBoxHTML)

    initialSearchValue && tomtomSearchBox.setValue(initialSearchValue)

    //@ts-ignore
    const searchMarkersManager = new SearchMarkersManager(map)
    //@ts-ignore
    tomtomSearchBox.on('tomtom.searchbox.resultsfound', (event) =>
      handleResultsFound(event, searchMarkersManager, map)
    )
    //@ts-ignore
    tomtomSearchBox.on('tomtom.searchbox.resultselected', (event) =>
      handleResultSelection(event, searchMarkersManager, map)
    )
    //@ts-ignore
    tomtomSearchBox.on('tomtom.searchbox.resultscleared', () =>
      handleResultClearing(searchMarkersManager, map, userGeolocation)
    )

    if (userGeolocation?.features && !withMarker) {
      tomtomSearchBox.setValue(userGeolocation.features[0].properties.city)
      handleSelectPickupAddress(userGeolocation.features[0].properties.city)
      map
        .setCenter([
          userGeolocation?.features[0].properties.lon,
          userGeolocation?.features[0].properties.lat,
        ])
        .zoomTo(10)
    }
  }

  return (
    <>
      <OrderTitle text={translations[lang].order.delivery} orderNumber='2' />
      <div className={`${styles.order__list__item__delivery}`}>
        <OrderTabControls
          tab1Text={translations[lang].order.pickup_free}
          tab2Text={translations[lang].order.courier_delivery}
          tab1Active={pickupTab}
          tab2Active={courierTab}
          handleTab1={handlePickupTab}
          handleTab2={handleCourierTab}
        />
        {pickupTab && (
          <motion.div
            className={styles.order__list__item__delivery__pickup}
            {...basePropsForMotion}
          >
            <div className={styles.order__list__item__delivery__inner}>
              <label
                ref={labelRef}
                className={styles.order__list__item__delivery__label}
              >
                <span>{translations[lang].order.search_title}</span>
              </label>
              <AddressesList
                listClassName={styles.order__list__item__delivery__list}
              />
            </div>
            <div
              ref={mapRef}
              className={styles.order__list__item__delivery__map}
            />
          </motion.div>
        )}
        {courierTab && <motion.div {...basePropsForMotion}>{'net'}</motion.div>}
      </div>
    </>
  )
}
