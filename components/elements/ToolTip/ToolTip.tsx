import styles from '@/styles/tooltip/index.module.scss'

export const ToolTip = ({ text }: { text: string }) => (
  <div className={styles.tooltip__inner}>
    <span className={styles.tooltip__text}>{text}</span>
  </div>
)
