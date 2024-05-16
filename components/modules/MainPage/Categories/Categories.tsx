'use client'
import Image from 'next/image'
import Link from 'next/link'

import { AllLink } from '@/components/elements/AllLink/AllLink'
import { useImgPreloader } from '@/hooks/useImgPreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import categoryImg1 from '@/public/img/categories-img-1.png'
import categoryImg2 from '@/public/img/categories-img-2.png'
import categoryImg3 from '@/public/img/categories-img-3.png'
import categoryImg4 from '@/public/img/categories-img-4.png'
import styles from '@/styles/main-page/index.module.scss'

export const Categories = () => {
  const { lang, translations } = useLang()

  const { imgSpinner, handleLoadingImgComplete } = useImgPreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const isMedia490 = useMediaQuery(490)

  return (
    <section className={styles.categories}>
      <div className={`container ${styles.categories__container}`}>
        <h2 className={`section-site-title ${styles.categories__title}`}>
          {translations[lang].main_page.category_title}
        </h2>
        <div className={styles.categories__inner}>
          <AllLink />
          {!isMedia490 && (
            <>
              <Link
                href={'/catalog/cloth'}
                className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={categoryImg1}
                  alt='Cloth'
                  onLoad={handleLoadingImgComplete}
                  className='transition-opacity opacity-0 duration'
                />
                <span>{translations[lang].main_page.category_cloth}</span>
              </Link>

              <div className={styles.categories__left}>
                <div className={styles.categories__left__top}>
                  <Link
                    href={'/catalog/accessories'}
                    className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={categoryImg2}
                      alt='Accessories'
                      onLoad={handleLoadingImgComplete}
                      className='transition-opacity opacity-0 duration'
                    />
                    <span>
                      {translations[lang].main_page.category_accessories}
                    </span>
                  </Link>
                  <Link
                    href={'/catalog/souvenirs'}
                    className={`${styles.categories__left__top__left} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={categoryImg3}
                      alt='Souvenirs'
                      onLoad={handleLoadingImgComplete}
                      className='transition-opacity opacity-0 duration'
                    />
                    <span>
                      {translations[lang].main_page.category_souvenirs}
                    </span>
                  </Link>
                </div>
                <Link
                  href={'/catalog/office'}
                  className={`${styles.categories__left__bottom} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={categoryImg4}
                    alt='Office'
                    onLoad={handleLoadingImgComplete}
                    className='transition-opacity opacity-0 duration'
                  />
                  <span>{translations[lang].main_page.category_office}</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
