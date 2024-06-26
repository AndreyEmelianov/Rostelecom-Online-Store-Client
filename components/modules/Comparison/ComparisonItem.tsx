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

import styles from '@/styles/comparison/index.module.scss'

export const ComparisonItem = ({ item }: { item: IComparisonItem }) => {
  const { deleteSpinner, handleDelete } = useProductDelete(
    item._id,
    deleteProductFromComparison
  )

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
      {...basePropsForMotion}
      className={`${styles.comparison__list__item}`}
    >
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteItemFromComparison}
        className={styles.comparison__list__item__delete}
      />
      <AddToCartIcon
        addToCartSpinner={false}
        isProductInCart={false}
        callback={() => ''}
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