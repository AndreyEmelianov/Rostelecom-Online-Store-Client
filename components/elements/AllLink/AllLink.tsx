import Link from 'next/link'

import { useLang } from '@/hooks/useLang'

import styles from '@/styles/main-page/index.module.scss'

export const AllLink = ({ link }: { link?: string }) => {
  const { lang, translations } = useLang()

  return (
    <Link href={link || '/catalog'} className={styles.allLink}>
      <span />
      {translations[lang].common.all_link}
    </Link>
  )
}
