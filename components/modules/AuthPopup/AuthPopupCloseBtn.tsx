import { useUnit } from 'effector-react'

import { $quickViewModalIsOpen, $sizeTableIsOpen } from '@/context/modals'
import { closeAuthPopupWhenSomeModalOpened } from '@/lib/utils/common'

export const AuthPopupCloseBtn = () => {
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)
  const sizeTableIsOpen = useUnit($sizeTableIsOpen)

  const closePopup = () =>
    closeAuthPopupWhenSomeModalOpened(quickViewModalIsOpen, sizeTableIsOpen)

  return <button className='btn-reset auth-popup__close' onClick={closePopup} />
}
