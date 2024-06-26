import toast from 'react-hot-toast'
import { EventCallable } from 'effector'

import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth'
import { setCurrentProduct } from '@/context/goods'
import {
  closeSearchModal,
  closeSizeTable,
  openSizeTable,
} from '@/context/modals'
import { setSizeTableSizes } from '@/context/sizeTable'
import { loginCheck } from '@/context/user'
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'

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

export const isItemInList = (array: ICartItem[], productId: string) =>
  array.some((item) => item.productId === productId)

export const handleShowSizeTable = (product: IProduct) => {
  setCurrentProduct(product)
  setSizeTableSizes({ sizes: product.sizes, type: product.type })
  addOverflowHiddenToBody()
  openSizeTable()
}

export const getCartItemCountBySize = (
  cartItems: ICartItem[],
  currentSize: string
) =>
  cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())
    ?.count || 0

export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  message: string,
  event: EventCallable<T>,
  setShouldShowEmpty: (arg0: boolean) => void,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string)

  if (!items) {
    items = []
  }

  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )

  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)

  if (!updatedItems.length) {
    setShouldShowEmpty(true)
  }
}

export const showCountMessage = (count: string, lang: string) => {
  if (count == '11' || count == '12' || count == '13' || count == '14') {
    return lang === 'ru' ? 'товаров' : 'items'
  }

  if (count.endsWith('1')) {
    return lang === 'ru' ? 'товар' : 'item'
  }

  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
    return lang === 'ru' ? 'товара' : 'items'
  }

  return lang === 'ru' ? 'товаров' : 'items'
}
