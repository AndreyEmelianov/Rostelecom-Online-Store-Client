import { closeQuickViewModal } from '@/context/modals'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { QuickViewModalSlider } from './QuickViewModalSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'

import styles from '@/styles/quick-view-modal/index.module.scss'

export const QuickViewModal = () => {
  const { product } = useCartAction()

  const images = useProductImages(product)

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  return (
    <div className={`${styles.modal}`}>
      <button
        className={`btn-reset ${styles.modal__close}`}
        onClick={handleCloseModal}
      />
      <div className={styles.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>
      <div className={styles.modal__right}>a</div>
    </div>
  )
}
