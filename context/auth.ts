import { createDomain, sample } from 'effector'
import toast from 'react-hot-toast'

import { IRegisterAndLoginFx } from '@/types/auth-popup'
import { loginFx, registerFx } from '@/api/auth'

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
