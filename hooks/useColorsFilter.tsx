import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { useLang } from './useLang'
import {
  setColors,
  setColorsOptions,
  updateColorsOptionByCode,
} from '@/context/catalog'
import { getCheckedArrayParam, getSearchParamsUrl } from '@/lib/utils/common'
import { $colorsOptions, $colors } from '@/context/catalog/state'

export const useColorsFilter = (
  handleApplyFiltersWithColors: (arg0: string[]) => void
) => {
  const { lang, translations } = useLang()

  const colorsOptions = useUnit($colorsOptions)
  const colors = useUnit($colors)

  const handleSelectColor = (id: number) => {
    const updatedColorsOptions = colorsOptions.map((colorsOption) =>
      colorsOption.id === id
        ? { ...colorsOption, checked: !colorsOption.checked }
        : colorsOption
    )

    setColorsOptions(updatedColorsOptions)

    const currentOption = updatedColorsOptions.find(
      (currentOption) => currentOption.id === id
    )

    if (currentOption && currentOption.checked) {
      setColors([...colors, currentOption.colorText])
      handleApplyFiltersWithColors(
        updatedColorsOptions
          .filter((option) => option.checked)
          .map((option) => option.colorCode)
      )
      return
    }

    const updatedColorsByText = colors.filter(
      (color) => color !== currentOption?.colorText
    )

    const updatedColorsByCode = updatedColorsByText.map(
      (color) =>
        colorsOptions.find((option) => option.colorText === color)?.colorCode
    )

    setColors(updatedColorsByText)
    handleApplyFiltersWithColors(updatedColorsByCode as string[])
  }

  useEffect(() => {
    const urlParam = getSearchParamsUrl()
    const colorsParam = urlParam.get('colors')

    const updatedColorsOptions = colorsOptions.map((option) => ({
      ...option,
      colorText: (translations[lang].catalog as { [index: string]: string })[
        option.colorCode
      ],
    }))

    setColorsOptions(updatedColorsOptions)
    setColors(
      updatedColorsOptions
        .filter((option) => option.checked)
        .map((option) => option.colorText)
    )

    if (colorsParam) {
      const validColors = getCheckedArrayParam(colorsParam)
      if (validColors) {
        setColors(
          validColors.map(
            (color) =>
              (translations[lang].catalog as { [index: string]: string })[color]
          )
        )
        handleApplyFiltersWithColors(validColors)
        validColors.forEach((color) => updateColorsOptionByCode(color))
      }
      return
    }

    setColors([])
    setColorsOptions(
      colorsOptions.map((option) => ({
        ...option,
        checked: false,
        colorText: (translations[lang].catalog as { [index: string]: string })[
          option.colorCode
        ],
      }))
    )
  }, [lang])

  return {
    colors,
    colorsOptions,
    handleSelectColor,
  }
}
