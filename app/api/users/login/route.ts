import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { clientPromise } from '@/lib/mongodb'
import {
  findUserByEmail,
  generateTokens,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
  const user = await findUserByEmail(db, reqBody.email)

  if (!user) {
    return NextResponse.json({
      warningMessage: 'Такой пользователь не существует',
    })
  }

  if (!bcrypt.compareSync(reqBody.password, user.password)) {
    return NextResponse.json({
      warningMessage: 'Неверный логин или пароль',
    })
  }

  const tokens = generateTokens(user.name, user.email)

  return NextResponse.json(tokens)
}
