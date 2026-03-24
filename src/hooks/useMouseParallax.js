import { useEffect, useRef } from 'react'
export function useMouseParallax(strength = 0.010) {
  const m = useRef({ x:0, y:0 })
  useEffect(() => {
    const h = e => {
      m.current.x = ((e.clientX/window.innerWidth) -0.5)*2*strength
      m.current.y = ((e.clientY/window.innerHeight)-0.5)*2*strength
    }
    window.addEventListener('mousemove', h, {passive:true})
    return () => window.removeEventListener('mousemove', h)
  }, [strength])
  return m
}
