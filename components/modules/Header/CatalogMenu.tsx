'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

import { $catalogMenuIsOpen, closeCatalogMenu } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import { Header } from './Header'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CatalogMenuButton } from './CatalogMenuButton'
import { CatalogMenuList } from './CatalogMenuList'
import { Accordion } from '../Accordion/Accordion'

export const CatalogMenu = () => {
  const [activeListId, setActiveListId] = useState(0)

  const { lang, translations } = useLang()
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen)
  const { popupZIndex, itemVariants, sideVariants } = useMenuAnimation(
    2,
    catalogMenuIsOpen
  )

  const isMedia450 = useMediaQuery(450)

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeCatalogMenu()
    setActiveListId(0)
  }

  const isActiveList = (id: number) => activeListId === id

  const items = [
    {
      name: translations[lang].main_menu.cloth,
      id: 1,
      items: [
        translations[lang].comparison['t-shirts'],
        translations[lang].comparison['long-sleeves'],
        translations[lang].comparison.hoodie,
        translations[lang].comparison.outerwear,
      ],
      handler: () => setActiveListId(1),
    },
    {
      name: translations[lang].main_menu.accessories,
      id: 2,
      items: [
        translations[lang].comparison.bags,
        translations[lang].comparison.headdress,
        translations[lang].comparison.umbrella,
      ],
      handler: () => setActiveListId(2),
    },
    {
      name: translations[lang].main_menu.souvenirs,
      id: 3,
      items: [
        translations[lang].comparison['business-souvenirs'],
        translations[lang].comparison['promotional-souvenirs'],
      ],
      handler: () => setActiveListId(3),
    },
    {
      name: translations[lang].main_menu.office,
      id: 4,
      items: [
        translations[lang].comparison.notebook,
        translations[lang].comparison.pen,
      ],
      handler: () => setActiveListId(4),
    },
  ]

  return (
    <div className='catalog-menu' style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.15 },
            }}
            className='catalog-menu__aside'
          >
            <div className='catalog-menu__header'>
              <Header />
            </div>
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className='btn-reset catalog-menu__close'
                variants={itemVariants}
                onClick={handleCloseMenu}
              />
              <motion.h2
                className='catalog-menu__title'
                variants={itemVariants}
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                {items.map(({ id, name, items, handler }) => {
                  const buttonProps = (isActive: boolean) => ({
                    name,
                    isActive,
                    handler: handler as VoidFunction,
                  })

                  const isCurrentList = (
                    showList: boolean,
                    currentId: number
                  ) => showList && id === currentId
                  return (
                    <motion.li
                      key={id}
                      variants={itemVariants}
                      className='list-reset catalog-menu__list__item'
                    >
                      {!isMedia450 && (
                        <>
                          {id === 1 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(1))}
                            />
                          )}
                          {id === 2 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(2))}
                            />
                          )}
                          {id === 3 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(3))}
                            />
                          )}
                          {id === 4 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(4))}
                            />
                          )}
                        </>
                      )}
                      {!isMedia450 && (
                        <AnimatePresence>
                          {isCurrentList(isActiveList(1), 1) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(isActiveList(2), 2) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(isActiveList(3), 3) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(isActiveList(4), 4) && (
                            <CatalogMenuList items={items} />
                          )}
                        </AnimatePresence>
                      )}
                      {isMedia450 && (
                        <Accordion
                          title={name}
                          titleClass='btn-reset nav-menu__accordion__item__title'
                        >
                          <ul className='list-reset catalog__accordion__list'>
                            {items.map((title, index) => (
                              <li
                                key={index}
                                className='catalog__accordion__list__item'
                              >
                                <Link
                                  href='/catalog'
                                  className='nav-menu__accordion__item__list__item__link'
                                >
                                  {title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
