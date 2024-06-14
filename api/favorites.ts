import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { IAddProductToCartFx } from '@/types/cart'
import { axiosInstance } from './apiInstance'
import { handleJWTError } from '@/lib/utils/errors'
import { IFavoriteItem } from '@/types/favorites'

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
