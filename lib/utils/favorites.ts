import toast from 'react-hot-toast'

import { IProduct } from '@/types/common'
import { IFavoriteItem } from '@/types/favorites'
import { idGenerator } from './common'
import {
  setFavoriteItemsFromLS,
  setShouldShowEmptyPageFavorites,
} from '@/context/favorites'

export const addFavoriteItemToLS = (
  product: IProduct,
  selectedSize: string,
  withToast = true
) => {
  let favoritesFromLS: IFavoriteItem[] = JSON.parse(
    localStorage.getItem('rostelekomFavorites') as string
  )

  const clientId = idGenerator()

  if (!favoritesFromLS) {
    favoritesFromLS = []
  }

  setShouldShowEmptyPageFavorites(false)

  const existingItem = favoritesFromLS.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  if (existingItem) {
    toast.success('Товар добавлен в избранное!')
    return existingItem.clientId
  }

  const favorites = [
    ...favoritesFromLS,
    {
      clientId,
      productId: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedSize,
      color: product.characteristics.color,
      inStock: product.inStock,
      category: product.category,
    },
  ]

  localStorage.setItem('rostelekomFavorites', JSON.stringify(favorites))
  setFavoriteItemsFromLS(favorites as IFavoriteItem[])
  withToast && toast.success('Товар добавлен в избранное!')

  return clientId
}
