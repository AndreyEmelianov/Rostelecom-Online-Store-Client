import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import {
  setSizes,
  setSizesOptions,
  updateSizesOptionBySize,
} from '@/context/catalog'
import { useLang } from './useLang'
import { getCheckedArrayParam, getSearchParamsUrl } from '@/lib/utils/common'
import { allowedSizes } from '@/constants/product'
import { $sizesOptions, $sizes } from '@/context/catalog/state'

export const useSizeFilter = (
  handleApplyFiltersWithSizes: (arg0: string[]) => void
) => {
  const { lang } = useLang()

  const sizesOptions = useUnit($sizesOptions)
  const sizes = useUnit($sizes)

  const applySizes = (sizes: string[]) => {
    handleApplyFiltersWithSizes(sizes)
    setSizes(sizes)
  }

  const handleSelectSize = (id: number) => {
    const updatedSizesOptions = sizesOptions.map((sizesOption) =>
      sizesOption.id === id
        ? { ...sizesOption, checked: !sizesOption.checked }
        : sizesOption
    )

    setSizesOptions(updatedSizesOptions)

    const currentOption = updatedSizesOptions.find(
      (sizesOption) => sizesOption.id === id
    )

    if (currentOption && currentOption.checked) {
      applySizes([...sizes, currentOption.size])
      return
    }

    applySizes(sizes.filter((size) => size !== currentOption?.size))
  }

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sizesParam = urlParams.get('sizes')

    if (sizesParam) {
      const validSizes = getCheckedArrayParam(sizesParam)

      if (
        validSizes &&
        validSizes.every((size) => allowedSizes.includes(size))
      ) {
        applySizes(validSizes)
        validSizes.forEach((size) => updateSizesOptionBySize(size))
      }

      return
    }
    setSizes([])
    setSizesOptions(
      sizesOptions.map((option) => ({ ...option, checked: false }))
    )
  }, [lang])

  return {
    sizes,
    sizesOptions,
    handleSelectSize,
  }
}
