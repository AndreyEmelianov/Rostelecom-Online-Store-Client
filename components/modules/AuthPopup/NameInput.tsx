import { NameErrorsMessage } from '@/components/elements/NameErrorsMessage/NameErrorsMessage'
import { useLang } from '@/hooks/useLang'
import { nameValidationRules } from '@/lib/utils/auth'
import { IAuthInput } from '@/types/auth-popup'

import styles from '@/styles/auth-popup/index.module.scss'

export const NameInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <input
        type='text'
        className='form__block__input'
        placeholder={translations[lang].auth_popup.name}
        {...register(
          'name',
          nameValidationRules(
            translations[lang].validation.invalid_value,
            translations[lang].validation.requiredName
          )
        )}
      />
      <NameErrorsMessage
        errors={errors}
        fieldName='name'
        className={styles.error_alert}
      />
    </div>
  )
}
