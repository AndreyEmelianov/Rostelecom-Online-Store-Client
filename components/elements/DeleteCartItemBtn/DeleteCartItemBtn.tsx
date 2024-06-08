import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IDeleteCartItemBtnProps } from '@/types/cart'

export const DeleteCartItemBtn = ({
  className,
  btnDisabled,
  callback,
}: IDeleteCartItemBtnProps) => (
  <button
    onClick={callback}
    disabled={btnDisabled}
    className={`btn-reset cart-list__item__delete ${className}`}
  >
    {btnDisabled ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      <span />
    )}
  </button>
)
