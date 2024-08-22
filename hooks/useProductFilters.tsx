import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import {
  $products,
  loadProductsByFilter,
  loadProductsByFilterFx,
} from '@/context/goods'
import { SearchParams } from '@/types/catalog'
import {
  checkOffsetParam,
  getSearchParamsUrl,
  updateSearchParams,
} from '@/lib/utils/common'

import styles from '@/styles/catalog/index.module.scss'

export const useProductFilters = (
  searchParams: SearchParams,
  category: string,
  isCatalog = false
) => {
  const isValidOffset = checkOffsetParam(searchParams.offset)
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +(searchParams.offset || 0) : 0
  )

  const pathname = usePathname()

  const products = useUnit($products)
  const pagesCount = Math.ceil((products.count || 12) / 12)

  const productsSpinner = useUnit(loadProductsByFilterFx.pending)

  useEffect(() => {
    const urlParams = getSearchParamsUrl()

    urlParams.delete('offset')

    if (!isValidOffset) {
      loadProductsByFilter({
        limit: 12,
        offset: 0,
        category,
        additionalParam: urlParams.toString(),
        isCatalog,
      })

      updateSearchParams('offset', 0, pathname)
      setCurrentPage(0)
      return
    }

    loadProductsByFilter({
      limit: 12 * +(searchParams.offset || 0) + 12,
      offset: +(searchParams.offset || 0) * 12,
      category,
      additionalParam: urlParams.toString(),
      isCatalog,
    })

    setCurrentPage(+(searchParams.offset || 0))
  }, [])

  const handlePageChange = ({ selected }: { selected: number }) => {
    const urlParams = getSearchParamsUrl()

    urlParams.delete('offset')

    loadProductsByFilter({
      limit: 12 * selected + 12,
      offset: selected * 12,
      category,
      additionalParam: urlParams.toString(),
      isCatalog,
    })

    updateSearchParams('offset', selected, pathname)
    setCurrentPage(selected)
  }

  const handleApplyFiltersWithCategory = (categoryType: string) => {
    updateSearchParams('type', categoryType, pathname)
    handlePageChange({ selected: 0 })
  }

  const handleApplyFiltersWithPrice = (priceFrom: string, priceTo: string) => {
    updateSearchParams('priceFrom', priceFrom, pathname)
    updateSearchParams('priceTo', priceTo, pathname)
    handlePageChange({ selected: 0 })
  }

  const paginationProps = {
    containerClassName: `list-reset ${styles.catalog__bottom__list}`,
    pageClassName: `catalog-pagination-item ${styles.catalog__bottom__list__item}`,
    pageLinkClassName: styles.catalog__bottom__list__item__link,
    previousClassName: `catalog-pagination-prev ${styles.catalog__bottom__list__prev}`,
    nextClassName: `catalog-pagination-next ${styles.catalog__bottom__list__next}`,
    breakClassName: styles.catalog__bottom__list__break,
    breakLinkClassName: styles.catalog__bottom__list__break__link,
    breakLabe: '...',
    pageCount: pagesCount,
    forcePage: currentPage,
  }

  return {
    paginationProps,
    products,
    pagesCount,
    productsSpinner,
    handlePageChange,
    handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
  }
}
