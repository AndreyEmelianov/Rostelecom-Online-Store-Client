import Link from 'next/link'

import { useLang } from '@/hooks/useLang'

import styles from '@/styles/main-page/index.module.scss'

export const AllLink = () => {
  const { lang, translations } = useLang()

  return (
    <Link href={'/catalog'} className={styles.allLink}>
      <span />
      {translations[lang].common.all_link}
    </Link>
  )
}
