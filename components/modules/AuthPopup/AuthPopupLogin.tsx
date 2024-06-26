import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { useLang } from '@/hooks/useLang'
import { AuthPopupCloseBtn } from './AuthPopupCloseBtn'
import { IAuthSideProps, IInputs } from '@/types/auth-popup'
import { useAuthForm } from '@/hooks/useAuthForm'
import { handleLogin, loginFx } from '@/context/auth'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { AuthPopupSocials } from './AuthPopupSocials'

export const AuthPopupLogin = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { lang, translations } = useLang()

  const { spinner, errors, register, handleSubmit, handleSignWithOAuth } =
    useAuthForm(handleLogin, isSideActive, loginFx.pending)

  const submitForm = (data: IInputs) =>
    handleLogin({
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-back'>
      <AuthPopupCloseBtn />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.login_text}
        </h3>
        <p className='card-body__description'>
          {translations[lang].auth_popup.login_description}
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button type='submit' className='inner__btn' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  translations[lang].auth_popup.login_text
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                {translations[lang].auth_popup.login_question}
              </span>
              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
              >
                {translations[lang].auth_popup.register}
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleRegistrationWithOAuth={handleSignWithOAuth} />
      </div>
    </div>
  )
}
