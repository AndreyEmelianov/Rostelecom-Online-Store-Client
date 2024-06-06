import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { $user } from '@/context/user'

export const useUserAvatar = () => {
  const [src, setSrc] = useState('')

  const user = useUnit($user)

  useEffect(() => {
    if (user.image) {
      setSrc(user.image)
      return
    }

    const oauthAvatar = JSON.parse(
      localStorage.getItem(
        '@@oneclientjs@@::yJSSqZFcWWZBzE0H282Z::@@user@@'
      ) as string
    )

    if (!oauthAvatar) {
      return
    }

    setSrc(oauthAvatar.decodedToken.user.photoURL)
  }, [user.image])

  return { src, alt: user.name }
}
