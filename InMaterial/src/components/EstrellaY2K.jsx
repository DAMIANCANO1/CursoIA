import { motion } from 'framer-motion'

// Destello de 4 puntas ultra-agudo — inner radius ~1.7, outer radius ~12
// Es la forma clásica del "sparkle" Y2K presente en la referencia visual de la sudadera
const RUTA = 'M 12 0 L 13.2 10.8 L 24 12 L 13.2 13.2 L 12 24 L 10.8 13.2 L 0 12 L 10.8 10.8 Z'

export default function EstrellaY2K({
  size = 20,
  color = '#FFFFFF',
  className = '',
  style = {},
  delay = 0,
  duracion = 10,
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ pointerEvents: 'none', ...style }}
      animate={{
        rotate:  [0, 360],
        opacity: [0.3, 1, 0.3],
        scale:   [0.85, 1.1, 0.85],
      }}
      transition={{
        rotate:  { duration: duracion,        repeat: Infinity, ease: 'linear' },
        opacity: { duration: duracion * 0.45, repeat: Infinity, ease: 'easeInOut', delay },
        scale:   { duration: duracion * 0.45, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    >
      <path d={RUTA} fill={color} />
    </motion.svg>
  )
}
