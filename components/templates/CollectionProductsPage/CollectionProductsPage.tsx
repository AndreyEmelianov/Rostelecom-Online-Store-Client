'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'

import { ProductsListItem } from '@/components/modules/ProductsListItem/ProductsListItem'
import { loadProductsByFilter } from '@/context/goods'
import { useProductsByCollection } from '@/hooks/useProductsByCollection'
import { AllLink } from '@/components/elements/AllLink/AllLink'
import { basePropsForMotion } from '@/constants/motion'
import { getSearchParamsUrl } from '@/lib/utils/common'
import {
  allowedCollections,
  allowedCollectionsCategories,
} from '@/constants/product'
import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

import styles from '@/styles/viewed-products-page/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

export const CollectionProductsPage = () => {
  const [currentCollection, setCurrentCollection] = useState('')

  const { products, productsSpinner, title } =
    useProductsByCollection(currentCollection)

  const { getTextGenerator, getDefaultTextGenerator } = useBreadcrumbs(
    'collection-products'
  )

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const categoryParam = urlParams.get('category')
    const collectionParam = urlParams.get('collection')

    if (
      categoryParam &&
      collectionParam &&
      allowedCollectionsCategories.includes(categoryParam) &&
      allowedCollections.includes(collectionParam)
    ) {
      setCurrentCollection(collectionParam)
      loadProductsByFilter({
        limit: 12,
        offset: 0,
        category: categoryParam,
        additionalParam: urlParams.toString(),
      })

      return
    }

    notFound()
  }, [])

  return (
    <main>
      <Breadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={getDefaultTextGenerator}
      />
      <section className={styles.viewed_products}>
        <div className='container'>
          <h1
            className={`section-site-title  ${styles.viewed_products__title}`}
          >
            {title}
          </h1>
          <AllLink link='/collection-products' />
          {productsSpinner && (
            <motion.ul
              style={{ marginBottom: 40 }}
              className={skeletonStyles.skeleton}
              {...basePropsForMotion}
            >
              {Array.from(new Array(12)).map((_, i) => (
                <li key={i} className={skeletonStyles.skeleton__item}>
                  <div className={skeletonStyles.skeleton__item__light} />
                </li>
              ))}
            </motion.ul>
          )}
          {!productsSpinner && (
            <ul className={`list-reset ${styles.viewed_products__list}`}>
              {(products.items || []).map((product) => (
                <ProductsListItem key={product._id} item={product} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
