import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faYandex,
  faVk,
} from '@fortawesome/free-brands-svg-icons'

export const AuthPopupSocials = ({
  handleRegistrationWithOAuth,
}: {
  handleRegistrationWithOAuth: VoidFunction
}) => (
  <div className='card-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={handleRegistrationWithOAuth}
    >
      <FontAwesomeIcon icon={faGithub} beat />
    </button>
    <button
      className='btn-reset socials__btn g-color'
      onClick={handleRegistrationWithOAuth}
    >
      <FontAwesomeIcon icon={faGoogle} shake />
    </button>
    <button
      className='btn-reset socials__btn y-color'
      onClick={handleRegistrationWithOAuth}
    >
      <FontAwesomeIcon icon={faYandex} bounce />
    </button>
    <button
      className='btn-reset socials__btn vk-color'
      onClick={handleRegistrationWithOAuth}
    >
      <FontAwesomeIcon icon={faVk} shake />
    </button>
  </div>
)
