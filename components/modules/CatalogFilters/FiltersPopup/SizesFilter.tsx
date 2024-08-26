import { useLang } from '@/hooks/useLang'
import { useSizeFilter } from '@/hooks/useSizeFilter'
import { CheckboxSelectItem } from '../CheckboxSelectItem'

import styles from '@/styles/catalog/index.module.scss'

export const SizesFilter = ({
  handleApplyFiltersWithSizes,
}: {
  handleApplyFiltersWithSizes: (arg0: string[]) => void
}) => {
  const { lang, translations } = useLang()

  const { sizesOptions, handleSelectSize } = useSizeFilter(
    handleApplyFiltersWithSizes
  )

  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        {translations[lang].catalog.size}
      </h3>
      <ul
        className={`list-reset ${styles.catalog__filters__list} ${styles.filters_mobile}`}
      >
        {sizesOptions.map((sizesOption) => (
          <CheckboxSelectItem
            key={sizesOption.id}
            item={sizesOption}
            callback={handleSelectSize}
            mobileClassName={styles.filters_mobile}
          />
        ))}
      </ul>
    </>
  )
}
