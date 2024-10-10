import { sample } from 'effector'

import {
  loadFavoriteItems,
  getFavoriteItemsFx,
  addProductToFavorite,
  addProductToFavoriteFx,
  addProductsFromLSToFavorites,
  addProductsFromLSToFavoritesFx,
  deleteItemFromFavorites,
  deleteFavoriteItemFx,
} from '.'
import { $favorites } from './state'

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

sample({
  clock: addProductsFromLSToFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductsFromLSToFavoritesFx,
})

sample({
  clock: deleteItemFromFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: deleteFavoriteItemFx,
})
