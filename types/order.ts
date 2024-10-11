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
  bbox: {
    lon1: number
    lat1: number
    lon2: number
    lat2: number
  }
}
