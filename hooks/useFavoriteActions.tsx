import { useState } from 'react'
import toast from 'react-hot-toast'

import { IProduct } from '@/types/common'
import { useGoodsByAuth } from './useGoodsByAuth'
import {
  $favorites,
  $favoritesFromLS,
  addProductToFavorite,
  setIsAddToFavorites,
} from '@/context/favorites'
import { productWithoutSizes } from '@/constants/product'
import { handleShowSizeTable, isUserAuth } from '@/lib/utils/common'
import { addFavoriteItemToLS } from '@/lib/utils/favorites'

export const useFavoritesActions = (product: IProduct) => {
  const [addToFavoritesSpinner, setAddToFavoritesSpinner] = useState(false)

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const existingItem = currentFavoritesByAuth.find(
    (item) => item.productId === product._id
  )

  const handleAddProductToFavorites = () => {
    if (productWithoutSizes.includes(product.type)) {
      if (existingItem) {
        toast.success('Товар добавлен в избранное')
        return
      }

      if (!isUserAuth()) {
        addFavoriteItemToLS(product, '')
        return
      }

      const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)
      const clientId = addFavoriteItemToLS(product, '', false)

      addProductToFavorite({
        jwt: auth.accessToken,
        clientId,
        productId: product._id,
        size: '',
        category: product.category,
        setSpinner: setAddToFavoritesSpinner,
      })
      return
    }

    setIsAddToFavorites(true)
    handleShowSizeTable(product)
  }

  return {
    addToFavoritesSpinner,
    isProductInFavorites: existingItem,
    setAddToFavoritesSpinner,
    handleAddProductToFavorites,
  }
}
