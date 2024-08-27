import Slider from 'react-slick'
import { useUnit } from 'effector-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ProductImagesItem } from './ProductImagesItem'
import { useProductImages } from '@/hooks/useProductImages'
import { $currentProduct } from '@/context/goods'

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

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    autoplay: true,
    arrows: false,
  }

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
        <Slider {...settings} className={styles.product__top__images__slider}>
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
