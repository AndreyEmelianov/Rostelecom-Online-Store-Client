import { useLang } from './useLang'

export const useBreadcrumbsText = (initialText: string) => {
  const { lang, translations } = useLang()

  const breadcrumbText = (
    translations[lang].breadcrumbs as {
      [index: string]: string
    }
  )[initialText]

  return { breadcrumbText }
}
