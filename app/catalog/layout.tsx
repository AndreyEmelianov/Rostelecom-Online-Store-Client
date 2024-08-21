import { CatalogLayout } from '@/components/layouts/CatalogLayout'

export const metadata = {
  title: 'Ростелеком | Каталог',
}

export default function CatalogRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}
