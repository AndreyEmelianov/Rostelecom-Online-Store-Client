/* eslint-disable indent */
import { loginCheckFx, refreshTokenFx } from '@/api/auth'
import { addProductToCartFx, getCartItemsFx } from '@/api/cart'
import { JWTError } from '@/constants/jwt'
import { IAddProductToCartFx } from '@/types/cart'

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
      }
    }
  }
}
