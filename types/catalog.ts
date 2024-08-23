export type SearchParams = { [key: string]: string | string[] | undefined }

export interface IProductsPage {
  searchParams: SearchParams
  pageName: string
}

export interface ICatalogCategoryOptions {
  rootCategoryOptions?: {
    id: number
    title: string
    href: string
  }[]
  clothCategoryOptions?: ICategoryOption[]
  accessoryCategoryOptions?: ICategoryOption[]
  officeCategoryOptions?: ICategoryOption[]
  souvenirsCategoryOptions?: ICategoryOption[]
}

export interface ICategoryOption {
  id: number
  title: string
  filterHandler: VoidFunction
}

export interface ICategoryFiltersListProps {
  option: string
  currentOptions: ICategoryOption[]
  allCategoriesTitle: string
  catalogCategoryOptions: ICatalogCategoryOptions
  setOption: (arg0: string) => void
  handleSelectAllCategories: VoidFunction
  mobileClassName?: string
}

export interface ISelectItemProps {
  item: ICategoryOption
  isActive: boolean
  setOption: (arg0: string) => void
  mobileClassName?: string
}

export interface ISelectBtnProps {
  open: boolean
  dynamicText: string
  defaultText: string
  toggleOpen: VoidFunction
  bgClassName?: string
}

export interface ICatalogFiltersProps {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
  handleApplyFiltersWithSizes: (arg0: string[]) => void
}

export interface ISizeOption {
  id: number
  size: string
  checked: boolean
}

export interface ICheckboxSelectItemProps {
  item: {
    id: number
    checked: boolean
    size?: string
    colorText?: string
  }
  callback: (arg0: number) => void
  mobileClassName?: string
}
