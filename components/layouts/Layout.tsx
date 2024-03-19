'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Header } from '../modules/Header/Header'
import { NavbarMobile } from '../modules/NavbarMobile/NavbarMobile'
import { SearchModal } from '../modules/Header/SearchModal'
import { $searchModalIsOpen } from '@/context/modals'
import { handleCloseSearchModal } from '@/lib/utils/common'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const isMedia800 = useMediaQuery(800)
  const searchModalIsOpen = useUnit($searchModalIsOpen)

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
      <div
        className={`header__search-overlay ${searchModalIsOpen ? 'overlay-active' : ''}`}
        onClick={handleCloseSearchModal}
      />
      <div>footer</div>
    </>
  )
}
