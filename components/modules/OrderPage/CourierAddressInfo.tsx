import { useUnit } from 'effector-react'

import { $chosenCourierAddressData } from '@/context/order/state'
import { useLang } from '@/hooks/useLang'

import styles from '@/styles/order/index.module.scss'

export const CourierAddressInfo = () => {
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)

  const { lang, translations } = useLang()
  return (
    <div>
      <p>{translations[lang].order.delivery_will_be}</p>
      <h3
        className={styles.map_modal__control__content__courier_address__title}
      >
        {chosenCourierAddressData.address_line1}
      </h3>
      <p
        className={
          styles.map_modal__control__content__courier_address__subtitle
        }
      >
        {chosenCourierAddressData.address_line2}
      </p>
      <p
        className={
          styles.map_modal__control__content__courier_address__coordinates
        }
      >
        <span>
          {translations[lang].order.longitude}{' '}
          <strong
            className={
              styles.map_modal__control__content__courier_address__coordinates__value
            }
          >
            {chosenCourierAddressData.lon}
          </strong>
        </span>
        <span>
          {translations[lang].order.latitude}{' '}
          <strong
            className={
              styles.map_modal__control__content__courier_address__coordinates__value
            }
          >
            {chosenCourierAddressData.lat}
          </strong>
        </span>
      </p>
    </div>
  )
}
