import { useUnit } from 'effector-react'

import { $quickViewModalIsOpen, openSizeTable } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { ISelectedSizes } from '@/types/common'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { setSizeTableSizes } from '@/context/sizeTable'

export const ProductSizeTableBtn = ({
  sizes,
  type,
  className,
}: ISelectedSizes) => {
  const { translations, lang } = useLang()
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)

  const handleShowSizeTable = () => {
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
