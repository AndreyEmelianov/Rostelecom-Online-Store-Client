'use client'
import { useUnit } from 'effector-react'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { EarthoOneProvider } from '@eartho/one-client-react'

import { Layout } from './Layout'
import {
  closeSizeTableByCheck,
  handleCloseAuthPopup,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import {
  $quickViewModalIsOpen,
  $sizeTableIsOpen,
  closeQuickViewModal,
} from '@/context/modals'
import { $openAuthPopup } from '@/context/auth'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)
  const sizeTableIsOpen = useUnit($sizeTableIsOpen)
  const openAuthPopup = useUnit($openAuthPopup)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(quickViewModalIsOpen)

  return (
    <>
      {isClient && (
        <EarthoOneProvider
          clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
          domain=''
        >
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
              <div
                className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''}`}
                onClick={handleCloseAuthPopup}
              />
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      )}
    </>
  )
}
