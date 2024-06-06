import { NextResponse } from 'next/server'
import { sendMail } from '@/service/mailService'

export async function POST(req: Request) {
  const res = await req.json()

  try {
    await sendMail(
      'Rostelekom shop',
      res.email,
      `Ваши данные для входа: логин - ${res.email}, пароль - ${res.password}`
    )
    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message })
  }
}
