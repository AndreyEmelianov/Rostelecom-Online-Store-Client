import { MutableRefObject, useRef, useState } from 'react'
import Link from 'next/link'

import { useLang } from '@/hooks/useLang'
import { IOrderInfoBlockProps } from '@/types/modules'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { formatPrice, showCountMessage } from '@/lib/utils/common'
import { countAllCartItemsAmount } from '@/lib/utils/cart'

import styles from '@/styles/order-block/index.module.scss'

export const OrderInfoBlock = ({
  isOrderPage,
  isCorrectedPromotionalCode,
}: IOrderInfoBlockProps) => {
  const [isUserAgree, setIsUserAgree] = useState(false)

  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>

  const currentCartByAuth = useCartByAuth()

  const { animatedPrice } = useTotalPrice()
  const { lang, translations } = useLang()

  const priceWithDiscount = isCorrectedPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.2))
    : formatPrice(animatedPrice)

  const handleAgreementChange = () => setIsUserAgree((prevState) => !prevState)

  const handleTabCheckbox = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key == ' ' || event.code == 'Space') {
      event.preventDefault()
      setIsUserAgree(!checkboxRef.current.checked)
      checkboxRef.current.checked = !checkboxRef.current.checked
    }
  }

  return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={`${styles.order_block__info}`}>
          {countAllCartItemsAmount(currentCartByAuth)}{' '}
          {showCountMessage(
            `${countAllCartItemsAmount(currentCartByAuth)}`,
            lang
          )}{' '}
          {translations[lang].order.worth}{' '}
          <span className={styles.order_block__info__text}>
            {formatPrice(animatedPrice)} ₽
          </span>
        </p>
        <p className={`${styles.order_block__info}`}>
          {translations[lang].order.amount_with_discounts}{' '}
          <span className={styles.order_block__info__text}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage && <></>}
        <p className={`${styles.order_block__total}`}>
          <span>{translations[lang].order.total}:</span>
          <span className={styles.order_block__total__price}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage ? (
          <button />
        ) : (
          <Link
            href={'/order'}
            className={`${styles.order_block__btn} ${!isUserAgree || !currentCartByAuth.length ? styles.disabled : ''}`}
          >
            {translations[lang].order.make_order}
          </Link>
        )}
        <label className={styles.order_block__agreement}>
          <input
            type='checkbox'
            tabIndex={-1}
            ref={checkboxRef}
            onChange={handleAgreementChange}
            checked={isUserAgree}
            className={styles.order_block__agreement__input}
          />
          <span className={styles.order_block__agreement__mark} />
          <span
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
            className={styles.order_block__agreement__checkbox}
          />
          <span className={styles.order_block__agreement__text}>
            {translations[lang].order.agreement_text}{' '}
            <Link
              href={'/privacy'}
              className={styles.order_block__agreement__link}
            >
              {translations[lang].order.agreement_link}
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}
