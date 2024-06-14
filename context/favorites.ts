import { createDomain, sample } from 'effector'

import { IAddProductToCartFx } from '@/types/cart'
import { IFavoriteItem } from '@/types/favorites'
import { addProductToFavoriteFx } from '@/api/favorites'

const favorites = createDomain()

export const addProductToFavorite =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()

export const $favoritesFromLS = favorites.createStore<IFavoriteItem[]>([])

export const $favorites = favorites
  .createStore<IFavoriteItem[]>([])
  .on(addProductToFavoriteFx.done, (favorites, { result }) => [
    ...new Map(
      [...favorites, result.newFavoriteItem].map((item) => [
        item.clientId,
        item,
      ])
    ).values(),
  ])

sample({
  clock: addProductToFavorite,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductToFavoriteFx,
})
