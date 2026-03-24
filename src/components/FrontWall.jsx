import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { C } from '../utils/colors.js'

/**
 * Front wall = two halves that slide apart on "opening" phase.
 * Left half slides to x = -6, right half to x = +6.
 * Both fade slightly as they exit.
 */
export default function FrontWall({ phase }) {
  const leftRef  = useRef()
  const rightRef = useRef()

  useEffect(() => {
    if (phase !== 'opening') return

    const tl = gsap.timeline()

    // Slide left half to the left
    tl.to(leftRef.current.position, {
      x: -5.5, duration: 1.5, ease: 'power3.inOut',
    }, 0)
    tl.to(leftRef.current, {
      'material-opacity': 0, duration: 1.2, ease: 'power2.in',
    }, 0.3)

    // Slide right half to the right
    tl.to(rightRef.current.position, {
      x: 5.5, duration: 1.5, ease: 'power3.inOut',
    }, 0)
    tl.to(rightRef.current, {
      'material-opacity': 0, duration: 1.2, ease: 'power2.in',
    }, 0.3)
  }, [phase])

  if (phase === 'inside') return null

  // Wall sits at z=3.8 (front of room, slightly in front of camera start)
  // Two halves: left (-2,0,3.8) and right (2,0,3.8), each 4 wide
  return (
    <group>
      {/* Left half */}
      <mesh ref={leftRef} position={[-2, 1.6, 3.8]} castShadow receiveShadow>
        <boxGeometry args={[4.1, 3.4, 0.15]}/>
        <meshStandardMaterial
          color={C.wall}
          roughness={0.85}
          transparent
          opacity={1}
        />
      </mesh>
      {/* Left half edge glow strip */}
      <mesh position={[-0.02, 1.6, 3.72]}>
        <boxGeometry args={[0.04, 3.2, 0.01]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.5}/>
      </mesh>

      {/* Right half */}
      <mesh ref={rightRef} position={[2, 1.6, 3.8]} castShadow receiveShadow>
        <boxGeometry args={[4.1, 3.4, 0.15]}/>
        <meshStandardMaterial
          color={C.wall}
          roughness={0.85}
          transparent
          opacity={1}
        />
      </mesh>
      {/* Right half edge glow strip */}
      <mesh position={[0.02, 1.6, 3.72]}>
        <boxGeometry args={[0.04, 3.2, 0.01]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.5}/>
      </mesh>

      {/* Top strip above wall (to fill ceiling gap) */}
      <mesh position={[0, 3.1, 3.8]}>
        <boxGeometry args={[8.2, 0.5, 0.15]}/>
        <meshStandardMaterial color={C.wall} roughness={0.9} transparent opacity={1}/>
      </mesh>

      {/* "ENTER" text hint glowing in center seam */}
      {phase === 'entry' && (
        <mesh position={[0, 1.6, 3.73]}>
          <boxGeometry args={[0.008, 3.2, 0.005]}/>
          <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={2.5}/>
        </mesh>
      )}
    </group>
  )
}
