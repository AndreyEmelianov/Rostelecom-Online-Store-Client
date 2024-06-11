'use client'
import { HeadingWithCount } from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import { countAllCartItemsAmount } from '@/lib/utils/cart'

import styles from '@/styles/cart-page/index.module.scss'

export const CartPage = () => {
  const { lang, translations } = useLang()

  const currentCartByAuth = useCartByAuth()

  const { getTextGenerator, getDefaultTextGenerator } = useBreadcrumbs('cart')

  return (
    <main>
      <Breadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={getDefaultTextGenerator}
      />
      <section className={styles.cart}>
        <div className='container'>
          <HeadingWithCount
            count={countAllCartItemsAmount(currentCartByAuth)}
            title={translations[lang].breadcrumbs.cart}
          />
        </div>
      </section>
    </main>
  )
}
