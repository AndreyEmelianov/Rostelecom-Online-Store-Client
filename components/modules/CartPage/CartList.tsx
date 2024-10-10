import { AnimatePresence, motion } from 'framer-motion'

import { basePropsForMotion } from '@/constants/motion'
import { CartListItem } from './CartListItem'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLS } from '@/context/cart/state'

import styles from '@/styles/cart-page/index.module.scss'

export const CartList = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  return (
    <>
      <AnimatePresence>
        {currentCartByAuth.map((item) => (
          <motion.li
            key={item._id || item.clientId}
            {...basePropsForMotion}
            className={styles.cart__list__item}
          >
            <CartListItem item={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </>
  )
}
