'use client'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { Breadcrumbs } from '../modules/Breadcrumbs/Breadcrumbs'

import styles from '@/styles/catalog/index.module.scss'

export const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  const { getTextGenerator, getDefaultTextGenerator } =
    useBreadcrumbs('catalog')

  return (
    <main>
      <Breadcrumbs
        getTextGenerator={getTextGenerator}
        getDefaultTextGenerator={getDefaultTextGenerator}
      />
      <section className={styles.catalog}>
        <div className='container'>{children}</div>
      </section>
    </main>
  )
}
