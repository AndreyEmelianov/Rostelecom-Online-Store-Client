import { Header } from '../modules/Header/Header'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
    <div>footer</div>
  </>
)
