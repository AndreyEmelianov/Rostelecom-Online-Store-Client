'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { EffectCoverflow } from 'swiper/modules'

import { useLang } from '@/hooks/useLang'
import { HeroSlide } from './HeroSlide'
import { ProductSubtitle } from '@/components/elements/ProductSubtitle/ProductSubtitle'

import shirtImg1 from '@/public/img/black-t.png'
import shirtImg2 from '@/public/img/orange-t.png'
import shirtImg3 from '@/public/img/violet-t.png'
import styles from '@/styles/main-page/index.module.scss'
import stylesAd from '@/styles/ad/index.module.scss'
import productSubtitleStyles from '@/styles/product-subtitle/index.module.scss'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

export const Hero = () => {
  const { lang, translations } = useLang()

  const slides = [
    {
      id: 1,
      title: `${translations[lang].main_page.tShirt} «Line» ${translations[lang].main_page.black}`,
      image: shirtImg1,
    },
    {
      id: 2,
      title: `${translations[lang].main_page.tShirt} «Line» ${translations[lang].main_page.orange}`,
      image: shirtImg2,
    },
    {
      id: 3,
      title: `${translations[lang].main_page.tShirt} «Line» ${translations[lang].main_page.violet}`,
      image: shirtImg3,
    },
  ]

  const handleSlideClick = (event: SwiperType) =>
    event.slideTo(event.clickedIndex)

  return (
    <section className={styles.hero}>
      <h1 className='visually-hidden'>
        {translations[lang].main_page.hero_hidden_title}
      </h1>
      <div className={`container ${styles.hero__container}`}>
        <span className={stylesAd.ad}>{translations[lang].common.ad}</span>
        <Swiper
          className={styles.hero__slider}
          effect='coverflow'
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          slidesPerView='auto'
          initialSlide={2}
          autoplay
          loop
          onClick={handleSlideClick}
          modules={[EffectCoverflow]}
          grabCursor
          centeredSlides
        >
          {slides.map((slide) => (
            <SwiperSlide className={styles.hero__slider__slide} key={slide.id}>
              <HeroSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ProductSubtitle
          subtitleClassName={productSubtitleStyles.product_subtitle__subtitle}
          subtitleRectClassName={
            productSubtitleStyles.product_subtitle__subtitle__rect
          }
        />
        <h2 className={styles.hero__title}>
          <span
            className={`${styles.hero__title__subtitle} ${lang === 'ru' ? '' : styles.hero__title__subtitle_lang}`}
          >
            {translations[lang].main_page.hero_subtitle}
          </span>
          <span className={styles.hero__title__text}>
            {translations[lang].main_page.hero_title}
          </span>
        </h2>
      </div>
    </section>
  )
}
