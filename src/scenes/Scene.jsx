import React, { useRef, useCallback, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, PerformanceMonitor } from '@react-three/drei'
import gsap from 'gsap'

import SceneLights  from '../components/SceneLights.jsx'
import Room         from '../components/Room.jsx'
import Desk         from '../components/Desk.jsx'
import Bed          from '../components/Bed.jsx'
import Bookshelf    from '../components/Bookshelf.jsx'
import FrontWall    from '../components/FrontWall.jsx'
import Crystals, { Particles } from '../components/Crystals.jsx'
import { AboutFrame, PersonalFrame, NoticeBoard, WallScreen } from '../components/WallItems.jsx'
import { useMouseParallax } from '../hooks/useMouseParallax.js'

// ── Camera positions ─────────────────────────────────────────────
const CAM = {
  entry:     { x:0,    y:1.80, z:6.2,  rx:-0.04 },
  inside:    { x:0,    y:1.72, z:4.4,  rx:-0.07 },
  about:     { x:-1.6, y:2.0,  z:0.8,  rx:-0.20 },
  projects:  { x:0.2,  y:1.58, z:-0.5, rx:-0.22 },
  skills:    { x:2.5,  y:1.78, z:-0.2, rx:-0.12 },
  personal:  { x:-2.6, y:1.82, z:0.8,  rx:-0.14 },
  education: { x:1.7,  y:1.92, z:0.8,  rx:-0.20 },
  contact:   { x:2.8,  y:1.85, z:0.5,  rx:-0.14 },
}

// ── Chair ─────────────────────────────────────────────────────────
function Chair({ position=[0.08,0,-1.52] }) {
  return (
    <group position={position} rotation={[0,0.15,0]}>
      <mesh position={[0,0.50,0]} castShadow receiveShadow>
        <boxGeometry args={[0.50,0.068,0.48]}/><meshStandardMaterial color="#0e1a2e" roughness={0.7}/>
      </mesh>
      <mesh position={[0,0.468,0]}>
        <boxGeometry args={[0.54,0.028,0.52]}/><meshStandardMaterial color="#080c14" roughness={0.4} metalness={0.6}/>
      </mesh>
      <mesh position={[0,0.875,-0.22]} castShadow receiveShadow>
        <boxGeometry args={[0.47,0.70,0.062]}/><meshStandardMaterial color="#0e1a2e" roughness={0.7}/>
      </mesh>
      <mesh position={[0,1.225,-0.22]}>
        <boxGeometry args={[0.50,0.038,0.095]}/><meshStandardMaterial color="#080c14" roughness={0.4} metalness={0.6}/>
      </mesh>
      {[-0.23,0.23].map((x,i)=>(
        <mesh key={i} position={[x,0.875,-0.22]}>
          <boxGeometry args={[0.028,0.72,0.060]}/><meshStandardMaterial color="#080c14" roughness={0.4} metalness={0.6}/>
        </mesh>
      ))}
      {[-1,1].map((s,i)=>(
        <group key={i}>
          <mesh position={[s*0.275,0.65,-0.02]}>
            <boxGeometry args={[0.035,0.30,0.035]}/><meshStandardMaterial color="#080c14" roughness={0.35} metalness={0.7}/>
          </mesh>
          <mesh position={[s*0.275,0.82,0.08]}>
            <boxGeometry args={[0.075,0.035,0.28]}/><meshStandardMaterial color="#0e1a2e" roughness={0.6}/>
          </mesh>
        </group>
      ))}
      {/* Gas cylinder */}
      <mesh position={[0,0.26,0]}>
        <cylinderGeometry args={[0.024,0.032,0.36,8]}/><meshStandardMaterial color="#888" roughness={0.2} metalness={0.9}/>
      </mesh>
      {/* 5-star base */}
      {[0,1,2,3,4].map(i=>{
        const a = (i/5)*Math.PI*2
        return (
          <mesh key={i} position={[Math.cos(a)*0.22,0.04,Math.sin(a)*0.22]} rotation={[0,-a+Math.PI/2,0]}>
            <boxGeometry args={[0.42,0.022,0.040]}/><meshStandardMaterial color="#444" roughness={0.2} metalness={0.9}/>
          </mesh>
        )
      })}
      {/* Neon seat edge */}
      <mesh position={[0,0.468,0.26]}>
        <boxGeometry args={[0.45,0.006,0.004]}/><meshStandardMaterial color="#000" emissive="#00d4ff" emissiveIntensity={1.5}/>
      </mesh>
    </group>
  )
}

// ── Camera controller ─────────────────────────────────────────────
function CameraController({ phase, activeSection, mouse }) {
  const { camera } = useThree()
  const base = useRef({ x:CAM.entry.x, y:CAM.entry.y, z:CAM.entry.z })

  useEffect(() => {
    const key = (activeSection && CAM[activeSection]) ? activeSection
              : phase==='inside' ? 'inside' : 'entry'
    const t = CAM[key]
    gsap.killTweensOf(base.current)
    gsap.killTweensOf(camera.rotation)
    gsap.to(base.current,    { x:t.x,  y:t.y,  z:t.z,  duration:1.8, ease:'power3.inOut' })
    gsap.to(camera.rotation, { x:t.rx,          duration:1.8, ease:'power3.inOut' })
  }, [phase, activeSection])

  useFrame(() => {
    camera.position.x += (base.current.x + mouse.current.x*0.30 - camera.position.x) * 0.055
    camera.position.y += (base.current.y - mouse.current.y*0.18 - camera.position.y) * 0.055
    camera.position.z += (base.current.z - camera.position.z)    * 0.055
  })

  return null
}

// ── Master scene ─────────────────────────────────────────────────
export default function Scene({ phase, setPhase, activeSection, onSectionClick }) {
  const mouse = useMouseParallax(0.010)

  // Trigger camera forward when phase moves to opening/inside
  useEffect(() => {
    if (phase === 'opening') {
      // Camera will lerp to 'inside' position automatically
      // Wall handles its own animation via phase prop
      // Delay setPhase to 'inside' until wall finishes
      const t = setTimeout(() => setPhase('inside'), 1900)
      return () => clearTimeout(t)
    }
  }, [phase, setPhase])

  return (
    <>
      <PerformanceMonitor/>

      {/* Cinematic dark fog */}
      <fog attach="fog" args={['#050810', 10, 20]}/>

      <CameraController phase={phase} activeSection={activeSection} mouse={mouse}/>
      <SceneLights phase={phase}/>

      {/* Subtle contact shadows */}
      <ContactShadows position={[0,0.001,0]} opacity={0.55} scale={14} blur={4} far={3} color="#000820"/>

      {/* Room shell */}
      <Room/>

      {/* Objects */}
      <Desk      position={[0,  0,-2.2]}  onSectionClick={onSectionClick}/>
      <Chair/>
      <Bed       position={[-2.8,0,-2.0]} onSectionClick={onSectionClick}/>
      <Bookshelf position={[3.15,0,-2.0]} onSectionClick={onSectionClick}/>

      {/* Wall items */}
      <AboutFrame    position={[-1.8, 2.15,-3.93]} onSectionClick={onSectionClick}/>
      <NoticeBoard   position={[ 1.6, 2.05,-3.93]} onSectionClick={onSectionClick}/>
      <PersonalFrame position={[-3.93,2.15, 0.0 ]} onSectionClick={onSectionClick}/>
      <WallScreen    position={[ 3.93,2.1, -0.5 ]} onSectionClick={onSectionClick}/>

      {/* Special effects */}
      <Crystals/>
      <Particles/>

      {/* Front wall — splits on opening */}
      <FrontWall phase={phase}/>
    </>
  )
}
