import { createContext, useContext } from 'react'

// Provee los MotionValues de color derivados del scroll a todos los componentes.
export const ScrollContext = createContext(null)
export const useScrollColors = () => useContext(ScrollContext)
