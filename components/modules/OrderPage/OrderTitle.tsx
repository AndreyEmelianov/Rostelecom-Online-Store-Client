import { IOrderTitleProps } from '@/types/order'

import styles from '@/styles/order/index.module.scss'

export const OrderTitle = ({ text, orderNumber }: IOrderTitleProps) => (
  <h3 className={styles.order__list__item__title}>
    <span>{orderNumber}</span>
    <span>{text}</span>
  </h3>
)
