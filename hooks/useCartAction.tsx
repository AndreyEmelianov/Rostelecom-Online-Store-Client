import { useUnit } from 'effector-react'
import { useMemo, useState } from 'react'

import { $currentProduct } from '@/context/goods'
import { isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'
import { $cart, $cartFromLS, updateCartItemCount } from '@/context/cart'
import { useGoodsByAuth } from './useGoodsByAuth'

export const useCartAction = (isSizeTable = false) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)

  const product = useUnit($currentProduct)

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )

  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )

  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )
  const [count, setCount] = useState(+(existingItem?.count as string) || 1)

  const handleAddToCart = (countFromCounter?: number) => {
    if (existingItem) {
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }

      const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

      const updateCountWithSize = !!countFromCounter
        ? +existingItem.count !== countFromCounter
          ? countFromCounter
          : +existingItem.count + 1
        : +existingItem.count + 1

      updateCartItemCount({
        id: existingItem._id as string,
        jwt: auth.accessToken,
        count: selectedSize.length
          ? updateCountWithSize
          : +existingItem.count + 1,
        setSpinner: setUpdateCountSpinner,
      })

      addCartItemToLS(product, selectedSize, countFromCounter || 1)
      return
    }

    if (isSizeTable) {
      addItemToCart(
        product,
        countFromCounter || 1,
        selectedSize,
        setAddToCartSpinner
      )
      return
    }

    addProductToCartBySizeTable(
      product,
      countFromCounter || 1,
      selectedSize,
      setAddToCartSpinner
    )
  }

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((acc, { count }) => acc + +count, 0),
    [currentCartItems]
  )

  return {
    product,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    currentCartByAuth,
    cartItemBySize,
    existingItem,
    updateCountSpinner,
    count,
    allCurrentCartItemCount,
    setCount,
    setSelectedSize,
    handleAddToCart,
    setAddToCartSpinner,
  }
}
