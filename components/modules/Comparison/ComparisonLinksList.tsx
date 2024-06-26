import { motion } from 'framer-motion'
import Link from 'next/link'

import { IComparisonLinksListProps } from '@/types/comparison'
import { basePropsForMotion } from '@/constants/motion'

import styles from '@/styles/comparison/index.module.scss'

export const ComparisonLinksList = ({
  links,
  className,
}: IComparisonLinksListProps) => (
  <motion.ul {...basePropsForMotion} className={`list-reset ${className}`}>
    {links.map((link) => (
      <li key={link.title} className={`${link.isActive ? styles.active : ''}`}>
        <Link href={link.href}>
          <span>{link.title}</span>
          <span>{link.itemsCount}</span>
        </Link>
      </li>
    ))}
  </motion.ul>
)
