import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { IAddProductToComparisonFx, IComparisonItem } from '@/types/comparison'
import { axiosInstance } from './apiInstance'
import { handleJWTError } from '@/lib/utils/errors'

export const addProductToComparisonFx = createEffect(
  async ({ jwt, setSpinner, ...restProps }: IAddProductToComparisonFx) => {
    try {
      setSpinner(true)

      const { data } = await axiosInstance.post('/api/comparison/add', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newComparisonItem: IComparisonItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToComparisonFx',
            payload: { ...restProps, setSpinner },
          })
        return newData
      }

      toast.success('Товар добавлен к сравнению!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const getComparisonItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await axiosInstance.post('/api/comparison/all', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: IComparisonItem[] = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'getComparisonItemsFx',
          }
        )
        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
