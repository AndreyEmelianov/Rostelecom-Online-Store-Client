import { useLang } from '@/hooks/useLang'
import { IProductSubtitleProps } from '@/types/elements'

import styles from '@/styles/productSubtitle/index.module.scss'

export const ProductSubtitle = ({
  subtitleClassName,
  subtitleRectClassName,
}: IProductSubtitleProps) => {
  const { lang, translations } = useLang()
  const descriptionSlicePosition = lang === 'ru' ? 5 : 2

  return (
    <div
      className={`${styles.product_subtitle__subtitle} ${subtitleClassName}`}
    >
      <div
        className={`${styles.product_subtitle__subtitle__rect} ${subtitleRectClassName}`}
      />
      <span>
        {translations[lang].main_page.hero_description.slice(
          0,
          descriptionSlicePosition
        )}
      </span>
      <br />
      <span>
        {translations[lang].main_page.hero_description.slice(
          descriptionSlicePosition
        )}
      </span>
    </div>
  )
}
