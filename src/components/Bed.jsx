import React from 'react'
import { useHover } from '../hooks/useHover.js'
import { Text } from '@react-three/drei'
import { C } from '../utils/colors.js'

export default function Bed({ position=[-2.8,0,-2.0], onSectionClick }) {
  const { groupRef, hovered, bind } = useHover(1.02)
  return (
    <group ref={groupRef} position={position} onClick={()=>onSectionClick?.('personal')} {...bind}>
      {/* Headboard */}
      <mesh position={[0,1.0,-1.05]} castShadow receiveShadow>
        <boxGeometry args={[1.52,1.3,0.10]}/><meshStandardMaterial color={C.woodDark} roughness={0.6} metalness={0.05}/>
      </mesh>
      {/* Headboard LED strip */}
      <mesh position={[0,1.65,-1.00]}>
        <boxGeometry args={[1.45,0.008,0.006]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.8}/>
      </mesh>
      {[-0.52,-0.26,0,0.26,0.52].map((x,i)=>(
        <mesh key={i} position={[x,0.98,-1.05]}>
          <boxGeometry args={[0.050,1.1,0.050]}/><meshStandardMaterial color={C.woodDark} roughness={0.55}/>
        </mesh>
      ))}
      <mesh position={[0,1.56,-1.05]}>
        <boxGeometry args={[1.55,0.085,0.14]}/><meshStandardMaterial color={C.woodDark} roughness={0.5}/>
      </mesh>
      {/* Side rails */}
      {[0.68,-0.68].map((x,i)=>(
        <mesh key={i} position={[x,0.32,0]}>
          <boxGeometry args={[0.075,0.15,2.15]}/><meshStandardMaterial color={C.woodDark} roughness={0.65}/>
        </mesh>
      ))}
      {/* Legs */}
      {[[-0.64,0.88],[-0.64,-0.95],[0.64,0.88],[0.64,-0.95]].map(([x,z],i)=>(
        <mesh key={i} position={[x,0.16,z]}>
          <boxGeometry args={[0.068,0.32,0.068]}/><meshStandardMaterial color={C.woodDark} roughness={0.6}/>
        </mesh>
      ))}
      {/* Mattress */}
      <mesh position={[0,0.44,0]} receiveShadow>
        <boxGeometry args={[1.30,0.19,2.02]}/><meshStandardMaterial color="#141824" roughness={0.88}/>
      </mesh>
      {/* Blanket */}
      <mesh position={[0,0.555,-0.06]} castShadow receiveShadow>
        <boxGeometry args={[1.27,0.068,1.68]}/><meshStandardMaterial color={C.blanket} roughness={0.92}/>
      </mesh>
      <mesh position={[0,0.60,0.78]}>
        <boxGeometry args={[1.27,0.085,0.19]}/><meshStandardMaterial color="#1e2838" roughness={0.9}/>
      </mesh>
      {/* Pillows */}
      <mesh position={[-0.27,0.615,-0.84]} castShadow>
        <boxGeometry args={[0.50,0.115,0.34]}/><meshStandardMaterial color={C.pillowTeal} roughness={0.88}/>
      </mesh>
      <mesh position={[0.27,0.615,-0.84]} castShadow>
        <boxGeometry args={[0.50,0.115,0.34]}/><meshStandardMaterial color={C.pillowPurp} roughness={0.88}/>
      </mesh>
      <mesh position={[0,0.635,-0.74]} castShadow>
        <boxGeometry args={[0.28,0.085,0.22]}/><meshStandardMaterial color="#0e2040" roughness={0.88} emissive={C.teal} emissiveIntensity={0.08}/>
      </mesh>
      {/* Bedside table */}
      <group position={[0.98,0,-0.85]}>
        <mesh position={[0,0.52,0]} castShadow receiveShadow>
          <boxGeometry args={[0.40,0.03,0.36]}/><meshStandardMaterial color={C.woodMid} roughness={0.55}/>
        </mesh>
        <mesh position={[0,0.28,0]} castShadow receiveShadow>
          <boxGeometry args={[0.36,0.48,0.32]}/><meshStandardMaterial color={C.woodMid} roughness={0.62}/>
        </mesh>
        <mesh position={[0,0.54,0.18]}>
          <boxGeometry args={[0.34,0.006,0.005]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.4}/>
        </mesh>
        {/* Lamp */}
        <mesh position={[-0.07,0.555,0]}>
          <cylinderGeometry args={[0.048,0.062,0.035,10]}/><meshStandardMaterial color="#0a0c18" roughness={0.3} metalness={0.8}/>
        </mesh>
        <mesh position={[-0.07,0.75,0]}>
          <cylinderGeometry args={[0.010,0.010,0.38,6]}/><meshStandardMaterial color="#aaa" roughness={0.2} metalness={0.9}/>
        </mesh>
        <group position={[-0.07,0.96,0]}>
          <mesh>
            <cylinderGeometry args={[0.095,0.040,0.16,10,1,true]}/><meshStandardMaterial color="#1a1020" roughness={0.5} side={2}/>
          </mesh>
          <mesh>
            <sphereGeometry args={[0.025,8,8]}/><meshStandardMaterial color="#fff" emissive="#ffaa40" emissiveIntensity={2.0}/>
          </mesh>
        </group>
        <mesh position={[0.10,0.546,0.04]} rotation={[0,0.3,0]}>
          <boxGeometry args={[0.11,0.020,0.15]}/><meshStandardMaterial color="#0a2a3a" roughness={0.6}/>
        </mesh>
      </group>
      <mesh position={[0,0.03,0.95]}>
        <boxGeometry args={[1.2,0.006,0.004]}/><meshStandardMaterial color="#000" emissive="#ffaa40" emissiveIntensity={1.0}/>
      </mesh>
      <Text position={[0,0.016,-0.48]} rotation={[-Math.PI/2,0,0]} fontSize={0.055} color={C.purple} anchorX="center" anchorY="middle">Personal</Text>
    </group>
  )
}
