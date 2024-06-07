import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from './apiInstance'
import { ICartItem } from '@/types/cart'
import { handleJWTError } from '@/lib/utils/errors'

export const getCartItemFx = createEffect(async ({ jwt }: { jwt: string }) => {
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
