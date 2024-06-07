import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth'
import { closeSearchModal, closeSizeTable } from '@/context/modals'
import { loginCheck } from '@/context/user'

export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}

export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const handleCloseSearchModal = () => {
  closeSearchModal()
  removeOverflowHiddenFromBody()
}

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3}) +(?!\d))/g, ' ')

export const idGenerator = () => {
  const s4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}

export const closeSizeTableByCheck = (quickViewModalIsOpen: boolean) => {
  if (!quickViewModalIsOpen) {
    removeOverflowHiddenFromBody()
  }

  closeSizeTable()
}

export const handleOpenAuthPopup = () => {
  addOverflowHiddenToBody()
  openAuthPopup()
}

export const handleCloseAuthPopup = () => {
  removeOverflowHiddenFromBody()
  closeAuthPopup()
}

export const closeAuthPopupWhenSomeModalOpened = (
  quickViewModalIsOpen: boolean,
  sizeTableIsOpen: boolean
) => {
  if (quickViewModalIsOpen || sizeTableIsOpen) {
    closeAuthPopup()
    return
  }

  handleCloseAuthPopup()
}

export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

  if (!auth?.accessToken) {
    setIsAuth(false)
    return false
  }

  return true
}

export const triggerLoginCheck = () => {
  if (!isUserAuth()) {
    return
  }

  const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

  loginCheck({ jwt: auth.accessToken })
}
