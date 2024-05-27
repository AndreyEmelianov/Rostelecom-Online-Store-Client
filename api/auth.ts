import { createEffect } from 'effector'
import toast from 'react-hot-toast'

import { axiosInstance } from './apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { IRegisterAndLoginFx } from '@/types/auth-popup'

export const registerFx = createEffect(
  async ({ name, email, password }: IRegisterAndLoginFx) => {
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
  async ({ email, password }: IRegisterAndLoginFx) => {
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
