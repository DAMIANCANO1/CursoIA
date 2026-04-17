import { useEffect, useMemo } from 'react'

const N_PUNTOS = 68
const N_Y2K    = 20
const RUTA_Y2K = 'M 12 0 L 13.2 10.8 L 24 12 L 13.2 13.2 L 12 24 L 10.8 13.2 L 0 12 L 10.8 10.8 Z'

function rand(min, max) { return min + Math.random() * (max - min) }

function generarCampo() {
  const puntos = Array.from({ length: N_PUNTOS }, (_, i) => ({
    id:     `p${i}`,
    tipo:   'punto',
    x:      rand(0, 100),
    y:      rand(0, 100),
    size:   rand(0.8, 2.8),
    opMax:  rand(0.15, 0.78),
    dur:    rand(1.8, 5.5),
    delay:  rand(0, 6),
  }))

  const y2k = Array.from({ length: N_Y2K }, (_, i) => ({
    id:     `y${i}`,
    tipo:   'y2k',
    x:      rand(0, 100),
    y:      rand(0, 100),
    size:   rand(5, 13),
    opMax:  rand(0.07, 0.30),
    dur:    rand(3, 7.5),
    delay:  rand(0, 6),
  }))

  return [...puntos, ...y2k]
}

export default function StarfieldBg({ starColor }) {
  // Un solo suscriptor al MotionValue → actualiza la CSS custom property global.
  // Todos los astros leen esa variable; cero trabajo JS por estrella al hacer scroll.
  useEffect(() => {
    const aplicar = v => document.documentElement.style.setProperty('--star-clr', v)
    aplicar(starColor.get())
    return starColor.on('change', aplicar)
  }, [starColor])

  // Generamos el campo una sola vez; posiciones fijas durante la sesión.
  const campo = useMemo(generarCampo, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {campo.map(s =>
        s.tipo === 'punto' ? (
          <div
            key={s.id}
            className="estrella-punto"
            style={{
              left:              `${s.x}%`,
              top:               `${s.y}%`,
              width:             `${s.size}px`,
              height:            `${s.size}px`,
              '--op-max':        s.opMax,
              animationDuration: `${s.dur}s`,
              animationDelay:    `-${s.delay}s`,
            }}
          />
        ) : (
          <div
            key={s.id}
            className="estrella-y2k"
            style={{
              left:              `${s.x}%`,
              top:               `${s.y}%`,
              '--op-max':        s.opMax,
              animationDuration: `${s.dur}s`,
              animationDelay:    `-${s.delay}s`,
            }}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 24 24" style={{ display: 'block' }}>
              <path d={RUTA_Y2K} fill="var(--star-clr, #EAEAEA)" />
            </svg>
          </div>
        )
      )}
    </div>
  )
}
