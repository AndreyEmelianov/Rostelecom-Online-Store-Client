import { IBaseEffectProps } from './common'

export interface IFavoriteItem {
  _id: string
  userId: string
  clientId: string
  productId: string
  name: string
  image: string
  size: string
  price: string
  vendorCode: string
  category: string
  color: string
  inStock: string
}

export interface IAddProductsFromLSToFavoritesFx {
  jwt: string
  favoriteItems: IFavoriteItem[]
}

export type IDeleteFavoriteItemsFx = IBaseEffectProps
