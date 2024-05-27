import { useLang } from '@/hooks/useLang'
import { INameErrorsMessageProps } from '@/types/auth-popup'

export const NameErrorsMessage = ({
  errors,
  className,
  fieldName,
}: INameErrorsMessageProps) => {
  const { translations, lang } = useLang()

  return (
    <>
      {errors[fieldName] && (
        <span className={className}>{errors[fieldName]?.message}</span>
      )}
      {errors[fieldName] && errors[fieldName]?.type === 'minLength' && (
        <span className={className}>{translations[lang].validation.min_2}</span>
      )}
      {errors[fieldName] && errors[fieldName]?.type === 'maxLength' && (
        <span className={className}>
          {translations[lang].validation.max_15}
        </span>
      )}
    </>
  )
}
