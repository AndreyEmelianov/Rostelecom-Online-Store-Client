'use client'
import toast from 'react-hot-toast'
import { createDomain, createEffect } from 'effector'
import { createGate } from 'effector-react'

import { axiosInstance } from '@/api/apiInstance'
import { handleShowSizeTable } from '@/lib/utils/common'
import {
  ILoadOneProductFx,
  ILoadProductsByFilterFx,
  ILoadViewedProductsFx,
} from '@/types/goods'
import { IProduct } from '@/types/common'

export const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadOneProductFx>()
export const loadProductsByFilter = goods.createEvent<ILoadProductsByFilterFx>()
export const loadViewedProducts = goods.createEvent<ILoadViewedProductsFx>()

export const loadOneProductFx = createEffect(
  async ({
    productId,
    category,
    withShowingSizeTable,
    setSpinner,
  }: ILoadOneProductFx) => {
    try {
      setSpinner && setSpinner(true)
      const { data } = await axiosInstance.post('/api/goods/one', {
        productId,
        category,
      })

      if (withShowingSizeTable) {
        handleShowSizeTable(data.productItem)
      }

      if (data?.message === 'Wrong product id') {
        return { productItem: { errorMessage: 'Wrong product id' } }
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner && setSpinner(false)
    }
  }
)

export const loadProductsByFilterFx = createEffect(
  async ({
    limit,
    offset,
    category,
    additionalParam,
    isCatalog,
  }: ILoadProductsByFilterFx) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${
          isCatalog ? '&catalog=true' : ''
        }`
      )

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const loadViewedProductsFx = createEffect(
  async ({ payload }: ILoadViewedProductsFx) => {
    try {
      const { data } = await axiosInstance.post('/api/goods/viewed', {
        payload,
      })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
