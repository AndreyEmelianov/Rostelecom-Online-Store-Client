import { IProduct } from './common'

export interface IAccordionProps {
  children: React.ReactNode
  title: string | JSX.Element
  titleClass: string
  rotateIconClass?: string
}

export interface IMenuLinkItemProps {
  item: {
    id: number
    text: string
    href: string
  }
  handleRedirectToCatalog: (arg0: string) => void
}

export interface ICatalogMenuButtonProps {
  name: string
  isActive: boolean
  handler: VoidFunction
}

export interface IProductsListItemProps {
  title?: string
  item: IProduct
}

export interface IProductLabelProps {
  isNew: boolean
  isBestseller: boolean
}

export interface IBreadcrumbsProps {
  getTextGenerator: (arg0: string, query: string[]) => void
  getDefaultTextGenerator: (arg0: string, href: string) => string
}

export interface ICrumbProps {
  href: string
  text: string
  last: boolean
  textGenerator: () => void
}

export interface IOrderInfoBlockProps {
  isOrderPage?: boolean
  isCorrectedPromotionalCode?: boolean
}

export interface IEmptyPageContentProps {
  btnText: string
  subtitle: string
  description: string
  bgClassName: string
  title?: string
  oopsWord?: string
  emptyWord?: string
  bgWordClassName?: string
}

export interface IContentTitleProps {
  title: string
  oopsWord: string
}
