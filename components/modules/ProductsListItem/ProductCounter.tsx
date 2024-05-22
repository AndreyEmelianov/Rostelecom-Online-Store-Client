import { IProductCounterProps } from '@/types/goods'

export const ProductCounter = ({ className, count }: IProductCounterProps) => (
  <div className={className}>
    <button className='btn-reset' />
    <span>{count}</span>
    <button className='btn-reset' />
  </div>
)
