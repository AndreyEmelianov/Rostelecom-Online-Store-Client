import { AnimatePresence, motion } from 'framer-motion'

import { IComparisonItem } from '@/types/comparison'
import { ComparisonItem } from './ComparisonItem'
import { basePropsForMotion } from '@/constants/motion'

import styles from '@/styles/comparison/index.module.scss'

export const ComparisonList = ({ items }: { items: IComparisonItem[] }) => (
  <>
    {items.length ? (
      <motion.ul
        {...basePropsForMotion}
        className={`list-reset ${styles.comparison__list}`}
      >
        <AnimatePresence>
          {items.map((item) => (
            <ComparisonItem key={item._id || item.clientId} item={item} />
          ))}
        </AnimatePresence>
      </motion.ul>
    ) : (
      <div className={styles.comparison_main_links__empty} />
    )}
  </>
)
