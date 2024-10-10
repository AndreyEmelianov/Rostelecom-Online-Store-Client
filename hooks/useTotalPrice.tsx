import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { setTotalPrice } from '@/context/cart'
import { usePriceAnimation } from './usePriceAnimation'
import { useGoodsByAuth } from './useGoodsByAuth'
import { $totalPrice, $cart, $cartFromLS } from '@/context/cart/state'

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
