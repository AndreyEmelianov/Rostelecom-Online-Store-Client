import { createEffect } from 'effector'

import { axiosInstance } from './apiInstance'

export const getNewProductsFx = createEffect(async () => {
  const { data } = await axiosInstance.get('/api/goods/new')

  return data
})

export const getBestsellerProductsFx = createEffect(async () => {
  const { data } = await axiosInstance.get('/api/goods/bestsellers')

  return data
})
