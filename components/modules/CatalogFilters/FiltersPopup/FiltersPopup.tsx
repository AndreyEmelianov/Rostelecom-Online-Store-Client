'use client'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { $filtersPopup, setFiltersPopup } from '@/context/catalog'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useCategoryFilter } from '@/hooks/useCategoryFilter'
import { loadProductsByFilterFx } from '@/context/goods'
import { $products } from '@/context/goods/state'
import { useLang } from '@/hooks/useLang'
import {
  removeOverflowHiddenFromBody,
  showCountMessage,
} from '@/lib/utils/common'
import { PriceFilter } from './PriceFilter'
import { CategoryFiltersList } from '../CategoryFiltersList'
import { SizesFilter } from './SizesFilter'
import { ColorsFilter } from './ColorsFilter'

import styles from '@/styles/catalog/index.module.scss'

export const FiltersPopup = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
  handleApplyFiltersWithColors,
}: Omit<ICatalogFiltersProps, 'handleApplyFiltersBySort'>) => {
  const filtersPopup = useUnit($filtersPopup)

  const products = useUnit($products)
  const productSpinner = useUnit(loadProductsByFilterFx.pending)

  const { lang, translations } = useLang()

  const { popupZIndex, itemVariants, sideVariants } = useMenuAnimation(
    102,
    filtersPopup
  )

  const {
    option,
    currentOptions,
    allCategoriesTitle,
    catalogCategoryOptions,
    setOption,
    handleSelectAllCategories,
  } = useCategoryFilter()

  const handleCloseFilterPopup = () => {
    removeOverflowHiddenFromBody()
    setFiltersPopup(false)
  }

  return (
    <div
      className={styles.catalog__filters__popup}
      style={{ zIndex: popupZIndex }}
    >
      <AnimatePresence>
        {filtersPopup && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
            className={styles.catalog__filters__popup__aside}
          >
            <motion.div
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
              className={styles.catalog__filters__popup__inner}
            >
              <motion.button
                variants={itemVariants}
                onClick={handleCloseFilterPopup}
                className={`btn-reset ${styles.catalog__filters__popup__close}`}
              />
              <motion.h2
                variants={itemVariants}
                className={styles.catalog__filters__popup__title}
              >
                {translations[lang].catalog.filters}
              </motion.h2>
              <motion.div
                variants={itemVariants}
                className={styles.catalog__filters__popup__category}
              >
                <h3 className={styles.catalog__filters__popup__inner_title}>
                  {translations[lang].catalog.categories}
                </h3>
                <CategoryFiltersList
                  option={option}
                  currentOptions={currentOptions}
                  allCategoriesTitle={allCategoriesTitle}
                  catalogCategoryOptions={catalogCategoryOptions}
                  setOption={setOption}
                  handleSelectAllCategories={handleSelectAllCategories}
                  mobileClassName={styles.filters_mobile}
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.catalog__filters__popup__price}
              >
                <PriceFilter
                  handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.catalog__filters__popup__sizes}
              >
                <SizesFilter
                  handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.catalog__filters__popup__colors}
              >
                <ColorsFilter
                  handleApplyFiltersWithColors={handleApplyFiltersWithColors}
                />
              </motion.div>
              <motion.button
                variants={itemVariants}
                onClick={handleCloseFilterPopup}
                className={`btn-reset ${styles.catalog__filters__popup__apply}`}
              >
                {productSpinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : !!products.count ? (
                  `${translations[lang].catalog.found} ${products.count} ${showCountMessage(`${products.count}`, lang)}`
                ) : (
                  `${translations[lang].catalog.nothing_found}`
                )}
              </motion.button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
