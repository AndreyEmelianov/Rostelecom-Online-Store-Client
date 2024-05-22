'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Header } from '../modules/Header/Header'
import { NavbarMobile } from '../modules/NavbarMobile/NavbarMobile'
import { SearchModal } from '../modules/Header/SearchModal'
import { $quickViewModalIsOpen, $searchModalIsOpen } from '@/context/modals'
import { handleCloseSearchModal } from '@/lib/utils/common'
import { Footer } from '../modules/Footer/Footer'
import { QuickViewModal } from '../modules/QuickViewModal/QuickViewModal'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const isMedia800 = useMediaQuery(800)
  const searchModalIsOpen = useUnit($searchModalIsOpen)

  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <NavbarMobile />}
      <AnimatePresence>
        {searchModalIsOpen && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
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
