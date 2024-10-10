'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'
import { IAddProductToCartFx } from '@/types/cart'
import {
  IFavoriteItem,
  IAddProductsFromLSToFavoritesFx,
  IDeleteFavoriteItemsFx,
} from '@/types/favorites'

export const favorites = createDomain()

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
