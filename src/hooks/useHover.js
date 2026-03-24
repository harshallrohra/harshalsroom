import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Reusable hover effect for 3D objects.
 * Returns { groupRef, hovered, bind }
 * bind = props to spread onto the group/mesh
 *
 * On hover:
 *  - smoothly scales group to targetScale
 *  - changes cursor to pointer
 *  - parent can read `hovered` for glow changes
 */
export function useHover(targetScale = 1.04) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const scale = useRef(1)

  useFrame(() => {
    if (!groupRef.current) return
    const target = hovered ? targetScale : 1.0
    scale.current += (target - scale.current) * 0.10
    groupRef.current.scale.setScalar(scale.current)
  })

  const onPointerEnter = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }, [])

  const onPointerLeave = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }, [])

  return {
    groupRef,
    hovered,
    bind: { onPointerEnter, onPointerLeave },
  }
}
