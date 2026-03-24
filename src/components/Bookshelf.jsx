import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { C } from '../utils/colors.js'
import { useHover } from '../hooks/useHover.js'

function packBooks(books,startX=-0.44){let x=startX;return books.map(b=>{const cx=x+b.w/2;x+=b.w+0.008;return{...b,cx}})}
const BOOKS = C.books.map((c,i)=>({w:0.052+Math.sin(i)*0.008,h:0.25+Math.cos(i*1.3)*0.06,c}))

function BookRow({books,shelfY}){
  return books.map((b,i)=>(
    <group key={i} position={[b.cx,shelfY+b.h/2+0.026,0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[b.w,b.h,0.195]}/><meshStandardMaterial color={b.c} roughness={0.65} emissive={b.c} emissiveIntensity={0.04}/>
      </mesh>
      <mesh position={[0,0,-0.098]}>
        <boxGeometry args={[b.w*0.88,b.h*0.94,0.005]}/><meshStandardMaterial color="#e8e4dc" roughness={0.9}/>
      </mesh>
    </group>
  ))
}

function Globe(){
  return(
    <group>
      <mesh castShadow receiveShadow><cylinderGeometry args={[0.048,0.062,0.036,10]}/><meshStandardMaterial color="#1a0e08" roughness={0.3} metalness={0.7}/></mesh>
      <mesh position={[0,0.10,0]}><cylinderGeometry args={[0.007,0.007,0.14,6]}/><meshStandardMaterial color="#888" roughness={0.2} metalness={0.9}/></mesh>
      <mesh position={[0,0.18,0]} castShadow>
        <sphereGeometry args={[0.080,14,14]}/><meshStandardMaterial color="#0a2a4a" roughness={0.35} metalness={0.1} emissive="#041828" emissiveIntensity={0.4}/>
      </mesh>
      {[[0.04,0.19,0.04],[-0.05,0.17,0.06],[0.06,0.14,-0.06],[-0.03,0.21,-0.05]].map(([x,y,z],i)=>(
        <mesh key={i} position={[x,y,z]}><sphereGeometry args={[0.020,6,6]}/><meshStandardMaterial color="#0a4a2a" roughness={0.5} emissive="#052a18" emissiveIntensity={0.3}/></mesh>
      ))}
      <mesh position={[0,0.18,0]} rotation={[Math.PI/2,0,0.3]}>
        <torusGeometry args={[0.083,0.005,6,16]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={1.0}/>
      </mesh>
    </group>
  )
}

function Trophy(){
  return(
    <group>
      <mesh castShadow><cylinderGeometry args={[0.055,0.038,0.11,10]}/><meshStandardMaterial color="#0a0e18" roughness={0.3} metalness={0.8} emissive="#c8a020" emissiveIntensity={0.12}/></mesh>
      <mesh position={[0,0.095,0]} castShadow><cylinderGeometry args={[0.022,0.022,0.045,8]}/><meshStandardMaterial color="#0a0e18" roughness={0.3} metalness={0.8}/></mesh>
      <mesh position={[0,0.138,0]} castShadow><cylinderGeometry args={[0.068,0.050,0.095,10]}/><meshStandardMaterial color="#000" emissive="#d4a030" emissiveIntensity={0.9} roughness={0.2} metalness={0.8}/></mesh>
      <mesh position={[0,0.205,0]} castShadow><sphereGeometry args={[0.044,10,10]}/><meshStandardMaterial color="#000" emissive="#d4b040" emissiveIntensity={1.3} roughness={0.15} metalness={0.9}/></mesh>
      {[-1,1].map((s,i)=>(<mesh key={i} position={[s*0.078,0.148,0]}><torusGeometry args={[0.020,0.006,6,10,Math.PI]}/><meshStandardMaterial color="#000" emissive="#d4a030" emissiveIntensity={0.8}/></mesh>))}
    </group>
  )
}

function TinyTrain(){
  return(
    <group scale={[0.75,0.75,0.75]}>
      <mesh castShadow><boxGeometry args={[0.11,0.065,0.060]}/><meshStandardMaterial color="#0a1428" roughness={0.5} metalness={0.2}/></mesh>
      <mesh position={[-0.022,0.046,0]}><boxGeometry args={[0.055,0.046,0.060]}/><meshStandardMaterial color="#000" emissive={C.teal} emissiveIntensity={0.7}/></mesh>
      <mesh position={[0.030,0.014,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.027,0.027,0.060,8]}/><meshStandardMaterial color="#1a1030" roughness={0.4}/></mesh>
      {[-0.038,0.038].map((x,i)=>(
        [-0.026,0.026].map((z,j)=>(
          <mesh key={`${i}${j}`} position={[x,-0.030,z]} rotation={[Math.PI/2,0,0]}>
            <cylinderGeometry args={[0.016,0.016,0.009,10]}/><meshStandardMaterial color="#0a0c14" roughness={0.4} metalness={0.5}/>
          </mesh>
        ))
      ))}
      <mesh position={[0,0.035,0.032]}><boxGeometry args={[0.09,0.008,0.002]}/><meshStandardMaterial color="#000" emissive="#ffaa40" emissiveIntensity={1.5}/></mesh>
    </group>
  )
}

function TallShelf({W=0.95,D=0.26,H=2.45,shelfYs}){
  return(
    <group>
      {[-W/2,W/2].map((x,i)=>(
        <mesh key={i} position={[x,H/2,0]} castShadow receiveShadow>
          <boxGeometry args={[0.038,H,D]}/><meshStandardMaterial color={C.woodDark} roughness={0.6}/>
        </mesh>
      ))}
      <mesh position={[0,H/2,-D/2+0.012]} receiveShadow><boxGeometry args={[W-0.038,H,0.012]}/><meshStandardMaterial color="#0c1020" roughness={0.85}/></mesh>
      <mesh position={[0,H-0.012,0]} castShadow><boxGeometry args={[W+0.04,0.026,D]}/><meshStandardMaterial color={C.woodDark} roughness={0.55}/></mesh>
      {shelfYs.map((y,i)=>(
        <mesh key={i} position={[0,y,0]} castShadow receiveShadow>
          <boxGeometry args={[W,0.022,D]}/><meshStandardMaterial color={C.woodMid} roughness={0.55}/>
        </mesh>
      ))}
      {shelfYs.map((y,i)=>(
        <mesh key={`n${i}`} position={[0,y-0.013,D/2-0.02]}>
          <boxGeometry args={[W-0.06,0.006,0.005]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.8}/>
        </mesh>
      ))}
    </group>
  )
}

export default function Bookshelf({position=[3.15,0,-2.0],onSectionClick}){
  const { groupRef, hovered, bind } = useHover(1.025)
  const W=0.95,D=0.26,H=2.45
  const shelfYs=[0.30,0.88,1.46,2.04]

  return(
    <group ref={groupRef} position={position} onClick={()=>onSectionClick?.('skills')} {...bind}>
      {hovered && (
        <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.012,0]}>
          <ringGeometry args={[0.7,0.74,32]}/>
          <meshStandardMaterial color="#000" emissive="#ffffff" emissiveIntensity={1.8} transparent opacity={0.45}/>
        </mesh>
      )}
      <TallShelf W={W} D={D} H={H} shelfYs={shelfYs}/>
      <BookRow books={packBooks(BOOKS.slice(0,5))} shelfY={shelfYs[0]}/>
      <group position={[-0.26,shelfYs[1]+0.14,0]}><Globe/></group>
      <BookRow books={packBooks(BOOKS.slice(7,10),0.04)} shelfY={shelfYs[1]}/>
      <BookRow books={packBooks(BOOKS.slice(2,6),-0.20)} shelfY={shelfYs[2]}/>
      <BookRow books={packBooks(BOOKS.slice(7,10),-0.14)} shelfY={shelfYs[3]}/>
      <group position={[0.26,H+0.022,0]}><Trophy/></group>
      {/* Lower shelf */}
      <group position={[0,0,D+0.10]}>
        {[-0.42,0.42].map((x,i)=>(<mesh key={i} position={[x,0.52,0]} castShadow receiveShadow><boxGeometry args={[0.028,1.04,0.22]}/><meshStandardMaterial color={C.woodMid} roughness={0.6}/></mesh>))}
        {[0.26,0.52,0.78].map((y,i)=>(<mesh key={i} position={[0,y,0]} castShadow><boxGeometry args={[0.84,0.020,0.22]}/><meshStandardMaterial color={C.woodMid} roughness={0.55}/></mesh>))}
        <mesh position={[0,1.02,0]} castShadow><boxGeometry args={[0.88,0.022,0.22]}/><meshStandardMaterial color={C.woodMid} roughness={0.55}/></mesh>
        <BookRow books={packBooks(BOOKS.slice(1,5),-0.30)} shelfY={0.26}/>
        <group position={[-0.18,0.568,0]}><TinyTrain/></group>
        <BookRow books={packBooks(BOOKS.slice(5,8),-0.18)} shelfY={0.52}/>
        <BookRow books={packBooks(BOOKS.slice(0,4),-0.22)} shelfY={0.78}/>
        {[0.26,0.52,0.78].map((y,i)=>(<mesh key={`ln${i}`} position={[0,y-0.012,0.11]}><boxGeometry args={[0.78,0.005,0.004]}/><meshStandardMaterial color="#000" emissive="#ffcc60" emissiveIntensity={0.7}/></mesh>))}
      </group>
      <Text position={[0,0.012,D/2+0.08]} rotation={[-Math.PI/2,0,0]} fontSize={0.058} color="#ffcc60" anchorX="center" anchorY="middle">
        {hovered ? '[ Skills ]' : 'Skills'}
      </Text>
    </group>
  )
}
