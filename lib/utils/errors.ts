/* eslint-disable indent */
import { JWTError } from '@/constants/jwt'
import { refreshTokenFx } from '@/context/auth'
import {
  addProductsFromLSToCartFx,
  addProductToCartFx,
  deleteCartItemFx,
  getCartItemsFx,
} from '@/context/cart'
import {
  getComparisonItemsFx,
  addProductToComparisonFx,
  addProductsFromLSToComparisonFx,
  deleteComparisonItemsFx,
} from '@/context/comparison'
import {
  addProductToFavoriteFx,
  addProductsFromLSToFavoritesFx,
  deleteFavoriteItemFx,
  getFavoriteItemsFx,
} from '@/context/favorites'
import { loginCheckFx } from '@/context/user'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  IDeleteCartItemFx,
} from '@/types/cart'
import {
  IAddProductToComparisonFx,
  IAddProductsFromLSToComparisonFx,
  IDeleteComparisonItemsFx,
} from '@/types/comparison'
import {
  IAddProductsFromLSToFavoritesFx,
  IDeleteFavoriteItemsFx,
} from '@/types/favorites'

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

        case 'addProductsFromLSToFavoritesFx':
          return addProductsFromLSToFavoritesFx({
            ...(payload as IAddProductsFromLSToFavoritesFx),
            jwt: newTokens.accessToken,
          })

        case 'deleteFavoriteItemFx':
          return deleteFavoriteItemFx({
            ...(payload as IDeleteFavoriteItemsFx),
            jwt: newTokens.accessToken,
          })

        case 'getComparisonItemsFx':
          return getComparisonItemsFx({
            jwt: newTokens.accessToken,
          })

        case 'addProductToComparisonFx':
          return addProductToComparisonFx({
            ...(payload as IAddProductToComparisonFx),
            jwt: newTokens.accessToken,
          })

        case 'addProductsFromLSToComparisonFx':
          return addProductsFromLSToComparisonFx({
            ...(payload as IAddProductsFromLSToComparisonFx),
            jwt: newTokens.accessToken,
          })

        case 'deleteComparisonItemsFx':
          return deleteComparisonItemsFx({
            ...(payload as IDeleteComparisonItemsFx),
            jwt: newTokens.accessToken,
          })
      }
    }
  }
}
