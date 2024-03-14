import Link from 'next/link'

import { IMenuLinkItemProps } from '@/types/modules'

export const MenuLinkItem = ({
  item,
  handleRedirectToCatalog,
}: IMenuLinkItemProps) => {
  const onRedirect = () => handleRedirectToCatalog(item.href)

  return (
    <li key={item.id} className='nav-menu__accordion__item__list__item'>
      <Link
        href={item.href}
        onClick={onRedirect}
        className='nav-menu__accordion__item__list__item__link'
      >
        {item.text}
      </Link>
    </li>
  )
}
