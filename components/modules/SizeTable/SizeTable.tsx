/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import { useUnit } from 'effector-react'
import toast from 'react-hot-toast'

import { $sizeTableSizes } from '@/context/sizeTable'
import { useCartAction } from '@/hooks/useCartAction'
import { $quickViewModalIsOpen } from '@/context/modals'
import { closeSizeTableByCheck, isUserAuth } from '@/lib/utils/common'
import { useLang } from '@/hooks/useLang'
import { AddToCartBtn } from '../ProductsListItem/AddToCartBtn'
import { ProductCountBySize } from '../ProductsListItem/ProductCountBySize'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  $favorites,
  $favoritesFromLS,
  $isAddToFavorites,
  addProductToFavorite,
} from '@/context/favorites'
import { addFavoriteItemToLS } from '@/lib/utils/favorites'
import { useFavoritesActions } from '@/hooks/useFavoriteActions'

import styles from '@/styles/size-table/index.module.scss'

export const SizeTable = () => {
  const quickViewModalIsOpen = useUnit($quickViewModalIsOpen)
  const isAddToFavorites = useUnit($isAddToFavorites)

  const { lang, translations } = useLang()

  const productSizes = useUnit($sizeTableSizes)
  const isHeaddressType = productSizes.type === 'headdress'

  const {
    product,
    selectedSize,
    cartItemBySize,
    addToCartSpinner,
    currentCartItems,
    updateCountSpinner,
    setSelectedSize,
    handleAddToCart,
  } = useCartAction(true)

  const { addToFavoritesSpinner, setAddToFavoritesSpinner } =
    useFavoritesActions(product)

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const currentFavoriteItems = currentFavoritesByAuth.filter(
    (item) => item.productId === product._id
  )
  const favoriteItemBySize = currentFavoriteItems.find(
    (item) => item.size === selectedSize
  )

  const handleSelectSSize = () => setSelectedSize('s')
  const handleSelectMSize = () => setSelectedSize('m')
  const handleSelectLSize = () => setSelectedSize('l')
  const handleSelectXLSize = () => setSelectedSize('xl')
  const handleSelectXXLSize = () => setSelectedSize('xxl')

  const isSizeSelected = (size: string) => selectedSize === size
  const checkIsInFavorites = (size: string) =>
    currentFavoriteItems.find((item) => item.size === size)

  const headdressSizes = [
    {
      id: 1,
      headCircumference: '55',
      manufacturerSize: 'S',
      selectHandler: handleSelectSSize,
      isSelected: isSizeSelected('s'),
      isAvailable: productSizes.sizes.s,
      isInFavorites: checkIsInFavorites('s'),
    },
    {
      id: 2,
      headCircumference: '56-57',
      manufacturerSize: 'M',
      selectHandler: handleSelectMSize,
      isSelected: isSizeSelected('m'),
      isAvailable: productSizes.sizes.m,
      isInFavorites: checkIsInFavorites('m'),
    },
    {
      id: 3,
      headCircumference: '58-59',
      manufacturerSize: 'L',
      selectHandler: handleSelectLSize,
      isSelected: isSizeSelected('l'),
      isAvailable: productSizes.sizes.l,
      isInFavorites: checkIsInFavorites('l'),
    },
    {
      id: 4,
      headCircumference: '60-61',
      manufacturerSize: 'XL',
      selectHandler: handleSelectXLSize,
      isSelected: isSizeSelected('xl'),
      isAvailable: productSizes.sizes.xl,
      isInFavorites: checkIsInFavorites('xl'),
    },
    {
      id: 5,
      headCircumference: '62-63',
      manufacturerSize: 'XXL',
      selectHandler: handleSelectXXLSize,
      isSelected: isSizeSelected('xxl'),
      isAvailable: productSizes.sizes.xxl,
      isInFavorites: checkIsInFavorites('xxl'),
    },
  ]

  const dressSizes = [
    {
      id: 1,
      russianSize: '44-46',
      manufacturerSize: 'S',
      bust: '78-82',
      waist: '58-62',
      hipGirth: '86-90',
      selectHandler: handleSelectSSize,
      isSelected: isSizeSelected('s'),
      isAvailable: productSizes.sizes.s,
      isInFavorites: checkIsInFavorites('s'),
    },
    {
      id: 2,
      russianSize: '48-50',
      manufacturerSize: 'M',
      bust: '82-86',
      waist: '62-66',
      hipGirth: '90-94',
      selectHandler: handleSelectMSize,
      isSelected: isSizeSelected('m'),
      isAvailable: productSizes.sizes.m,
      isInFavorites: checkIsInFavorites('m'),
    },
    {
      id: 3,
      russianSize: '50',
      manufacturerSize: 'L',
      bust: '86-90',
      waist: '66-70',
      hipGirth: '94-98',
      selectHandler: handleSelectLSize,
      isSelected: isSizeSelected('l'),
      isAvailable: productSizes.sizes.l,
      isInFavorites: checkIsInFavorites('l'),
    },
    {
      id: 4,
      russianSize: '52-54',
      manufacturerSize: 'XL',
      bust: '90-94',
      waist: '70-74',
      hipGirth: '98-102',
      selectHandler: handleSelectXLSize,
      isSelected: isSizeSelected('xl'),
      isAvailable: productSizes.sizes.xl,
      isInFavorites: checkIsInFavorites('xl'),
    },
    {
      id: 5,
      russianSize: '56',
      manufacturerSize: 'XXL',
      bust: '94-98',
      waist: '74-78',
      hipGirth: '102-106',
      selectHandler: handleSelectXXLSize,
      isSelected: isSizeSelected('xxl'),
      isAvailable: productSizes.sizes.xxl,
      isInFavorites: checkIsInFavorites('xxl'),
    },
  ]

  const handleCloseSizeTable = () => closeSizeTableByCheck(quickViewModalIsOpen)

  const addToCart = () => handleAddToCart(+(cartItemBySize?.count || 1))

  const trProps = (
    item:
      | {
          id: number
          russianSize: string
          manufacturerSize: string
          bust: string
          waist: string
          hipGirth: string
          isSelected: boolean
          isAvailable: boolean
          selectHandler: () => void
        }
      | {
          id: number
          headCircumference: string
          manufacturerSize: string
          isSelected: boolean
          isAvailable: boolean
          selectHandler: () => void
        }
  ) => ({
    onClick: item.selectHandler,
    style: {
      backgroundColor:
        item.isSelected || selectedSize === item.manufacturerSize.toLowerCase()
          ? '#9466ff'
          : 'transparent',
      pointerEvents: item.isAvailable ? 'auto' : 'none',
      opacity: item.isAvailable ? 1 : 0.5,
      color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
    },
  })

  const handleAddProductToFavorites = () => {
    if (!isUserAuth()) {
      addFavoriteItemToLS(product, selectedSize)
      return
    }
    if (favoriteItemBySize) {
      toast.success('Товар добавлен в избранное!')
      return
    }

    const auth = JSON.parse(localStorage.getItem('rostelekomAuth') as string)
    const clientId = addFavoriteItemToLS(product, selectedSize, false)

    addProductToFavorite({
      jwt: auth.accessToken,
      clientId,
      productId: product._id,
      size: selectedSize,
      category: product.category,
      setSpinner: setAddToFavoritesSpinner,
    })
  }

  return (
    <div
      className={`${styles.size_table} ${isHeaddressType ? styles.size_table_headdress : ''}`}
    >
      <button
        className={`btn-reset ${styles.size_table__close}`}
        onClick={handleCloseSizeTable}
      />
      <h2 className={styles.size_table__title}>
        {translations[lang].size_table.title}
      </h2>
      <div className={styles.size_table__inner}>
        <table className={styles.size_table__table}>
          <thead>
            {isHeaddressType ? (
              <tr>
                <th> {translations[lang].size_table.hip_circumference}</th>
                <th> {translations[lang].size_table.size}</th>
              </tr>
            ) : (
              <tr>
                <th> {translations[lang].size_table.russian_size}</th>
                <th> {translations[lang].size_table.manufacturer_size}</th>
                <th> {translations[lang].size_table.chest_circumference}</th>
                <th> {translations[lang].size_table.waist_circumference}</th>
                <th> {translations[lang].size_table.hip_circumference}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isHeaddressType
              ? headdressSizes.map((headdressSizesItem) => (
                  <tr
                    key={headdressSizesItem.id}
                    {...(trProps(
                      headdressSizesItem
                    ) as React.HTMLAttributes<HTMLTableRowElement>)}
                  >
                    <td>
                      {headdressSizesItem.isInFavorites && (
                        <span className={styles.size_table__favorite} />
                      )}
                      {headdressSizesItem.headCircumference}
                    </td>
                    <td>
                      <ProductCountBySize
                        products={currentCartItems}
                        size={headdressSizesItem.manufacturerSize}
                      />
                      {headdressSizesItem.manufacturerSize}
                    </td>
                  </tr>
                ))
              : dressSizes.map((dressSizesItem) => (
                  <tr
                    key={dressSizesItem.id}
                    {...(trProps(
                      dressSizesItem
                    ) as React.HTMLAttributes<HTMLTableRowElement>)}
                  >
                    <td>
                      {dressSizesItem.isInFavorites && (
                        <span className={styles.size_table__favorite} />
                      )}
                      {dressSizesItem.russianSize}
                    </td>
                    <td>{dressSizesItem.manufacturerSize}</td>
                    <td>{dressSizesItem.bust}</td>
                    <td>{dressSizesItem.waist}</td>
                    <td>
                      <ProductCountBySize
                        products={currentCartItems}
                        size={dressSizesItem.manufacturerSize}
                      />
                      {dressSizesItem.hipGirth}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <AddToCartBtn
        className={styles.size_table__btn}
        text={
          isAddToFavorites
            ? translations[lang].product.to_favorite
            : translations[lang].product.to_cart
        }
        btnDisabled={
          !!!selectedSize ||
          addToCartSpinner ||
          updateCountSpinner ||
          addToFavoritesSpinner
        }
        addToCartSpinner={
          addToCartSpinner || updateCountSpinner || addToFavoritesSpinner
        }
        handleAddToCart={
          isAddToFavorites ? handleAddProductToFavorites : addToCart
        }
      />
    </div>
  )
}
