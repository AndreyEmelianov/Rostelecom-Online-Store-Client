import { MutableRefObject, useEffect, useRef, useState } from 'react'

export const useClickOutside = () => {
  const [open, setOpen] = useState(false)

  const ref = useRef() as MutableRefObject<HTMLDivElement>

  const toggleOpen = () => setOpen(!open)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current.contains(event.target as HTMLDivElement)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  return { open, ref, setOpen, toggleOpen }
}
