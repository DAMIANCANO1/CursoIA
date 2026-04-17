import { motion } from 'framer-motion'
import { INSTAGRAM_URL } from '../data/productos'
import { useScrollColors } from '../context/ScrollContext'

export default function Header() {
  const { fgColor, headerBg, borderRgba } = useScrollColors()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 backdrop-blur-sm"
    >
      {/* Logotipo */}
      <motion.span
        style={{ color: fgColor, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.3em' }}
        className="uppercase text-sm font-semibold"
      >
        IN MATERIAL
      </motion.span>

      {/* CTA secundario */}
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: fgColor,
          borderColor: borderRgba,
          fontFamily: 'Space Mono, monospace',
          border: '1px solid',
        }}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0.7 }}
        className="text-xs tracking-widest uppercase px-4 py-2"
      >
        @inmxterial
      </motion.a>
    </motion.header>
  )
}
