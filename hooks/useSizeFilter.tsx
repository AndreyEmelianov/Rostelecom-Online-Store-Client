import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import {
  $sizes,
  $sizesOptions,
  setSizes,
  setSizesOptions,
  updateSizesOptionBySize,
} from '@/context/catalog'
import { useLang } from './useLang'
import { getCheckedSizesParam, getSearchParamsUrl } from '@/lib/utils/common'

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
      const validSizes = getCheckedSizesParam(sizesParam)

      if (validSizes) {
        applySizes(validSizes)
        validSizes.forEach((size) => updateSizesOptionBySize(size))
      }
    }
  }, [lang])

  return {
    sizes,
    sizesOptions,
    handleSelectSize,
  }
}
