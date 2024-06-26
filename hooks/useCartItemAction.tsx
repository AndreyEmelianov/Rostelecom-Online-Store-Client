import { useState } from 'react'

import { ICartItem } from '@/types/cart'
import { usePriceAction } from './usePriceAction'
import { usePriceAnimation } from './usePriceAnimation'
import { deleteProductFromLS, isUserAuth } from '@/lib/utils/common'
import {
  deleteProductFromCart,
  setCartFromLS,
  setShouldShowEmptyPage,
} from '@/context/cart'

export const useCartItemAction = (cartItem: ICartItem) => {
  const [count, setCount] = useState(+cartItem.count)
  const [deleteSpinner, setDeleteSpinner] = useState(false)

  const { price, increasePrice, decreasePrice } = usePriceAction(
    +cartItem.count,
    +cartItem.price
  )

  const {
    value: animatedPrice,
    setFrom,
    setTo,
  } = usePriceAnimation(+cartItem.price, +cartItem.price * +cartItem.count)

  const increasePriceWithAnimation = () => {
    setFrom(price)
    setTo(price + +cartItem.price)
    increasePrice()
  }

  const decreasePriceWithAnimation = () => {
    setFrom(price)
    setTo(price - +cartItem.price)
    decreasePrice()
  }

  const handleDeleteCartItem = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        cartItem.clientId,
        'rostelekomCart',
        'Товар удалён из корзины!',
        setCartFromLS,
        setShouldShowEmptyPage
      )
      return
    }

    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

    deleteProductFromLS(
      cartItem.clientId,
      'rostelekomCart',
      '',
      setCartFromLS,
      setShouldShowEmptyPage,
      false
    )

    deleteProductFromCart({
      jwt: auth.accessToken,
      id: cartItem._id,
      setSpinner: setDeleteSpinner,
    })
  }

  return {
    price,
    count,
    animatedPrice,
    deleteSpinner,
    setCount,
    setFrom,
    setTo,
    increasePrice,
    decreasePrice,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    setDeleteSpinner,
    handleDeleteCartItem,
  }
}
