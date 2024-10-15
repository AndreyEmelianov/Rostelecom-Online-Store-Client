import { useUnit } from 'effector-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import {
  $chosenPickupAddressData,
  $rostelecomDataByCity,
  $shouldLoadRostelecomData,
} from '@/context/order/state'
import {
  getRostelecomOfficesByCityFx,
  setChosenPickupAddressData,
  setShouldLoadRostelecomData,
} from '@/context/order'
import { useLang } from '@/hooks/useLang'
import { useTTMap } from '@/hooks/useTTMap'
import { IRostelecomAddressData } from '@/types/order'
import { PickupAddressListItem } from './PickupAddressListItem'

import styles from '@/styles/order/index.module.scss'

export const AddressesList = ({ listClassName }: { listClassName: string }) => {
  const rostelecomDataByCity = useUnit($rostelecomDataByCity)
  const shouldLoadRostelecomData = useUnit($shouldLoadRostelecomData)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const loadRostelecomDataSpinner = useUnit(
    getRostelecomOfficesByCityFx.pending
  )

  const { handleSelectAddress } = useTTMap()
  const { lang, translations } = useLang()

  const handleChosenAddressData = (data: Partial<IRostelecomAddressData>) => {
    setShouldLoadRostelecomData(false)
    setChosenPickupAddressData(data)
  }

  return (
    <>
      {shouldLoadRostelecomData && (
        <>
          {loadRostelecomDataSpinner && (
            <span
              className={styles.order__list__item__delivery__inner__spinner}
            >
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
            </span>
          )}
          {!loadRostelecomDataSpinner && (
            <ul className={`list-reset ${listClassName}`}>
              {rostelecomDataByCity?.length ? (
                rostelecomDataByCity.map((item) => (
                  <PickupAddressListItem
                    key={item.place_id}
                    addressItem={item}
                    handleChosenAddressData={handleChosenAddressData}
                    handleSelectAddress={handleSelectAddress}
                  />
                ))
              ) : (
                <span>{translations[lang].common.nothing_is_found}</span>
              )}
            </ul>
          )}
        </>
      )}
      {!!chosenPickupAddressData.address_line1 && !shouldLoadRostelecomData && (
        <div className={styles.order__list__item__delivery__pickup__choose}>
          <span>{chosenPickupAddressData.address_line1}</span>
          <span>
            {chosenPickupAddressData.address_line2},{' '}
            {chosenPickupAddressData.city}
          </span>
        </div>
      )}
    </>
  )
}
