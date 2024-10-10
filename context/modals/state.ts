'use client'

import {
  modals,
  openMenu,
  closeMenu,
  openCatalogMenu,
  closeCatalogMenu,
  openSearchModal,
  closeSearchModal,
  openQuickViewModal,
  closeQuickViewModal,
  openSizeTable,
  closeSizeTable,
  openShareModal,
  closeShareModal,
} from '.'

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

export const $shareModal = modals
  .createStore(false)
  .on(openShareModal, () => true)
  .on(closeShareModal, () => false)
