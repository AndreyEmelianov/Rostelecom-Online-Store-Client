/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { ttMapOptions } from '@/constants/ttMap'
import { closeMapModal } from '@/context/modals'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useLang } from '@/hooks/useLang'
import {
  handleResultClearing,
  handleResultSelection,
  handleResultsFound,
  handleSelectPickupAddress,
  SearchMarkersManager,
} from '@/lib/utils/ttMap'
import { basePropsForMotion } from '@/constants/motion'
import { AddressesList } from './AddressesList'
import { useTTMap } from '@/hooks/useTTMap'
import {
  setChosenCourierAddressData,
  setCourierAddressData,
  setShouldLoadRostelecomData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import {
  $chosenPickupAddressData,
  $courierAddressData,
  $mapInstance,
  $rostelecomDataByCity,
  $shouldShowCourierAddressData,
} from '@/context/order/state'
import { $userGeolocation } from '@/context/user/state'
import { getGeolocationFx } from '@/context/user'
import { IRostelecomAddressData } from '@/types/order'
import { CourierAddressListItem } from './CourierAddressListItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import styles from '@/styles/order/index.module.scss'

export const MapModal = () => {
  const [ttMapInstance, setTtMapInstance] = useState<any>()
  const [pickupTab, setPickupTab] = useState(true)
  const [courierTab, setCourierTab] = useState(false)

  const shouldShowCourierAddressData = useUnit($shouldShowCourierAddressData)
  const userGeolocation = useUnit($userGeolocation)
  const rostelecomDataByCity = useUnit($rostelecomDataByCity)
  const mapInstance = useUnit($mapInstance)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const courierAddressData = useUnit($courierAddressData)

  const pickupMapRef = useRef() as MutableRefObject<HTMLDivElement>
  const courierMapRef = useRef() as MutableRefObject<HTMLDivElement>
  const shouldLoadMap = useRef(true)

  const { handleSelectAddress } = useTTMap()
  const { lang, translations } = useLang()
  const isMedia940 = useMediaQuery(940)

  const removeMapMarkers = () => {
    const markers = document.querySelectorAll('.modal-map-marker')
    markers.forEach((marker) => marker.remove())
  }

  const drawMarker = async (lon: number, lat: number, map: any) => {
    const tomtomMaps = await import(`@tomtom-international/web-sdk-maps`)

    const markerElement = document.createElement('div')
    markerElement.classList.add('modal-map-marker')

    new tomtomMaps.Marker({ element: markerElement })
      .setLngLat([lon, lat])
      .addTo(map)
  }

  const handleCloseModal = () => {
    closeMapModal()
    removeOverflowHiddenFromBody()
  }

  const handleSelectPickupTab = () => {
    if (pickupTab) {
      return
    }

    setPickupTab(true)
    setCourierTab(false)
    handleLoadMap()
  }

  const handleSelectCourierTab = async () => {
    if (courierTab) {
      return
    }

    setCourierTab(true)
    setPickupTab(false)

    const map = await handleLoadMap(courierMapRef)

    setTimeout(removeMapMarkers, 0)

    if (chosenPickupAddressData.address_line1) {
      setShouldShowCourierAddressData(false)
      return
    }

    if (courierAddressData.lat) {
      setTimeout(
        () => drawMarker(courierAddressData.lon, courierAddressData.lat, map),
        0
      )
    }
  }

  //@ts-ignore
  const drawMarkerByClick = async (e) => {
    const result = await getGeolocationFx({
      lat: e.lngLat.lat,
      lon: e.lngLat.lng,
    })

    if (result) {
      removeMapMarkers()
      drawMarker(e.lngLat.lng, e.lngLat.lat, ttMapInstance)
      setCourierAddressData(result.data.features[0].properties)
      setShouldShowCourierAddressData(true)
    }
  }

  useEffect(() => {
    if (ttMapInstance?.once) {
      if (pickupTab) {
        ttMapInstance.off('click', drawMarkerByClick)
        return
      }
      ttMapInstance.on('click', drawMarkerByClick)
    }
  }, [pickupTab, ttMapInstance, courierTab])

  useEffect(() => {
    if (shouldLoadMap.current) {
      shouldLoadMap.current = false
      handleLoadMap()
    }
  }, [])

  const handleLoadMap = async (initialContainer = pickupMapRef) => {
    const tomtomMaps = await import(`@tomtom-international/web-sdk-maps`)

    const map = tomtomMaps.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: initialContainer.current,
      center: { lat: 55.755819, lng: 37.617644 },
      zoom: 10,
    })

    setTtMapInstance(map)

    //@ts-ignore
    const tomtomSearchBox = new tt.plugins.SearchBox(tt.services, ttMapOptions)

    const searchBoxHTML = tomtomSearchBox.getSearchBoxHTML()
    searchBoxHTML.classList.add('modal-search-input')
    initialContainer.current.append(searchBoxHTML)

    //@ts-ignore
    const searchMarkersManager = new SearchMarkersManager(map)

    const navigationMap = new tomtomMaps.NavigationControl({})
    map.addControl(navigationMap, 'bottom-right')
    map.addControl(
      new tomtomMaps.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'bottom-left'
    )

    const setMarkersByLocationsData = (data: IRostelecomAddressData[]) => {
      data.forEach((item) => {
        const ll1 = new tomtomMaps.LngLat(item.bbox.lon1, item.bbox.lat1)
        const ll2 = new tomtomMaps.LngLat(item.bbox.lon2, item.bbox.lat2)
        const llbounds = new tomtomMaps.LngLatBounds(ll1, ll2)

        map.fitBounds(llbounds, { padding: 130, linear: true })

        const markerElement = document.createElement('div')
        markerElement.classList.add('modal-map-marker')

        new tomtomMaps.Marker({ element: markerElement })
          .setLngLat([item.lon, item.lat])
          .addTo(map.zoomTo(12))
      })

      //@ts-ignore
      tomtomSearchBox.on('tomtom.searchbox.resultselected', async (e) => {
        const data = await handleSelectPickupAddress(e.data.text)
        handleResultSelection(e, searchMarkersManager, map)
        setMarkersByLocationsData(data)
      })

      tomtomSearchBox.on('tomtom.searchbox.resultscleared', () => {
        handleResultClearing(searchMarkersManager, map, userGeolocation)
        handleResultClearing(searchMarkersManager, mapInstance, userGeolocation)
      })

      //@ts-ignore
      tomtomSearchBox.on('tomtom.searchbox.resultsfound', (e) =>
        handleResultsFound(e, searchMarkersManager, map)
      )

      if (!!chosenPickupAddressData.address_line1) {
        const chosenItem = rostelecomDataByCity.filter((item) => {
          item.address_line2 === chosenPickupAddressData.address_line2
        })[0]

        setShouldLoadRostelecomData(false)
        setMarkersByLocationsData([chosenItem])

        map.setCenter([chosenItem.lon, chosenItem.lat]).zoomTo(12)
        tomtomSearchBox.setValue(chosenItem.city)

        return
      }
    }

    if (!userGeolocation.features) {
      const data = await handleSelectPickupAddress('москва')
      setMarkersByLocationsData(data)

      tomtomSearchBox.setValue('москва')
    } else {
      map
        .setCenter([
          userGeolocation.features[0].properties.lon,
          userGeolocation.features[0].properties.lat,
        ])
        .zoomTo(12)

      tomtomSearchBox.setValue(userGeolocation.features[0].properties.city)
    }

    if (rostelecomDataByCity.length) {
      setMarkersByLocationsData(rostelecomDataByCity)
    }

    return map
  }

  const handleSelectAddressByMarkers = (
    {
      lon1,
      lat1,
      lon2,
      lat2,
    }: {
      lon1: number
      lat1: number
      lon2: number
      lat2: number
    },
    position: {
      lat: number
      lon: number
    }
  ) => {
    removeMapMarkers()
    handleSelectAddress({ lon1, lat1, lon2, lat2 }, position, mapInstance)
    setShouldShowCourierAddressData(false)
    setChosenCourierAddressData({})
    handleCloseModal()
    setPickupTab(true)
    setCourierTab(false)
  }

  return (
    <div className={styles.map_modal__inner}>
      <button
        onClick={handleCloseModal}
        className={`btn-reset ${styles.map_modal__close}`}
      >
        {isMedia940 ? '' : translations[lang].common.close}
      </button>

      <div className={styles.map_modal__control}>
        <h3 className={styles.map_modal__title}>
          {translations[lang].order.delivery_way}
        </h3>

        <div className={styles.map_modal__control__tabs}>
          <button
            onClick={handleSelectPickupTab}
            className={`btn-reset ${pickupTab ? styles.active : ''}`}
          >
            {translations[lang].order.pickup_point}
          </button>
          <button
            onClick={handleSelectCourierTab}
            className={`btn-reset ${courierTab ? styles.active : ''}`}
          >
            {translations[lang].order.by_courier}
          </button>
        </div>

        {pickupTab && (
          <motion.div
            className={styles.map_modal__control__content}
            {...basePropsForMotion}
          >
            <AddressesList
              handleSelectAddressByMarkers={handleSelectAddressByMarkers}
              listClassName={styles.map_modal__control__content__list}
            />
          </motion.div>
        )}
        {courierTab && (
          <motion.div
            className={styles.map_modal__control__content}
            {...basePropsForMotion}
          >
            {!shouldShowCourierAddressData && (
              <p className={styles.map_modal__control__content__default}>
                <b> {translations[lang].order.where_deliver_order}</b>
                <span>
                  {translations[lang].order.enter_address_on_map_or_search}
                </span>
              </p>
            )}
            {shouldShowCourierAddressData && <CourierAddressListItem />}
          </motion.div>
        )}
      </div>

      {pickupTab && (
        <div className={styles.map_modal__map} ref={pickupMapRef} />
      )}
      {courierTab && (
        <div className={styles.map_modal__map} ref={courierMapRef} />
      )}
    </div>
  )
}
