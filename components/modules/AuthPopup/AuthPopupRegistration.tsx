import { useLang } from '@/hooks/useLang'
import { AuthPopupCloseBtn } from './AuthPopupCloseBtn'
import { IAuthSideProps, IInputs } from '@/types/auth-popup'
import { useAuthForm } from '@/hooks/useAuthForm'
import { registerFx } from '@/api/auth'
import { handleRegistration } from '@/context/auth'

export const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { lang, translations } = useLang()

  const { spinner, errors, register, handleSubmit } = useAuthForm(
    handleRegistration,
    isSideActive,
    registerFx.pending
  )

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
        <form onSubmit={handleSubmit(submitForm)}>{}</form>
      </div>
    </div>
  )
}
