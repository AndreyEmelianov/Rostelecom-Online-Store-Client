import { useState } from 'react'

import { ICartItem } from '@/types/cart'
import { usePriceAction } from './usePriceAction'
import { usePriceAnimation } from './usePriceAnimation'

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
  }
}
