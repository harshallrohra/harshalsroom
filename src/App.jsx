import React, { useState, Suspense, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene         from './scenes/Scene.jsx'
import HUD           from './components/HUD.jsx'
import BigPanel      from './components/BigPanel.jsx'
import EnterOverlay  from './components/EnterOverlay.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

export default function App() {
  const [phase,          setPhase]          = useState('entry')
  const [activeSection,  setActiveSection]  = useState(null)
  const [panelSection,   setPanelSection]   = useState(null)  // what's SHOWN in panel
  const [loaded,         setLoaded]         = useState(false)

  // Sequencing: camera zooms first, THEN panel opens
  const pendingSection = useRef(null)
  const panelTimer     = useRef(null)

  const openSection = useCallback((key) => {
    if (phase !== 'inside') return

    // If same section clicked → close
    if (activeSection === key) {
      closePanel()
      return
    }

    // 1. Close any open panel immediately
    setPanelSection(null)

    // 2. Start camera zoom — activeSection drives camera
    setActiveSection(key)

    // 3. After zoom duration, open panel
    clearTimeout(panelTimer.current)
    panelTimer.current = setTimeout(() => {
      setPanelSection(key)
    }, 900)   // matches GSAP camera duration of 1.8s × 0.5 = comfortable delay
  }, [phase, activeSection])

  const closePanel = useCallback(() => {
    // 1. Close panel first
    setPanelSection(null)
    // 2. After panel fade-out, reset camera
    setTimeout(() => {
      setActiveSection(null)
    }, 320)
  }, [])

  const handleBack = useCallback(() => {
    setPanelSection(null)
    setActiveSection(null)
    clearTimeout(panelTimer.current)
    setTimeout(() => setPhase('entry'), 150)
  }, [])

  return (
    <div style={{ position:'relative', width:'100vw', height:'100vh', overflow:'hidden', background:'#050810' }}>

      {/* Full-screen 3D canvas */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position:[0,1.80,6.2], fov:58, near:0.1, far:40 }}
        gl={{ antialias:true, stencil:false, alpha:false }}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
        onCreated={() => setTimeout(() => setLoaded(true), 600)}
      >
        <Suspense fallback={null}>
          <Scene
            phase={phase}
            setPhase={setPhase}
            activeSection={activeSection}
            onSectionClick={openSection}
          />
        </Suspense>
      </Canvas>

      {/* Dim overlay when panel is open */}
      {panelSection && (
        <div style={{
          position:'absolute', inset:0, zIndex:90,
          background:'rgba(5,8,16,0.45)',
          pointerEvents:'none',
          animation:'fadeIn 0.3s ease both',
        }}/>
      )}

      {!loaded && <LoadingScreen/>}
      {loaded && <EnterOverlay phase={phase} onEnter={() => setPhase('opening')}/>}
      {loaded && <HUD phase={phase} onSectionClick={openSection} onBack={handleBack}/>}

      {/* Panel only renders AFTER camera zoom delay */}
      {panelSection && (
        <BigPanel
          key={panelSection}
          section={panelSection}
          onClose={closePanel}
        />
      )}
    </div>
  )
}
