import { useState } from 'react'
import Image from 'next/image'

import { IFavoriteItem } from '@/types/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLS } from '@/context/cart'
import { DeleteItemBtn } from '@/components/elements/DeleteItemBtn/DeleteItemBtn'
import { AddToCartIcon } from '@/components/elements/AddToCartIcon/AddToCartIcon'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLang } from '@/hooks/useLang'
import { formatPrice } from '@/lib/utils/common'

import styles from '@/styles/favorites/index.module.scss'

export const FavoritesListItem = ({ item }: { item: IFavoriteItem }) => {
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const isProductInCart = currentCartByAuth.find(
    (cartItem) =>
      cartItem.productId === item.productId && cartItem.size === item.size
  )

  const { lang, translations } = useLang()

  const isMedia485 = useMediaQuery(485)
  const imageSize = isMedia485 ? 132 : 160

  return (
    <>
      <DeleteItemBtn
        btnDisabled={false}
        callback={() => {}}
        className={styles.favorites__list__item__delete}
      />
      <AddToCartIcon
        isProductInCart={!!isProductInCart}
        addToCartSpinner={addToCartSpinner}
        className={styles.favorites__list__item__cart}
        addedClassName={styles.favorites__list__item__cart_added}
        callback={() => {}}
      />
      <div className={styles.favorites__list__item__img}>
        <Image
          src={item.image}
          alt={item.name}
          width={imageSize}
          height={imageSize}
        />
      </div>
      <p className={styles.favorites__list__item__info}>
        <span className={styles.favorites__list__item__info__name}>
          {item.name}
        </span>
        <span className={styles.favorites__list__item__info__size}>
          {item.size.length
            ? `${translations[lang].catalog.size}: ${item.size.toUpperCase()}`
            : ''}
        </span>
        <span className={styles.favorites__list__item__info__price}>
          {formatPrice(+item.price)} ₽
        </span>
      </p>
    </>
  )
}
