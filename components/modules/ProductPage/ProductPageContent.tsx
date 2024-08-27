import { useLang } from '@/hooks/useLang'
import { ProductImages } from './ProductImages'

import styles from '@/styles/product/index.module.scss'

export const ProductPageContent = () => {
  const { lang, translations } = useLang()

  return (
    <div className={styles.product__top}>
      <ProductImages />
    </div>
  )
}
