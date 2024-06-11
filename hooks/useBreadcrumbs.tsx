import { useCallback, useEffect } from 'react'

import { useBreadcrumbsText } from './useBreadcrumbsText'
import { usePageTitle } from './usePageTitle'

export const useBreadcrumbs = (page: string) => {
  const { breadcrumbText } = useBreadcrumbsText(page)
  usePageTitle(page)

  const getDefaultTextGenerator = useCallback(
    () => breadcrumbText,
    [breadcrumbText]
  )
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      lastCrumb.textContent = breadcrumbText
    }
  }, [breadcrumbText])

  return { getTextGenerator, getDefaultTextGenerator }
}
