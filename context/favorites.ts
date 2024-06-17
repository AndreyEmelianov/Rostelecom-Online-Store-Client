import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

import { IAddProductToCartFx } from '@/types/cart'
import {
  IAddProductsFromLSToFavoritesFx,
  IDeleteFavoriteItemsFx,
  IFavoriteItem,
} from '@/types/favorites'
import { axiosInstance } from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'

export const getFavoriteItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await axiosInstance.get('/api/favorites/all', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      if (data?.error) {
        const newData: IFavoriteItem[] = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'getFavoriteItemsFx',
        })

        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const addProductToFavoriteFx = createEffect(
  async ({
    jwt,
    setSpinner,
    ...dataFields
  }: Omit<IAddProductToCartFx, 'count'>) => {
    try {
      setSpinner(true)

      const { data } = await axiosInstance.post(
        '/api/favorites/add',
        dataFields,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      if (data?.error) {
        const newData: { newFavoriteItem: IFavoriteItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToFavoriteFx',
            payload: { ...dataFields, setSpinner },
          })

        return newData
      }

      toast.success('Товар добавленн в избранное!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const addProductsFromLSToFavoritesFx = createEffect(
  async ({ jwt, favoriteItems }: IAddProductsFromLSToFavoritesFx) => {
    try {
      const { data } = await axiosInstance.post(
        '/api/favorites/add-many',
        { items: favoriteItems },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      if (data?.error) {
        const newData: { favoriteItems: IFavoriteItem[] } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductsFromLSToFavoritesFx',
            payload: { items: favoriteItems },
          })
        return newData
      }

      loadFavoriteItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const deleteFavoriteItemFx = createEffect(
  async ({ jwt, id, setSpinner }: IDeleteFavoriteItemsFx) => {
    try {
      setSpinner(true)

      const { data } = await axiosInstance.delete(
        `/api/favorites/delete?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      if (data?.error) {
        const newData: { id: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteFavoriteItemFx',
          payload: { id, setSpinner },
        })

        return newData
      }

      toast.success('Товар удалён из избранных!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

const favorites = createDomain()

export const setFavoriteItemsFromLS = favorites.createEvent<IFavoriteItem[]>()
export const setIsAddToFavorites = favorites.createEvent<boolean>()

export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()
export const addProductToFavorite =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()
export const addProductsFromLSToFavorites =
  favorites.createEvent<IAddProductsFromLSToFavoritesFx>()

export const deleteItemFromFavorites =
  favorites.createEvent<IDeleteFavoriteItemsFx>()

export const setShouldShowEmptyPageFavorites = favorites.createEvent<boolean>()

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
