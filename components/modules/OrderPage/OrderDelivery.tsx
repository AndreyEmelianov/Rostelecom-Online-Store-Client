import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'

import { $courierTab, $pickupTab } from '@/context/order/state'
import { setCourierTab, setPickupTab } from '@/context/order'
import { useLang } from '@/hooks/useLang'
import { basePropsForMotion } from '@/constants/motion'
import { OrderTitle } from './OrderTitle'
import { OrderTabControls } from './OrderTabControls'

import styles from '@/styles/order/index.module.scss'

export const OrderDelivery = () => {
  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)

  const { lang, translations } = useLang()

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }
    setPickupTab(true)
    setCourierTab(false)
  }

  const handleCourierTab = () => {
    if (courierTab) {
      return
    }
    setCourierTab(true)
    setPickupTab(false)
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
            {'da'}
          </motion.div>
        )}
        {courierTab && <motion.div {...basePropsForMotion}>{'net'}</motion.div>}
      </div>
    </>
  )
}
