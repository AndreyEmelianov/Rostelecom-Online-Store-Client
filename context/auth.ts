import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'

import { IRegisterAndLoginFx } from '@/types/auth-popup'
import { axiosInstance } from '@/api/apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'

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

const auth = createDomain()

export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()

export const handleRegistration = auth.createEvent<IRegisterAndLoginFx>()
export const handleLogin = auth.createEvent<IRegisterAndLoginFx>()

export const setIsAuth = auth.createEvent<boolean>()

export const $openAuthPopup = auth
  .createStore<boolean>(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false)

export const $isAuth = auth
  .createStore(false)
  .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
  .createStore({})
  .on(registerFx.done, (_, { result }) => result)
  .on(registerFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
  .on(loginFx.done, (_, { result }) => result)
  .on(loginFx.fail, (_, { error }) => {
    toast.error(error.message)
  })

sample({
  clock: handleRegistration,
  source: $auth,
  fn: (_, { name, email, password, isOAuth }) => ({
    name,
    email,
    password,
    isOAuth,
  }),
  target: registerFx,
})

sample({
  clock: handleLogin,
  source: $auth,
  fn: (_, { name, email, password, isOAuth }) => ({
    name,
    email,
    password,
    isOAuth,
  }),
  target: loginFx,
})
