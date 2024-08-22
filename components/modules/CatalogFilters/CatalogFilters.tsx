import { CategorySelect } from './CategorySelect'

import styles from '@/styles/catalog/index.module.scss'

export const CatalogFilters = () => (
  <div className={styles.catalog__filters}>
    <div className={styles.catalog__filters__top}>
      <div className={styles.catalog__filters__top__left}>
        <CategorySelect />
      </div>
      <div className={styles.catalog__filters__top__right}>{}</div>
    </div>
    <div className={styles.catalog__filters__bottom}>{}</div>
  </div>
)
