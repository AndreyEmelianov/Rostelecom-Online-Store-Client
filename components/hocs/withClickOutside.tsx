'use client'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { IWrappedComponentProps } from '@/types/hocs'
import { useClickOutside } from '@/hooks/useClickOutside'

export const withClickOutside = (
  WrappedComponent: ForwardRefExoticComponent<
    IWrappedComponentProps & RefAttributes<HTMLDivElement>
  >
) => {
  const Component = () => {
    const { open, ref, setOpen } = useClickOutside()

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
  }
  return Component
}
