import { useLang } from '@/hooks/useLang'

import styles from '@/styles/products-list-item/index.module.scss'

export const ProductColor = ({ color }: { color: string }) => {
  const { translations, lang } = useLang()

  return (
    <span className={`${styles.product__color} `}>
      <span>{translations[lang].catalog.color}:</span>{' '}
      {(translations[lang].catalog as { [index: string]: string })[color]}
    </span>
  )
}
