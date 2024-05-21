import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ToolTip } from '../ToolTip/ToolTip'
import { IProductsItemActionBtnProps } from '@/types/elements'

import styles from '@/styles/product-item-action-btn/index.module.scss'
import tooltipStyles from '@/styles/tooltip/index.module.scss'

export const ProductsItemActionBtn = ({
  text,
  callback,
  iconClass,
  withTooltip = true,
  marginBottom,
}: IProductsItemActionBtnProps) => {
  const [open, setOpen] = useState(false)
  const [tooltipLeft, setTooltipLeft] = useState(0)

  const showTooltip = () => setOpen(true)
  const hideTooltip = () => setOpen(false)

  const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (open && withTooltip) {
      setTooltipLeft(tooltipRef.current.clientWidth)
    }
  }, [open, withTooltip])

  return (
    <div className={styles.actions}>
      <button
        className={`btn-reset ${styles.actions__btn} ${styles[iconClass]}`}
        onClick={callback}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ marginBottom: marginBottom || 16 }}
      />
      {withTooltip && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={tooltipStyles.tooltip}
              style={{ left: `-${tooltipLeft + 13}px` }}
              ref={tooltipRef}
            >
              <ToolTip text={text} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
