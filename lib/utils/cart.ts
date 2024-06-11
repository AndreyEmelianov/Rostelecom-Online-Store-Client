/* eslint-disable indent */
import toast from 'react-hot-toast'

import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { handleShowSizeTable, idGenerator, isUserAuth } from './common'
import { addProductToCart, setCartFromLS } from '@/context/cart'
import { productWithoutSizes } from '@/constants/product'

export const addItemToCart = (
  product: IProduct,
  count: number,
  selectedSize = '',
  setSpinner: (arg0: boolean) => void
) => {
  if (!isUserAuth()) {
    addCartItemToLS(product, selectedSize, count)
    return
  }

  const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

  const clientId = addCartItemToLS(product, selectedSize, count, false)

  addProductToCart({
    productId: product._id,
    clientId,
    jwt: auth.accessToken,
    category: product.category,
    count,
    size: selectedSize,
    setSpinner,
  })
}

export const addCartItemToLS = (
  product: IProduct,
  selectedSize: string,
  count: number,
  withToast = true
) => {
  let cartFromLS: ICartItem[] = JSON.parse(
    localStorage.getItem('rostelekomCart') as string
  )

  const clientId = idGenerator()

  if (!cartFromLS) {
    cartFromLS = []
  }

  const existingItem = cartFromLS.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  if (existingItem) {
    const updatedCountWithSize =
      existingItem.count !== count ? count : +existingItem.count + 1

    const updatedCart = cartFromLS.map((item) =>
      item.productId === existingItem.productId && item.size === selectedSize
        ? {
            ...existingItem,
            count: selectedSize.length
              ? updatedCountWithSize
              : +existingItem.count + 1,
          }
        : item
    )

    localStorage.setItem('rostelekomCart', JSON.stringify(updatedCart))
    setCartFromLS(updatedCart)
    toast.success('Добавлено в корзину!')
    return existingItem.clientId
  }

  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      name: product.name,
      image: product.images[0],
      count,
      size: selectedSize,
      price: product.price,
      inStock: product.inStock,
      color: product.characteristics.color,
      category: product.category,
    },
  ]

  localStorage.setItem('rostelekomCart', JSON.stringify(cart))
  setCartFromLS(cart as ICartItem[])
  withToast && toast.success('Товар добавлен в корзину!')

  return clientId
}

export const addProductToCartBySizeTable = (
  product: IProduct,
  count: number,
  selectedSize = '',
  setSpinner: (arg0: boolean) => void
) => {
  if (productWithoutSizes.includes(product.type)) {
    addItemToCart(product, count, '', setSpinner)
    return
  }

  if (selectedSize) {
    addItemToCart(product, count, selectedSize, setSpinner)
    return
  }

  handleShowSizeTable(product)
}

export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
  let cart: ICartItem[] = JSON.parse(
    localStorage.getItem('rostelekomCart') as string
  )

  if (!cart) {
    cart = []
  }

  const updatedCart = cart.map((item) =>
    item.clientId === cartItemId ? { ...item, count } : item
  )

  localStorage.setItem('rostelekomCart', JSON.stringify(updatedCart))
  setCartFromLS(updatedCart as ICartItem[])
}

export const countAllCartItemsAmount = (cart: ICartItem[]) =>
  cart.reduce((acc, item) => acc + +item.count, 0)
