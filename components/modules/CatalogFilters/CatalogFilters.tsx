import { motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { ICatalogFiltersProps } from '@/types/catalog'
import { CategorySelect } from './CategorySelect'
import { PriceSelect } from './PriceSelect'
import { SizesSelect } from './SizesSelect'
import { ColorsSelect } from './ColorsSelect'
import { SortSelect } from './SortSelect'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  $colorsOptions,
  $sizesOptions,
  setColors,
  setColorsOptions,
  setSizes,
  setSizesOptions,
} from '@/context/catalog'
import { basePropsForMotion } from '@/constants/motion'
import { SelectInfoItem } from './SelectInfoItem'

import styles from '@/styles/catalog/index.module.scss'

export const CatalogFilters = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
  handleApplyFiltersWithColors,
  handleApplyFiltersBySort,
}: ICatalogFiltersProps) => {
  const sizesOptions = useUnit($sizesOptions)
  const colorsOptions = useUnit($colorsOptions)

  const isMedia910 = useMediaQuery(910)
  const isMedia610 = useMediaQuery(610)

  const handleRemoveSizeOption = (sizeItemId: number) => {
    const updatedOption = sizesOptions.map((item) =>
      item.id === sizeItemId ? { ...item, checked: false } : item
    )

    setSizesOptions(updatedOption)

    const updatedSizes = updatedOption
      .filter((item) => item.checked)
      .map((item) => item.size)

    setSizes(updatedSizes)
    handleApplyFiltersWithSizes(updatedSizes)
  }

  const handleRemoveColorOption = (colorItemId: number) => {
    const updatedOption = colorsOptions.map((item) =>
      item.id === colorItemId ? { ...item, checked: false } : item
    )

    setColorsOptions(updatedOption)

    const updatedColorsByText = updatedOption
      .filter((item) => item.checked)
      .map(({ colorText }) => colorText)

    const updatedColorsByCode = updatedOption
      .filter((item) => item.checked)
      .map(({ colorCode }) => colorCode)

    setColors(updatedColorsByText)
    handleApplyFiltersWithColors(updatedColorsByCode)
  }

  return (
    <div className={styles.catalog__filters}>
      <div className={styles.catalog__filters__top}>
        {!isMedia610 && (
          <>
            <div className={styles.catalog__filters__top__left}>
              <CategorySelect />
              {isMedia910 && (
                <SizesSelect
                  handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                />
              )}
              <PriceSelect
                handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
              />
            </div>
            {!isMedia910 && (
              <SizesSelect
                handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
              />
            )}
            <div className={styles.catalog__filters__top__right}>
              <ColorsSelect
                handleApplyFiltersWithColors={handleApplyFiltersWithColors}
              />
              <SortSelect handleApplyFiltersBySort={handleApplyFiltersBySort} />
            </div>
          </>
        )}
        {isMedia610 && (
          <>
            <SortSelect handleApplyFiltersBySort={handleApplyFiltersBySort} />
            <button
              className={`btn-reset ${styles.catalog__filters__top__filter_btn}`}
            />
          </>
        )}
      </div>
      <div className={styles.catalog__filters__bottom}>
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__filters__bottom__list}`}
        >
          {sizesOptions
            .filter((item) => item.checked)
            .map((item) => (
              <SelectInfoItem
                key={item.id}
                id={item.id}
                text={item.size}
                handleRemoveItem={handleRemoveSizeOption}
              />
            ))}

          {colorsOptions
            .filter((item) => item.checked)
            .map((item) => (
              <SelectInfoItem
                key={item.id}
                id={item.id}
                text={item.colorText}
                handleRemoveItem={handleRemoveColorOption}
              />
            ))}
        </motion.ul>
      </div>
    </div>
  )
}
