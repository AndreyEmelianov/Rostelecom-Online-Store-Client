'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Header } from '../modules/Header/Header'
import { NavbarMobile } from '../modules/NavbarMobile/NavbarMobile'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const isMedia800 = useMediaQuery(800)

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <NavbarMobile />}
      <div>footer</div>
    </>
  )
}
