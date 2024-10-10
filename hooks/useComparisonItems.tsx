import { $comparison, $comparisonFromLS } from '@/context/comparison/state'
import { useGoodsByAuth } from './useGoodsByAuth'

export const useComparisonItems = (type: string) => {
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLS)

  const items = currentComparisonByAuth.filter(
    (item) => item.characteristics.type === type
  )

  return { items }
}
