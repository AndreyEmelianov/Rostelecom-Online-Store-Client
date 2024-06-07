/* eslint-disable indent */
import { loginCheckFx, refreshTokenFx } from '@/api/auth'
import { JWTError } from '@/constants/jwt'

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
      const { repeatRequestMethodName } = repeatRequestAfterRefreshToken

      switch (repeatRequestMethodName) {
        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessToken,
          })
          break
      }
    }
  }
}
