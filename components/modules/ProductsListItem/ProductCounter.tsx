import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { IProductCounterProps } from '@/types/goods'
import { isUserAuth } from '@/lib/utils/common'
import { updateCartItemCountInLS } from '@/lib/utils/cart'
import { updateCartItemCount } from '@/context/cart'

export const ProductCounter = ({
  className,
  count,
  initialCount,
  totalCount,
  cartItem,
  updateCountAsync,
  setCount,
  decreasePrice,
  increasePrice,
}: IProductCounterProps) => {
  const [spinner, setSpinner] = useState(false)
  const [disableIncrease, setDisableIncrease] = useState(false)
  const [disableDecrease, setDisableDecrease] = useState(false)

  const currentTotalCount = +cartItem?.inStock || totalCount
  const currentInitialCount = +cartItem?.count || initialCount || 1

  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    } else {
      setDisableDecrease(false)
    }

    if (count === currentTotalCount) {
      setDisableIncrease(true)
    } else {
      setDisableIncrease(false)
    }
  }, [count, currentTotalCount])

  useEffect(() => {
    setCount(currentInitialCount as number)
  }, [currentInitialCount])

  const updateCountWithRequest = (count: number) => {
    updateCartItemCountInLS(cartItem.clientId, count)

    if (!isUserAuth()) {
      return
    }

    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)

    updateCartItemCount({
      id: cartItem._id,
      jwt: auth.accessToken,
      count,
      setSpinner,
    })
  }

  const increaseCounter = async () => {
    setCount(count + 1)
    increasePrice && increasePrice()
    setDisableDecrease(false)

    if (updateCountAsync) {
      updateCountWithRequest(count + 1)
    }
  }

  const decreaseCounter = async () => {
    setCount(count - 1)
    decreasePrice && decreasePrice()
    setDisableIncrease(false)

    if (updateCountAsync) {
      updateCountWithRequest(count - 1)
    }
  }

  return (
    <div className={className}>
      <button
        className='btn-reset'
        onClick={decreaseCounter}
        disabled={disableDecrease || spinner}
      />
      <span>{spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}</span>
      <button
        className='btn-reset'
        onClick={increaseCounter}
        disabled={disableIncrease || spinner}
      />
    </div>
  )
}
