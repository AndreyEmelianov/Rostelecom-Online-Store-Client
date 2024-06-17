import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IAddToCartIconProps } from '@/types/elements'

export const AddToCartIcon = ({
  addToCartSpinner,
  isProductInCart,
  className,
  addedClassName,
  callback,
}: IAddToCartIconProps) => (
  <>
    {isProductInCart ? (
      <span className={`${className} ${addedClassName}`} />
    ) : (
      <button className={`btn-reset ${className}`} onClick={callback}>
        {addToCartSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        ) : (
          <span />
        )}
      </button>
    )}
  </>
)
