import { ICartItem } from './cart'
import { IProduct } from './common'

export interface ILoadOneProductFx {
  productId: string
  category: string
  withShowingSizeTable?: boolean
  setSpinner?: (arg0: boolean) => void
}

export interface IProductSizesItemProps {
  currentSize: [string, boolean]
  selectedSize: string
  setSelectedSize: (arg0: string) => void
  currentCartItems: ICartItem[]
}

export interface IProductCounterProps {
  className: string
  count: number
  initialCount?: number
  totalCount?: number
  cartItem: ICartItem
  updateCountAsync: boolean
  setCount: (arg0: number) => void
  increasePrice?: VoidFunction
  decreasePrice?: VoidFunction
}

export interface IAddToCartBtnProps {
  text: string
  className?: string
  btnDisabled?: boolean
  minWidth?: number
  addToCartSpinner: boolean
  handleAddToCart: VoidFunction
}

export interface IProductCountBySizeProps {
  products: ICartItem[]
  size: string
  withCartIcon?: boolean
}

export interface ILoadProductsByFilterFx {
  limit: number
  offset: number
  category: string
  additionalParam?: string
  isCatalog?: boolean
}

export interface IProducts {
  count: number
  items: IProduct[]
}

export interface ILoadViewedProductsFx {
  payload: { _id: string; category: string }[]
}
