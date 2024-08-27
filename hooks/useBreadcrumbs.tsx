import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useBreadcrumbsText } from './useBreadcrumbsText'
import { usePageTitle } from './usePageTitle'
import { useLang } from './useLang'

export const useBreadcrumbs = (page: string) => {
  const [dynamicTitle, setDynamicTitle] = useState('')

  usePageTitle(page, dynamicTitle)

  const pathname = usePathname()
  const { lang, translations } = useLang()

  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement
  const { breadcrumbText } = useBreadcrumbsText(page)

  const getDefaultTextGenerator = useCallback(
    () => breadcrumbText,
    [breadcrumbText]
  )
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const productTypePathname = pathname.split(`/${page}/`)[1]

      if (!productTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = breadcrumbText
        return
      }

      const text = (
        translations[lang][
          page === 'comparison' ? 'comparison' : 'breadcrumbs'
        ] as {
          [idex: string]: string
        }
      )[productTypePathname]
      setDynamicTitle(text)
      lastCrumb.textContent = text
    }
  }, [breadcrumbText, lang, pathname, translations, breadcrumbs, page])

  return { breadcrumbs, getTextGenerator, getDefaultTextGenerator }
}
