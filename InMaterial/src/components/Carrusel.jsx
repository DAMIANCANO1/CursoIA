import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollColors } from '../context/ScrollContext'

const UMBRAL_SWIPE = 50

function IconoFlecha({ direccion }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {direccion === 'izq'
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />
      }
    </svg>
  )
}

const variantes = {
  entrar: (dir) => ({ x: dir > 0 ?  '100%' : '-100%', opacity: 0 }),
  centro: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  salir:  (dir) => ({ x: dir > 0 ? '-100%' :  '100%', opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Carrusel({ imagenes = [] }) {
  const { fgColor, borderRgba, overlayBg, cardBg, dimColor } = useScrollColors()
  const [indice, setIndice] = useState(0)
  const [direccionSlide, setDireccionSlide] = useState(1)

  function ir(nuevoIndice) {
    setDireccionSlide(nuevoIndice > indice ? 1 : -1)
    setIndice(nuevoIndice)
  }

  const anterior  = () => ir(indice === 0 ? imagenes.length - 1 : indice - 1)
  const siguiente = () => ir(indice === imagenes.length - 1 ? 0 : indice + 1)

  function alSoltarDrag(_, info) {
    if (info.offset.x < -UMBRAL_SWIPE) siguiente()
    else if (info.offset.x > UMBRAL_SWIPE) anterior()
  }

  return (
    <motion.div
      style={{ borderColor: borderRgba, border: '1px solid' }}
      className="relative w-72 h-96 md:w-80 md:h-[480px] lg:w-96 lg:h-[560px] select-none"
    >
      {/* Esquinas decorativas */}
      {[['top-0 left-0 border-t border-l', 'tl'], ['top-0 right-0 border-t border-r', 'tr'],
        ['bottom-0 left-0 border-b border-l', 'bl'], ['bottom-0 right-0 border-b border-r', 'br']].map(([cls, key]) => (
        <motion.div
          key={key}
          style={{ borderColor: borderRgba }}
          className={`absolute w-5 h-5 z-10 pointer-events-none ${cls}`}
        />
      ))}

      {/* Marco de imagen */}
      <motion.div
        style={{ backgroundColor: cardBg }}
        className="absolute inset-0 overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direccionSlide} mode="popLayout">
          <motion.img
            key={indice}
            src={imagenes[indice]}
            alt={`Imagen ${indice + 1}`}
            custom={direccionSlide}
            variants={variantes}
            initial="entrar"
            animate="centro"
            exit="salir"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={alSoltarDrag}
            className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>

      {/* Flechas */}
      {imagenes.length > 1 && (
        <>
          {[{ fn: anterior, pos: 'left-3', dir: 'izq', label: 'Imagen anterior' },
            { fn: siguiente, pos: 'right-3', dir: 'der', label: 'Siguiente imagen' }].map(({ fn, pos, dir, label }) => (
            <motion.button
              key={dir}
              onClick={fn}
              style={{ backgroundColor: overlayBg, borderColor: borderRgba, color: fgColor, border: '1px solid' }}
              whileHover={{ scale: 1.1, opacity: 0.9 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center opacity-60`}
              aria-label={label}
            >
              <IconoFlecha direccion={dir} />
            </motion.button>
          ))}
        </>
      )}

      {/* Indicadores de posición (líneas) */}
      {imagenes.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {imagenes.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => ir(i)}
              style={{ backgroundColor: fgColor, minWidth: 8 }}
              animate={{ width: i === indice ? 20 : 8, opacity: i === indice ? 0.9 : 0.25 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-px rounded-full"
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      <motion.div
        style={{ color: dimColor, fontFamily: 'Space Mono, monospace' }}
        className="absolute top-3 right-4 z-20 text-xs tracking-widest"
      >
        {String(indice + 1).padStart(2, '0')} / {String(imagenes.length).padStart(2, '0')}
      </motion.div>
    </motion.div>
  )
}
