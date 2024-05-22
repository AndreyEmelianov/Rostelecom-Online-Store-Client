'use client'
import { useUnit } from 'effector-react'

import { Layout } from './Layout'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { $quickViewModalIsOpen, closeQuickViewModal } from '@/context/modals'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  return (
    <html lang='en'>
      <body>
        <Layout>{children}</Layout>
        <div
          className={`quick-view-modal-overlay ${quickViewModalIsOpen ? 'overlay-active' : ''}`}
          onClick={handleCloseQuickViewModal}
        />
      </body>
    </html>
  )
}
