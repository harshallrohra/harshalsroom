import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { C } from '../utils/colors.js'

const CRYSTAL_DEFS = [
  { pos: [-1.2,1.35,-1.4], scale:0.11, speed:0.55, offset:0   },
  { pos: [ 1.4,1.55,-1.6], scale:0.09, speed:0.70, offset:1.2 },
  { pos: [-0.5,1.65,-3.2], scale:0.08, speed:0.50, offset:2.1 },
  { pos: [ 2.6,1.45,-2.2], scale:0.07, speed:0.65, offset:0.8 },
  { pos: [-2.8,1.30,-1.8], scale:0.09, speed:0.45, offset:1.7 },
]

function Crystal({ pos, scale, speed, offset }) {
  const ref  = useRef()
  const mRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!ref.current) return
    ref.current.position.y = pos[1] + Math.sin(t*speed+offset)*0.11
    ref.current.rotation.y = t*0.28+offset
    ref.current.rotation.x = Math.sin(t*0.2+offset)*0.12
    if (mRef.current) mRef.current.emissiveIntensity = 0.40 + Math.sin(t*speed*2+offset)*0.18
  })

  return (
    <group ref={ref} position={pos}>
      {/* Warm amber glass crystal */}
      <mesh castShadow scale={[scale,scale*1.6,scale]}>
        <octahedronGeometry args={[1,0]}/>
        <meshStandardMaterial ref={mRef} color="#ffd080" emissive="#ffaa30" emissiveIntensity={0.45}
          roughness={0.05} metalness={0.1} transparent opacity={0.78}/>
      </mesh>
      {/* Inner warm white core */}
      <mesh scale={[scale*0.45,scale*0.75,scale*0.45]}>
        <octahedronGeometry args={[1,0]}/>
        <meshStandardMaterial color="#fff" emissive="#fff8e0" emissiveIntensity={1.6}
          roughness={0} metalness={0} transparent opacity={0.30}/>
      </mesh>
      {/* Warm amber point light */}
      <pointLight color="#ffaa40" intensity={0.45} distance={1.4} decay={2.8}/>
    </group>
  )
}

export function Particles() {
  const refs = useRef([])
  const pts  = useMemo(() =>
    Array.from({length:18},()=>({
      x:(Math.random()-0.5)*7, y:Math.random()*3.0+0.3, z:(Math.random()-0.5)*7-1,
      speed:0.06+Math.random()*0.12, offset:Math.random()*Math.PI*2,
    })),[])

  useFrame(({clock})=>{
    refs.current.forEach((m,i)=>{
      if(!m) return
      const p=pts[i]
      m.position.y = p.y+Math.sin(clock.elapsedTime*p.speed+p.offset)*0.07
      m.material.opacity = 0.04+Math.sin(clock.elapsedTime*0.25+p.offset)*0.025
    })
  })

  return (
    <group>
      {pts.map((p,i)=>(
        <mesh key={i} ref={el=>(refs.current[i]=el)} position={[p.x,p.y,p.z]}>
          <sphereGeometry args={[0.009,4,4]}/>
          <meshStandardMaterial color="#ffd080" emissive="#ffaa40" emissiveIntensity={1.0} transparent opacity={0.05}/>
        </mesh>
      ))}
    </group>
  )
}

export default function Crystals() {
  return <group>{CRYSTAL_DEFS.map((def,i)=><Crystal key={i} {...def}/>)}</group>
}
