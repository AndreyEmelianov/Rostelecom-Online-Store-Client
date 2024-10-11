'use client'

import { IRostelecomAddressData } from '@/types/order'
import {
  getRostelecomOfficesByCityFx,
  order,
  setCourierTab,
  setPickupTab,
} from '.'

export const $rostelecomDataByCity = order
  .createStore<IRostelecomAddressData[]>([])
  .on(getRostelecomOfficesByCityFx.done, (_, { result }) => result)

export const $pickupTab = order
  .createStore<boolean>(true)
  .on(setPickupTab, (_, value) => value)

export const $courierTab = order
  .createStore<boolean>(false)
  .on(setCourierTab, (_, value) => value)
