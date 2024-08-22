import { AnimatePresence, motion } from 'framer-motion'

import { useClickOutside } from '@/hooks/useClickOutside'
import { usePriceFilter } from '@/hooks/usePriceFilter'
import { SelectBtn } from './SelectBtn'
import { useLang } from '@/hooks/useLang'
import { basePropsForMotion } from '@/constants/motion'

import styles from '@/styles/catalog/index.module.scss'

export const PriceSelect = ({
  handleApplyFiltersWithPrice,
}: {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
}) => {
  const { lang, translations } = useLang()

  const { open, ref, setOpen, toggleOpen } = useClickOutside()

  const {
    priceFrom,
    priceTo,
    priceInfo,
    setPriceFrom,
    setPriceTo,
    setPriceInfo,
    priceFromInfo,
    priceToInfo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter()

  const handleSelectPrice = () => {
    const validPriceFrom = +priceFrom > 10000 ? '5000' : priceFrom
    const validPriceTo = +priceTo > 10000 ? '10000' : priceTo

    setPriceFrom(validPriceFrom)
    setPriceTo(validPriceTo)
    setPriceInfo(
      `${priceFromInfo(validPriceFrom)} ${priceToInfo(validPriceTo)}`
    )

    setOpen(false)
    handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
  }

  return (
    <div ref={ref} className={styles.catalog__filters__select}>
      <SelectBtn
        open={open}
        dynamicText={priceInfo}
        defaultText={translations[lang].catalog.price}
        toggleOpen={toggleOpen}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            <li
              className={`${styles.catalog__filters__list__item} ${styles.catalog__filters__list__item__price}`}
            >
              <div className={styles.catalog__filters__list__item__inputs}>
                <label>
                  <span>{translations[lang].catalog.from}</span>
                  <input
                    type='text'
                    placeholder='120 ₽'
                    value={priceFrom}
                    onChange={handleChangePriceFrom}
                  />
                </label>

                <label>
                  <span>{translations[lang].catalog.to}</span>
                  <input
                    type='text'
                    placeholder='8999 ₽'
                    value={priceTo}
                    onChange={handleChangePriceTo}
                  />
                </label>
              </div>
              <button
                disabled={!priceFrom || !priceTo}
                onClick={handleSelectPrice}
                className={`btn-reset ${styles.catalog__filters__list__item__done}`}
              >
                {translations[lang].catalog.done}
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
