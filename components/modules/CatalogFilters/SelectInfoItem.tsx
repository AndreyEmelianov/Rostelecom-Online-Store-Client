import { ISelectInfoItemProps } from '@/types/catalog'

import styles from '@/styles/catalog/index.module.scss'

export const SelectInfoItem = ({
  id,
  text,
  handleRemoveItem,
}: ISelectInfoItemProps) => {
  const handleClick = () => handleRemoveItem(id)
  return (
    <li className={styles.catalog__filters__bottom__list__item}>
      <span className={styles.catalog__filters__bottom__list__item__text}>
        {text}
      </span>
      <button
        onClick={handleClick}
        className={styles.catalog__filters__bottom__list__item__close}
      />
    </li>
  )
}
