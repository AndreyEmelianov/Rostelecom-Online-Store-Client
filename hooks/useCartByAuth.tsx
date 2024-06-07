import { useUnit } from 'effector-react'

import { $cart, $cartFromLS } from '@/context/cart'
import { $isAuth } from '@/context/auth'

export const useCartByAuth = () => {
  const cart = useUnit($cart)
  const cartFromLS = useUnit($cartFromLS)
  const isAuth = useUnit($isAuth)

  const currentCartByAuth = isAuth ? cart : cartFromLS

  return currentCartByAuth
}
