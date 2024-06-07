import { NextResponse } from 'next/server'

import { clientPromise } from '@/lib/mongodb'
import {
  findUserByEmail,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'
import { IUser } from '@/types/user'

export async function GET(req: Request) {
  try {
    const { db, token, validatedTokenResult } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    const user = (await findUserByEmail(
      db,
      parseJwt(token as string).email
    )) as unknown as IUser

    return NextResponse.json({
      status: 200,
      message: 'token is valid',
      user: { name: user.name, email: user.email, _id: user?._id },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
