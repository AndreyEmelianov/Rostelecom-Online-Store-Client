import { useState } from 'react'

import { useLang } from '@/hooks/useLang'

export const AuthPopup = () => {
  const [isAuthSwitched, setIsAuthSwitched] = useState(false)
  const [isLoginActive, setIsLoginActive] = useState(false)
  const [isRegisterActive, setIsRegisterActive] = useState(true)

  const toggleAuth = () => {
    setIsAuthSwitched((prevState) => !prevState)
    setIsLoginActive((prevState) => !prevState)
    setIsRegisterActive((prevState) => !prevState)
  }

  const { lang } = useLang()

  return (
    <div className={`auth-popup`}>
      <div>
        <div className='starsec' />
        <div className='starthird' />
        <div className='starfourth' />
        <div className='starfifth' />
      </div>
      <div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
        <div className={`auth-popup__card__inner`}>{}</div>
      </div>
    </div>
  )
}
