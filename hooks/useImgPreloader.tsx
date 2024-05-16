import { useState } from 'react'

export const useImgPreloader = () => {
  const [imgSpinner, setImgSpinner] = useState(true)

  const handleLoadingImgComplete = async (
    img: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    img.currentTarget.classList.remove('opacity-0')
    setImgSpinner(false)
  }
  return { handleLoadingImgComplete, imgSpinner }
}
