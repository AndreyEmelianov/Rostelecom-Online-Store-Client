import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { useLang } from '@/hooks/useLang'
import { usePriceFilter } from '@/hooks/usePriceFilter'
import {
  getCheckedValidPriceFrom,
  getCheckedValidPriceTo,
} from '@/lib/utils/catalog'

import styles from '@/styles/catalog/index.module.scss'

export const PriceFilter = ({
  handleApplyFiltersWithPrice,
}: {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
}) => {
  const { lang, translations } = useLang()

  const delayCallback = useDebounceCallback(1000)

  const {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter()

  const onPriceFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePriceFrom(event)

    if (!priceTo) {
      return
    }

    const validPriceFrom = getCheckedValidPriceFrom(
      +event.target.value.replace(/[^0-9]+/g, '')
    ) as string
    const validPriceTo = getCheckedValidPriceTo(+priceTo) as string

    setPriceFrom(validPriceFrom)
    delayCallback(() =>
      handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
    )
  }

  const onPriceToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePriceTo(event)

    if (!priceFrom) {
      return
    }

    const validPriceTo = getCheckedValidPriceTo(
      +event.target.value.replace(/[^0-9]+/g, '')
    ) as string
    const validPriceFrom = getCheckedValidPriceFrom(+priceFrom) as string

    setPriceTo(validPriceTo)
    delayCallback(() =>
      handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
    )
  }

  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        {translations[lang].catalog.price}
      </h3>
      <div
        className={`${styles.catalog__filters__list__item__inputs} ${styles.catalog__filters__popup__price__inputs}`}
      >
        <label>
          <span>{translations[lang].catalog.from}</span>
          <input
            type='text'
            placeholder='99 ₽'
            value={priceFrom}
            onChange={onPriceFromChange}
          />
        </label>
        <label>
          <span>{translations[lang].catalog.to}</span>
          <input
            type='text'
            placeholder='9999 ₽'
            value={priceTo}
            onChange={onPriceToChange}
          />
        </label>
      </div>
    </>
  )
}
