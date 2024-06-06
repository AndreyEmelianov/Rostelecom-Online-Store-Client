import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { Store, EventCallable } from 'effector'
import { useEarthoOne } from '@eartho/one-client-react'

import { IInputs, IRegisterAndLoginFx } from '@/types/auth-popup'

export const useAuthForm = (
  event: EventCallable<IRegisterAndLoginFx>,
  isSideActive: boolean,
  initialSpinner: Store<boolean>
) => {
  const spinner = useUnit(initialSpinner)

  const { user, isConnected, connectWithPopup } = useEarthoOne()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  useEffect(() => {
    if (isSideActive) {
      if (isConnected) {
        event({
          name: user?.displayName as string,
          email: user?.email as string,
          password: user?.uid as string,
          isOAuth: true,
        })
      }
    }
  }, [isConnected])

  const handleSignWithOAuth = () =>
    connectWithPopup({
      accessId: `${process.env.NEXT_PUBLIC_OAUTH_ACCESS_ID}`,
    })

  return {
    errors,
    spinner,
    register,
    handleSubmit,
    handleSignWithOAuth,
  }
}
