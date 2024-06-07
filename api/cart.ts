import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from './apiInstance'
import { IAddProductToCartFx, ICartItem } from '@/types/cart'
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

      const { data } = await axiosInstance.post('/api/cart/add', {
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
