'use client'
import ReactPaginate from 'react-paginate'
import { motion } from 'framer-motion'

import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import { basePropsForMotion } from '@/constants/motion'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

export const ProductsPage = ({ pageName, searchParams }: IProductsPage) => {
  const isCatalogPage = pageName === 'catalog'

  const { products, productsSpinner, paginationProps } = useProductFilters(
    searchParams,
    pageName,
    isCatalogPage
  )

  console.log(products)

  return (
    <>
      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, index) => (
            <li key={index} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate {...paginationProps} />
      </div>
    </>
  )
}
