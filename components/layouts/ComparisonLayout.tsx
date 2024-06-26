'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useUnit } from 'effector-react'

import { usePageTitle } from '@/hooks/usePageTitle'
import { useLang } from '@/hooks/useLang'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useBreadcrumbsText } from '@/hooks/useBreadcrumbsText'
import { Breadcrumbs } from '../modules/Breadcrumbs/Breadcrumbs'
import { HeadingWithCount } from '../elements/HeadingWithCount/HeadingWithCount'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  $comparison,
  $comparisonFromLS,
  $shouldShowEmptyPageComparison,
} from '@/context/comparison'
import { useComparisonLinks } from '@/hooks/useComparisonLinks'
import { ComparisonLinksList } from '../modules/Comparison/ComparisonLinksList'
import { EmptyPageContent } from '../modules/EmptyPageContent/EmptyPageContent'
import { Skeleton } from '../elements/Skeleton/Skeleton'

import styles from '@/styles/comparison/index.module.scss'
import skeletonComparisonStyles from '@/styles/comparison-skeleton/index.module.scss'
import skeletonLinksStyles from '@/styles/comparison-links-skeleton/index.module.scss'
import skeletonListStyles from '@/styles/comparison-list-skeleton/index.module.scss'

export const ComparisonLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [dynamicTitle, setDynamicTitle] = useState('')

  usePageTitle('comparison', dynamicTitle)

  const pathname = usePathname()
  const { lang, translations } = useLang()
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLS)

  const { linksSpinner, availableProductLinks } = useComparisonLinks()

  const shouldShowEmptyPageComparison = useUnit($shouldShowEmptyPageComparison)

  const { getTextGenerator, getDefaultTextGenerator } =
    useBreadcrumbs('comparison')
  const { breadcrumbText } = useBreadcrumbsText('comparison')
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const productTypePathname = pathname.split('/comparison/')[1]

      if (!productTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = breadcrumbText
        return
      }

      const text = (
        translations[lang].comparison as {
          [idex: string]: string
        }
      )[productTypePathname]
      setDynamicTitle(text)
      lastCrumb.textContent = text
    }
  }, [breadcrumbText, lang, pathname, translations, breadcrumbs])

  return (
    <main>
      {!shouldShowEmptyPageComparison ? (
        <section className={styles.comparison}>
          <Breadcrumbs
            getTextGenerator={getTextGenerator}
            getDefaultTextGenerator={getDefaultTextGenerator}
          />
          <div className='container'>
            <HeadingWithCount
              count={currentComparisonByAuth.length}
              title={translations[lang].comparison.main_heading}
              spinner={false}
            />
            {!(pathname === '/comparison') &&
              (linksSpinner ? (
                <Skeleton styles={skeletonLinksStyles} />
              ) : (
                <ComparisonLinksList
                  links={availableProductLinks}
                  className={styles.comparison_links}
                />
              ))}
            <div>
              {linksSpinner ? (
                pathname === '/comparison' ? (
                  <Skeleton styles={skeletonComparisonStyles} />
                ) : (
                  <Skeleton styles={skeletonListStyles} />
                )
              ) : (
                children
              )}
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              btnText={translations[lang].common.go_catalog}
              subtitle={translations[lang].common.comparison_empty}
              description={translations[lang].common.comparison_empty_advice}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}
