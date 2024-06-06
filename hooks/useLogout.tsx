import { useRouter } from 'next/navigation'
import { useEarthoOne } from '@eartho/one-client-react'

import { setIsAuth } from '@/context/auth'

export const useUserLogout = () => {
  const router = useRouter()

  const { logout } = useEarthoOne()

  return () => {
    logout({ clientId: `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}` })
    localStorage.removeItem('rostelekomAuth')
    setIsAuth(false)
    router.push('/')
    window.location.reload()
  }
}
