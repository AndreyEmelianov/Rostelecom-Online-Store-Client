'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from '@/api/apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { IRegisterAndLoginFx } from '@/types/auth-popup'

export const auth = createDomain()

export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()

export const handleRegistration = auth.createEvent<IRegisterAndLoginFx>()
export const handleLogin = auth.createEvent<IRegisterAndLoginFx>()

export const setIsAuth = auth.createEvent<boolean>()

export const oauthFx = createEffect(
  async ({ name, password, email }: IRegisterAndLoginFx) => {
    try {
      const { data } = await axiosInstance.post('/api/users/oauth', {
        name,
        password,
        email,
      })

      await axiosInstance.post('/api/users/email', {
        password,
        email,
      })

      onAuthSuccess('Успешная авторизация!', data)

      return data.user
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const registerFx = createEffect(
  async ({ name, email, password, isOAuth }: IRegisterAndLoginFx) => {
    if (isOAuth) {
      await oauthFx({
        name,
        email,
        password,
      })
      return
    }

    const { data } = await axiosInstance.post('/api/users/register', {
      name,
      email,
      password,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Регистрация прошла успешно!', data)

    return data
  }
)

export const loginFx = createEffect(
  async ({ email, password, isOAuth }: IRegisterAndLoginFx) => {
    if (isOAuth) {
      await oauthFx({
        email,
        password,
      })
      return
    }

    const { data } = await axiosInstance.post('/api/users/login', {
      email,
      password,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Вход успешно выполнен', data)

    return data
  }
)

export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
  const { data } = await axiosInstance.post('/api/users/refresh', { jwt })

  localStorage.setItem('rostelekomAuth', JSON.stringify(data))

  return data
})
