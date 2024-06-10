import toast from 'react-hot-toast'

import { useLang } from '@/hooks/useLang'

export const CookieAlert = ({
  setCookieAlertOpen,
}: {
  setCookieAlertOpen: (arg0: boolean) => void
}) => {
  const { lang, translations } = useLang()

  const handleAcceptCookie = () => {
    document.cookie = 'CookieBy=Rostelecom; max-age=' + 60 * 60 * 24 * 30

    if (document.cookie) {
      setCookieAlertOpen(false)
    } else {
      toast.error(
        'Файл cookie не может быть установлен! Разблокируйте этот сайт с помощью настроек cookie в вашем бразуере'
      )
    }
  }

  const handleCloseCookieAlert = () => setCookieAlertOpen(false)

  return (
    <div className='container cookie-popup__container'>
      <button
        className='btn-reset cookie-popup__close'
        onClick={handleCloseCookieAlert}
      />
      <p
        className='cookie-popup__text'
        dangerouslySetInnerHTML={{
          __html: translations[lang].common.cookie_text,
        }}
      />
      <button
        className='btn-reset cookie-popup__accept'
        onClick={handleAcceptCookie}
      >
        {translations[lang].common.accept}
      </button>
    </div>
  )
}
