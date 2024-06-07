import { useUnit } from 'effector-react'
import { useState } from 'react'

import { $currentProduct } from '@/context/goods'
import { useCartByAuth } from './useCartByAuth'
import { isItemInList, isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'

export const useCartAction = (isSizeTable = false) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)

  const product = useUnit($currentProduct)

  const currentCartByAuth = useCartByAuth()

  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )

  const isProductInCart = isItemInList(currentCartByAuth, product._id)

  const handleAddToCart = (countFromCounter?: number) => {
    if (isProductInCart) {
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }

      if (cartItemBySize) {
        const auth = JSON.parse(
          localStorage.getItem('rostelekomAuth') as string
        )

        const count = !!countFromCounter
          ? +cartItemBySize.count !== countFromCounter
            ? countFromCounter
            : +cartItemBySize.count + 1
          : +cartItemBySize.count + 1

        addCartItemToLS(product, selectedSize, count)
        return
      }
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

  return {
    product,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    currentCartByAuth,
    cartItemBySize,
    isProductInCart,
    setSelectedSize,
    handleAddToCart,
    setAddToCartSpinner,
  }
}
