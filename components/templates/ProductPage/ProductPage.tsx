'use client'
import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { notFound } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { IProductPageProps } from '@/types/product'
import {
  $currentProduct,
  loadOneProduct,
  loadOneProductFx,
} from '@/context/goods'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'

import styles from '@/styles/product/index.module.scss'

export const ProductPage = ({ category, productId }: IProductPageProps) => {
  const currentProduct = useUnit($currentProduct)
  const productSpinner = useUnit(loadOneProductFx.pending)

  usePageTitle(category, currentProduct.name)
  const { breadcrumbs } = useBreadcrumbs(category)
  console.log(breadcrumbs)

  const { lang, translations } = useLang()

  useEffect(() => {
    loadOneProduct({
      productId,
      category,
    })
  }, [])

  useEffect(() => {
    if (breadcrumbs) {
      const lastCrumb =
        breadcrumbs.children[breadcrumbs.children.length - 1].children[0]

      breadcrumbs.children[
        breadcrumbs.children.length - 2
      ].children[0].textContent = (
        translations[lang].breadcrumbs as { [index: string]: string }
      )[category]

      lastCrumb.textContent = productSpinner
        ? translations[lang].common.loading
        : currentProduct.name
    }
  }, [
    breadcrumbs,
    category,
    currentProduct.name,
    lang,
    productSpinner,
    translations,
  ])

  if (currentProduct?.errorMessage) {
    notFound()
  }

  return (
    <div className={styles.product}>
      {productSpinner ? (
        <div className={styles.product__preloader}>
          <FontAwesomeIcon icon={faSpinner} spin size='8x' />
        </div>
      ) : (
        <div>{currentProduct.name}</div>
      )}
    </div>
  )
}
