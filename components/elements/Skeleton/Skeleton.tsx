import { motion } from 'framer-motion'

import { basePropsForMotion } from '@/constants/motion'
import { ISkeletonProps } from '@/types/elements'

export const Skeleton = ({ styles, count = 4 }: ISkeletonProps) => (
  <motion.ul {...basePropsForMotion} className={`list-rest ${styles.skeleton}`}>
    {Array.from(new Array(count)).map((_, index) => (
      <li key={index} className={styles.skeleton__item}>
        <div className={styles.skeleton__item__light} />
      </li>
    ))}
  </motion.ul>
)
