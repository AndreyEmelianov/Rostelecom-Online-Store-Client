import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useLang } from './useLang'
import { $catalogCategoryOptions } from '@/context/catalog/state'
import { getSearchParamsUrl } from '@/lib/utils/common'

export const useCategoryFilter = () => {
  const [option, setOption] = useState('')

  const { lang, translations } = useLang()

  const catalogCategoryOptions = useUnit($catalogCategoryOptions)

  const currentOptions = Object.values(catalogCategoryOptions)[0]
  const allCategoriesTitle = translations[lang].catalog.all_categories

  const handleSelectAllCategories = () => setOption(allCategoriesTitle)

  useEffect(() => {
    const urlParams = getSearchParamsUrl()

    const typeParam = urlParams.get('type')

    if (typeParam) {
      setOption(
        (translations[lang].comparison as { [index: string]: string })[
          typeParam
        ]
      )
    }
  }, [lang, translations])

  return {
    option,
    currentOptions,
    catalogCategoryOptions,
    allCategoriesTitle,
    setOption,
    handleSelectAllCategories,
  }
}
