import { sample } from 'effector'

import { getRostelecomOfficesByCity, getRostelecomOfficesByCityFx } from '.'

sample({
  clock: getRostelecomOfficesByCity,
  source: {},
  fn: (_, data) => data,
  target: getRostelecomOfficesByCityFx,
})
