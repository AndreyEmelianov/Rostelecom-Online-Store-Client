import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

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

    if (Object.keys(reqBody).length < 5) {
      return NextResponse.json({
        message: 'Not all fields passed',
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
      return NextResponse.json({ message: 'Product id is wrong!', status: 404 })
    }

    const newCartItem = {
      userId: user?._id,
      clientId: reqBody.clientId,
      productId: productItem._id,
      name: productItem.name,
      image: productItem.images[0],
      category: productItem.category,
      count: reqBody.count,
      price: productItem.price,
      totalPrice: productItem.price,
      color: productItem.characteristics.color,
      inStock: productItem.inStock,
      size: productItem.type === 'umbrella' ? '' : reqBody.size,
    }

    const { insertedId } = await db.collection('cart').insertOne(newCartItem)

    return NextResponse.json({
      status: 201,
      newCartItem: { _id: insertedId, ...newCartItem },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
