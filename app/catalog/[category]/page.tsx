import { notFound } from 'next/navigation'

import { productCategories } from '@/constants/product'
import { ProductsPage } from '@/components/templates/ProductsPage/ProductsPage'
import { SearchParams } from '@/types/catalog'

export default function Category({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: SearchParams
}) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  return (
    <ProductsPage
      searchParams={searchParams || {}}
      pageName={params.category}
    />
  )
}
