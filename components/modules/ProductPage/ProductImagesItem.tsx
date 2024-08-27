import Image from 'next/image'

import { IProductImagesItemProps } from '@/types/product'
import { useImgPreloader } from '@/hooks/useImgPreloader'

import styles from '@/styles/product/index.module.scss'

export const ProductImagesItem = ({
  image,
  imgSize,
}: IProductImagesItemProps) => {
  const { imgSpinner, handleLoadingImgComplete } = useImgPreloader()

  return (
    <li
      className={`${styles.product__top__images__item} ${imgSpinner ? styles.img_loading : ''}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={imgSize}
        height={imgSize}
        onLoad={handleLoadingImgComplete}
        className='transition-opacity opacity-0 duration'
      />
    </li>
  )
}
