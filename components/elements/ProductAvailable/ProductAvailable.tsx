import { useLang } from '@/hooks/useLang'
import { IProductAvailableProps } from '@/types/elements'

import styles from '@/styles/products-list-item/index.module.scss'

export const ProductAvailable = ({
  vendorCode,
  inStock,
}: IProductAvailableProps) => {
  const { translations, lang } = useLang()

  const isInStock = +inStock > 0

  return (
    <div className={styles.product}>
      <span
        className={`${styles.product__stock} ${isInStock ? styles.product__stock__green : styles.product__stock__red}`}
      >
        {inStock
          ? translations[lang].product.available
          : translations[lang].product.not_available}
      </span>
      <span className={styles.product__code}>
        {translations[lang].product.vendor_code}
        .: {vendorCode}
      </span>
    </div>
  )
}
