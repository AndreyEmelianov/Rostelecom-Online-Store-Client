'use client'
import { MutableRefObject, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Header } from '../modules/Header/Header'
import { NavbarMobile } from '../modules/NavbarMobile/NavbarMobile'
import { SearchModal } from '../modules/Header/SearchModal'
import {
  $quickViewModalIsOpen,
  $searchModalIsOpen,
  $sizeTableIsOpen,
} from '@/context/modals'
import {
  handleCloseAuthPopup,
  handleCloseSearchModal,
} from '@/lib/utils/common'
import { Footer } from '../modules/Footer/Footer'
import { QuickViewModal } from '../modules/QuickViewModal/QuickViewModal'
import { SizeTable } from '../modules/SizeTable/SizeTable'
import { $openAuthPopup } from '@/context/auth'
import { AuthPopup } from '../modules/AuthPopup/AuthPopup'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const isMedia800 = useMediaQuery(800)

  const searchModalIsOpen = useUnit($searchModalIsOpen)
  const sizeTableIsOpen = useUnit($sizeTableIsOpen)
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)
  const openAuthPopup = useUnit($openAuthPopup)

  const authWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleCloseAuthPopupByTarget = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as Element

    if (target === authWrapperRef.current) {
      handleCloseAuthPopup()
    }
  }

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <NavbarMobile />}
      <AnimatePresence>
        {openAuthPopup && (
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            ref={authWrapperRef}
            onClick={handleCloseAuthPopupByTarget}
            className='auth-popup-wrapper'
          >
            <AuthPopup />
          </motion.div>
        )}
        {searchModalIsOpen && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
          </motion.div>
        )}
        {sizeTableIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SizeTable />
          </motion.div>
        )}
      </AnimatePresence>
      {!isMedia800 && (
        <AnimatePresence>
          {quickViewModalIsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuickViewModal />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <div
        className={`header__search-overlay ${searchModalIsOpen ? 'overlay-active' : ''}`}
        onClick={handleCloseSearchModal}
      />
      <Footer />
    </>
  )
}
