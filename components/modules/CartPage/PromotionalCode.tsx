import { useState } from 'react'

import { useLang } from '@/hooks/useLang'

import styles from '@/styles/cart-page/index.module.scss'

export const PromotionalCode = ({
  setIsCorrectPromotionalCode,
}: {
  setIsCorrectPromotionalCode: (arg0: boolean) => void
}) => {
  const [value, setValue] = useState('')

  const { lang, translations } = useLang()

  const isCorrectCode = value === 'ROSTELECOM2024'

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (event.target.value === 'ROSTELECOM2024') {
      setIsCorrectPromotionalCode(true)
    } else {
      setIsCorrectPromotionalCode(false)
    }
  }

  return (
    <div className={styles.cart__promotional_code}>
      <input
        type='text'
        value={value}
        onChange={handleChangeValue}
        placeholder={translations[lang].order.promocode}
        style={
          isCorrectCode ? { border: '1px solid #16d9a6', color: '#16d9a6' } : {}
        }
      />
      <p>{translations[lang].order.promo_code_text}</p>
    </div>
  )
}
