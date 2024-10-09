'use client'
import { Effect, sample } from 'effector'
import { Gate } from 'effector-react'

import { getNewProductsFx, getBestsellerProductsFx } from '@/api/main-page'
import { IProduct } from '@/types/common'
import { IProducts } from '@/types/goods'
import {
  MainPageGate,
  setCurrentProduct,
  loadOneProductFx,
  loadProductsByFilterFx,
  goods,
  loadViewedProductsFx,
} from '.'

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.error(error.message)
    })

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

export const $newProducts = goodsStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductsFx)

goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductsFx, MainPageGate)

export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

export const $viewedProducts = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadViewedProductsFx.done, (_, { result }) => result)
