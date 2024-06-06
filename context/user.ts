import { createDomain } from 'effector'

import { IUser } from '@/types/user'

const user = createDomain()

export const $user = user.createStore<IUser>({} as IUser)
