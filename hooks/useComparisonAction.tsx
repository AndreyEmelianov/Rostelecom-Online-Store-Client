import { useState } from 'react'
import toast from 'react-hot-toast'

import { IProduct } from '@/types/common'
import { useGoodsByAuth } from './useGoodsByAuth'
import {
  $comparison,
  $comparisonFromLS,
  addProductToComparison,
} from '@/context/comparison'
import { isUserAuth } from '@/lib/utils/common'
import { addComparisonItemToLS } from '@/lib/utils/comparison'

export const useComparisonAction = (product: IProduct) => {
  const [addToComparisonSpinner, setAddToComparisonSpinner] = useState(false)

  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLS)

  const isProductInComparison = currentComparisonByAuth.some(
    (item) => item.productId === product._id
  )

  const handleAddToComparison = () => {
    if (!isUserAuth()) {
      addComparisonItemToLS(product)
      return
    }

    if (isProductInComparison) {
      toast.success('Товар добавлен к сравнению!')
      return
    }

    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)
    const clientId = addComparisonItemToLS(product, false)

    addProductToComparison({
      clientId,
      productId: product._id,
      jwt: auth.accessToken,
      category: product.category,
      setSpinner: setAddToComparisonSpinner,
    })
  }

  return {
    addToComparisonSpinner,
    isProductInComparison,
    handleAddToComparison,
  }
}
