import { IContentTitleProps } from '@/types/modules'

import styles from '@/styles/empty-content/index.module.scss'

export const ContentTitle = ({ title, oopsWord }: IContentTitleProps) => (
  <div className={styles.empty_content__title}>
    <span>{oopsWord}</span>
    <span>{title}</span>
  </div>
)
