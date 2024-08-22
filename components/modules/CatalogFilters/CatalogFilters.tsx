import { ICatalogFiltersProps } from '@/types/catalog'
import { CategorySelect } from './CategorySelect'
import { PriceSelect } from './PriceSelect'

import styles from '@/styles/catalog/index.module.scss'

export const CatalogFilters = ({
  handleApplyFiltersWithPrice,
}: ICatalogFiltersProps) => (
  <div className={styles.catalog__filters}>
    <div className={styles.catalog__filters__top}>
      <div className={styles.catalog__filters__top__left}>
        <CategorySelect />
        <PriceSelect
          handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        />
      </div>
      <div className={styles.catalog__filters__top__right}>{}</div>
    </div>
    <div className={styles.catalog__filters__bottom}>{}</div>
  </div>
)
