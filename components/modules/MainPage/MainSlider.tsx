import Image, { StaticImageData } from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'
import Slider from 'react-slick'

import { useImgPreloader } from '@/hooks/useImgPreloader'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import styles from '@/styles/main-page/index.module.scss'

export const MainSlider = ({
  images,
}: {
  images: { src: StaticImageData; id: number; title: string }[]
}) => {
  const { handleLoadingImgComplete, imgSpinner } = useImgPreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const isMedia420 = useMediaQuery(420)

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    slidesToScroll: 1,
    speed: 500,
  }

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.categories__slider}`)

    slider.forEach((slide) => {
      const list = slide.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia420 ? '290px' : '357px'
      list.style.marginRight = '-15px'
    })
  }, [isMedia420])

  return (
    <Slider {...settings} className={styles.categories__slider}>
      {images.map((img) => (
        <Link
          href={'/catalog'}
          key={img.id}
          style={{ width: isMedia420 ? 290 : 357 }}
          className={`${styles.categories__slide} ${styles.categories__img} ${imgSpinnerClass}`}
        >
          <Image
            src={img.src}
            alt={img.title}
            width={357}
            height={357}
            onLoad={handleLoadingImgComplete}
          />
          <span>{img.title.replace(/\s/g, '\u00A0')}</span>
        </Link>
      ))}
    </Slider>
  )
}
