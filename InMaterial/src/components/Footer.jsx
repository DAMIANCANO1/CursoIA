import { motion } from 'framer-motion'
import { INSTAGRAM_URL } from '../data/productos'
import { useScrollColors } from '../context/ScrollContext'

const AÑO = new Date().getFullYear()

export default function Footer() {
  const { fgColor, mutedColor, borderRgba } = useScrollColors()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ borderColor: borderRgba }}
      className="relative z-10 w-full border-t px-6 py-10 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      {/* Marca y copyright */}
      <p
        style={{
          color: mutedColor,
          fontFamily: 'Space Mono, monospace',
          letterSpacing: '0.25em',
        }}
        className="text-[10px] uppercase"
      >
        © {AÑO}{' '}
        <motion.span
          style={{ color: fgColor }}
          className="font-semibold"
        >
          IN MATERIAL
        </motion.span>
        {' '}— Todos los derechos reservados.
      </p>

      {/* Aviso de marca registrada */}
      <p
        style={{
          color: mutedColor,
          fontFamily: 'Space Mono, monospace',
          letterSpacing: '0.15em',
        }}
        className="text-[9px] uppercase text-center"
      >
        IN MATERIAL™ es una marca registrada. Queda prohibida la reproducción parcial o total
        de su identidad visual sin autorización expresa.
      </p>

      {/* Link Instagram */}
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0.6 }}
        style={{
          color: mutedColor,
          fontFamily: 'Space Mono, monospace',
          letterSpacing: '0.25em',
        }}
        className="text-[10px] uppercase hover:underline"
      >
        @inmxterial
      </motion.a>
    </motion.footer>
  )
}
