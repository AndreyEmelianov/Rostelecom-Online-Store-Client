import { createDomain, sample } from 'effector'

import { IAddProductToComparisonFx, IComparisonItem } from '@/types/comparison'
import {
  addProductToComparisonFx,
  getComparisonItemsFx,
} from '@/api/comparison'

const comparison = createDomain()

export const loadComparisonItems = comparison.createEvent<{ jwt: string }>()
export const addProductToComparison =
  comparison.createEvent<IAddProductToComparisonFx>()

export const setComparisonFromLS = comparison.createEvent<IComparisonItem[]>()

export const $comparison = comparison
  .createStore<IComparisonItem[]>([])
  .on(getComparisonItemsFx.done, (_, { result }) => result)
  .on(addProductToComparisonFx.done, (state, { result }) => [
    ...state,
    result.newComparisonItem,
  ])

export const $comparisonFromLS = comparison
  .createStore<IComparisonItem[]>([])
  .on(setComparisonFromLS, (_, comparison) => comparison)

sample({
  clock: loadComparisonItems,
  source: $comparison,
  fn: (_, data) => data,
  target: getComparisonItemsFx,
})

sample({
  clock: addProductToComparison,
  source: $comparison,
  fn: (_, data) => data,
  target: addProductToComparisonFx,
})
