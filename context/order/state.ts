'use client'

import { IRostelecomAddressData } from '@/types/order'
import {
  getRostelecomOfficesByCityFx,
  order,
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierAddressData,
  setCourierTab,
  setMapInstance,
  setPickupTab,
  setShouldLoadRostelecomData,
  setShouldShowCourierAddressData,
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

export const $mapInstance = order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .createStore<any>({})
  .on(setMapInstance, (_, map) => map)

export const $shouldLoadRostelecomData = order
  .createStore<boolean>(false)
  .on(setShouldLoadRostelecomData, (_, value) => value)

export const $chosenPickupAddressData = order
  .createStore<Partial<IRostelecomAddressData>>({})
  .on(setChosenPickupAddressData, (_, value) => value)

export const $chosenCourierAddressData = order
  .createStore<Partial<IRostelecomAddressData>>({})
  .on(setChosenCourierAddressData, (_, value) => value)

export const $shouldShowCourierAddressData = order
  .createStore(false)
  .on(setShouldShowCourierAddressData, (_, value) => value)

export const $courierAddressData = order
  .createStore<IRostelecomAddressData>({} as IRostelecomAddressData)
  .on(setCourierAddressData, (_, value) => value)
