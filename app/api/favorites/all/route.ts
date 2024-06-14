import { clientPromise } from '@/lib/mongodb'
import { getDataFromDbByCollection } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    return getDataFromDbByCollection(clientPromise, req, 'favorites')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
