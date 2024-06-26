import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { useLang } from '@/hooks/useLang'
import { AuthPopupCloseBtn } from './AuthPopupCloseBtn'
import { IAuthSideProps, IInputs } from '@/types/auth-popup'
import { useAuthForm } from '@/hooks/useAuthForm'
import { handleRegistration, registerFx } from '@/context/auth'
import { NameInput } from './NameInput'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { AuthPopupSocials } from './AuthPopupSocials'

export const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { lang, translations } = useLang()

  const { spinner, errors, register, handleSubmit, handleSignWithOAuth } =
    useAuthForm(handleRegistration, isSideActive, registerFx.pending)

  const submitForm = (data: IInputs) =>
    handleRegistration({
      name: data.name,
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-front'>
      <AuthPopupCloseBtn />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.registration_title}
        </h3>
        <p className='card-body__description'>
          {translations[lang].auth_popup.registration_description}
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <NameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button type='submit' className='inner__btn' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  translations[lang].auth_popup.registration_text
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                {translations[lang].auth_popup.registration_question}
              </span>
              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
              >
                {translations[lang].auth_popup.login_text}!
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleRegistrationWithOAuth={handleSignWithOAuth} />
      </div>
    </div>
  )
}
