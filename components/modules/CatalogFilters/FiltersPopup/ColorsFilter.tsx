import { useColorsFilter } from '@/hooks/useColorsFilter'
import { useLang } from '@/hooks/useLang'
import { CheckboxSelectItem } from '../CheckboxSelectItem'

import styles from '@/styles/catalog/index.module.scss'

export const ColorsFilter = ({
  handleApplyFiltersWithColors,
}: {
  handleApplyFiltersWithColors: (arg0: string[]) => void
}) => {
  const { lang, translations } = useLang()

  const { colorsOptions, handleSelectColor } = useColorsFilter(
    handleApplyFiltersWithColors
  )

  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        {translations[lang].catalog.color}
      </h3>
      <ul
        className={`list-reset ${styles.catalog__filters__list} ${styles.filters_mobile}`}
      >
        {colorsOptions.map((colorsOption) => (
          <CheckboxSelectItem
            key={colorsOption.id}
            item={colorsOption}
            callback={handleSelectColor}
            mobileClassName={styles.filters_mobile}
          />
        ))}
      </ul>
    </>
  )
}
