'use client'
import { IUser, IUserGeolocation } from '@/types/user'
import { loginCheckFx, setUserGeolocation, user } from '.'

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)

export const $userGeolocation = user
  .createStore<IUserGeolocation>({} as IUserGeolocation)
  .on(setUserGeolocation, (_, data) => data)
