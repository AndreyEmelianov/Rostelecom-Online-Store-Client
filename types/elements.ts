import { CustomArrowProps } from 'react-slick'

export interface IProductSubtitleProps {
  subtitleClassName?: string
  subtitleRectClassName?: string
}

export interface IProductsItemActionBtnProps {
  text: string
  callback?: VoidFunction
  withTooltip?: boolean
  iconClass: string
  marginBottom?: number
}

export interface IProductAvailableProps {
  inStock: number
  vendorCode: string
}

export interface IQuickViewModalSliderArrowProps extends CustomArrowProps {
  directionClassName: string
}
