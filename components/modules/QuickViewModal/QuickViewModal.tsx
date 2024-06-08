import Link from 'next/link'

import { closeQuickViewModal } from '@/context/modals'
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { QuickViewModalSlider } from './QuickViewModalSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import { ProductAvailable } from '@/components/elements/ProductAvailable/ProductAvailable'
import { ProductColor } from '../ProductsListItem/ProductColor'
import { ProductComposition } from '../ProductsListItem/ProductComposition'
import { useLang } from '@/hooks/useLang'
import { ProductSizeTableBtn } from '../ProductsListItem/ProductSizeTableBtn'
import { ProductSizesItem } from '../ProductsListItem/ProductSizesItem'
import { ProductCounter } from '../ProductsListItem/ProductCounter'
import { AddToCartBtn } from '../ProductsListItem/AddToCartBtn'
import { ProductsItemActionBtn } from '@/components/elements/ProductsItemActionBtn/ProductsItemActionBtn'
import { ICartItem } from '@/types/cart'

import styles from '@/styles/quick-view-modal/index.module.scss'
import productStyles from '@/styles/products-list-item/index.module.scss'

export const QuickViewModal = () => {
  const {
    product,
    selectedSize,
    currentCartItems,
    addToCartSpinner,
    updateCountSpinner,
    allCurrentCartItemCount,
    existingItem,
    count,
    setCount,
    handleAddToCart,
    setSelectedSize,
  } = useCartAction()

  const images = useProductImages(product)

  const { lang, translations } = useLang()

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const addToCart = () => handleAddToCart(count)

  return (
    <div className={`${styles.modal}`}>
      <button
        className={`btn-reset ${styles.modal__close}`}
        onClick={handleCloseModal}
      />
      <div className={styles.modal__actions}>
        <ProductsItemActionBtn
          text={translations[lang].product.add_to_favorites}
          iconClass='actions__btn_favorite'
          withTooltip={false}
        />
        <ProductsItemActionBtn
          text={translations[lang].product.add_to_comparison}
          iconClass='actions__btn_comparison'
          withTooltip={false}
        />
      </div>
      <div className={styles.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>
      <div className={styles.modal__right}>
        <h3 className={styles.modal__right__title}>{product.name}</h3>
        <div className={styles.modal__right__price}>
          {formatPrice(+product.price)} ₽
        </div>
        <div className={styles.modal__right__info}>
          <ProductAvailable
            inStock={+product.inStock}
            vendorCode={product.vendorCode}
          />
          <ProductColor color={product.characteristics.color} />
          {product.characteristics?.composition && (
            <ProductComposition
              composition={product.characteristics.composition}
            />
          )}
          {Object.keys(product.sizes).length ? (
            <div className={styles.modal__right__info__size}>
              <div className={styles.modal__right__info__size__inner}>
                <span className={productStyles.product__size_title}>
                  {translations[lang].catalog.size}
                </span>
                <ProductSizeTableBtn
                  sizes={product.sizes}
                  type={product.type}
                  className={`sizes-table-btn ${styles.modal__right__info__sizes_btn}`}
                />
              </div>
              <ul className={`list-reset ${styles.modal__right__info__sizes}`}>
                {Object.entries(product.sizes).map(([key, value], index) => (
                  <ProductSizesItem
                    key={index}
                    currentSize={[key, value]}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    currentCartItems={currentCartItems}
                  />
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
          <div className={styles.modal__right__bottom}>
            <span className={productStyles.product__count_title}>
              {translations[lang].product.count}
            </span>
            <div className={styles.modal__right__bottom__inner}>
              {!!selectedSize ? (
                <ProductCounter
                  count={count}
                  totalCount={+product.inStock}
                  initialCount={+(existingItem?.count || 1)}
                  cartItem={existingItem as ICartItem}
                  setCount={setCount}
                  updateCountAsync={false}
                  className={`counter ${styles.modal__right__bottom__counter}`}
                />
              ) : (
                <div
                  className={`counter ${styles.modal__right__bottom__counter}`}
                  style={{ justifyContent: 'center' }}
                >
                  <span>
                    {translations[lang].product.total_in_cart}{' '}
                    {allCurrentCartItemCount}
                  </span>
                </div>
              )}
              <AddToCartBtn
                text={translations[lang].product.to_cart}
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +product.inStock
                }
                className={styles.modal__right__bottom__add}
              />
            </div>
          </div>
        </div>
        <div className={styles.modal__right__more}>
          {
            <Link
              href={`/catalog/${product.category}/${product._id}`}
              onClick={handleCloseModal}
              className={styles.modal__right__more__link}
            >
              {translations[lang].product.more}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}
