import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { getComparisonItemsFx } from '@/context/comparison'
import { useGoodsByAuth } from './useGoodsByAuth'
import { useLang } from './useLang'
import { $comparison, $comparisonFromLS } from '@/context/comparison/state'

export const useComparisonLinks = () => {
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLS)

  const spinner = useUnit(getComparisonItemsFx.pending)

  const { lang, translations } = useLang()

  const pathname = usePathname()

  const availableProductLinks = useMemo(
    () =>
      [
        ...new Set(
          currentComparisonByAuth.map((item) => item.characteristics.type)
        ),
      ].map((type) => ({
        title: (translations[lang].comparison as { [index: string]: string })[
          type
        ],
        href: `/comparison/${type}`,
        itemsCount: currentComparisonByAuth.filter(
          (item) => item.characteristics.type === type
        ).length,
        isActive: pathname.split('/comparison/')[1] === type,
      })),
    [currentComparisonByAuth, lang, pathname, translations]
  )

  return { availableProductLinks, linksSpinner: spinner }
}
