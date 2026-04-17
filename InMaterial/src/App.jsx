import { useScroll, useTransform, motion } from 'framer-motion'
import { ScrollContext } from './context/ScrollContext'
import Header from './components/Header'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Footer from './components/Footer'
import CursorTrail from './components/CursorTrail'
import StarfieldBg from './components/StarfieldBg'

const GRANO_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23g)'/%3E%3C/svg%3E")`

// Zona del scroll donde ocurre la transición completa de colores
// 0.30 → Hero empieza a asomarse │ 0.70 → Hero ocupa la mayor parte del viewport
const ZONA = [0.30, 0.70]

export default function App() {
  const { scrollYProgress } = useScroll()

  // ── Paleta dinámica scroll-driven ───────────────────────────────────────────
  // Sección A (#121212 carbón suave) → Sección B (#F4F4F5 off-white perlado)
  // Todos los valores finales cumplen WCAG AA sobre #F4F4F5:
  //   fgColor     #111111 → 17.9:1  ✓
  //   accentColor #2A2A2A → 13.8:1  ✓
  //   mutedColor  #444444 →  7.5:1  ✓
  //   dimColor    #666666 →  4.6:1  ✓
  const bgColor     = useTransform(scrollYProgress, ZONA, ['#121212', '#F4F4F5'])
  const fgColor     = useTransform(scrollYProgress, ZONA, ['#FFFFFF', '#111111'])
  const accentColor = useTransform(scrollYProgress, ZONA, ['#909090', '#2A2A2A'])
  const mutedColor  = useTransform(scrollYProgress, ZONA, ['#8A8A8A', '#444444'])
  const dimColor    = useTransform(scrollYProgress, ZONA, ['#3A3A3A', '#666666'])
  const headerBg    = useTransform(scrollYProgress, ZONA, ['rgba(18,18,18,0.92)', 'rgba(244,244,245,0.95)'])
  const borderRgba  = useTransform(scrollYProgress, ZONA, ['rgba(255,255,255,0.15)', 'rgba(0,0,0,0.20)'])
  const overlayBg   = useTransform(scrollYProgress, ZONA, ['rgba(18,18,18,0.55)', 'rgba(210,210,210,0.65)'])
  const cardBg      = useTransform(scrollYProgress, ZONA, ['#1E1E1E', '#E0E0E0'])
  const ctaBg       = useTransform(scrollYProgress, ZONA, ['#FFFFFF', '#111111'])
  const ctaFg       = useTransform(scrollYProgress, ZONA, ['#111111', '#FFFFFF'])

  // Lógica de inversión: fondo oscuro → estrellas claras │ fondo claro → estrellas oscuras
  const starColor = useTransform(scrollYProgress, ZONA, ['#EAEAEA', '#121212'])

  const ctx = {
    fgColor, accentColor, mutedColor, dimColor,
    headerBg, borderRgba, overlayBg, cardBg,
    ctaBg, ctaFg,
  }

  return (
    <>
      {/* ── Capa 0: Color de fondo animado (fixed, base del stack) ─────────── */}
      <motion.div
        className="fixed inset-0"
        style={{ backgroundColor: bgColor, zIndex: 0 }}
      />

      {/* ── Capa 1: Universo de estrellas con inversión de color ────────────── */}
      <StarfieldBg starColor={starColor} />

      {/* ── Capa 9999: Grano cinematográfico (fixed, encima de todo) ────────── */}
      <div
        className="fixed inset-0 grano-animado pointer-events-none"
        style={{
          zIndex:          9999,
          backgroundImage: GRANO_URI,
          backgroundSize:  '256px 256px',
          opacity:         0.045,
          mixBlendMode:    'overlay',
        }}
      />

      {/* ── Contenido principal (z-10, sobre el starfield) ──────────────────── */}
      <ScrollContext.Provider value={ctx}>
        <main className="relative overflow-x-hidden" style={{ zIndex: 10 }}>
          <Header />
          <Intro />
          <Hero />
          <Footer />
        </main>
      </ScrollContext.Provider>

      {/* ── Rastro de cursor (fixed, fuera del flujo) ───────────────────────── */}
      <CursorTrail />
    </>
  )
}
