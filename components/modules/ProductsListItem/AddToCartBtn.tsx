import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IAddToCartBtnProps } from '@/types/goods'

export const AddToCartBtn = ({
  text,
  className,
  minWidth,
  btnDisabled = false,
  addToCartSpinner,
  handleAddToCart,
}: IAddToCartBtnProps) => (
  <button
    className={`btn-reset ${className}`}
    disabled={btnDisabled}
    onClick={handleAddToCart}
    style={addToCartSpinner ? { minWidth, height: 48 } : {}}
  >
    {addToCartSpinner ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      text
    )}
  </button>
)
