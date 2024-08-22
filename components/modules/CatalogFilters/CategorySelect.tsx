import { AnimatePresence } from 'framer-motion'

import { useCategoryFilter } from '@/hooks/useCategoryFilter'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { CategoryFiltersList } from './CategoryFiltersList'

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
      <button
        onClick={toggleOpen}
        className={`btn-reset ${styles.catalog__filters__btn} ${styles.bg_category} ${open ? styles.is_open : ''}`}
      >
        {option ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              {translations[lang].catalog.categories}
            </span>
            <span className={styles.catalog__filters__btn__info}>{option}</span>
          </span>
        ) : (
          translations[lang].catalog.categories
        )}
      </button>
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
