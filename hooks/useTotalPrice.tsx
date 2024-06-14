import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { $cart, $cartFromLS, $totalPrice, setTotalPrice } from '@/context/cart'
import { usePriceAnimation } from './usePriceAnimation'
import { useGoodsByAuth } from './useGoodsByAuth'

export const useTotalPrice = () => {
  const totalPrice = useUnit($totalPrice)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const getNewTotalPrice = () =>
    currentCartByAuth
      .map((item) => +item.price * +item.count)
      .reduce((defaultCount, item) => defaultCount + item, 0)

  const {
    value: animatedPrice,
    setFrom,
    setTo,
  } = usePriceAnimation(totalPrice, getNewTotalPrice())

  useEffect(() => {
    setTotalPrice(getNewTotalPrice())
    setFrom(totalPrice)
    setTo(getNewTotalPrice())
  }, [currentCartByAuth])

  return { animatedPrice }
}
