import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { corsHeaders } from '@/constants/corsHeaders'
import { clientPromise } from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)

    const url = new URL(req.url)

    const ids = url.searchParams.get('ids')

    if (!ids) {
      return NextResponse.json(
        {
          status: 404,
          message: 'Ids are required',
        },
        corsHeaders
      )
    }

    const parsedId = JSON.parse(ids) as string[]

    const deleteManyFromCollection = async (collection: string) => {
      await db.collection(collection).deleteMany({
        _id: {
          $in: parsedId.map((id) => new ObjectId(id)),
        },
      })
    }

    await Promise.allSettled([
      deleteManyFromCollection('cloth'),
      deleteManyFromCollection('accessories'),
    ])

    return NextResponse.json(
      {
        status: 204,
      },
      corsHeaders
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
