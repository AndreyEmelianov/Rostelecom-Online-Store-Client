/* eslint-disable indent */
import { loginCheckFx, refreshTokenFx } from '@/api/auth'
import {
  addProductToCartFx,
  deleteCartItemFx,
  getCartItemsFx,
} from '@/api/cart'
import { addProductToFavoriteFx, getFavoriteItemsFx } from '@/api/favorites'
import { JWTError } from '@/constants/jwt'
import { addProductsFromLSToCartFx } from '@/context/cart'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  IDeleteCartItemFx,
} from '@/types/cart'

export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshToken?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)
    const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

    if (repeatRequestAfterRefreshToken) {
      const { repeatRequestMethodName, payload } =
        repeatRequestAfterRefreshToken

      switch (repeatRequestMethodName) {
        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessToken,
          })
          break

        case 'getCartItemsFx':
          return getCartItemsFx({
            jwt: newTokens.accessToken,
          })

        case 'addProductToCartFx':
          return addProductToCartFx({
            ...(payload as IAddProductToCartFx),
            jwt: newTokens.accessToken,
          })

        case 'deleteCartItemFx':
          return deleteCartItemFx({
            ...(payload as IDeleteCartItemFx),
            jwt: newTokens.accessToken,
          })

        case 'addProductsFromLSToCartFx':
          return addProductsFromLSToCartFx({
            ...(payload as IAddProductsFromLSToCartFx),
            jwt: newTokens.accessToken,
          })

        case 'getFavoriteItemsFx':
          return getFavoriteItemsFx({
            jwt: newTokens.accessToken,
          })

        case 'addProductToFavoriteFx':
          return addProductToFavoriteFx({
            ...(payload as Omit<IAddProductToCartFx, 'count'>),
            jwt: newTokens.accessToken,
          })
      }
    }
  }
}
