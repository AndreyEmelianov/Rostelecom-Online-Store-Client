import { sample } from 'effector'

import { handleRegistration, registerFx, handleLogin, loginFx } from '.'
import { $auth } from './state'

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
