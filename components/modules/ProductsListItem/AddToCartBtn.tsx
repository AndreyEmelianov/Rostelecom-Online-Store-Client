import { IAddToCartBtnProps } from '@/types/goods'

export const AddToCartBtn = ({ text, className }: IAddToCartBtnProps) => (
  <button className={`btn-reset ${className}`}>{text}</button>
)
