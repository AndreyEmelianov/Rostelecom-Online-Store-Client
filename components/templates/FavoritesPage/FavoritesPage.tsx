'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'

import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import {
  $favorites,
  $favoritesFromLS,
  $shouldShowEmptyPageFavorites,
  getFavoriteItemsFx,
} from '@/context/favorites'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useLang } from '@/hooks/useLang'
import { HeadingWithCount } from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { EmptyPageContent } from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { basePropsForMotion } from '@/constants/motion'
import { FavoritesList } from '@/components/modules/FavoritesPage/FavoritesList'

import styles from '@/styles/favorites/index.module.scss'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'

export const FavoritesPage = () => {
  const shouldShowEmptyPageFavorites = useUnit($shouldShowEmptyPageFavorites)
  const favoritesSpinner = useUnit(getFavoriteItemsFx.pending)

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const { lang, translations } = useLang()

  const { getTextGenerator, getDefaultTextGenerator } =
    useBreadcrumbs('favorites')

  return (
    <main>
      <Breadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={getDefaultTextGenerator}
      />
      {!shouldShowEmptyPageFavorites ? (
        <section className={styles.favorites}>
          <div className={`container ${styles.favorites__container}`}>
            <HeadingWithCount
              count={currentFavoritesByAuth.length}
              title={translations[lang].breadcrumbs.favorites}
              spinner={favoritesSpinner}
            />

            {favoritesSpinner && (
              <motion.ul
                {...basePropsForMotion}
                className={cartSkeletonStyles.skeleton}
              >
                {Array.from(new Array(3)).map((_, index) => (
                  <li key={index} className={cartSkeletonStyles.skeleton__item}>
                    <div className={cartSkeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </motion.ul>
            )}
            {!favoritesSpinner && (
              <motion.ul
                {...basePropsForMotion}
                className={`list-reset ${styles.favorites__list}`}
              >
                <FavoritesList />
              </motion.ul>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              btnText={translations[lang].common.go_catalog}
              subtitle={translations[lang].common.favorites_empty}
              description={translations[lang].common.favorites_empty_advice}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}
