export const getCheckedValidPriceFrom = (price: number) =>
  +price > 10000 ? '5000' : price

export const getCheckedValidPriceTo = (price: number) =>
  +price > 10000 ? '10000' : price
