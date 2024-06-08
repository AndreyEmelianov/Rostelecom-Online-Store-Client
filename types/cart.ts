import { IBaseEffectProps } from './common'

export interface ICartItem {
  _id: string
  userId: string
  clientId: string
  productId: string
  name: string
  image: string
  count: string | number
  price: string
  totalPrice: string
  size: string
  color: string
  inStock: string
}

export interface IAddProductToCartFx {
  productId: string
  clientId: string
  category: string
  size: string
  count: number
  jwt: string
  setSpinner: (arg0: boolean) => void
}

export interface IAddProductsFromLSToCartFx {
  jwt: string
  cartItems: ICartItem[]
}

export interface IUpdateCartItemCountFx extends IBaseEffectProps {
  count: number
}
