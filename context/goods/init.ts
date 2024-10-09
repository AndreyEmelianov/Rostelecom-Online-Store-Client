import { sample } from 'effector'

import { $currentProduct, $products, $viewedProducts } from './state'
import {
  loadOneProduct,
  loadOneProductFx,
  loadProductsByFilter,
  loadProductsByFilterFx,
  loadViewedProducts,
  loadViewedProductsFx,
} from '.'

sample({
  clock: loadOneProduct,
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})

sample({
  clock: loadProductsByFilter,
  source: $products,
  fn: (_, data) => data,
  target: loadProductsByFilterFx,
})

sample({
  clock: loadViewedProducts,
  source: $viewedProducts,
  fn: (_, data) => data,
  target: loadViewedProductsFx,
})
