import { NextResponse } from 'next/server'
import { Sort } from 'mongodb'

import { clientPromise } from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { checkPriceParam, getCheckedArrayParam } from '@/lib/utils/common'
import { allowedColors, allowedSizes } from '@/constants/product'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)

    const url = new URL(req.url)

    const limit = url.searchParams.get('limit') || 12
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const typeParam = url.searchParams.get('type')
    const categoryParam = url.searchParams.get('category')
    const collectionParam = url.searchParams.get('collection')

    const priceFromParam = url.searchParams.get('priceFrom')
    const priceToParam = url.searchParams.get('priceTo')
    const isFullPriceRangeValid =
      priceFromParam &&
      priceToParam &&
      checkPriceParam(+priceFromParam) &&
      checkPriceParam(+priceToParam)

    const sizesParam = url.searchParams.get('sizes')
    const sizesArray = getCheckedArrayParam(sizesParam as string)
    const isValidSizes =
      sizesArray && sizesArray.every((size) => allowedSizes.includes(size))

    const colorsParam = url.searchParams.get('colors')
    const colorsArray = getCheckedArrayParam(colorsParam as string)
    const isValidColors =
      colorsArray && colorsArray.every((color) => allowedColors.includes(color))

    const sortParam = url.searchParams.get('sort') || 'default'

    const filter = {
      ...(typeParam && { type: typeParam }),
      ...(isFullPriceRangeValid && {
        price: { $gt: +priceFromParam, $lt: +priceToParam },
      }),
      ...(isValidSizes && {
        $and: (sizesArray as string[]).map((size) => ({
          [`sizes.${size.toLowerCase()}`]: true,
        })),
      }),
      ...(isValidColors && {
        $or: (colorsArray as string[]).map((color) => ({
          ['characteristics.color']: color.toLowerCase(),
        })),
      }),
      ...(collectionParam && {
        ['characteristics.collection']: collectionParam,
      }),
    }

    const sort = {
      ...(sortParam.includes('popular') && {
        popularity: -1,
      }),
      ...(sortParam.includes('new') && {
        isNew: -1,
      }),
      ...(sortParam.includes('cheap_first') && {
        price: 1,
      }),
      ...(sortParam.includes('expensive_first') && {
        price: -1,
      }),
    }

    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db
          .collection(collection)
          .find(filter)
          .sort(sort as Sort)
          .toArray()

        return goods
      }

      const [cloth, accessories, office, souvenirs] = await Promise.allSettled([
        getFilteredCollection('cloth'),
        getFilteredCollection('accessories'),
        getFilteredCollection('office'),
        getFilteredCollection('souvenirs'),
      ])

      if (
        cloth.status !== 'fulfilled' ||
        accessories.status !== 'fulfilled' ||
        office.status !== 'fulfilled' ||
        souvenirs.status !== 'fulfilled'
      ) {
        return NextResponse.json({
          count: 0,
          items: [],
        })
      }

      const allGoods = [
        ...cloth.value,
        ...accessories.value,
        ...office.value,
        ...souvenirs.value,
      ]

      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit),
      })
    }

    const currentGoods = await db
      .collection(categoryParam as string)
      .find(filter)
      .sort(sort as Sort)
      .toArray()

    return NextResponse.json({
      count: currentGoods.length,
      items: currentGoods.slice(+offset, +limit),
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
