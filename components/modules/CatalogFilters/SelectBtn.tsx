import { ISelectBtnProps } from '@/types/catalog'

import styles from '@/styles/catalog/index.module.scss'

export const SelectBtn = ({
  open,
  dynamicText,
  defaultText,
  bgClassName,
  toggleOpen,
}: ISelectBtnProps) => (
  <button
    onClick={toggleOpen}
    className={`btn-reset ${styles.catalog__filters__btn} ${open ? styles.is_open : ''} ${bgClassName || ''}`}
  >
    {dynamicText ? (
      <span className={styles.catalog__filters__btn__inner}>
        <span className={styles.catalog__filters__btn__text}>
          {defaultText}
        </span>
        <span className={styles.catalog__filters__btn__info}>
          {dynamicText}
        </span>
      </span>
    ) : (
      defaultText
    )}
  </button>
)
