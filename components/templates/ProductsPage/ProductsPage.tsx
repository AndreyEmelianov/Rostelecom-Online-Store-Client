/* eslint-disable indent */
'use client'
import ReactPaginate from 'react-paginate'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import { ProductsListItem } from '@/components/modules/ProductsListItem/ProductsListItem'
import { useLang } from '@/hooks/useLang'
import { HeadingWithCount } from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { setCatalogCategoryOptions } from '@/context/catalog'
import { CatalogFilters } from '@/components/modules/CatalogFilters/CatalogFilters'
import { ViewedProducts } from '@/components/modules/ViewedProducts/ViewedProducts'
import { useViewedProducts } from '@/hooks/useViewedProducts'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

export const ProductsPage = ({ pageName, searchParams }: IProductsPage) => {
  const isCatalogPage = pageName === 'catalog'

  const { viewedProducts } = useViewedProducts()

  const { lang, translations } = useLang()

  const {
    products,
    productsSpinner,
    paginationProps,
    handlePageChange,
    handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithSizes,
    handleApplyFiltersWithColors,
    handleApplyFiltersBySort,
  } = useProductFilters(searchParams, pageName, isCatalogPage)

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          rootCategoryOptions: [
            {
              id: 2,
              title: translations[lang].main_menu.cloth,
              href: '/catalog/cloth',
            },
            {
              id: 3,
              title: translations[lang].main_menu.accessories,
              href: '/catalog/accessories',
            },
            {
              id: 4,
              title: translations[lang].main_menu.office,
              href: '/catalog/office',
            },
            {
              id: 5,
              title: translations[lang].main_menu.souvenirs,
              href: '/catalog/souvenirs',
            },
          ],
        })
        break

      case 'cloth':
        setCatalogCategoryOptions({
          clothCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison['t-shirts'],
              filterHandler: () => handleApplyFiltersWithCategory('t-shirts'),
            },
            {
              id: 2,
              title: translations[lang].comparison['long-sleeves'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('long-sleeves'),
            },
            {
              id: 3,
              title: translations[lang].comparison.hoodie,
              filterHandler: () => handleApplyFiltersWithCategory('hoodie'),
            },
            {
              id: 4,
              title: translations[lang].comparison.outerwear,
              filterHandler: () => handleApplyFiltersWithCategory('outerwear'),
            },
          ],
        })
        break

      case 'accessories':
        setCatalogCategoryOptions({
          accessoryCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.bags,
              filterHandler: () => handleApplyFiltersWithCategory('bags'),
            },
            {
              id: 2,
              title: translations[lang].comparison.headdress,
              filterHandler: () => handleApplyFiltersWithCategory('headdress'),
            },
            {
              id: 3,
              title: translations[lang].comparison.umbrella,
              filterHandler: () => handleApplyFiltersWithCategory('umbrella'),
            },
          ],
        })
        break

      case 'office':
        setCatalogCategoryOptions({
          officeCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.pen,
              filterHandler: () => handleApplyFiltersWithCategory('pen'),
            },
            {
              id: 2,
              title: translations[lang].comparison.notebook,
              filterHandler: () => handleApplyFiltersWithCategory('notebook'),
            },
          ],
        })
        break

      case 'souvenirs':
        setCatalogCategoryOptions({
          souvenirsCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison['business-souvenirs'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('business-souvenirs'),
            },
            {
              id: 2,
              title: translations[lang].comparison['promotional-souvenirs'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('promotional-souvenirs'),
            },
          ],
        })
        break

      default:
        break
    }
  }, [lang])

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
      <CatalogFilters
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersWithColors={handleApplyFiltersWithColors}
        handleApplyFiltersBySort={handleApplyFiltersBySort}
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
      {!!viewedProducts.items?.length && (
        <ViewedProducts viewedProducts={viewedProducts} />
      )}
    </>
  )
}
