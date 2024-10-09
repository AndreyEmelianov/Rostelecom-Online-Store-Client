import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { loadViewedProducts } from '@/context/goods'
import { getViewedProductsFromLS } from '@/lib/utils/common'
import { $viewedProducts } from '@/context/goods/state'

export const useViewedProducts = (excludedProductId?: string) => {
  const viewedProducts = useUnit($viewedProducts)

  useEffect(() => {
    const viewedProducts = getViewedProductsFromLS()

    loadViewedProducts({
      payload: excludedProductId
        ? viewedProducts.filter((product) => product._id !== excludedProductId)
        : viewedProducts,
    })
  }, [excludedProductId])

  return { viewedProducts }
}
