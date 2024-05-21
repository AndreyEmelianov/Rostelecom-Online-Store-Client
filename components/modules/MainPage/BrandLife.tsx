import Link from 'next/link'
import Image from 'next/image'

import { AllLink } from '@/components/elements/AllLink/AllLink'
import { useImgPreloader } from '@/hooks/useImgPreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MainSlider } from './MainSlider'

import brandLifeImg1 from '@/public/img/brands-life.png'
import brandLifeImg2 from '@/public/img/categories-img-1.png'
import brandLifeImg3 from '@/public/img/categories-img-3.png'
import styles from '@/styles/main-page/index.module.scss'

export const BrandLife = () => {
  const { lang, translations } = useLang()

  const { imgSpinner, handleLoadingImgComplete } = useImgPreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const isMedia490 = useMediaQuery(490)

  const textWithNonBreakingSpace = (text: string) =>
    text.replace(/\s/g, '\u00A0')

  const images = [
    {
      src: brandLifeImg1,
      id: 1,
      title: translations[lang].main_page.brand_nature,
    },
    {
      src: brandLifeImg2,
      id: 2,
      title: translations[lang].main_page.brand_look,
    },
    {
      src: brandLifeImg3,
      id: 3,
      title: translations[lang].main_page.brand_idea,
    },
  ]

  return (
    <section className={styles.brands}>
      <div className={`container ${styles.brands__container}`}>
        <h2 className={`section-site-title ${styles.brands__title}`}>
          {translations[lang].main_page.brand_title}
        </h2>
        <div className={styles.brands__inner}>
          <AllLink />
        </div>
        {!isMedia490 && (
          <ul className={`list-reset ${styles.brands__list}`}>
            <li className={`${styles.brands__list__item}`}>
              <Link
                href='/'
                className={`${styles.brands__list__item__link} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={brandLifeImg1}
                  alt={translations[lang].main_page.brand_nature}
                  onLoad={handleLoadingImgComplete}
                  className='transition-opacity opacity-0 duration'
                />
                <span>
                  {textWithNonBreakingSpace(
                    translations[lang].main_page.brand_nature
                  )}
                </span>
              </Link>
            </li>
            <li className={`${styles.brands__list__item}`}>
              <Link
                href='/'
                className={`${styles.brands__list__item__link} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={brandLifeImg2}
                  alt={translations[lang].main_page.brand_look}
                  onLoad={handleLoadingImgComplete}
                  className={`transition-opacity opacity-0 duration`}
                />
                <span>
                  {textWithNonBreakingSpace(
                    translations[lang].main_page.brand_look
                  )}
                </span>
              </Link>
            </li>
            <li className={`${styles.brands__list__item}`}>
              <Link
                href='/'
                className={`${styles.brands__list__item__link} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={brandLifeImg3}
                  alt={translations[lang].main_page.brand_idea}
                  onLoad={handleLoadingImgComplete}
                  className={`transition-opacity opacity-0 duration`}
                />
                <span>
                  {textWithNonBreakingSpace(
                    translations[lang].main_page.brand_idea
                  )}
                </span>
              </Link>
            </li>
          </ul>
        )}
        {isMedia490 && <MainSlider images={images} />}
      </div>
    </section>
  )
}
