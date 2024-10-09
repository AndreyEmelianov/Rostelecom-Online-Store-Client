import Slider from 'react-slick'
import { useUnit } from 'effector-react'

import { ProductImagesItem } from './ProductImagesItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useProductImages } from '@/hooks/useProductImages'
import { $currentProduct } from '@/context/goods/state'
import { baseSliderSettings } from '@/constants/slider'

import styles from '@/styles/product/index.module.scss'

export const ProductImages = () => {
  const currentProduct = useUnit($currentProduct)

  const images = useProductImages(currentProduct)

  const isMedia1420 = useMediaQuery(1420)
  const isMedia1040 = useMediaQuery(1040)
  const isMedia520 = useMediaQuery(520)
  const isMedia420 = useMediaQuery(420)

  const imgSize = isMedia1040 ? 230 : isMedia1420 ? 280 : 480
  const slideImgSize = isMedia420 ? 280 : 432

  return (
    <>
      {!isMedia520 && (
        <ul className={`list-reset ${styles.product__top__images}`}>
          {images.map((image) => (
            <ProductImagesItem key={image.id} image={image} imgSize={imgSize} />
          ))}
        </ul>
      )}
      {isMedia520 && (
        <Slider
          {...baseSliderSettings}
          className={styles.product__top__images__slider}
        >
          {images.map((image) => (
            <ProductImagesItem
              key={image.id}
              image={image}
              imgSize={slideImgSize}
            />
          ))}
        </Slider>
      )}
    </>
  )
}
