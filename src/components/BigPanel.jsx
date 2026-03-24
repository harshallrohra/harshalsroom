import React, { useEffect, useRef, useState } from 'react'
import AboutPanel     from './panels/AboutPanel.jsx'
import ProjectsPanel  from './panels/ProjectsPanel.jsx'
import SkillsPanel    from './panels/SkillsPanel.jsx'
import PersonalPanel  from './panels/PersonalPanel.jsx'
import EducationPanel from './panels/EducationPanel.jsx'
import ContactPanel   from './panels/ContactPanel.jsx'

const META = {
  about:     { title:'About Me',               sub:'Background and story',           Component:AboutPanel,     accent:'#ffcc60' },
  projects:  { title:'Projects',               sub:'Things I have built',            Component:ProjectsPanel,  accent:'#ffb840' },
  skills:    { title:'Skills',                 sub:'Tools and technologies',         Component:SkillsPanel,    accent:'#ffcc60' },
  personal:  { title:'Outside of Code',        sub:'What makes me who I am',        Component:PersonalPanel,  accent:'#e8a060' },
  education: { title:'Education & Experience', sub:'Timeline of learning',          Component:EducationPanel, accent:'#ffcc60' },
  contact:   { title:'Get in Touch',           sub:'Reach out or connect',          Component:ContactPanel,   accent:'#a8d878' },
}

export default function BigPanel({ section, onClose }) {
  const [show,    setShow]    = useState(false)
  const [leaving, setLeaving] = useState(false)
  const backdropRef = useRef()
  const meta = META[section]
  if (!meta) return null
  const { Component, accent } = meta

  useEffect(() => { const raf = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(raf) }, [])

  const close = () => { setLeaving(true); setTimeout(onClose, 280) }

  const onBackdrop = e => { if (e.target === backdropRef.current) close() }

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const active = show && !leaving

  return (
    <div
      ref={backdropRef}
      onClick={onBackdrop}
      style={{
        position:'fixed', inset:0, zIndex:100,
        display:'flex', alignItems:'center', justifyContent:'center', padding:'20px',
        background: active ? 'rgba(5,8,16,0.72)' : 'rgba(5,8,16,0)',
        backdropFilter: active ? 'blur(8px)' : 'blur(0px)',
        transition:'background 0.28s ease, backdrop-filter 0.28s ease',
      }}
    >
      <div style={{
        width:'92vw', maxWidth:1020,
        height:'88vh', maxHeight:700,
        background:'rgba(8,12,24,0.96)',
        borderRadius:14,
        border:`1px solid ${accent}28`,
        display:'flex', flexDirection:'column', overflow:'hidden',
        boxShadow:`0 0 0 1px rgba(255,255,255,0.04), 0 28px 72px rgba(0,0,0,0.8), 0 0 48px ${accent}0a`,
        opacity:  active ? 1 : 0,
        transform:active ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
        transition:'opacity 0.28s ease, transform 0.28s cubic-bezier(0.2,0,0,1)',
      }}>

        {/* Accent top line */}
        <div style={{ height:2, background:`linear-gradient(90deg,transparent,${accent},${accent}88,transparent)`, flexShrink:0 }}/>

        {/* Header */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'18px 26px 15px',
          borderBottom:`1px solid rgba(255,255,255,0.05)`,
          flexShrink:0,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:9, height:9, borderRadius:'50%', background:accent, boxShadow:`0 0 10px ${accent}` }}/>
            <div>
              <h2 style={{ fontFamily:'Syne', fontWeight:700, fontSize:20, color:'rgba(220,235,255,0.95)', lineHeight:1.1 }}>{meta.title}</h2>
              <p style={{ fontFamily:'Inter', fontSize:12, color:'rgba(160,190,230,0.45)', marginTop:2 }}>{meta.sub}</p>
            </div>
          </div>

          {/* Section dots */}
          <div style={{ display:'flex', gap:7, marginRight:16 }}>
            {Object.entries(META).map(([key, m]) => (
              <div key={key} style={{
                width:7, height:7, borderRadius:'50%',
                background: key===section ? m.accent : 'rgba(255,255,255,0.08)',
                boxShadow:  key===section ? `0 0 6px ${m.accent}` : 'none',
                transition:'all 0.2s',
              }}/>
            ))}
          </div>

          <button
            onClick={close}
            style={{
              width:32, height:32, borderRadius:'50%',
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
              color:'rgba(160,190,230,0.45)', fontSize:14,
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', transition:'all 0.15s', flexShrink:0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.color='rgba(220,235,255,0.9)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='rgba(160,190,230,0.45)' }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflow:'hidden', padding:'22px 26px' }} className="panel-scroll">
          <Component/>
        </div>

        {/* Footer */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'9px 26px',
          borderTop:'1px solid rgba(255,255,255,0.04)',
          background:'rgba(0,0,0,0.3)',
          flexShrink:0,
        }}>
          <span style={{ fontFamily:'Inter', fontSize:11, color:'rgba(160,190,230,0.28)' }}>Press Esc or click outside to close</span>
          <span style={{ fontFamily:'Inter', fontSize:11, color:'rgba(160,190,230,0.22)', letterSpacing:'0.04em' }}>harshal.dev</span>
        </div>
      </div>
    </div>
  )
}
