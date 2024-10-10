import { useUnit } from 'effector-react'

import { openSizeTable } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { ISelectedSizes } from '@/types/common'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { setSizeTableSizes } from '@/context/sizeTable'
import { setIsAddToFavorites } from '@/context/favorites'
import { $quickViewModalIsOpen } from '@/context/modals/state'

export const ProductSizeTableBtn = ({
  sizes,
  type,
  className,
}: ISelectedSizes) => {
  const { translations, lang } = useLang()
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)

  const handleShowSizeTable = () => {
    setIsAddToFavorites(false)

    if (!quickViewModalIsOpen) {
      addOverflowHiddenToBody()
    }

    setSizeTableSizes({ sizes, type })
    openSizeTable()
  }

  return (
    <button className={`btn-reset ${className}`} onClick={handleShowSizeTable}>
      {translations[lang].product.size_table}
    </button>
  )
}
