import { useState } from 'react'
import Image from 'next/image'

import { IFavoriteItem } from '@/types/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLS, addProductToCart } from '@/context/cart'
import { DeleteItemBtn } from '@/components/elements/DeleteItemBtn/DeleteItemBtn'
import { AddToCartIcon } from '@/components/elements/AddToCartIcon/AddToCartIcon'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLang } from '@/hooks/useLang'
import {
  deleteProductFromLS,
  formatPrice,
  isUserAuth,
} from '@/lib/utils/common'
import { addCartItemToLS } from '@/lib/utils/cart'
import { IProduct } from '@/types/common'
import {
  deleteItemFromFavorites,
  setFavoriteItemsFromLS,
  setShouldShowEmptyPageFavorites,
} from '@/context/favorites'
import { useProductDelete } from '@/hooks/useProductDelete'

import styles from '@/styles/favorites/index.module.scss'

export const FavoritesListItem = ({ item }: { item: IFavoriteItem }) => {
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const isProductInCart = currentCartByAuth.find(
    (cartItem) =>
      cartItem.productId === item.productId && cartItem.size === item.size
  )

  const { lang, translations } = useLang()

  const { deleteSpinner, handleDelete } = useProductDelete(
    item._id || item.clientId,
    deleteItemFromFavorites
  )

  const isMedia485 = useMediaQuery(485)
  const imageSize = isMedia485 ? 132 : 160

  const addToCart = () => {
    const cartItem = {
      ...item,
      _id: item.productId,
      images: [item.image],
      characteristics: { color: item.color },
    }

    if (!isUserAuth()) {
      addCartItemToLS(cartItem as unknown as IProduct, item.size, 1)
      return
    }

    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

    const clientId = addCartItemToLS(
      cartItem as unknown as IProduct,
      item.size,
      1,
      false
    )

    addProductToCart({
      jwt: auth.accessToken,
      clientId,
      productId: item.productId,
      category: item.category,
      size: item.size,
      count: 1,
      setSpinner: setAddToCartSpinner,
    })
  }

  const handleDeleteFavorite = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        item.clientId,
        'rostelekomFavorites',
        'Товар удалён из избранного!',
        setFavoriteItemsFromLS,
        setShouldShowEmptyPageFavorites
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      item.clientId,
      'rostelekomFavorites',
      '',
      setFavoriteItemsFromLS,
      setShouldShowEmptyPageFavorites,
      false
    )
  }

  return (
    <>
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteFavorite}
        className={styles.favorites__list__item__delete}
      />
      <AddToCartIcon
        isProductInCart={!!isProductInCart}
        addToCartSpinner={addToCartSpinner}
        className={styles.favorites__list__item__cart}
        addedClassName={styles.favorites__list__item__cart_added}
        callback={addToCart}
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
