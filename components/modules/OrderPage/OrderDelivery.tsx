import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { $courierTab, $pickupTab } from '@/context/order/state'
import { setCourierTab, setMapInstance, setPickupTab } from '@/context/order'
import { getGeolocationFx, setUserGeolocation } from '@/context/user'
import { $userGeolocation } from '@/context/user/state'
import { useLang } from '@/hooks/useLang'
import { basePropsForMotion } from '@/constants/motion'
import { OrderTitle } from './OrderTitle'
import { OrderTabControls } from './OrderTabControls'

import styles from '@/styles/order/index.module.scss'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

export const OrderDelivery = () => {
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>

  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const userGeolocation = useUnit($userGeolocation)

  const { lang, translations } = useLang()

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }
    setPickupTab(true)
    setCourierTab(false)
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

    if (userGeolocation?.features && !withMarker) {
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
