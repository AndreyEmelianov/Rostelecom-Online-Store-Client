import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'

import { useLang } from '@/hooks/useLang'
import { IBreadcrumbsProps } from '@/types/modules'
import { Crumb } from './Crumb'

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0]

  return pathWithoutQuery.split('/').filter((i) => i.length > 0)
}

export const Breadcrumbs = ({
  getTextGenerator,
  getDefaultTextGenerator,
}: IBreadcrumbsProps) => {
  const { lang, translations } = useLang()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(pathname)
      const pathnameNestedRoutes = generatePathParts(pathname)

      const crumbList = asPathNestedRoutes.map((subpath, index) => {
        const param = pathnameNestedRoutes[index]
          .replace('[', '')
          .replace(']', '')

        const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/')

        return {
          href,
          textGenerator: getTextGenerator(param, searchParams.getAll('')),
          text: getDefaultTextGenerator(subpath, href),
        }
      })

      return [...crumbList]
    },
    [lang, pathname, searchParams, getTextGenerator, getDefaultTextGenerator]
  )

  return (
    <div className='container breadcrumbs__container'>
      <ul className='list-reset breadcrumbs'>
        <li className='breadcrumbs__item'>
          <Link href={'/'} className='breadcrumbs__item__link first-crumb'>
            {translations[lang].breadcrumbs.main}
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) =>
          crumb.text ? (
            <li key={index} className='breadcrumbs__item'>
              {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
               * @ts-ignore */}
              <Crumb
                key={index}
                {...crumb}
                last={index === breadcrumbs.length - 1}
              />
              {console.log(crumb)}
            </li>
          ) : (
            ''
          )
        )}
      </ul>
    </div>
  )
}
