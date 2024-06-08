import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { $totalPrice, setTotalPrice } from '@/context/cart'
import { useCartByAuth } from './useCartByAuth'
import { usePriceAnimation } from './usePriceAnimation'

export const useTotalPrice = () => {
  const totalPrice = useUnit($totalPrice)
  const currentCartByAuth = useCartByAuth()

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
