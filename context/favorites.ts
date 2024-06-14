import { createDomain, sample } from 'effector'

import { IAddProductToCartFx } from '@/types/cart'
import { IFavoriteItem } from '@/types/favorites'
import { addProductToFavoriteFx, getFavoriteItemsFx } from '@/api/favorites'

const favorites = createDomain()

export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()

export const setFavoriteItemsFromLS = favorites.createEvent<IFavoriteItem[]>()

export const addProductToFavorite =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()

export const $favoritesFromLS = favorites
  .createStore<IFavoriteItem[]>([])
  .on(setFavoriteItemsFromLS, (_, favorites) => favorites)

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

sample({
  clock: loadFavoriteItems,
  source: $favorites,
  fn: (_, data) => data,
  target: getFavoriteItemsFx,
})

sample({
  clock: addProductToFavorite,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductToFavoriteFx,
})
