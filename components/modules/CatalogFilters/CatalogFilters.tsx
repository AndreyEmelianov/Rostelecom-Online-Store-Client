import { ICatalogFiltersProps } from '@/types/catalog'
import { CategorySelect } from './CategorySelect'
import { PriceSelect } from './PriceSelect'
import { SizesSelect } from './SizesSelect'

import styles from '@/styles/catalog/index.module.scss'

export const CatalogFilters = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
}: ICatalogFiltersProps) => (
  <div className={styles.catalog__filters}>
    <div className={styles.catalog__filters__top}>
      <div className={styles.catalog__filters__top__left}>
        <CategorySelect />
        <PriceSelect
          handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        />
        <SizesSelect
          handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        />
      </div>
      <div className={styles.catalog__filters__top__right}>{}</div>
    </div>
    <div className={styles.catalog__filters__bottom}>{}</div>
  </div>
)
