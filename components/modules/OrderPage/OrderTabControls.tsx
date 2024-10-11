import { IOrderTabControlsProps } from '@/types/order'

import styles from '@/styles/order/index.module.scss'

export const OrderTabControls = ({
  tab1Text,
  tab2Text,
  tab1Active,
  tab2Active,
  handleTab1,
  handleTab2,
}: IOrderTabControlsProps) => (
  <div className={styles.order__list__item__nav}>
    <button
      onClick={handleTab1}
      className={`btn-reset ${styles.order__list__item__nav__item} ${tab1Active ? styles.active : ''}`}
    >
      {tab1Text}
    </button>
    <button
      onClick={handleTab2}
      className={`btn-reset ${styles.order__list__item__nav__item} ${tab2Active ? styles.active : ''}`}
    >
      {tab2Text}
    </button>
  </div>
)
