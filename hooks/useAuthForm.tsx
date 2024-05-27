import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Store, Event } from 'effector'

import { IInputs, IRegisterAndLoginFx } from '@/types/auth-popup'

export const useAuthForm = (
  event: Event<IRegisterAndLoginFx>,
  isSideActive: boolean,
  initialSpinner: Store<boolean>
) => {
  const spinner = useUnit(initialSpinner)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  const handleSignWithOAuth = () => ''

  return {
    errors,
    spinner,
    register,
    handleSubmit,
    handleSignWithOAuth,
  }
}
