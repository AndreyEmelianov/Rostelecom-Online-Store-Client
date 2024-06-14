import { useUnit } from 'effector-react'

import { $isAuth } from '@/context/auth'
import { UseGoodsByAuth } from '@/types/common'

export const useGoodsByAuth = <T>(
  storeAsync: UseGoodsByAuth<T>,
  storeSync: UseGoodsByAuth<T>
) => {
  const isAuth = useUnit($isAuth)
  const goods = useUnit(storeAsync)
  const goodsFromLS = useUnit(storeSync)

  const currentFavoritesByAuth = isAuth ? goods : goodsFromLS

  return currentFavoritesByAuth
}
