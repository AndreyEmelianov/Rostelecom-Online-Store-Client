import { AnimatePresence, motion } from 'framer-motion'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { useSizeFilter } from '@/hooks/useSizeFilter'
import { SelectBtn } from './SelectBtn'
import { basePropsForMotion } from '@/constants/motion'
import { CheckboxSelectItem } from './CheckboxSelectItem'

import styles from '@/styles/catalog/index.module.scss'

export const SizesSelect = ({
  handleApplyFiltersWithSizes,
}: {
  handleApplyFiltersWithSizes: (arg0: string[]) => void
}) => {
  const { lang, translations } = useLang()

  const { open, ref, toggleOpen } = useClickOutside()
  const { sizes, sizesOptions, handleSelectSize } = useSizeFilter(
    handleApplyFiltersWithSizes
  )

  return (
    <div
      className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggleOpen={toggleOpen}
        defaultText={translations[lang].catalog.size}
        dynamicText={sizes.join(', ')}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            {sizesOptions.map((sizesOption) => (
              <CheckboxSelectItem
                key={sizesOption.id}
                item={sizesOption}
                callback={handleSelectSize}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
