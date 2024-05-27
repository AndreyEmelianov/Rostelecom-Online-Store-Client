import { useState } from 'react'

import { AuthPopupRegistration } from './AuthPopupRegistration'
import { AuthPopupLogin } from './AuthPopupLogin'

export const AuthPopup = () => {
  const [isAuthSwitched, setIsAuthSwitched] = useState(false)
  const [isLoginActive, setIsLoginActive] = useState(false)
  const [isRegisterActive, setIsRegisterActive] = useState(true)

  const toggleAuth = () => {
    setIsAuthSwitched((prevState) => !prevState)
    setIsLoginActive((prevState) => !prevState)
    setIsRegisterActive((prevState) => !prevState)
  }

  return (
    <div className={`container auth-popup`}>
      <div>
        <div className='starsec' />
        <div className='starthird' />
        <div className='starfourth' />
        <div className='starfifth' />
      </div>
      <div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
        <div className={`auth-popup__card__inner`}>
          <AuthPopupRegistration
            toggleAuth={toggleAuth}
            isSideActive={isRegisterActive}
          />
          <AuthPopupLogin
            toggleAuth={toggleAuth}
            isSideActive={isLoginActive}
          />
        </div>
      </div>
    </div>
  )
}
