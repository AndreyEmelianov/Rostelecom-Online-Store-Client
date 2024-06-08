import Image from 'next/image'
import Link from 'next/link'

import { DeleteCartItemBtn } from '@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import { ICartItem } from '@/types/cart'
import { ProductCounter } from '../../ProductsListItem/ProductCounter'
import { formatPrice } from '@/lib/utils/common'

export const CartPopupItem = ({ item }: { item: ICartItem }) => {
  const {
    count,
    deleteSpinner,
    animatedPrice,
    setCount,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
  } = useCartItemAction(item)

  return (
    <>
      <DeleteCartItemBtn callback={() => {}} btnDisabled={deleteSpinner} />
      <div className='cart-list__item__img'>
        <Image src={item.image} alt={item.name} width={96} height={96} />
      </div>
      <div className='cart-list__item__inner'>
        <Link
          href={`/catalog/${item.category}/${item.productId}`}
          className='cart-list__item__title'
        >
          <span>
            {item.name.replace('.', '')} {item.size ? ', ' : ''}
          </span>
          <span>{item.size.toLocaleUpperCase()}</span>
        </Link>
        <div className='cart-list__item__bottom'>
          <ProductCounter
            count={count}
            updateCountAsync
            cartItem={item}
            setCount={setCount}
            increasePrice={increasePriceWithAnimation}
            decreasePrice={decreasePriceWithAnimation}
            className='cart-list__item__counter'
          />
          <span className='cart-list__item__price'>
            {formatPrice(animatedPrice)} ₽
          </span>
        </div>
      </div>
    </>
  )
}
