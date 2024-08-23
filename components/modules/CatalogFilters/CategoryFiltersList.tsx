import { motion } from 'framer-motion'
import Link from 'next/link'

import { basePropsForMotion } from '@/constants/motion'
import { ICategoryFiltersListProps } from '@/types/catalog'
import { SelectItem } from './SelectItem'
import { getSearchParamsUrl } from '@/lib/utils/common'

import styles from '@/styles/catalog/index.module.scss'

export const CategoryFiltersList = ({
  option,
  currentOptions,
  allCategoriesTitle,
  catalogCategoryOptions,
  mobileClassName,
  setOption,
  handleSelectAllCategories,
}: ICategoryFiltersListProps) => (
  <motion.ul
    {...basePropsForMotion}
    className={`list-reset ${styles.catalog__filters__list} ${mobileClassName}`}
  >
    {currentOptions &&
      Object.keys(catalogCategoryOptions)[0] !== 'rootCategoryOptions' &&
      currentOptions.map((currentOption) => (
        <SelectItem
          key={currentOption.id}
          item={currentOption}
          isActive={option === currentOption.title}
          setOption={setOption}
          mobileClassName={mobileClassName}
        />
      ))}
    {catalogCategoryOptions.rootCategoryOptions && (
      <>
        <li
          className={`${styles.catalog__filters__list__item} 
        ${option === allCategoriesTitle ? styles.option_active : ''} ${mobileClassName}`}
        >
          <button
            onClick={handleSelectAllCategories}
            className={`btn-reset ${styles.catalog__filters__list__item__btn}`}
          >
            {allCategoriesTitle}
          </button>
        </li>
        {catalogCategoryOptions.rootCategoryOptions.map((rootOption) => (
          <li
            key={rootOption.id}
            className={`${styles.catalog__filters__list__item} ${mobileClassName}`}
          >
            <Link
              href={`${rootOption.href}?${getSearchParamsUrl().toString()}`}
              className={styles.catalog__filters__list__item__btn}
            >
              {rootOption.title}
            </Link>
          </li>
        ))}
      </>
    )}
  </motion.ul>
)
