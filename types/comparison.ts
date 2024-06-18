import { ISizes } from './common'

export interface IAddProductToComparisonFx {
  clientId: string
  productId: string
  jwt: string
  category: string
  setSpinner: (arg0: boolean) => void
}

export interface IComparisonItem {
  _id: string
  userId: string
  clientId: string
  productId: string
  image: string
  name: string
  sizes: ISizes
  size: string
  price: string
  category: string
  inStock: string
  characteristics: { [index: string]: string }
}
