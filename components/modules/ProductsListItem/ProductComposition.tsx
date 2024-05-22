import { useLang } from '@/hooks/useLang'

import styles from '@/styles/products-list-item/index.module.scss'

export const ProductComposition = ({
  composition,
}: {
  composition: string
}) => {
  const { translations, lang } = useLang()

  return (
    <span className={styles.product__composition}>
      {translations[lang].product.composition}:{' '}
      {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
       * @ts-ignore */}
      {translations[lang].catalog[composition]}
    </span>
  )
}
