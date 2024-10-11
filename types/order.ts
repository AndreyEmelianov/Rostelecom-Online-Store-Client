import { ICartItem } from './cart'

export interface IOrderTitleProps {
  text: string
  orderNumber: string
}

export interface IOrderCartItemProps {
  item: ICartItem
  position: number
}
