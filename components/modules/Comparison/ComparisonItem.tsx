import { motion } from 'framer-motion'
import Image from 'next/image'

import { IComparisonItem } from '@/types/comparison'
import { basePropsForMotion } from '@/constants/motion'
import { DeleteItemBtn } from '@/components/elements/DeleteItemBtn/DeleteItemBtn'
import { AddToCartIcon } from '@/components/elements/AddToCartIcon/AddToCartIcon'

import styles from '@/styles/comparison/index.module.scss'

export const ComparisonItem = ({ item }: { item: IComparisonItem }) => (
  <motion.li
    {...basePropsForMotion}
    className={`${styles.comparison__list__item}`}
  >
    <DeleteItemBtn
      btnDisabled={false}
      callback={() => ''}
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
