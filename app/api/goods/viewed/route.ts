import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

import { clientPromise } from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    const productsPayload: { _id: string; category: string }[] = reqBody.payload

    if (!productsPayload) {
      return NextResponse.json({
        message: 'payload fields is required',
        status: 404,
      })
    }

    const getViewedProducts = async (category: string) => {
      const viewedGoods = await db
        .collection(category)
        .find({
          _id: { $in: productsPayload.map(({ _id }) => new ObjectId(_id)) },
        })
        .toArray()

      return viewedGoods
    }

    const [cloth, accessories, office, souvenirs] = await Promise.allSettled([
      getViewedProducts('cloth'),
      getViewedProducts('accessories'),
      getViewedProducts('office'),
      getViewedProducts('souvenirs'),
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
      items: allGoods,
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
