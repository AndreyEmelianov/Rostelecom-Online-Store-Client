import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import Slider from 'react-slick'

import { loadViewedProductsFx } from '@/context/goods'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { basePropsForMotion } from '@/constants/motion'
import { AllLink } from '@/components/elements/AllLink/AllLink'
import { ProductsListItem } from '../ProductsListItem/ProductsListItem'
import { IProducts } from '@/types/goods'

import styles from '@/styles/viewed-products/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

export const ViewedProducts = ({
  viewedProducts,
}: {
  viewedProducts: IProducts
}) => {
  const spinner = useUnit(loadViewedProductsFx.pending)

  const { lang, translations } = useLang()

  const isMedia430 = useMediaQuery(430)
  const isMedia370 = useMediaQuery(370)

  const settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 1000,
    autoplay: false,
    arrows: false,
  }

  return (
    <div className={styles.viewed}>
      <h2 className={styles.viewed__title}>
        {translations[lang].product.watched}
      </h2>
      <div className={styles.viewed__inner}>
        <AllLink link='/viewed-products' />
        <Slider {...settings} className={styles.viewed__slider}>
          {spinner ? (
            <motion.ul
              className={skeletonStyles.skeleton}
              {...basePropsForMotion}
            >
              {Array.from(new Array(4)).map((_, i) => (
                <li key={i} className={skeletonStyles.skeleton__item}>
                  <div className={skeletonStyles.skeleton__item__light} />
                </li>
              ))}
            </motion.ul>
          ) : (
            (viewedProducts.items || []).map((item) => (
              <div
                key={item._id}
                className={styles.viewed__slide}
                style={{ width: isMedia370 ? 240 : isMedia430 ? 280 : 350 }}
              >
                <ProductsListItem item={item} />
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  )
}
