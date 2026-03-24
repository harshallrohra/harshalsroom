import React from 'react'

/**
 * WARM WHITE AESTHETIC LIGHTING
 * 
 * Every light source uses warm whites, ambers, and soft gold tones.
 * No neon. No coloured accent points.
 * Feels like a cosy study room lit by lamps and warm overhead lights.
 */
export default function SceneLights({ phase }) {
  const inside = phase === 'inside'
  const b = inside ? 1.0 : 0.82

  return (
    <>
      {/* ── AMBIENT — warm soft base ── */}
      <ambientLight intensity={0.95 * b} color="#fff4e0" />

      {/* ── MAIN OVERHEAD — warm white ceiling light ── */}
      <directionalLight
        position={[0.5, 6, 2]}
        intensity={2.0 * b}
        color="#fff8ee"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.001}
      />

      {/* ── FILL LIGHTS — warm ivory from multiple angles ── */}
      <directionalLight position={[0, 4, 5]}   intensity={0.9 * b} color="#fff4e0" />
      <directionalLight position={[0, 3, -5]}  intensity={0.5 * b} color="#ffe8cc" />
      <directionalLight position={[-5, 3, 0]}  intensity={0.4 * b} color="#ffe4cc" />
      <directionalLight position={[5, 3, 0]}   intensity={0.4 * b} color="#ffe4cc" />

      {/* ── DESK LAMP — warm amber pool, focal point ── */}
      <pointLight
        position={[-0.2, 1.7, -2.2]}
        intensity={3.5 * b}
        color="#ffcc60"
        distance={4.0}
        decay={2}
      />

      {/* ── DESK AREA FILL — soft warm white glow ── */}
      <pointLight
        position={[0, 2.0, -1.0]}
        intensity={2.2 * b}
        color="#fff0d8"
        distance={5}
        decay={1.8}
      />

      {/* ── MONITOR BACKLIGHT — very soft warm white ── */}
      <pointLight
        position={[0, 1.5, -3.2]}
        intensity={1.4 * b}
        color="#ffeedd"
        distance={3}
        decay={2}
      />

      {/* ── BEDSIDE LAMP — warm amber, right side ── */}
      <pointLight
        position={[-1.8, 1.5, -2.8]}
        intensity={2.0 * b}
        color="#ffaa40"
        distance={3.5}
        decay={2}
      />

      {/* ── BOOKSHELF LAMP — golden warm ── */}
      <pointLight
        position={[3.2, 1.8, -2.5]}
        intensity={1.8 * b}
        color="#ffbb50"
        distance={3}
        decay={2}
      />

      {/* ── CEILING FIXTURE POOL — general warm fill ── */}
      <pointLight
        position={[0, 3.0, -0.5]}
        intensity={1.6 * b}
        color="#fff8f0"
        distance={8}
        decay={1.6}
      />
    </>
  )
}
