import { useUnit } from 'effector-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { useLang } from '@/hooks/useLang'
import { getGeolocationFx } from '@/context/user'
import { $courierAddressData } from '@/context/order/state'
import {
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierTab,
  setPickupTab,
  setShouldLoadRostelecomData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import { closeMapModal } from '@/context/modals'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'

import styles from '@/styles/order/index.module.scss'

export const CourierAddressListItem = () => {
  const courierAddressData = useUnit($courierAddressData)
  const spinner = useUnit(getGeolocationFx.pending)

  const { lang, translations } = useLang()

  const handleSelectCourierAddress = () => {
    setChosenPickupAddressData({})
    setShouldLoadRostelecomData(false)
    setShouldShowCourierAddressData(true)
    setPickupTab(false)
    setCourierTab(true)
    closeMapModal()
    removeOverflowHiddenFromBody()
    setChosenCourierAddressData(courierAddressData)
  }

  return (
    <>
      {spinner && (
        <span className={styles.order__list__item__delivery__inner__spinner}>
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
        </span>
      )}
      {!spinner && (
        <div className={styles.map_modal__control__content__courier_address}>
          <h3
            className={
              styles.map_modal__control__content__courier_address__title
            }
          >
            {courierAddressData.address_line1}
          </h3>
          <p
            className={
              styles.map_modal__control__content__courier_address__subtitle
            }
          >
            {courierAddressData.address_line2}
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
                {courierAddressData.lon}
              </strong>
            </span>
            <span>
              {translations[lang].order.latitude}{' '}
              <strong
                className={
                  styles.map_modal__control__content__courier_address__coordinates__value
                }
              >
                {courierAddressData.lat}
              </strong>
            </span>
          </p>
          <p
            className={
              styles.map_modal__control__content__courier_address__warning
            }
          >
            {translations[lang].order.courier_warning}
          </p>
          <button
            onClick={handleSelectCourierAddress}
            className={
              styles.map_modal__control__content__courier_address__choose
            }
          >
            {translations[lang].order.choose}
          </button>
        </div>
      )}
    </>
  )
}
