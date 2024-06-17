import { useState } from 'react'
import { EventCallable } from 'effector'

import { IBaseEffectProps } from '@/types/common'

export const useProductDelete = (
  id: string,
  deleteEvent: EventCallable<IBaseEffectProps>
) => {
  const [deleteSpinner, setDeleteSpinner] = useState(false)

  const handleDelete = () => {
    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

    deleteEvent({
      id,
      jwt: auth.accessToken,
      setSpinner: setDeleteSpinner,
    })
  }

  return { deleteSpinner, handleDelete }
}
