/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { useLang } from '@/hooks/useLang'
import { IProductsListItemProps } from '@/types/modules'
import { ProductSubtitle } from '@/components/elements/ProductSubtitle/ProductSubtitle'
import {
  addOverflowHiddenToBody,
  formatPrice,
  isItemInList,
} from '@/lib/utils/common'
import { ProductLabel } from './ProductLabel'
import { ProductsItemActionBtn } from '@/components/elements/ProductsItemActionBtn/ProductsItemActionBtn'
import { ProductAvailable } from '@/components/elements/ProductAvailable/ProductAvailable'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { openQuickViewModal } from '@/context/modals'
import { setCurrentProduct } from '@/context/goods'
import { productWithoutSizes } from '@/constants/product'
import { useCartAction } from '@/hooks/useCartAction'
import { addProductToCartBySizeTable } from '@/lib/utils/cart'
import { setIsAddToFavorites } from '@/context/favorites'
import { useFavoritesActions } from '@/hooks/useFavoriteActions'
import { useComparisonAction } from '@/hooks/useComparisonAction'

import styles from '@/styles/products-list-item/index.module.scss'
import stylesAd from '@/styles/ad/index.module.scss'

export const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
  const { lang, translations } = useLang()

  const { addToCartSpinner, currentCartByAuth, setAddToCartSpinner } =
    useCartAction()

  const {
    addToFavoritesSpinner,
    isProductInFavorites,
    handleAddProductToFavorites,
  } = useFavoritesActions(item)

  const {
    isProductInComparison,
    addToComparisonSpinner,
    handleAddToComparison,
  } = useComparisonAction(item)

  const isProductInCart = isItemInList(currentCartByAuth, item._id)

  const isTitleForNew = title === translations[lang].main_page.new_title

  const isMedia800 = useMediaQuery(800)

  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    openQuickViewModal()
    setCurrentProduct(item)
  }

  const addToCart = () => {
    setIsAddToFavorites(false)
    addProductToCartBySizeTable(item, 1, '', setAddToCartSpinner)
  }

  return (
    <>
      {item.characteristics.collection === 'line' &&
      item.type === 't-shirts' ? (
        <li className={styles.list__item_ad}>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
            className={styles.list__item_ad__inner}
          >
            <span className={`${stylesAd.ad} ${styles.list__item_ad__ad}`}>
              {translations[lang].common.ad}
            </span>
            <ProductSubtitle
              subtitleClassName={styles.list__item_ad__subtitle}
              subtitleRectClassName={styles.list__item_ad__subtitle__rect}
            />
            <div className={styles.list__item_ad__img}>
              <Image
                src={item.images[0]}
                alt={item.name}
                width={224}
                height={275}
              />
            </div>
            <p className={styles.list__item_ad__title}>
              <span>
                {translations[lang].main_page.tShirt} «Line»{' '}
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  translations[lang].main_page[
                    item.images[0].split('/img/').join('').split('-')[0]
                  ]
                }
              </span>
              <span>{formatPrice(+item.price)} ₽</span>
            </p>
          </Link>
        </li>
      ) : (
        <li className={styles.list__item}>
          {title ? (
            <span
              className={`${styles.list__item__label} ${
                isTitleForNew
                  ? styles.list__item__new
                  : styles.list__item__bestseller
              }`}
            >
              {isTitleForNew
                ? translations[lang].main_page.is_new
                : translations[lang].main_page.is_bestseller}
            </span>
          ) : !item.isNew && !item.isBestseller ? (
            ''
          ) : (
            <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
          )}
          <div className={styles.list__item__actions}>
            <ProductsItemActionBtn
              text={translations[lang].product.add_to_favorites}
              spinner={addToFavoritesSpinner}
              iconClass={`${
                addToFavoritesSpinner
                  ? 'actions__btn_spinner'
                  : isProductInFavorites
                    ? 'actions__btn_favorite_checked'
                    : 'actions__btn_favorite'
              }`}
              callback={handleAddProductToFavorites}
            />
            <ProductsItemActionBtn
              text={translations[lang].product.add_to_comparison}
              spinner={addToComparisonSpinner}
              callback={handleAddToComparison}
              iconClass={`${
                addToComparisonSpinner
                  ? 'actions__btn_spinner'
                  : isProductInComparison
                    ? 'actions__btn_comparison_checked'
                    : 'actions__btn_comparison'
              }`}
            />
            {!isMedia800 && (
              <ProductsItemActionBtn
                text={translations[lang].product.quick_view}
                iconClass='actions__btn_quick_view'
                callback={handleShowQuickViewModal}
              />
            )}
          </div>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
            className={styles.list__item__img}
          >
            <Image src={item.images[0]} alt={item.name} fill />
          </Link>
          <div className={styles.list__item__inner}>
            <h3 className={styles.list__item__title}>
              <Link href={`/catalog/${item.category}/${item._id}`}>
                {item.name}
              </Link>
            </h3>
            <ProductAvailable
              vendorCode={item.vendorCode}
              inStock={+item.inStock}
            />
            <span className={styles.list__item__price}>
              {formatPrice(+item.price)} ₽
            </span>
          </div>
          {productWithoutSizes.includes(item.type) ? (
            <button
              className={`btn-reset ${styles.list__item__cart} ${isProductInCart ? styles.list__item__cart_added : ''}`}
              style={addToCartSpinner ? { minWidth: 125, height: 48 } : {}}
              onClick={addToCart}
              disabled={addToCartSpinner}
            >
              {addToCartSpinner ? (
                <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
              ) : isProductInCart ? (
                translations[lang].product.in_cart
              ) : (
                translations[lang].product.to_cart
              )}
            </button>
          ) : (
            <button
              className={`btn-reset ${styles.list__item__cart}`}
              onClick={addToCart}
            >
              {translations[lang].product.to_cart}
            </button>
          )}
        </li>
      )}
    </>
  )
}
