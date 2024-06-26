/* eslint-disable indent */
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { IComparisonItem } from '@/types/comparison'
import { basePropsForMotion } from '@/constants/motion'
import { DeleteItemBtn } from '@/components/elements/DeleteItemBtn/DeleteItemBtn'
import { AddToCartIcon } from '@/components/elements/AddToCartIcon/AddToCartIcon'
import { useProductDelete } from '@/hooks/useProductDelete'
import {
  deleteProductFromComparison,
  setComparisonFromLS,
  setShouldShowEmptyPageComparison,
} from '@/context/comparison'
import { deleteProductFromLS, isUserAuth } from '@/lib/utils/common'
import { productWithoutSizes } from '@/constants/product'
import { addCartItemToLS } from '@/lib/utils/cart'
import { IProduct } from '@/types/common'
import { $cart, $cartFromLS, addProductToCart } from '@/context/cart'
import { loadOneProduct } from '@/context/goods'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'

import styles from '@/styles/comparison/index.module.scss'

export const ComparisonItem = ({ item }: { item: IComparisonItem }) => {
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [loadProductSpinner, setLoadProductSpinner] = useState(false)

  const { deleteSpinner, handleDelete } = useProductDelete(
    item._id,
    deleteProductFromComparison
  )

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)

  const isProductInCart = useMemo(
    () =>
      productWithoutSizes.includes(item.characteristics.type)
        ? currentCartByAuth.find(
            (cartItem) => cartItem.productId === item.productId
          )
        : currentCartByAuth.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              Object.entries(item.sizes)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .includes(cartItem.size)
          ),
    [currentCartByAuth, item.characteristics.type, item.productId, item.sizes]
  )

  const addToCartFromComparison = () => {
    if (productWithoutSizes.includes(item.characteristics.type)) {
      const product = {
        ...item,
        _id: item.productId,
        images: [item.image],
      } as unknown as IProduct

      if (!isUserAuth()) {
        addCartItemToLS(product, '', 1)
        return
      }

      const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)
      const clientId = addCartItemToLS(product, '', 1, false)

      addProductToCart({
        jwt: auth.accessToken,
        clientId,
        productId: item.productId,
        category: item.category,
        count: 1,
        size: '',
        setSpinner: setAddToCartSpinner,
      })
      return
    }

    loadOneProduct({
      productId: item.productId,
      category: item.category,
      withShowingSizeTable: true,
      setSpinner: setLoadProductSpinner,
    })
  }

  const handleDeleteItemFromComparison = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        item.clientId,
        'rostelekomComparison',
        'Товар удалён из сравнения!',
        setComparisonFromLS,
        setShouldShowEmptyPageComparison
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      item.clientId,
      'rostelekomComparison',
      '',
      setComparisonFromLS,
      setShouldShowEmptyPageComparison,
      false
    )
  }

  return (
    <motion.li
      className={`${styles.comparison__list__item}`}
      {...basePropsForMotion}
    >
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteItemFromComparison}
        className={styles.comparison__list__item__delete}
      />
      <AddToCartIcon
        addToCartSpinner={addToCartSpinner || loadProductSpinner}
        isProductInCart={!!isProductInCart}
        callback={addToCartFromComparison}
        className={styles.comparison__list__item__cart}
        addedClassName={styles.comparison__list__item__cart_added}
      />
      <div className={styles.comparison__list__item__img}>
        <Image src={item.image} alt={item.name} width={160} height={160} />
      </div>
      <ul className={`list-reset ${styles.comparison__list__item__inner_list}`}>
        {Object.entries(item.characteristics).map(([key, value], index) => {
          let valueFromArray = null
          let valueByBoolean = null

          if (Array.isArray(value)) {
            valueFromArray = value.join(', ')
          }

          if (typeof value == 'boolean') {
            if (value) {
              valueByBoolean = 'Есть'
            } else {
              valueByBoolean = 'Нет'
            }
          }

          return (
            <li
              key={index}
              className={styles.comparison__list__item__inner_list__item}
            >
              <span>{key}</span>
              <span>{valueByBoolean || valueFromArray || value}</span>
            </li>
          )
        })}
      </ul>
    </motion.li>
  )
}
