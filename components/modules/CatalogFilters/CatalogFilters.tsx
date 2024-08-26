import { ICatalogFiltersProps } from '@/types/catalog'
import { CategorySelect } from './CategorySelect'
import { PriceSelect } from './PriceSelect'
import { SizesSelect } from './SizesSelect'
import { ColorsSelect } from './ColorsSelect'
import { SortSelect } from './SortSelect'

import styles from '@/styles/catalog/index.module.scss'

export const CatalogFilters = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
  handleApplyFiltersWithColors,
  handleApplyFiltersBySort,
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
        <ColorsSelect
          handleApplyFiltersWithColors={handleApplyFiltersWithColors}
        />
        <SortSelect handleApplyFiltersBySort={handleApplyFiltersBySort} />
      </div>
      <div className={styles.catalog__filters__top__right}>{}</div>
    </div>
    <div className={styles.catalog__filters__bottom}>{}</div>
  </div>
)
