'use client'

import { usePathname } from 'next/navigation'
import { useUnit } from 'effector-react'

import { useLang } from '@/hooks/useLang'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { Breadcrumbs } from '../modules/Breadcrumbs/Breadcrumbs'
import { HeadingWithCount } from '../elements/HeadingWithCount/HeadingWithCount'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  $comparison,
  $comparisonFromLS,
  $shouldShowEmptyPageComparison,
} from '@/context/comparison/state'
import { useComparisonLinks } from '@/hooks/useComparisonLinks'
import { ComparisonLinksList } from '../modules/Comparison/ComparisonLinksList'
import { EmptyPageContent } from '../modules/EmptyPageContent/EmptyPageContent'
import { Skeleton } from '../elements/Skeleton/Skeleton'
import { loginCheckFx } from '@/context/user'
import { isUserAuth } from '@/lib/utils/common'

import styles from '@/styles/comparison/index.module.scss'
import skeletonComparisonStyles from '@/styles/comparison-skeleton/index.module.scss'
import skeletonLinksStyles from '@/styles/comparison-links-skeleton/index.module.scss'
import skeletonListStyles from '@/styles/comparison-list-skeleton/index.module.scss'

export const ComparisonLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  const { lang, translations } = useLang()
  const { getTextGenerator, getDefaultTextGenerator } =
    useBreadcrumbs('comparison')

  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLS)
  const shouldShowEmptyPageComparison = useUnit($shouldShowEmptyPageComparison)

  const { linksSpinner, availableProductLinks } = useComparisonLinks()
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const mainSpinner = isUserAuth()
    ? linksSpinner || loginCheckSpinner
    : linksSpinner

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
              (mainSpinner ? (
                <Skeleton styles={skeletonLinksStyles} />
              ) : (
                <ComparisonLinksList
                  links={availableProductLinks}
                  className={styles.comparison_links}
                />
              ))}
            <div>
              {mainSpinner ? (
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
