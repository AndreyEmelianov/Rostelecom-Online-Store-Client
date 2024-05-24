'use client'
import { useUnit } from 'effector-react'

import { Layout } from './Layout'
import {
  closeSizeTableByCheck,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import {
  $quickViewModalIsOpen,
  $sizeTableIsOpen,
  closeQuickViewModal,
} from '@/context/modals'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)
  const sizeTableIsOpen = useUnit($sizeTableIsOpen)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(quickViewModalIsOpen)

  return (
    <html lang='en'>
      <body>
        <Layout>{children}</Layout>
        <div
          className={`quick-view-modal-overlay ${quickViewModalIsOpen ? 'overlay-active' : ''}`}
          onClick={handleCloseQuickViewModal}
        />
        <div
          className={`size-table-overlay ${sizeTableIsOpen ? 'overlay-active' : ''}`}
          onClick={handleCloseSizeTable}
        />
      </body>
    </html>
  )
}
