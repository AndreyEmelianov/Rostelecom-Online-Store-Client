'use client'
import { createDomain } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from '@/api/apiInstance'
import { IGetRostelecomOfficesByCityFx } from '@/types/order'

export const order = createDomain()

export const setPickupTab = order.createEvent<boolean>()
export const setCourierTab = order.createEvent<boolean>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setMapInstance = order.createEvent<any>()

export const getRostelecomOfficesByCity =
  order.createEvent<IGetRostelecomOfficesByCityFx>()

export const getRostelecomOfficesByCityFx = order.createEffect(
  async ({ city, lang }: IGetRostelecomOfficesByCityFx) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
      const baseUrl = `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${apiKey}`

      const { data } = await axiosInstance.get(
        `${baseUrl}&text=${city}&lang=${lang}`
      )

      const rostelecomData = await axiosInstance.get(
        `${baseUrl}&text=ростелеком&filter=place:${data.results[0].place_id}`
      )

      return rostelecomData.data.results
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
