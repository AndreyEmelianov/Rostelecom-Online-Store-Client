import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { SelectBtn } from './SelectBtn'
import { basePropsForMotion } from '@/constants/motion'
import { SelectItem } from './SelectItem'
import { getSearchParamsUrl } from '@/lib/utils/common'

import styles from '@/styles/catalog/index.module.scss'

export const SortSelect = ({
  handleApplyFiltersBySort,
}: {
  handleApplyFiltersBySort: (arg0: string) => void
}) => {
  const [option, setOption] = useState('')
  const { lang, translations } = useLang()

  const { open, ref, toggleOpen } = useClickOutside()

  const sortOptions = [
    {
      id: 1,
      title: translations[lang].catalog.popular,
      filterHandler: () => handleApplyFiltersBySort('popular'),
    },
    {
      id: 2,
      title: translations[lang].catalog.new,
      filterHandler: () => handleApplyFiltersBySort('new'),
    },
    {
      id: 3,
      title: translations[lang].catalog.cheap_first,
      filterHandler: () => handleApplyFiltersBySort('cheap_first'),
    },
    {
      id: 4,
      title: translations[lang].catalog.expensive_first,
      filterHandler: () => handleApplyFiltersBySort('expensive_first'),
    },
  ]

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sortParam = urlParams.get('sort')

    if (sortParam) {
      const paramOption = (
        translations[lang].catalog as {
          [index: string]: string
        }
      )[sortParam]

      if (paramOption) {
        setOption(paramOption)
        handleApplyFiltersBySort(sortParam)
      }
    }
  }, [lang])

  return (
    <div
      className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggleOpen={toggleOpen}
        defaultText={translations[lang].catalog.sort}
        dynamicText={option}
        bgClassName={styles.bg_sort}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            {sortOptions.map((sortOption) => (
              <SelectItem
                key={sortOption.id}
                item={sortOption}
                isActive={sortOption.title === option}
                setOption={setOption}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
