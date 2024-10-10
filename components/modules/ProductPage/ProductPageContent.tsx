import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import {
  addOverflowHiddenToBody,
  capitalizeFirstLetter,
  formatPrice,
  getViewedProductsFromLS,
} from '@/lib/utils/common'
import { setIsAddToFavorites } from '@/context/favorites'
import { $currentProduct } from '@/context/goods/state'
import { useLang } from '@/hooks/useLang'
import { useFavoritesActions } from '@/hooks/useFavoriteActions'
import { useCartAction } from '@/hooks/useCartAction'
import { useViewedProducts } from '@/hooks/useViewedProducts'
import { ICartItem } from '@/types/cart'
import { ProductImages } from './ProductImages'
import { ProductsItemActionBtn } from '@/components/elements/ProductsItemActionBtn/ProductsItemActionBtn'
import { ProductAvailable } from '@/components/elements/ProductAvailable/ProductAvailable'
import { ProductColor } from '../ProductsListItem/ProductColor'
import { ProductSizesItem } from '../ProductsListItem/ProductSizesItem'
import { ProductSizeTableBtn } from '../ProductsListItem/ProductSizeTableBtn'
import { ProductCounter } from '../ProductsListItem/ProductCounter'
import { AddToCartBtn } from '../ProductsListItem/AddToCartBtn'
import { ProductInfoAccordion } from './ProductInfoAccordion'
import { ProductsByCollection } from './ProductsByCollection'
import { ViewedProducts } from '../ViewedProducts/ViewedProducts'
import { openShareModal } from '@/context/modals'

import styles from '@/styles/product/index.module.scss'

export const ProductPageContent = () => {
  const currentProduct = useUnit($currentProduct)

  const {
    count,
    selectedSize,
    existingItem,
    currentCartItems,
    allCurrentCartItemCount,
    addToCartSpinner,
    updateCountSpinner,
    setSelectedSize,
    setCount,
    handleAddToCart,
  } = useCartAction()

  const {
    isProductInFavorites,
    addToFavoritesSpinner,
    handleAddProductToFavorites,
  } = useFavoritesActions(currentProduct)

  const { viewedProducts } = useViewedProducts(currentProduct._id)

  const { lang, translations } = useLang()

  const handleProductShare = () => {
    addOverflowHiddenToBody()
    openShareModal()
  }

  const addToCart = () => {
    setIsAddToFavorites(false)
    handleAddToCart(count)
  }

  useEffect(() => {
    const viewedProducts = getViewedProductsFromLS()

    const isAlreadyViewed = viewedProducts.find(
      (item) => item._id === currentProduct._id
    )

    if (isAlreadyViewed) {
      return
    }

    localStorage.setItem(
      'rostelekomViewed',
      JSON.stringify([
        ...viewedProducts,
        { category: currentProduct.category, _id: currentProduct._id },
      ])
    )
  }, [currentProduct._id, currentProduct.category])

  return (
    <>
      <div className={styles.product__top}>
        <ProductImages />

        <div className={styles.product__top__right}>
          {(currentProduct.isBestseller || currentProduct.isNew) && (
            <div className={styles.product__top__label}>
              {currentProduct.isNew && (
                <span className={styles.product__top__label__new}>
                  {translations[lang].main_page.is_new}
                </span>
              )}
              {currentProduct.isBestseller && (
                <span className={styles.product__top__label__bestseller}>
                  {translations[lang].main_page.is_bestseller}
                </span>
              )}
            </div>
          )}

          <h1 className={styles.product__top__title}>{currentProduct.name}</h1>
          <div className={styles.product__top__price}>
            <h3 className={styles.product__top__price__title}>
              {formatPrice(currentProduct.price)} ₽
            </h3>
            <div className={styles.product__top__price__inner}>
              <div className={styles.product__top__price__favorite}>
                <ProductsItemActionBtn
                  spinner={addToFavoritesSpinner}
                  text={translations[lang].product.add_to_favorites}
                  withTooltip={false}
                  callback={handleAddProductToFavorites}
                  iconClass={`${
                    addToFavoritesSpinner
                      ? 'actions__btn_spinner'
                      : isProductInFavorites
                        ? 'actions__btn_favorite_checked'
                        : 'actions__btn_favorite'
                  }`}
                />
              </div>
              <button
                onClick={handleProductShare}
                className={`btn-reset ${styles.product__top__price__share}`}
              />
            </div>
          </div>

          <div className={styles.product__top__available}>
            <ProductAvailable
              vendorCode={currentProduct.vendorCode}
              inStock={+currentProduct.inStock}
            />
          </div>
          <ProductColor
            color={currentProduct.characteristics.color}
            className={styles.product__top__color}
          />
          {!!currentProduct.characteristics.collection && (
            <span className={`${styles.product__top__collection}`}>
              <span>{translations[lang].catalog.collection}:</span>{' '}
              {capitalizeFirstLetter(currentProduct.characteristics.collection)}
            </span>
          )}

          {!!Object.keys(currentProduct.sizes).length && (
            <>
              <span className={`${styles.product__top__size}`}>
                <span>{translations[lang].catalog.size}:</span>{' '}
                {selectedSize.toUpperCase()}
              </span>
              <ul className={`list-reset ${styles.product__top__sizes}`}>
                {Object.entries(currentProduct.sizes).map(
                  ([key, value], index) => (
                    <ProductSizesItem
                      key={index}
                      currentSize={[key, value]}
                      selectedSize={selectedSize}
                      currentCartItems={currentCartItems}
                      setSelectedSize={setSelectedSize}
                    />
                  )
                )}
              </ul>
              <ProductSizeTableBtn
                sizes={currentProduct.sizes}
                type={currentProduct.type}
                className={`sizes-table-btn ${styles.product__top__size_btn}`}
              />
            </>
          )}

          <div className={styles.product__top__bottom}>
            <span className={styles.product__top__count}>
              {translations[lang].product.count}
            </span>
            <div className={styles.product__top__inner}>
              {!!selectedSize ? (
                <ProductCounter
                  count={count}
                  totalCount={+currentProduct.inStock}
                  initialCount={+(existingItem?.count || 1)}
                  cartItem={existingItem as ICartItem}
                  updateCountAsync={false}
                  setCount={setCount}
                  className={`counter ${styles.product__top__counter}`}
                />
              ) : (
                <div
                  className={`counter ${styles.product__top__counter}`}
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
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +currentProduct.inStock
                }
                handleAddToCart={addToCart}
                className={styles.product__top__add}
              />
            </div>
          </div>

          <div className={styles.product__top__description}>
            <ProductInfoAccordion
              title={translations[lang].product.description}
            >
              <p className={styles.product__top__description__text}>
                {currentProduct.description}
              </p>
            </ProductInfoAccordion>
            <ProductInfoAccordion
              title={translations[lang].product.characteristics}
            >
              <ul
                className={`list-reset ${styles.product__top__description__characteristics}`}
              >
                {Object.entries(currentProduct.characteristics).map(
                  ([key, value]) => (
                    <li
                      key={key}
                      className={styles.product__top__description__text}
                    >
                      {capitalizeFirstLetter(key)} : {value}
                    </li>
                  )
                )}
              </ul>
            </ProductInfoAccordion>
          </div>
        </div>
      </div>
      <div className={styles.product__bottom}>
        {!!currentProduct.characteristics.collection && (
          <ProductsByCollection
            collection={currentProduct.characteristics.collection}
          />
        )}
        {!!viewedProducts.items?.length && (
          <ViewedProducts viewedProducts={viewedProducts} />
        )}
      </div>
    </>
  )
}
