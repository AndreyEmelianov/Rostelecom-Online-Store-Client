import Link from 'next/link'
import Image from 'next/image'

import { IHeroSlide } from '@/types/main-page'
import { HeroSlideTooltip } from './HeroSlideTooltip'

import styles from '@/styles/main-page/index.module.scss'

export const HeroSlide = ({ slide }: { slide: IHeroSlide }) => (
  <>
    <Link href='/catalog' className='hero-slide-plus' />
    <Image
      src={slide.image}
      alt={slide.title}
      className={styles.hero__slider__slide__img}
      loading='eager'
    />
    <HeroSlideTooltip title={slide.title} image={slide.image} />
  </>
)
