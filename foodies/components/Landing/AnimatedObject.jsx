import React from 'react'
import { motion } from 'framer-motion'

function AnimatedObject({className, children, variants, initial, animate, custom}) {
  return (
    <motion.div 
      className={`${className?className:""}`}
      variants={variants}
      initial={initial&&"initial"}
      animate={animate&&"animate"}
      custom={custom}
    >
        {children}
    </motion.div>
  )
}

export default AnimatedObject