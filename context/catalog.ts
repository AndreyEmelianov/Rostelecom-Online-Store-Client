import { createDomain } from 'effector'

import { ICatalogCategoryOptions, ISizeOption } from '@/types/catalog'

const catalog = createDomain()

export const setCatalogCategoryOptions =
  catalog.createEvent<Partial<ICatalogCategoryOptions>>()

export const setSizesOptions = catalog.createEvent<ISizeOption[]>()
export const updateSizesOptionBySize = catalog.createEvent<string>()
export const setSizes = catalog.createEvent<string[]>()

export const $catalogCategoryOptions = catalog
  .createStore<ICatalogCategoryOptions>({})
  .on(setCatalogCategoryOptions, (_, options) => ({ ...options }))

export const $sizesOptions = catalog
  .createStore<ISizeOption[]>([
    { id: 1, size: 'S', checked: false },
    { id: 2, size: 'M', checked: false },
    { id: 3, size: 'L', checked: false },
    { id: 4, size: 'XL', checked: false },
    { id: 5, size: 'XXL', checked: false },
  ])
  .on(setSizesOptions, (_, options) => options)
  .on(updateSizesOptionBySize, (state, size) =>
    state.map((item) =>
      item.size === size ? { ...item, checked: true } : item
    )
  )

export const $sizes = catalog
  .createStore<string[]>([])
  .on(setSizes, (_, sizes) => sizes)
