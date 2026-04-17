import { useEffect, useRef } from 'react'

const THROTTLE_MS = 42  // ~24 partículas/seg máximo
const VIDA_MS = 650     // duración de cada partícula

export default function CursorTrail() {
  const contenedorRef = useRef(null)

  useEffect(() => {
    // Solo activar en dispositivos con mouse real (excluye touch)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const contenedor = contenedorRef.current
    if (!contenedor) return

    let ultimoTiempo = 0

    function crearParticula(x, y) {
      const tamano = Math.random() * 2.5 + 1.5
      const dot = document.createElement('div')

      dot.style.cssText = `
        position: fixed;
        left: ${x - tamano / 2}px;
        top: ${y - tamano / 2}px;
        width: ${tamano}px;
        height: ${tamano}px;
        border-radius: 50%;
        background: #FFFFFF;
        pointer-events: none;
        transition: opacity ${VIDA_MS}ms ease-out, transform ${VIDA_MS}ms ease-out;
        opacity: 0.8;
        will-change: opacity, transform;
      `
      contenedor.appendChild(dot)

      // Trigger la transición en el siguiente frame
      requestAnimationFrame(() => {
        const dx = (Math.random() - 0.5) * 10
        const dy = (Math.random() - 0.5) * 10
        dot.style.opacity = '0'
        dot.style.transform = `scale(0) translate(${dx}px, ${dy}px)`
      })

      setTimeout(() => dot.remove(), VIDA_MS)
    }

    function onMouseMove(e) {
      const ahora = Date.now()
      if (ahora - ultimoTiempo < THROTTLE_MS) return
      ultimoTiempo = ahora
      crearParticula(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // mix-blend-mode: difference hace que las partículas blancas sean:
  // - Blancas sobre fondo oscuro (Intro)
  // - Negras sobre fondo claro (Hero)
  // → se adaptan automáticamente al fondo dinámico sin leer el scroll
  return (
    <div
      ref={contenedorRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998, mixBlendMode: 'difference' }}
    />
  )
}
