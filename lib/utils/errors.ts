/* eslint-disable indent */
import { loginCheckFx } from '@/api/auth'
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
    const newTokens = { accessToken: '' }

    if (repeatRequestAfterRefreshToken) {
      const { repeatRequestMethodName, payload } =
        repeatRequestAfterRefreshToken

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
