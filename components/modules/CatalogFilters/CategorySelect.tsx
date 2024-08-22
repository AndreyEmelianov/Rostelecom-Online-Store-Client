import { AnimatePresence } from 'framer-motion'

import { useCategoryFilter } from '@/hooks/useCategoryFilter'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { CategoryFiltersList } from './CategoryFiltersList'
import { SelectBtn } from './SelectBtn'

import styles from '@/styles/catalog/index.module.scss'

export const CategorySelect = () => {
  const { lang, translations } = useLang()

  const { open, ref, toggleOpen } = useClickOutside()
  const {
    option,
    currentOptions,
    allCategoriesTitle,
    catalogCategoryOptions,
    setOption,
    handleSelectAllCategories,
  } = useCategoryFilter()

  return (
    <div ref={ref} className={styles.catalog__filters__select}>
      <SelectBtn
        open={open}
        dynamicText={option}
        defaultText={translations[lang].catalog.categories}
        toggleOpen={toggleOpen}
        bgClassName={styles.bg_category}
      />
      <AnimatePresence>
        {open && (
          <CategoryFiltersList
            option={option}
            currentOptions={currentOptions}
            allCategoriesTitle={allCategoriesTitle}
            catalogCategoryOptions={catalogCategoryOptions}
            setOption={setOption}
            handleSelectAllCategories={handleSelectAllCategories}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
