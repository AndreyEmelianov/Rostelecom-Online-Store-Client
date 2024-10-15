import { ICartItem } from './cart'

export interface IOrderTitleProps {
  text: string
  orderNumber: string
}

export interface IOrderCartItemProps {
  item: ICartItem
  position: number
}

export interface IGetRostelecomOfficesByCityFx {
  city: string
  lang: string
}

export interface IOrderTabControlsProps {
  tab1Text: string
  tab2Text: string
  tab1Active: boolean
  tab2Active: boolean
  handleTab1: VoidFunction
  handleTab2: VoidFunction
}

export interface IRostelecomAddressData {
  address_line1: string
  address_line2: string
  city: string
  place_id: string
  lat: number
  lon: number
  bbox: IAddressBBox
}

export interface IAddressPosition {
  lat: number
  lon: number
}

export interface IAddressBBox {
  lon1: number
  lat1: number
  lon2: number
  lat2: number
}

export interface IPickupAddressListItemProps {
  addressItem: IRostelecomAddressData
  handleSelectAddress: (arg0: IAddressBBox, arg1: IAddressPosition) => void
  handleChosenAddressData: (arg0: Partial<IRostelecomAddressData>) => void
}
