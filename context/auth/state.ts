'use client'
import toast from 'react-hot-toast'

import {
  openAuthPopup,
  closeAuthPopup,
  setIsAuth,
  registerFx,
  loginFx,
  auth,
} from '.'

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
