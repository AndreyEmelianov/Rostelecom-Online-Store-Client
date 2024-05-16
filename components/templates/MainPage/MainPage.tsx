import { useGate } from 'effector-react'

import { Categories } from '@/components/modules/MainPage/Categories/Categories'
import { Hero } from '@/components/modules/MainPage/Hero/Hero'
import { MainPageGate } from '@/context/goods'

export const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero />
      <Categories />
    </main>
  )
}
