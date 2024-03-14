import { useEffect, useState } from 'react'

import { getWindowWidth } from '@/lib/utils/common'

export const useWindowWidth = () => {
  const [windowWidth, setWindowWith] = useState(getWindowWidth())

  const handleResize = () => setWindowWith(getWindowWidth())

  useEffect(() => {
    window.addEventListener('resize', handleResize, true)

    return () => window.removeEventListener('resize', handleResize, true)
  }, [])

  return { windowWidth, handleResize }
}

export const useMediaQuery = (maxWidth: number) => {
  const [isMedia, setIsMedia] = useState(false)

  const {
    windowWidth: { windowWidth },
    handleResize,
  } = useWindowWidth()

  useEffect(() => {
    if (windowWidth <= maxWidth) {
      setIsMedia(true)
    } else {
      setIsMedia(false)
    }
  }, [handleResize, maxWidth, windowWidth])

  return isMedia
}
