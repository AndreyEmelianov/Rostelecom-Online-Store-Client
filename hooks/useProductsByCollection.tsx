/* eslint-disable indent */
import { useUnit } from 'effector-react'

import { capitalizeFirstLetter } from '@/lib/utils/common'
import { useLang } from './useLang'
import { loadProductsByFilterFx } from '@/context/goods'
import { $products } from '@/context/goods/state'

export const useProductsByCollection = (collection: string) => {
  const products = useUnit($products)
  const productsSpinner = useUnit(loadProductsByFilterFx.pending)

  const { lang, translations } = useLang()

  const translationText = translations[lang].product.collection_goods
  const capitalizedCollection = capitalizeFirstLetter(collection)
  const title =
    lang === 'ru'
      ? `${translationText} «${capitalizedCollection}»`
      : [
          translationText.slice(0, 17),
          ` «${capitalizedCollection}»`,
          translationText.slice(17),
        ].join('')

  return { products, productsSpinner, title, capitalizedCollection }
}
