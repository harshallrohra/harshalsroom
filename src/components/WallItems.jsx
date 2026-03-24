import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import { C } from '../utils/colors.js'
import { useHover } from '../hooks/useHover.js'

// ── About Frame — portrait photo on back wall ────────────────────
export function AboutFrame({ position=[-1.8,2.1,-3.94], onSectionClick }) {
  const { groupRef, hovered, bind } = useHover(1.03)
  const glowRef = useRef()
  const texture = useTexture('/harshal-portrait.jpg')

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.emissiveIntensity = (hovered ? 0.45 : 0.10) + Math.sin(clock.elapsedTime * 0.7) * 0.04
    }
  })

  const w = 0.88, h = 1.10

  return (
    <group ref={groupRef} position={position} onClick={() => onSectionClick?.('about')} {...bind}>
      {/* Dark wood frame */}
      <mesh castShadow>
        <boxGeometry args={[w + 0.06, h + 0.06, 0.042]} />
        <meshStandardMaterial color="#1a1208" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Photo — NO tint, NO overlay, pure texture */}
      <mesh position={[0, 0, 0.024]}>
        <boxGeometry args={[w, h, 0.005]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0}
          emissiveIntensity={0}
        />
      </mesh>
      {/* Subtle frame edge glow ONLY — not on photo */}
      <mesh ref={glowRef} position={[0, 0, 0.024]}>
        <boxGeometry args={[w + 0.055, h + 0.055, 0.001]} />
        <meshStandardMaterial color="#000" emissive="#fff8e8" emissiveIntensity={0.10} transparent opacity={0.6} />
      </mesh>
      {/* Thin brass border strips — top and bottom only */}
      {[[(h + 0.06) / 2], [-(h + 0.06) / 2]].map(([fy], i) => (
        <mesh key={i} position={[0, fy, 0.032]}>
          <boxGeometry args={[w + 0.06, 0.007, 0.004]} />
          <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={hovered ? 2.0 : 0.9} />
        </mesh>
      ))}
      <Text position={[0, -(h / 2 + 0.10), 0.025]} fontSize={0.042} color={hovered ? '#ffe8a0' : '#ffcc60'} anchorX="center" anchorY="middle">
        {hovered ? '[ About Me ]' : 'About Me'}
      </Text>
    </group>
  )
}

// ── Personal Frame — tech wall photo on LEFT WALL ─────────────────
export function PersonalFrame({ position=[-3.94, 2.1, 0.2], onSectionClick }) {
  const { groupRef, hovered, bind } = useHover(1.03)
  const glowRef = useRef()
  const texture = useTexture('/harshal-wall.jpg')

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.emissiveIntensity = (hovered ? 0.45 : 0.10) + Math.sin(clock.elapsedTime * 0.65) * 0.04
    }
  })

  // Portrait aspect of the wall photo (taller than wide)
  const w = 0.82, h = 1.08

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, Math.PI / 2, 0]}
      onClick={() => onSectionClick?.('personal')}
      {...bind}
    >
      {/* Dark wood frame */}
      <mesh castShadow>
        <boxGeometry args={[w + 0.06, h + 0.06, 0.042]} />
        <meshStandardMaterial color="#1a1208" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Photo — NO overlay, natural colors */}
      <mesh position={[0, 0, 0.024]}>
        <boxGeometry args={[w, h, 0.005]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0}
          emissiveIntensity={0}
        />
      </mesh>
      {/* Thin frame edge only */}
      <mesh ref={glowRef} position={[0, 0, 0.024]}>
        <boxGeometry args={[w + 0.055, h + 0.055, 0.001]} />
        <meshStandardMaterial color="#000" emissive="#fff8e8" emissiveIntensity={0.10} transparent opacity={0.6} />
      </mesh>
      {[[(h + 0.06) / 2], [-(h + 0.06) / 2]].map(([fy], i) => (
        <mesh key={i} position={[0, fy, 0.032]}>
          <boxGeometry args={[w + 0.06, 0.007, 0.004]} />
          <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={hovered ? 2.0 : 0.9} />
        </mesh>
      ))}
      <Text position={[0, -(h / 2 + 0.10), 0.025]} fontSize={0.040} color={hovered ? '#ffe8a0' : '#ffcc60'} anchorX="center" anchorY="middle">
        {hovered ? '[ Outside of Code ]' : 'Outside of Code'}
      </Text>
    </group>
  )
}

// ── Notice Board — education ──────────────────────────────────────
export function NoticeBoard({ position=[1.6, 2.05, -3.94], onSectionClick }) {
  const { groupRef, hovered, bind } = useHover(1.04)
  const glowRef = useRef()
  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.emissiveIntensity = (hovered ? 0.45 : 0.12) + Math.sin(clock.elapsedTime * 0.6) * 0.06
    }
  })
  return (
    <group ref={groupRef} position={position} onClick={() => onSectionClick?.('education')} {...bind}>
      <mesh castShadow>
        <boxGeometry args={[1.05, 0.72, 0.042]} />
        <meshStandardMaterial color={C.woodDark} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.024]}>
        <boxGeometry args={[0.97, 0.64, 0.016]} />
        <meshStandardMaterial color="#2a1808" roughness={0.92} />
      </mesh>
      {[
        { x: -0.28, y: 0.16, w: 0.24, h: 0.18, c: '#0e1428', r: -0.07 },
        { x: 0.12,  y: 0.12, w: 0.28, h: 0.20, c: '#0a1418', r: 0.05 },
        { x: -0.08, y: -0.14, w: 0.26, h: 0.18, c: '#140e10', r: -0.04 },
      ].map((n, i) => (
        <group key={i} position={[n.x, n.y, 0.034]} rotation={[0, 0, n.r]}>
          <mesh castShadow>
            <boxGeometry args={[n.w, n.h, 0.003]} />
            <meshStandardMaterial color={n.c} roughness={0.9} />
          </mesh>
          <mesh position={[0, n.h / 2 - 0.018, 0.003]}>
            <sphereGeometry args={[0.011, 6, 6]} />
            <meshStandardMaterial color="#000" emissive="#ffaa40" emissiveIntensity={1.8} />
          </mesh>
          {[0.04, 0, -0.04].map((ly, li) => (
            <mesh key={li} position={[0, ly, 0.003]}>
              <boxGeometry args={[n.w * 0.72, 0.006, 0.001]} />
              <meshStandardMaterial color="#3a3020" emissive="#ffcc60" emissiveIntensity={0.12} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh ref={glowRef} position={[0, 0, 0.025]}>
        <boxGeometry args={[1.02, 0.68, 0.001]} />
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.12} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.36, 0.028]}>
        <boxGeometry args={[1.0, 0.007, 0.003]} />
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={hovered ? 2.2 : 1.3} />
      </mesh>
      <Text position={[0, -0.43, 0.026]} fontSize={0.038} color={hovered ? '#ffe8a0' : '#ffcc60'} anchorX="center" anchorY="middle">
        {hovered ? '[ Education ]' : 'Education'}
      </Text>
    </group>
  )
}

// ── Wall Screen — contact/stats ───────────────────────────────────
export function WallScreen({ position=[3.94, 2.1, -0.5], onSectionClick }) {
  const { groupRef, hovered, bind } = useHover(1.03)
  const scanRef = useRef()
  const sRef    = useRef()
  useFrame(({ clock }) => {
    if (scanRef.current) scanRef.current.position.y = ((clock.elapsedTime * 0.20) % 1) * 0.72 - 0.36
    if (sRef.current)    sRef.current.emissiveIntensity = (hovered ? 0.55 : 0.30) + Math.sin(clock.elapsedTime * 0.5) * 0.06
  })
  return (
    <group ref={groupRef} position={position} rotation={[0, -Math.PI / 2, 0]} onClick={() => onSectionClick?.('contact')} {...bind}>
      <mesh castShadow>
        <boxGeometry args={[1.1, 0.72, 0.042]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.023]}>
        <boxGeometry args={[1.02, 0.64, 0.003]} />
        <meshStandardMaterial ref={sRef} color={C.screenBg} emissive="#2a4060" emissiveIntensity={0.30} roughness={0.04} />
      </mesh>
      <mesh ref={scanRef} position={[0, 0, 0.026]}>
        <boxGeometry args={[0.96, 0.003, 0.001]} />
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.2} transparent opacity={0.65} />
      </mesh>
      {[['Commits', 0.88, 0.16], ['PRs', 0.65, 0.08], ['Stars', 0.72, 0.00], ['Repos', 0.55, -0.08], ['Contrib', 0.80, -0.16]].map(([lbl, val, y], i) => (
        <group key={i} position={[0, y, 0.027]}>
          <Text position={[-0.36, 0, 0]} fontSize={0.028} color="#aa9060" anchorX="left" anchorY="middle">{lbl}</Text>
          <mesh position={[0.08, 0, 0]}><boxGeometry args={[0.50, 0.015, 0.001]} /><meshStandardMaterial color="#1a140a" roughness={1} /></mesh>
          <mesh position={[0.08 - (0.50 - 0.50 * val) / 2, 0, 0.001]}><boxGeometry args={[0.50 * val, 0.015, 0.001]} /><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.8} /></mesh>
        </group>
      ))}
      <Text position={[0, -0.38, 0.024]} fontSize={0.040} color={hovered ? '#ffe8a0' : '#ffcc60'} anchorX="center" anchorY="middle">
        {hovered ? '[ Contact ]' : 'Contact'}
      </Text>
      {[[0, 0.36, 0.025, 1.06, 0.007], [0, -0.36, 0.025, 1.06, 0.007]].map(([fx, fy, fz, fw, fh], i) => (
        <mesh key={i} position={[fx, fy, fz]}>
          <boxGeometry args={[fw, fh, 0.003]} />
          <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={hovered ? 2.2 : 1.2} />
        </mesh>
      ))}
    </group>
  )
}
