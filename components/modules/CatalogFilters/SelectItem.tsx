import { useUnit } from 'effector-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { loadProductsByFilterFx } from '@/context/goods'
import { ISelectItemProps } from '@/types/catalog'

import styles from '@/styles/catalog/index.module.scss'

export const SelectItem = ({
  item,
  isActive,
  mobileClassName,
  setOption,
}: ISelectItemProps) => {
  const selectItemSpinner = useUnit(loadProductsByFilterFx.pending)

  const handleSelectOption = () => {
    if (isActive) {
      return
    }
    setOption(item.title)
    item.filterHandler()
  }

  return (
    <li
      className={`${styles.catalog__filters__list__item} 
      ${selectItemSpinner ? '' : isActive ? styles.option_active : ''} ${mobileClassName || ''}`}
    >
      {selectItemSpinner && isActive && (
        <span
          className={`${styles.catalog__filters__list__item__spinner} ${mobileClassName}`}
        >
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        </span>
      )}
      <button
        onClick={handleSelectOption}
        className={`btn-reset ${styles.catalog__filters__list__item__btn}`}
      >
        {item.title}
      </button>
    </li>
  )
}
