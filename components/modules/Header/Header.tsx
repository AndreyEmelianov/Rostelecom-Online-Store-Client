'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useUnit } from 'effector-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Menu } from './Menu'
import { Logo } from '@/components/elements/Logo/Logo'
import { useLang } from '@/hooks/useLang'
import { openMenu, openSearchModal } from '@/context/modals'
import {
  addOverflowHiddenToBody,
  handleOpenAuthPopup,
  triggerLoginCheck,
} from '@/lib/utils/common'
import CartPopup from './CartPopup/CartPopup'
import HeaderProfile from './HeaderProfile'
import { $isAuth } from '@/context/auth'
import { loginCheckFx } from '@/api/auth'
import {
  addProductsFromLSToCart,
  setCartFromLS,
  setShouldShowEmptyPage,
} from '@/context/cart'
import { setLang } from '@/context/lang'
import {
  $favorites,
  $favoritesFromLS,
  addProductsFromLSToFavorites,
  setFavoriteItemsFromLS,
  setShouldShowEmptyPageFavorites,
} from '@/context/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'

export const Header = () => {
  const { translations, lang } = useLang()

  const isAuth = useUnit($isAuth)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('rostelecom-lang') as string)
    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)
    const cart = JSON.parse(localStorage.getItem('rostelekomCart') as string)
    const favoritesFromLS = JSON.parse(
      localStorage.getItem('rostelekomFavorites') as string
    )

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (!favoritesFromLS || !favoritesFromLS?.length) {
      setShouldShowEmptyPageFavorites(true)
    }

    if (!cart || !cart?.length) {
      setShouldShowEmptyPage(true)
    }

    if (auth?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmptyPage(true)
      } else {
        setCartFromLS(cart)
      }
    }

    if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
      if (!favoritesFromLS.length) {
        setShouldShowEmptyPageFavorites(true)
      } else {
        setFavoriteItemsFromLS(favoritesFromLS)
      }
    }
  }, [])

  useEffect(() => {
    if (isAuth) {
      const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

      const cartFromLS = JSON.parse(
        localStorage.getItem('rostelekomCart') as string
      )

      const favoritesFromLS = JSON.parse(
        localStorage.getItem('rostelekomFavorites') as string
      )

      if (cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }

      if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
        addProductsFromLSToFavorites({
          jwt: auth.accessToken,
          favoriteItems: favoritesFromLS,
        })
      }
    }
  }, [isAuth])

  return (
    <header className='header'>
      <div className='container header__container'>
        <button className='btn-reset header__burger' onClick={handleOpenMenu}>
          {translations[lang].header.menu_btn}
        </button>
        <Menu />
        <div className='header__logo'>
          <Logo />
        </div>
        <ul className='header__links list-reset'>
          <li className='header__links__item'>
            <button
              className='header__links__item__btn header__links__item__btn--search btn-reset'
              onClick={handleOpenSearchModal}
            />
          </li>
          <li className='header__links__item'>
            <Link
              href='/favorites'
              className='header__links__item__btn header__links__item__btn--favorites'
            >
              {!!currentFavoritesByAuth.length && (
                <span className='not-empty' />
              )}
            </Link>
          </li>
          <li className='header__links__item'>
            <Link
              href='/comparison'
              className='header__links__item__btn header__links__item__btn--compare'
            />
          </li>
          <li className='header__links__item'>
            <CartPopup />
          </li>
          <li className='header__links__item header__links__item--profile'>
            {isAuth ? (
              <HeaderProfile />
            ) : loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <button
                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                onClick={handleOpenAuthPopup}
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}
