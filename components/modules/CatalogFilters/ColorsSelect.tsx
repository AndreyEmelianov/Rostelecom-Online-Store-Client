import { AnimatePresence, motion } from 'framer-motion'

import { basePropsForMotion } from '@/constants/motion'
import { useColorsFilter } from '@/hooks/useColorsFilter'
import { CheckboxSelectItem } from './CheckboxSelectItem'
import { SelectBtn } from './SelectBtn'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'

import styles from '@/styles/catalog/index.module.scss'

export const ColorsSelect = ({
  handleApplyFiltersWithColors,
}: {
  handleApplyFiltersWithColors: (arg0: string[]) => void
}) => {
  const { lang, translations } = useLang()

  const { open, ref, toggleOpen } = useClickOutside()
  const { colors, colorsOptions, handleSelectColor } = useColorsFilter(
    handleApplyFiltersWithColors
  )

  return (
    <div ref={ref} className={`${styles.catalog__filters__select}`}>
      <SelectBtn
        open={open}
        toggleOpen={toggleOpen}
        defaultText={translations[lang].catalog.color}
        dynamicText={colors.join(', ')}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            {colorsOptions.map((colorsOption) => (
              <CheckboxSelectItem
                key={colorsOption.id}
                item={colorsOption}
                callback={handleSelectColor}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
