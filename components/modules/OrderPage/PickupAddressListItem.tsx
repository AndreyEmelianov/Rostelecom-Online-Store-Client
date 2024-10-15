import { IPickupAddressListItemProps } from '@/types/order'
import { setChosenCourierAddressData } from '@/context/order'

import styles from '@/styles/order/index.module.scss'

export const PickupAddressListItem = ({
  addressItem,
  handleChosenAddressData,
  handleSelectAddress,
}: IPickupAddressListItemProps) => {
  const selectAddress = () => {
    handleChosenAddressData(addressItem)
    handleSelectAddress(addressItem.bbox, {
      lat: addressItem.lat,
      lon: addressItem.lon,
    })
    setChosenCourierAddressData({})
  }

  return (
    <li className={styles.order__list__item__delivery__list__item}>
      <button onClick={selectAddress} className={`btn-reset`}>
        <span>{addressItem.address_line1}</span>
        <span>
          {addressItem.address_line2}, {addressItem.city}
        </span>
      </button>
    </li>
  )
}
