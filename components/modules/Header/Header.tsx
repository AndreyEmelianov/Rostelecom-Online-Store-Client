import { useLang } from '@/hooks/useLang'

export const Header = () => {
  const { translations, lang } = useLang()

  return (
    <header className='header'>
      <div className='container header__container'>
        <button className='btn-reset header__burger'>
          {translations[lang].header.menu_btn}
        </button>
      </div>
    </header>
  )
}
