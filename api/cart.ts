import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from './apiInstance'
import {
  IAddProductToCartFx,
  ICartItem,
  IDeleteCartItemFx,
  IUpdateCartItemCountFx,
} from '@/types/cart'
import { handleJWTError } from '@/lib/utils/errors'

export const getCartItemsFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await axiosInstance.get('/api/cart/all', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      const newData: ICartItem[] = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'getCartItemFx',
      })
      return newData
    }
    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const addProductToCartFx = createEffect(
  async ({ jwt, setSpinner, ...dataFields }: IAddProductToCartFx) => {
    try {
      setSpinner(true)

      const { data } = await axiosInstance.post('/api/cart/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newCartItem: ICartItem } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductToCartFx',
            payload: { ...dataFields, setSpinner },
          }
        )
        return newData
      }
      toast.success('Товар добавлен в корзину!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const updateCartItemCountFx = createEffect(
  async ({ jwt, id, setSpinner, count }: IUpdateCartItemCountFx) => {
    try {
      setSpinner(true)

      const { data } = await axiosInstance.patch(
        `/api/cart/count?id=${id}`,
        { count },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )

      if (data?.error) {
        const newData: { count: string; id: string } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'updateCartItemCountFx',
            payload: { id, setSpinner, count },
          }
        )
        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const deleteCartItemFx = createEffect(
  async ({ jwt, id, setSpinner }: IDeleteCartItemFx) => {
    try {
      setSpinner(true)

      const { data } = await axiosInstance.delete(`/api/cart/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { id: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteCartItemFx',
          payload: { id, setSpinner },
        })
        return newData
      }

      toast.success('Товар удалён из корзины!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)
