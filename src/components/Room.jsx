import React from 'react'
import { C } from '../utils/colors.js'

// Warm accent strip — replaces all neon strips
function WarmStrip({ position, rotation=[0,0,0], scale=[1,1,1], intensity=1.2 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1,1,1]}/>
      <meshStandardMaterial color="#000" emissive="#ffdd88" emissiveIntensity={intensity}/>
    </mesh>
  )
}

function Floor() {
  return (
    <group>
      {/* Base floor — solid, no overlapping planes */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,0]} receiveShadow>
        <planeGeometry args={[8,8]}/>
        <meshStandardMaterial color="#241a0c" roughness={0.58} metalness={0.04}
          polygonOffset={true} polygonOffsetFactor={1} polygonOffsetUnits={1}/>
      </mesh>
      {/* Plank grooves — raised clear above base, depthWrite off */}
      {Array.from({length:9},(_,i)=>(
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[i*0.95-3.8,0.004,0]}>
          <planeGeometry args={[0.014,8]}/>
          <meshStandardMaterial color="#2e1e0e" roughness={1} depthWrite={false}/>
        </mesh>
      ))}
      {[-2.5,0,2.5].map(z=>(
        <mesh key={z} rotation={[-Math.PI/2,0,0]} position={[0,0.004,z]}>
          <planeGeometry args={[8,0.010]}/>
          <meshStandardMaterial color="#2e1e0e" roughness={1} depthWrite={false}/>
        </mesh>
      ))}
      {/* Warm brass floor border strip — raised further */}
      <WarmStrip position={[0,0.008,-3.9]} scale={[7.5,0.006,0.006]} intensity={0.9}/>
    </group>
  )
}

function Ceiling() {
  return (
    <group>
      <mesh position={[0,3.2,0]} rotation={[Math.PI/2,0,0]}>
        <planeGeometry args={[8,8]}/>
        <meshStandardMaterial color="#1a1610" roughness={0.95}/>
      </mesh>
      {/* Warm drum ceiling fixture */}
      <mesh position={[0,3.12,-0.5]}>
        <cylinderGeometry args={[0.55,0.55,0.06,6]}/>
        <meshStandardMaterial color="#1a1610" roughness={0.4} metalness={0.5}/>
      </mesh>
      <mesh position={[0,3.09,-0.5]}>
        <cylinderGeometry args={[0.48,0.48,0.012,6]}/>
        <meshStandardMaterial color="#fff" emissive="#fff8e0" emissiveIntensity={2.5}/>
      </mesh>
      {/* Warm amber ceiling perimeter strip */}
      <WarmStrip position={[0,3.17,-3.75]} scale={[7,0.04,0.04]} intensity={0.7}/>
      <WarmStrip position={[0,3.17,3.75]}  scale={[7,0.04,0.04]} intensity={0.5}/>
      <WarmStrip position={[-3.75,3.17,0]} scale={[7,0.04,0.04]} intensity={0.6} rotation={[0,Math.PI/2,0]}/>
      <WarmStrip position={[3.75,3.17,0]}  scale={[7,0.04,0.04]} intensity={0.6} rotation={[0,Math.PI/2,0]}/>
    </group>
  )
}

function Walls() {
  return (
    <group>
      <mesh position={[0,1.6,-4]} receiveShadow>
        <boxGeometry args={[8,3.2,0.12]}/>
        <meshStandardMaterial color="#1e1a14" roughness={0.88}/>
      </mesh>
      {/* Warm skirting glow on back wall */}
      <WarmStrip position={[0,0.88,-3.93]} scale={[7.5,0.040,0.040]} intensity={0.8}/>

      <mesh position={[-4,1.6,0]} rotation={[0,Math.PI/2,0]} receiveShadow>
        <boxGeometry args={[8,3.2,0.12]}/>
        <meshStandardMaterial color="#181410" roughness={0.88}/>
      </mesh>
      <WarmStrip position={[-3.93,0.88,0]} scale={[6.5,0.040,0.040]} intensity={0.6} rotation={[0,Math.PI/2,0]}/>

      <mesh position={[4,1.6,0]} rotation={[0,-Math.PI/2,0]} receiveShadow>
        <boxGeometry args={[8,3.2,0.12]}/>
        <meshStandardMaterial color="#181410" roughness={0.88}/>
      </mesh>
      <WarmStrip position={[3.93,0.88,0]} scale={[6.5,0.040,0.040]} intensity={0.6} rotation={[0,Math.PI/2,0]}/>
    </group>
  )
}

function Rug() {
  return (
    <group>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.010,0]} receiveShadow>
        <planeGeometry args={[3.8,2.6]}/>
        <meshStandardMaterial color="#1c1810" roughness={0.95}
          polygonOffset={true} polygonOffsetFactor={-1} polygonOffsetUnits={-1}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.011,0]}>
        <planeGeometry args={[3.6,2.4]}/>
        <meshStandardMaterial color="#161410" roughness={0.95}
          polygonOffset={true} polygonOffsetFactor={-2} polygonOffsetUnits={-2}/>
      </mesh>
      {[-0.6,-0.2,0.2,0.6].map((z,i)=>(
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,0.012,z]}>
          <planeGeometry args={[3.2,0.012]}/>
          <meshStandardMaterial color={i%2===0?'#1e1a12':'#181410'} roughness={1}
            polygonOffset={true} polygonOffsetFactor={-3} polygonOffsetUnits={-3}/>
        </mesh>
      ))}
      {/* Subtle warm amber rug edge */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.013,1.29]}>
        <planeGeometry args={[3.72,0.016]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.35}
          polygonOffset={true} polygonOffsetFactor={-4} polygonOffsetUnits={-4}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.013,-1.29]}>
        <planeGeometry args={[3.72,0.016]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.35}
          polygonOffset={true} polygonOffsetFactor={-4} polygonOffsetUnits={-4}/>
      </mesh>
    </group>
  )
}

function CornerPlant() {
  return (
    <group position={[-3.5,0,-3.5]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18,0.14,0.38,6]}/>
        <meshStandardMaterial color="#1a1820" roughness={0.8} metalness={0.1}/>
      </mesh>
      <mesh position={[0,0.22,0]}>
        <cylinderGeometry args={[0.17,0.17,0.02,6]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.6}/>
      </mesh>
      <mesh position={[0,0.22,0]}>
        <cylinderGeometry args={[0.168,0.168,0.015,6]}/>
        <meshStandardMaterial color="#0a1a10" roughness={1}/>
      </mesh>
      {[0,1,2,3,4,5].map(i=>(
        <mesh key={i}
          position={[Math.cos(i/6*Math.PI*2)*0.12,0.28+i*0.10,Math.sin(i/6*Math.PI*2)*0.12]}
          rotation={[0,i/6*Math.PI*2,Math.PI*0.15]} castShadow>
          <boxGeometry args={[0.06,0.22,0.032]}/>
          <meshStandardMaterial color={i%2===0?'#1a4a28':'#143820'} roughness={0.9}/>
        </mesh>
      ))}
    </group>
  )
}

export default function Room() {
  return (
    <group>
      <Floor/><Ceiling/><Walls/><Rug/><CornerPlant/>
    </group>
  )
}
