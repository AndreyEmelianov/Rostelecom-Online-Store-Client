'use client'
import { IFavoriteItem } from '@/types/favorites'
import {
  favorites,
  getFavoriteItemsFx,
  addProductToFavoriteFx,
  addProductsFromLSToFavoritesFx,
  deleteFavoriteItemFx,
  setIsAddToFavorites,
  setFavoriteItemsFromLS,
  setShouldShowEmptyPageFavorites,
} from '.'

export const $favorites = favorites
  .createStore<IFavoriteItem[]>([])
  .on(getFavoriteItemsFx.done, (_, { result }) => result)
  .on(addProductToFavoriteFx.done, (favorites, { result }) => [
    ...new Map(
      [...favorites, result.newFavoriteItem].map((item) => [
        item.clientId,
        item,
      ])
    ).values(),
  ])
  .on(addProductsFromLSToFavoritesFx.done, (_, { result }) => result.items)
  .on(deleteFavoriteItemFx.done, (state, { result }) =>
    state.filter((item) => item._id !== result.id)
  )

export const $isAddToFavorites = favorites
  .createStore(false)
  .on(setIsAddToFavorites, (_, value) => value)

export const $favoritesFromLS = favorites
  .createStore<IFavoriteItem[]>([])
  .on(setFavoriteItemsFromLS, (_, favorites) => favorites)

export const $shouldShowEmptyPageFavorites = favorites
  .createStore(false)
  .on(setShouldShowEmptyPageFavorites, (_, value) => value)
