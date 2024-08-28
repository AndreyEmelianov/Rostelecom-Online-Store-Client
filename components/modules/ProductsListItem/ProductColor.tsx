import { useLang } from '@/hooks/useLang'
import { IProductColorProps } from '@/types/modules'

import styles from '@/styles/products-list-item/index.module.scss'

export const ProductColor = ({ color, className }: IProductColorProps) => {
  const { translations, lang } = useLang()

  return (
    <span className={`${styles.product__color} ${className || ''}`}>
      <span>{translations[lang].catalog.color}:</span>{' '}
      {(translations[lang].catalog as { [index: string]: string })[color]}
    </span>
  )
}
