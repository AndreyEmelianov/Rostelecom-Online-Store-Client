import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from './apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { IRegisterAndLoginFx } from '@/types/auth-popup'
import { setIsAuth } from '@/context/auth'
import { handleJWTError } from '@/lib/utils/errors'

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
