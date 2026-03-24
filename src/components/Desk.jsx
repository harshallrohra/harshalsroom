import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { C } from '../utils/colors.js'
import { useHover } from '../hooks/useHover.js'

function LaptopScreen() {
  const sRef = useRef()
  const cRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (sRef.current) sRef.current.emissiveIntensity = 0.55 + Math.sin(t*0.55)*0.15
    if (cRef.current) cRef.current.material.emissiveIntensity = Math.sin(t*3.2) > 0 ? 1.2 : 0
  })
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.70,0.44,0.020]}/>
        <meshStandardMaterial color="#0a0c14" roughness={0.25} metalness={0.85}/>
      </mesh>
      <mesh position={[0,0,0.012]}>
        <boxGeometry args={[0.64,0.38,0.002]}/>
        <meshStandardMaterial ref={sRef} color={C.screenBg} emissive="#2a4a7a" emissiveIntensity={0.55} roughness={0.04}/>
      </mesh>
      {[
        [0.12,'#569cd6',0.36],[0.07,'#4ec9b0',0.44],[0.02,'#9cdcfe',0.28],
        [-0.03,'#ce9178',0.40],[-0.08,'#6a9955',0.32],[-0.13,'#dcdcaa',0.42],
      ].map(([y,c,w],i)=>(
        <mesh key={i} position={[-0.04,y,0.015]}>
          <boxGeometry args={[w,0.016,0.001]}/>
          <meshStandardMaterial color="#000" emissive={c} emissiveIntensity={0.85}/>
        </mesh>
      ))}
      {[0.12,0.07,0.02,-0.03,-0.08,-0.13].map((y,i)=>(
        <mesh key={i} position={[-0.27,y,0.015]}>
          <boxGeometry args={[0.03,0.013,0.001]}/>
          <meshStandardMaterial color="#000" emissive="#556655" emissiveIntensity={0.4}/>
        </mesh>
      ))}
      <mesh ref={cRef} position={[-0.18,-0.08,0.015]}>
        <boxGeometry args={[0.015,0.022,0.001]}/>
        <meshStandardMaterial color="#000" emissive="#ffffff" emissiveIntensity={1.2}/>
      </mesh>
      {/* Warm amber bottom edge instead of teal neon */}
      <mesh position={[0,-0.225,0.012]}>
        <boxGeometry args={[0.68,0.007,0.002]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.0}/>
      </mesh>
      <mesh position={[0,-0.275,0.01]} castShadow>
        <boxGeometry args={[0.055,0.10,0.055]}/>
        <meshStandardMaterial color="#0c0e16" roughness={0.3} metalness={0.8}/>
      </mesh>
    </group>
  )
}

function Monitor({ offsetX=0, rotY=0 }) {
  const sRef = useRef()
  useFrame(({ clock }) => {
    if (sRef.current) sRef.current.emissiveIntensity = 0.45 + Math.sin(clock.elapsedTime*0.6+offsetX)*0.09
  })
  return (
    <group position={[offsetX,0,0]} rotation={[0,rotY,0]}>
      <mesh castShadow>
        <boxGeometry args={[0.70,0.44,0.020]}/>
        <meshStandardMaterial color="#0a0c14" roughness={0.25} metalness={0.85}/>
      </mesh>
      <mesh position={[0,0,0.012]}>
        <boxGeometry args={[0.64,0.38,0.002]}/>
        <meshStandardMaterial ref={sRef} color={C.screenBg} emissive="#2a4a7a" emissiveIntensity={0.45} roughness={0.04}/>
      </mesh>
      {[
        [0.12,'#569cd6',0.36],[0.07,'#4ec9b0',0.44],[0.02,'#9cdcfe',0.28],
        [-0.03,'#ce9178',0.40],[-0.08,'#6a9955',0.32],[-0.13,'#dcdcaa',0.42],
      ].map(([y,c,w],i)=>(
        <mesh key={i} position={[-0.04,y,0.015]}>
          <boxGeometry args={[w,0.016,0.001]}/>
          <meshStandardMaterial color="#000" emissive={c} emissiveIntensity={0.85}/>
        </mesh>
      ))}
      <mesh position={[0,-0.275,0.01]} castShadow>
        <boxGeometry args={[0.055,0.10,0.055]}/>
        <meshStandardMaterial color="#0c0e16" roughness={0.3} metalness={0.8}/>
      </mesh>
      <mesh position={[0,-0.225,0.012]}>
        <boxGeometry args={[0.68,0.007,0.002]}/>
        <meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.8}/>
      </mesh>
    </group>
  )
}

function RobotToy() {
  const ref = useRef()
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = Math.sin(clock.elapsedTime*0.4)*0.3 })
  return (
    <group ref={ref} position={[-0.60,0.796,-0.06]}>
      <mesh castShadow><boxGeometry args={[0.075,0.095,0.055]}/><meshStandardMaterial color="#0a1428" roughness={0.4} metalness={0.5}/></mesh>
      <mesh position={[0,0.088,0]} castShadow><boxGeometry args={[0.060,0.060,0.050]}/><meshStandardMaterial color="#0e1a30" roughness={0.4} metalness={0.5}/></mesh>
      {[-0.017,0.017].map((x,i)=>(
        <mesh key={i} position={[x,0.092,0.027]}>
          <sphereGeometry args={[0.009,6,6]}/><meshStandardMaterial color="#000" emissive="#ffe080" emissiveIntensity={2.0}/>
        </mesh>
      ))}
      <mesh position={[0,0.135,0]}><cylinderGeometry args={[0.004,0.004,0.038,6]}/><meshStandardMaterial color="#aaa" roughness={0.2} metalness={0.9}/></mesh>
      <mesh position={[0,0.156,0]}><sphereGeometry args={[0.008,6,6]}/><meshStandardMaterial color="#000" emissive="#ffaa40" emissiveIntensity={2.0}/></mesh>
      {[-1,1].map((s,i)=>(<mesh key={i} position={[s*0.052,0.005,0]}><boxGeometry args={[0.016,0.055,0.016]}/><meshStandardMaterial color="#0a1428" roughness={0.4} metalness={0.5}/></mesh>))}
      <mesh position={[0,0.005,0.029]}><boxGeometry args={[0.04,0.012,0.002]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.5}/></mesh>
    </group>
  )
}

function DeskPlant() {
  return (
    <group position={[0.65,0.09,0.08]}>
      <mesh castShadow receiveShadow><cylinderGeometry args={[0.048,0.038,0.09,8]}/><meshStandardMaterial color="#2a1808" roughness={0.8}/></mesh>
      <mesh position={[0,0.052,0]}><cylinderGeometry args={[0.046,0.046,0.005,8]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.8}/></mesh>
      {[0,1,2,3,4].map(i=>(
        <mesh key={i} position={[Math.cos(i/5*Math.PI*2)*0.032,0.09+i*0.022,Math.sin(i/5*Math.PI*2)*0.032]} rotation={[0,i/5*Math.PI*2,Math.PI*0.18]} castShadow>
          <boxGeometry args={[0.018,0.068,0.009]}/><meshStandardMaterial color="#1a4020" roughness={0.9}/>
        </mesh>
      ))}
    </group>
  )
}

export default function Desk({ position=[0,0,-2.2], onSectionClick }) {
  const { groupRef, hovered, bind } = useHover(1.03)

  return (
    <group ref={groupRef} position={position} onClick={()=>onSectionClick?.('projects')} {...bind}>

      {/* Hover ring — warm amber */}
      {hovered && (
        <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.012,0]}>
          <ringGeometry args={[1.05,1.10,32]}/>
          <meshStandardMaterial color="#000" emissive="#ffffff" emissiveIntensity={1.8} transparent opacity={0.45}/>
        </mesh>
      )}

      {/* Desk surface */}
      <mesh castShadow receiveShadow position={[0,0.76,0]}>
        <boxGeometry args={[1.95,0.046,0.82]}/>
        <meshStandardMaterial color={C.woodWarm} roughness={0.5} metalness={0.05}/>
      </mesh>
      {/* Warm amber under-desk strip instead of teal/purple neon */}
      <mesh position={[0,0.736,0.41]}><boxGeometry args={[1.92,0.006,0.004]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.8}/></mesh>
      <mesh position={[0,0.736,-0.41]}><boxGeometry args={[1.92,0.006,0.004]}/><meshStandardMaterial color="#000" emissive="#ffaa40" emissiveIntensity={1.4}/></mesh>

      {[[-0.88,-0.38],[-0.88,0.34],[0.88,-0.38],[0.88,0.34]].map(([x,z],i)=>(
        <mesh key={i} position={[x,0.38,z]} castShadow receiveShadow>
          <boxGeometry args={[0.055,0.76,0.055]}/><meshStandardMaterial color={C.woodDark} roughness={0.65}/>
        </mesh>
      ))}
      {[-0.92,0.92].map((x,i)=>(
        <mesh key={i} position={[x,0.42,-0.02]}>
          <boxGeometry args={[0.022,0.62,0.70]}/><meshStandardMaterial color={C.woodMid} roughness={0.65}/>
        </mesh>
      ))}

      {/* Triple monitor arc */}
      <group position={[0,0.89,-0.22]}>
        <mesh castShadow><boxGeometry args={[0.026,0.44,0.026]}/><meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.9}/></mesh>
        <mesh position={[0,0.19,0]}><boxGeometry args={[1.15,0.022,0.022]}/><meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.9}/></mesh>
        <Monitor offsetX={0} rotY={0}/>
        <Monitor offsetX={-0.48} rotY={0.28}/>
        <Monitor offsetX={0.48} rotY={-0.28}/>
      </group>

      {/* Keyboard */}
      <group position={[0.05,0.776,0.22]}>
        <mesh castShadow receiveShadow><boxGeometry args={[0.52,0.020,0.175]}/><meshStandardMaterial color="#0a0c16" roughness={0.35} metalness={0.4}/></mesh>
        {[0.055,0.020,-0.015,-0.050].map((z,i)=>(
          <mesh key={i} position={[0,0.013,z]}><boxGeometry args={[0.49,0.004,0.022]}/><meshStandardMaterial color="#0e1020" roughness={0.5}/></mesh>
        ))}
        {/* Warm white keyboard backlight */}
        <mesh position={[0,0.001,0]}><boxGeometry args={[0.50,0.004,0.17]}/><meshStandardMaterial color="#000" emissive="#fff8e0" emissiveIntensity={0.4}/></mesh>
      </group>

      {/* Mouse */}
      <group position={[0.37,0.780,0.22]}>
        <mesh castShadow><boxGeometry args={[0.060,0.026,0.105]}/><meshStandardMaterial color="#0a0c16" roughness={0.3} metalness={0.4}/></mesh>
        <mesh position={[0,0.015,0.018]}><boxGeometry args={[0.028,0.003,0.014]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.9}/></mesh>
      </group>

      <RobotToy/>
      <DeskPlant/>

      <Text position={[0,0.022,-0.46]} rotation={[-Math.PI/2,0,0]} fontSize={0.056} color="#ffcc60" anchorX="center" anchorY="middle">
        {hovered ? '[ Projects ]' : 'Projects'}
      </Text>
    </group>
  )
}
