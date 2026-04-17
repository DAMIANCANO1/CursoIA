import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollColors } from '../context/ScrollContext'
import EstrellaY2K from './EstrellaY2K'

const TITULO  = 'IN MATERIAL'
const ESLOGAN = 'Físicamente en MX, estéticamente Inmaterial. 444'

// ── Animación letra por letra ──────────────────────────────────────────────
// El contenedor orquesta el stagger; cada letra tiene la misma variant simple.
// staggerChildren: 0.065 → cada letra espera 65ms antes de empezar.
// El resultado es un "sweep" de izquierda a derecha limpio y legible.
const tituloContenedor = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren:   0.25,
    },
  },
}

const letraVariante = {
  hidden:  { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}
// ──────────────────────────────────────────────────────────────────────────

// Estrellas Y2K — posiciones en % del viewport (funciona en mobile y desktop)
const ESTRELLAS = [
  { top: '17%', left:  '5%',  size: 14, delay: 0.2,  dur: 9  },
  { top: '21%', right: '6%',  size: 22, delay: 0.8,  dur: 12 },
  { top: '43%', left:  '3%',  size: 10, delay: 1.4,  dur: 8  },
  { top: '47%', right: '4%',  size: 17, delay: 0.5,  dur: 11 },
  { top: '67%', left:  '13%', size: 18, delay: 1.0,  dur: 10 },
  { top: '70%', right: '12%', size: 12, delay: 0.3,  dur: 7  },
  { top: '32%', left:  '43%', size: 8,  delay: 1.2,  dur: 13 },
]

export default function Intro() {
  const { fgColor, mutedColor } = useScrollColors()

  // ── Typewriter del eslogan ────────────────────────────────────────────
  // La última letra del título anima a ~1.65s (0.25 + 10×0.065 + 0.75)
  // El typewriter arranca a 1.9s para dar un respiro visual.
  const [textoVisible, setTextoVisible] = useState('')
  const [escribiendo, setEscribiendo]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEscribiendo(true), 1900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!escribiendo) return
    let i = 0
    const intv = setInterval(() => {
      i++
      setTextoVisible(ESLOGAN.slice(0, i))
      if (i >= ESLOGAN.length) { clearInterval(intv); setEscribiendo(false) }
    }, 38)
    return () => clearInterval(intv)
  }, [escribiendo])
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">

      {/* ── Estrellas Y2K (aparecen después del título) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.4 }}
      >
        {ESTRELLAS.map((s, i) => (
          <EstrellaY2K
            key={i}
            size={s.size}
            color="#FFFFFF"
            delay={s.delay}
            duracion={s.dur}
            style={{ position: 'absolute', top: s.top, bottom: s.bottom, left: s.left, right: s.right }}
          />
        ))}
      </motion.div>

      {/* ── Contenido central (z-10) ── */}
      <div className="relative flex flex-col items-center gap-6 text-center px-6" style={{ zIndex: 10 }}>

        {/* TÍTULO: cada letra es un motion.span orquestado por tituloContenedor */}
        <motion.h1
          variants={tituloContenedor}
          initial="hidden"
          animate="visible"
          className="font-black tracking-tighter uppercase leading-none"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(3.2rem, 14vw, 11.5rem)',
          }}
        >
          {TITULO.split('').map((letra, i) => (
            <motion.span
              key={i}
              variants={letraVariante}
              style={{
                display: letra === ' ' ? 'inline' : 'inline-block',
                color: fgColor,
              }}
            >
              {letra === ' ' ? '\u00A0' : letra}
            </motion.span>
          ))}
        </motion.h1>

        {/* Separador — aparece al terminar el último carácter */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-14 h-px origin-left"
          style={{ backgroundColor: mutedColor }}
        />

        {/* ESLOGAN: typewriter dentro de un contenedor con fade-in propio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 0.4 }}
          className="h-5 flex items-center"
        >
          <p
            style={{
              color: mutedColor,
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(9px, 1.2vw, 12px)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            {textoVisible}
            {escribiendo && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                style={{ color: mutedColor }}
              >
                │
              </motion.span>
            )}
          </p>
        </motion.div>
      </div>

      {/* ── Indicador de scroll ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
        style={{ zIndex: 10 }}
      >
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          style={{ color: mutedColor, fontFamily: 'Space Mono, monospace' }}
          className="text-[9px] tracking-[0.6em] uppercase"
        >
          SCROLL
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ backgroundColor: mutedColor }}
          className="w-px h-7 opacity-40"
        />
      </motion.div>
    </section>
  )
}
