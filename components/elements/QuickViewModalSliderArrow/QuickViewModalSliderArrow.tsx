import { IQuickViewModalSliderArrowProps } from '@/types/elements'

import styles from '@/styles/quick-view-modal/index.module.scss'

export const QuickViewModalSliderArrow = (
  props: IQuickViewModalSliderArrowProps
) => (
  <button
    onClick={props.onClick}
    className={`btn-reset ${styles.modal__left__slider__slide__arrow} ${props.directionClassName}`}
  />
)
