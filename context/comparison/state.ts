'use client'
import { IComparisonItem } from '@/types/comparison'
import {
  comparison,
  getComparisonItemsFx,
  addProductToComparisonFx,
  addProductsFromLSToComparisonFx,
  deleteComparisonItemsFx,
  setComparisonFromLS,
  setShouldShowEmptyPageComparison,
} from '.'

export const $comparison = comparison
  .createStore<IComparisonItem[]>([])
  .on(getComparisonItemsFx.done, (_, { result }) => result)
  .on(addProductToComparisonFx.done, (state, { result }) => [
    ...state,
    result.newComparisonItem,
  ])
  .on(addProductsFromLSToComparisonFx.done, (_, { result }) => result.items)
  .on(deleteComparisonItemsFx.done, (state, { result }) =>
    state.filter((item) => item._id !== result.id)
  )

export const $comparisonFromLS = comparison
  .createStore<IComparisonItem[]>([])
  .on(setComparisonFromLS, (_, comparison) => comparison)

export const $shouldShowEmptyPageComparison = comparison
  .createStore(false)
  .on(setShouldShowEmptyPageComparison, (_, value) => value)
