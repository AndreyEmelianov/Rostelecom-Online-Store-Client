import { useUnit } from 'effector-react'

import { $newProducts } from '@/context/goods'
import { getNewProductsFx } from '@/api/main-page'
import { useLang } from '@/hooks/useLang'
import { MainPageSection } from './MainPageSection'

export const NewGoods = () => {
  const goods = useUnit($newProducts)

  const spinner = useUnit(getNewProductsFx.pending)

  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.new_title}
      spinner={spinner}
      goods={goods}
    />
  )
}
