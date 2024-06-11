/* eslint-disable indent */
import { useEffect } from 'react'

import { useLang } from './useLang'

export const usePageTitle = (page: string, additionalText = '') => {
  const { lang, translations } = useLang()

  useEffect(() => {
    document.title = `${lang === 'ru' ? 'Ростелеком стор' : 'Rostelecom store'} | 
    ${
      (translations[lang].breadcrumbs as { [index: string]: string })[page]
    }${additionalText ? ` - ${additionalText}` : ''}`
  }, [page, lang, additionalText, translations])

  return <div>usePageTitle</div>
}
