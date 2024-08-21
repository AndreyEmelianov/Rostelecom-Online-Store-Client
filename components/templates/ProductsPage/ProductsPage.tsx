'use client'
import ReactPaginate from 'react-paginate'
import { motion } from 'framer-motion'

import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import { ProductsListItem } from '@/components/modules/ProductsListItem/ProductsListItem'
import { useLang } from '@/hooks/useLang'
import { HeadingWithCount } from '@/components/elements/HeadingWithCount/HeadingWithCount'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

export const ProductsPage = ({ pageName, searchParams }: IProductsPage) => {
  const isCatalogPage = pageName === 'catalog'

  const { products, productsSpinner, paginationProps, handlePageChange } =
    useProductFilters(searchParams, pageName, isCatalogPage)

  const { lang, translations } = useLang()

  return (
    <>
      <HeadingWithCount
        count={products.count}
        title={
          (
            translations[lang].breadcrumbs as {
              [index: string]: string
            }
          )[pageName]
        }
        spinner={productsSpinner}
      />
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
      {!productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__list}`}
        >
          {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}
      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>
          {translations[lang].common.nothing_is_found}
        </div>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>{translations[lang].catalog.next_page}</span>}
          previousLabel={
            <span>{translations[lang].catalog.previous_page}</span>
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
