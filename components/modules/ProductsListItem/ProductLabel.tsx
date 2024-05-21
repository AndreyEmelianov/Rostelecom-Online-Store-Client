import { useLang } from '@/hooks/useLang'
import { IProductLabelProps } from '@/types/modules'

import styles from '@/styles/products-list-item/index.module.scss'

export const ProductLabel = ({ isNew, isBestseller }: IProductLabelProps) => {
  const { lang, translations } = useLang()

  const bestsellerLabel = (
    <span
      className={`${styles.list__item__label} ${styles.list__item__bestseller}`}
    >
      {translations[lang].main_page.is_bestseller}
    </span>
  )

  const newLabel = (
    <span className={`${styles.list__item__label} ${styles.list__item__new}`}>
      {translations[lang].main_page.is_new}
    </span>
  )

  const allLabel = (
    <div className={styles.list__item__label__all}>
      {newLabel}
      {bestsellerLabel}
    </div>
  )

  if (isNew && isBestseller) {
    return allLabel
  }

  if (isBestseller) {
    return bestsellerLabel
  }

  return newLabel
}
