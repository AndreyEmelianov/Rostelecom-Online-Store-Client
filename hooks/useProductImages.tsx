import { useMemo } from 'react'

import { IProduct } from '@/types/common'
import { idGenerator } from '@/lib/utils/common'

export const useProductImages = (product: IProduct) => {
  const images = useMemo(() => {
    const makeImagesObjects = (imagesArray: string[]) =>
      imagesArray.map((image) => ({
        src: image,
        alt: product.name,
        id: idGenerator(),
      }))

    if (product.images.length < 4) {
      const images = []

      for (let i = 0; i < 4; i++) {
        images.push(product.images[0])
      }

      return makeImagesObjects(images)
    }

    return makeImagesObjects(product.images)
  }, [product.images, product.name])

  return images
}
