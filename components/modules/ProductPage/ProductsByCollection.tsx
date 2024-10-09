/* eslint-disable indent */
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

import { loadProductsByFilter, loadProductsByFilterFx } from '@/context/goods'
import { allowedCollectionsCategories } from '@/constants/product'
import { capitalizeFirstLetter } from '@/lib/utils/common'
import { useLang } from '@/hooks/useLang'
import { AllLink } from '@/components/elements/AllLink/AllLink'
import { basePropsForMotion } from '@/constants/motion'
import { ProductsListItem } from '../ProductsListItem/ProductsListItem'
import { $products } from '@/context/goods/state'

import styles from '@/styles/product/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

export const ProductsByCollection = ({
  collection,
}: {
  collection: string
}) => {
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

  useEffect(() => {
    loadProductsByFilter({
      limit: 4,
      offset: 0,
      category:
        allowedCollectionsCategories[
          Math.floor(Math.random() * allowedCollectionsCategories.length)
        ],
      additionalParam: `collection=${collection}`,
    })
  }, [])

  if (!products.items?.length) {
    return null
  }

  return (
    <div className={styles.product__collection}>
      <span className={styles.product__collection__bg}>
        {capitalizedCollection}
      </span>
      <h2 className={styles.product__collection__title}>{title}</h2>
      <div className={styles.product__collection__inner}>
        <AllLink link='/collection-products' />
        {productsSpinner && (
          <motion.ul
            className={skeletonStyles.skeleton}
            {...basePropsForMotion}
          >
            {Array.from(new Array(4)).map((_, i) => (
              <li key={i} className={skeletonStyles.skeleton__item}>
                <div className={skeletonStyles.skeleton__item__light} />
              </li>
            ))}
          </motion.ul>
        )}
        {!productsSpinner && (
          <motion.ul
            className={`list-reset ${styles.product__collection__list}`}
            {...basePropsForMotion}
          >
            {(products.items || []).map((product) => (
              <ProductsListItem
                key={product._id}
                item={product}
                title={title}
              />
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  )
}
