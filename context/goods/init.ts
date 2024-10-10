import { Effect, sample } from 'effector'
import { Gate } from 'effector-react'

import { $currentProduct, $products, $viewedProducts } from './state'
import {
  getBestsellerProductsFx,
  getNewProductsFx,
  loadOneProduct,
  loadOneProductFx,
  loadProductsByFilter,
  loadProductsByFilterFx,
  loadViewedProducts,
  loadViewedProductsFx,
  MainPageGate,
} from '.'

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductsFx, MainPageGate)

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
