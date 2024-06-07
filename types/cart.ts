export interface ICartItem {
  _id: string
  userId: string
  clientId: string
  productId: string
  name: string
  image: string
  count: string | number
  price: string
  totalPrice: string
  size: string
  color: string
  inStock: string
}
