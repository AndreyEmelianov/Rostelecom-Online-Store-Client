'use client'
import Link from 'next/link'

import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import {
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/context/modals'
import { CatalogMenu } from '../Header/CatalogMenu'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLS } from '@/context/cart/state'
import { $favorites, $favoritesFromLS } from '@/context/favorites/state'

export const NavbarMobile = () => {
  const { lang, translations } = useLang()

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLS)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const handleOpenMenu = () => {
    openMenu()
    addOverflowHiddenToBody()
    closeCatalogMenu()
  }

  const handleOpenCatalogMenu = () => {
    addOverflowHiddenToBody('0')
    openCatalogMenu()
    closeMenu()
  }

  return (
    <>
      <CatalogMenu />
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          {translations[lang].breadcrumbs.main}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenCatalogMenu}
        >
          {translations[lang].breadcrumbs.catalog}
        </button>
        <Link href='/favorites' className='mobile-navbar__btn'>
          {!!currentFavoritesByAuth.length && (
            <span className='not-empty not-empty__mobile-favorite' />
          )}
          {translations[lang].breadcrumbs.favorites}
        </Link>
        <Link href='/cart' className='mobile-navbar__btn'>
          {!!currentCartByAuth.length && (
            <span className='not-empty not-empty__mobile' />
          )}
          {translations[lang].breadcrumbs.cart}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenMenu}
        >
          {translations[lang].common.more}
        </button>
      </div>
    </>
  )
}
