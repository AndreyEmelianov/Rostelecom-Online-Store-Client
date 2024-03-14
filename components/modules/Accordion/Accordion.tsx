import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { IAccordionProps } from '@/types/modules'

export const Accordion = ({
  children,
  title,
  titleClass,
  rotateIconClass,
}: IAccordionProps) => {
  const [accordionExpanded, setAccordionExpanded] = useState(false)

  const toggleAccordion = () => setAccordionExpanded((prev) => !prev)

  return (
    <>
      <motion.button
        initial={false}
        onClick={toggleAccordion}
        className={`btn-reset ${titleClass} ${rotateIconClass ? (accordionExpanded ? rotateIconClass : '') : ''}`}
      >
        {title}
      </motion.button>
      <AnimatePresence initial={false}>
        {accordionExpanded && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
