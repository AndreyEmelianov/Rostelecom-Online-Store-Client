import { AnimatePresence, motion } from 'framer-motion'

import { $favorites, $favoritesFromLS } from '@/context/favorites/state'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { basePropsForMotion } from '@/constants/motion'
import { FavoritesListItem } from './FavoritesListItem'

import styles from '@/styles/favorites/index.module.scss'

export const FavoritesList = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  return (
    <AnimatePresence>
      {currentFavoritesByAuth.map((item) => (
        <motion.li
          {...basePropsForMotion}
          key={item._id || item.clientId}
          className={styles.favorites__list__item}
        >
          <FavoritesListItem item={item} />
        </motion.li>
      ))}
    </AnimatePresence>
  )
}
