import { forwardRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { IWrappedComponentProps } from '@/types/hocs'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useLang } from '@/hooks/useLang'
import { CartPopupItem } from './CartPopupItem'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { formatPrice } from '@/lib/utils/common'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLS } from '@/context/cart/state'
import { getCartItemsFx } from '@/context/cart'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const { lang, translations } = useLang()

    const spinner = useUnit(getCartItemsFx.pending)

    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

    const { animatedPrice } = useTotalPrice()

    const handleShowPopup = () => setOpen(true)
    const handleHidePopup = () => setOpen(false)

    return (
      <div className='cart-popup' ref={ref}>
        <Link
          href='/cart'
          className={`header__links__item__btn header__links__item__btn--cart`}
          onMouseEnter={handleShowPopup}
        >
          {!!currentCartByAuth.length && <span className='not-empty' />}
        </Link>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='cart-popup__wrapper'
              onMouseLeave={handleHidePopup}
            >
              <span className='cart-popup__arrow' />
              <button
                className='btn-reset cart-popup__close'
                onClick={handleHidePopup}
              />
              <h3 className='cart-popup__title'>
                {translations[lang].breadcrumbs.cart}
              </h3>
              {spinner ? (
                <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='3x' />
              ) : (
                <ul className='list-reset cart-popup__cart-list'>
                  <AnimatePresence>
                    {currentCartByAuth.length ? (
                      currentCartByAuth.map((item) => (
                        <motion.li
                          key={item._id || item.clientId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='cart-list__item'
                        >
                          <CartPopupItem item={item} />
                        </motion.li>
                      ))
                    ) : (
                      <li className='cart-popup__cart-list__empty-cart' />
                    )}
                  </AnimatePresence>
                </ul>
              )}
              <div className='cart-popup__footer'>
                <div className='cart-popup__footer__inner'>
                  <span> {translations[lang].common.order_price}:</span>
                  <span>{formatPrice(animatedPrice)} ₽</span>
                </div>
                <Link href='/order' className='cart-popup__footer__link'>
                  {translations[lang].breadcrumbs.order}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
