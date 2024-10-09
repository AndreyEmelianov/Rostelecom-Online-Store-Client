'use client'
import { ProductsListItem } from '@/components/modules/ProductsListItem/ProductsListItem'
import { useLang } from '@/hooks/useLang'
import { useViewedProducts } from '@/hooks/useViewedProducts'

import styles from '@/styles/viewed-products-page/index.module.scss'

export const ViewedProductsPage = () => {
  const { viewedProducts } = useViewedProducts()

  const { lang, translations } = useLang()

  return (
    <main>
      <section className={styles.viewed_products}>
        <div className='container'>
          <h1
            className={`section-site-title  ${styles.viewed_products__title}`}
          >
            {translations[lang].product.watched}
          </h1>
          <ul className={`list-reset ${styles.viewed_products__list}`}>
            {(viewedProducts.items || []).map((product) => (
              <ProductsListItem key={product._id} item={product} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
