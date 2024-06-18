import toast from 'react-hot-toast'

import { IProduct } from '@/types/common'
import { IComparisonItem } from '@/types/comparison'
import { idGenerator } from './common'
import {
  setComparisonFromLS,
  setShouldShowEmptyPageComparison,
} from '@/context/comparison'

export const addComparisonItemToLS = (product: IProduct, withToast = true) => {
  let comparisonFromLS: IComparisonItem[] = JSON.parse(
    localStorage.getItem('rostelekomComparison') as string
  )

  const clientId = idGenerator()

  if (!comparisonFromLS) {
    comparisonFromLS = []
  }

  setShouldShowEmptyPageComparison(false)

  const existingItem = comparisonFromLS.find(
    (item) => item.productId === product._id
  )

  if (existingItem) {
    toast.success('Товар добавлен к сравнению!')
    return existingItem.clientId
  }

  const comparison = [
    ...comparisonFromLS,
    {
      clientId,
      productId: product._id,
      name: product.name,
      image: product.images[0],
      sizes: product.sizes,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      characteristics: product.characteristics,
    },
  ]

  localStorage.setItem('rostelekomComparison', JSON.stringify(comparison))
  setComparisonFromLS(comparison as IComparisonItem[])
  withToast && toast.success('Товар добавлен к сравнению!')

  return clientId
}
