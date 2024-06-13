'use client'
import { EmptyPageContent } from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { useLang } from '@/hooks/useLang'

import styles from '@/styles/not-found/index.module.scss'

const NotFound = () => {
  const { lang, translations } = useLang()

  return (
    <main>
      <section className={styles.not_found}>
        <div className='container'>
          <EmptyPageContent
            btnText={translations[lang].common.go_shopping}
            subtitle={translations[lang].common.not_found_subtitle}
            description={translations[lang].common.not_found_description}
            title={translations[lang].common.not_found_title}
            oopsWord={translations[lang].common.ops}
            emptyWord={translations[lang].common.not_found_bg}
            bgClassName={styles.empty_bg}
            bgWordClassName={styles.not_found_bg}
          />
        </div>
      </section>
    </main>
  )
}

export default NotFound
