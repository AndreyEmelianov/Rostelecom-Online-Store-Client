'use client'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { OrderInfoBlock } from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import { OrderTitle } from '@/components/modules/OrderPage/OrderTitle'
import { $cart, $cartFromLS } from '@/context/cart/state'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { OrderCartItem } from '../../modules/OrderPage/OrderCartItem'
import { OrderDelivery } from '@/components/modules/OrderPage/OrderDelivery'
import { $mapModal } from '@/context/modals/state'
import { MapModal } from '@/components/modules/OrderPage/MapModal'
import { basePropsForMotion } from '@/constants/motion'

import styles from '@/styles/order/index.module.scss'

export const OrderPage = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const mapModal = useUnit($mapModal)

  const { lang, translations } = useLang()
  const { getTextGenerator, getDefaultTextGenerator } = useBreadcrumbs('order')

  const isMedia1220 = useMediaQuery(1220)

  return (
    <main>
      <Breadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={getDefaultTextGenerator}
      />
      <section className={styles.order}>
        <div className='container'>
          <h1 className={styles.order__title}>
            {translations[lang].breadcrumbs.order}
          </h1>
          <div className={styles.order__inner}>
            <div className={styles.order__inner__left}>
              <ul className={`list-reset ${styles.order__list}`}>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='1'
                    text={translations[lang].order.order}
                  />
                  {isMedia1220 ? (
                    <ul
                      className={`list-reset ${styles.order__list__item__list}`}
                    >
                      {currentCartByAuth.map((item, index) => (
                        <OrderCartItem
                          key={item._id || item.clientId}
                          item={item}
                          position={index + 1}
                        />
                      ))}
                    </ul>
                  ) : (
                    <table className={styles.order__list__item__table}>
                      <thead>
                        <tr>
                          <th>{translations[lang].order.name}</th>
                          <th>{translations[lang].order.size}</th>
                          <th>{translations[lang].order.color}</th>
                          <th>{translations[lang].order.count}</th>
                          <th>{translations[lang].order.sum}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCartByAuth.map((item, index) => (
                          <OrderCartItem
                            key={item._id || item.clientId}
                            item={item}
                            position={index + 1}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </li>
                <li className={styles.order__list__item}>
                  <OrderDelivery />
                </li>
              </ul>
            </div>
            <div className={styles.order__inner__right}>
              <div className={styles.order__inner__right__order}>
                <OrderInfoBlock isOrderPage />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {mapModal && (
          <motion.div className={styles.map_modal} {...basePropsForMotion}>
            <MapModal />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
