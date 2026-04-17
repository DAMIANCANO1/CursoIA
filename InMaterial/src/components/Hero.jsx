import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { INSTAGRAM_URL, coleccion } from '../data/productos'
import Carrusel from './Carrusel'
import EstrellaY2K from './EstrellaY2K'

function IconoIG({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

const contenedor = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}

const item = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const ESTRELLAS_HERO = [
  { top: '18%', right: '38%', size: 11, delay: 0.4, dur: 11 },
  { top: '55%', left:  '38%', size: 8,  delay: 1.1, dur: 9  },
  { bottom: '22%', right: '6%', size: 13, delay: 0.7, dur: 13 },
]

export default function Hero() {
  const producto = coleccion[0]

  const sectionRef = useRef(null)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(sectionProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center overflow-hidden"
    >

      {/* ── Estrellas Y2K decorativas ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      >
        {ESTRELLAS_HERO.map((s, i) => (
          <EstrellaY2K
            key={i}
            size={s.size}
            color="rgba(0,0,0,0.18)"
            delay={s.delay}
            duracion={s.dur}
            style={{ position: 'absolute', top: s.top, bottom: s.bottom, left: s.left, right: s.right }}
          />
        ))}
      </motion.div>

      {/* ── Línea decorativa izquierda ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-6 top-0 bottom-0 w-px origin-top opacity-10 pointer-events-none bg-neutral-900"
      />

      {/* ── Layout principal (z-10) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12 md:gap-0 pt-28 pb-16 md:py-0">

        {/* COLUMNA DE TEXTO */}
        <motion.div
          variants={contenedor}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex-1 flex flex-col items-start gap-5 md:gap-6"
        >
          {/* Tag colección */}
          <motion.p
            variants={item}
            className="text-xs tracking-[0.4em] uppercase text-neutral-500"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            THE 444 COLLECTION
          </motion.p>

          {/* Título DROP / 444 */}
          <motion.h2
            variants={item}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter uppercase"
          >
            <span className="text-neutral-900">DROP</span>
            <br />
            <span className="text-neutral-600">444</span>
          </motion.h2>

          {/* Descripción */}
          <motion.div variants={item} className="relative max-w-xs">
            <EstrellaY2K
              size={10}
              color="rgba(0,0,0,0.18)"
              delay={0.5}
              duracion={8}
              style={{ position: 'absolute', top: '-6px', right: '-16px' }}
            />
            <p
              className="text-sm leading-relaxed text-neutral-600"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              {producto.descripcion}
            </p>
          </motion.div>

          {/* Tallas */}
          <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs tracking-widest uppercase text-neutral-500"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              TALLAS:
            </span>
            {producto.tallas.map((talla) => (
              <span
                key={talla}
                className="text-xs px-2 py-1 text-neutral-700 border border-neutral-300"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                {talla}
              </span>
            ))}
          </motion.div>

          {/* CTA principal */}
          <motion.div variants={item} className="w-full max-w-md">
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, filter: 'brightness(0.85)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full inline-flex items-center justify-center gap-3 bg-black text-white py-5 px-10 text-xl font-bold tracking-widest uppercase cursor-pointer select-none"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <IconoIG size={18} />
              Comprar vía DM
            </motion.a>
          </motion.div>

          {/* Nota editorial */}
          <motion.p
            variants={item}
            className="text-xs text-neutral-400"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            — EDICIÓN LIMITADA / STOCK REDUCIDO
          </motion.p>
        </motion.div>

        {/* COLUMNA DE IMAGEN con parallax */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center md:justify-end"
          style={{ y: imageY }}
        >
          <Carrusel imagenes={producto.imagenes} />
        </motion.div>
      </div>
    </section>
  )
}
