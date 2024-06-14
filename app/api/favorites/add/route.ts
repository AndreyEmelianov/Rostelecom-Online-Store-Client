import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

import { clientPromise } from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody, token, validatedTokenResult } = await getAuthRouteData(
      clientPromise,
      req
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    if (Object.keys(reqBody).length < 4) {
      return NextResponse.json({
        message: 'Not all fields were completed',
        status: 404,
      })
    }

    const user = await db
      .collection('users')
      .findOne({ email: parseJwt(token as string).email })

    const productItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.productId) })

    if (!productItem) {
      return NextResponse.json({
        message: 'Product id is wrong',
        status: 404,
      })
    }

    const newFavoriteItem = {
      userId: user?._id,
      clientId: reqBody.clientId,
      productId: productItem._id,
      name: productItem.name,
      image: productItem.images[0],
      price: productItem.price,
      size: productItem.type === 'umbrella' ? '' : reqBody.size,
      vendorCode: productItem.vendorCode,
      category: reqBody.category,
    }

    const { insertedId } = await db
      .collection('favorites')
      .insertOne(newFavoriteItem)

    return NextResponse.json({
      status: 201,
      newFavoriteItem: { _id: insertedId, ...newFavoriteItem },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
