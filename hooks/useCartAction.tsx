import { useUnit } from 'effector-react'
import { useState } from 'react'

import { $currentProduct } from '@/context/goods'

export const useCartAction = () => {
  const [selectedSize, setSelectedSize] = useState('')
  const product = useUnit($currentProduct)

  return { product, selectedSize, setSelectedSize }
}
