import { createDomain } from 'effector'

const modals = createDomain()

export const openMenu = modals.createEvent()
export const closeMenu = modals.createEvent()

export const openCatalogMenu = modals.createEvent()
export const closeCatalogMenu = modals.createEvent()

export const openSearchModal = modals.createEvent()
export const closeSearchModal = modals.createEvent()

export const openQuickViewModal = modals.createEvent()
export const closeQuickViewModal = modals.createEvent()

export const openSizeTable = modals.createEvent()
export const closeSizeTable = modals.createEvent()

export const $menuIsOpen = modals
  .createStore(false)
  .on(openMenu, () => true)
  .on(closeMenu, () => false)

export const $catalogMenuIsOpen = modals
  .createStore(false)
  .on(openCatalogMenu, () => true)
  .on(closeCatalogMenu, () => false)

export const $searchModalIsOpen = modals
  .createStore(false)
  .on(openSearchModal, () => true)
  .on(closeSearchModal, () => false)

export const $quickViewModalIsOpen = modals
  .createStore(false)
  .on(openQuickViewModal, () => true)
  .on(closeQuickViewModal, () => false)

export const $sizeTableIsOpen = modals
  .createStore(false)
  .on(openSizeTable, () => true)
  .on(closeSizeTable, () => false)
