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
