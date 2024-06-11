'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { getCartItemsFx } from '@/api/cart'
import { HeadingWithCount } from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import { countAllCartItemsAmount } from '@/lib/utils/cart'
import { basePropsForMotion } from '@/constants/motion'
import { CartList } from '@/components/modules/CartPage/CartList'
import { OrderInfoBlock } from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { PromotionalCode } from '@/components/modules/CartPage/PromotionalCode'

import styles from '@/styles/cart-page/index.module.scss'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'

export const CartPage = () => {
  const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] =
    useState(false)
  const { lang, translations } = useLang()

  const currentCartByAuth = useCartByAuth()

  const cartSpinner = useUnit(getCartItemsFx.pending)

  const { getTextGenerator, getDefaultTextGenerator } = useBreadcrumbs('cart')

  const isMedia930 = useMediaQuery(930)

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
          <div className={styles.cart__inner}>
            <div className={styles.cart__left}>
              {cartSpinner && (
                <motion.ul
                  {...basePropsForMotion}
                  className={cartSkeletonStyles.skeleton}
                >
                  {Array.from(new Array(3)).map((_, index) => (
                    <li
                      key={index}
                      className={cartSkeletonStyles.skeleton__item}
                    >
                      <div
                        className={cartSkeletonStyles.skeleton__item__light}
                      />
                    </li>
                  ))}
                </motion.ul>
              )}
              {!cartSpinner && (
                <motion.ul
                  {...basePropsForMotion}
                  className={`list-reset ${styles.cart__list}`}
                >
                  <CartList />
                </motion.ul>
              )}
            </div>
            <div className={styles.cart__right}>
              {isMedia930 && (
                <PromotionalCode
                  setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                />
              )}
              <div className={styles.cart__right__order}>
                <OrderInfoBlock
                  isCorrectedPromotionalCode={isCorrectPromotionalCode}
                />
              </div>
            </div>
          </div>
          {!isMedia930 && (
            <PromotionalCode
              setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
            />
          )}
        </div>
      </section>
    </main>
  )
}
