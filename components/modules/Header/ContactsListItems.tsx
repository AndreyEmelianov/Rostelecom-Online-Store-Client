import Link from 'next/link'

import { useLang } from '@/hooks/useLang'

export const ContactsListItems = () => {
  const { lang, translations } = useLang()
  return (
    <>
      <li className='nav-menu__accordion__item '>
        <a
          href='tel:+74503338282'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +7 (450) 333 82 82
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='muilto:rosTelCom@telecom.ru'
          className='nav-menu__accordion__item__link'
        >
          Email
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://t.me/dvejer'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link href='https://vk.com' className='nav-menu__accordion__item__link'>
          {translations[lang].main_menu.vk}
        </Link>
      </li>
    </>
  )
}
