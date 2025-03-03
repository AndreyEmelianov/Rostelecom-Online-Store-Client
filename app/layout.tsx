import type { Metadata, Viewport } from 'next'

import { PagesLayout } from '@/components/layouts/PagesLayout'

import './globalStyles/normalize.css'
import './globalStyles/globals.css'
import './globalStyles/slick.css'
import './globalStyles/slick-theme.css'
import './globalStyles/header.css'
import './globalStyles/header-profile.css'
import './globalStyles/menu.css'
import './globalStyles/catalog-menu.css'
import './globalStyles/navbar-mobile.css'
import './globalStyles/search-modal.css'
import './globalStyles/cart-popup.css'
import './globalStyles/footer.css'
import './globalStyles/auth-popup.css'
import './globalStyles/cookie-popup.css'
import './globalStyles/breadcrumbs.css'
import './globalStyles/map.css'

export const metadata: Metadata = {
  title: 'Rostelecom store',
  description:
    'Rostelecom store - магазин одежды, аксессуаров, концелярии и сувениров компании',
}

export const viewport: Viewport = {
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PagesLayout>{children}</PagesLayout>
}
