'use client'
import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

import styles from '@/styles/cart-page/index.module.scss'

export const CartPage = () => {
  const { getTextGenerator, getDefaultTextGenerator } = useBreadcrumbs('cart')

  return (
    <main>
      <Breadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={getDefaultTextGenerator}
      />
      <section className={styles.cart}>
        <div className='container'>Cart</div>
      </section>
    </main>
  )
}
