'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'
import { IUserGeolocation } from '@/types/user'
import { IGetGeolocationFx } from '@/types/common'
import { setIsAuth } from '../auth'

export const user = createDomain()

export const loginCheck = user.createEvent<{ jwt: string }>()

export const setUserGeolocation = user.createEvent<IUserGeolocation>()

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await axiosInstance.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)

    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const getGeolocationFx = createEffect(
  async ({ lat, lon }: IGetGeolocationFx) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
      const data = await axiosInstance.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`
      )

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
