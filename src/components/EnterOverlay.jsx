import React, { useEffect, useState } from 'react'

export default function EnterOverlay({ phase, onEnter }) {
  const [mounted,  setMounted]  = useState(false)
  const [leaving,  setLeaving]  = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 150); return () => clearTimeout(t) }, [])
  useEffect(() => { if (phase !== 'entry') setLeaving(true) }, [phase])

  if (phase === 'inside') return null

  const active = mounted && !leaving

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:50,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at center, rgba(5,8,16,0.15) 0%, rgba(5,8,16,0.75) 100%)',
      opacity: active ? 1 : 0,
      transition:'opacity 0.65s ease',
      pointerEvents: leaving ? 'none' : 'auto',
    }}>
      {/* Glow orb hint */}
      <div style={{
        width:6, height:6, borderRadius:'50%',
        background:'#ffcc60',
        boxShadow:'0 0 18px 6px rgba(255,204,96,0.6)',
        marginBottom:32,
        animation:'pulse 2s infinite',
      }}/>

      <p style={{
        fontFamily:'Inter', fontSize:11, letterSpacing:'0.28em',
        textTransform:'uppercase', color:'rgba(255,204,96,0.55)',
        marginBottom:18,
        animation: active ? 'fadeIn 0.9s ease both' : 'none',
      }}>
        Harshal Rohra
      </p>

      <button
        onClick={onEnter}
        style={{
          padding:'12px 50px', borderRadius:4,
          border:'1px solid rgba(255,204,96,0.45)',
          color:'rgba(255,204,96,0.9)',
          background:'rgba(255,204,96,0.06)',
          backdropFilter:'blur(12px)',
          fontFamily:'Inter', fontSize:13, fontWeight:500,
          letterSpacing:'0.12em', textTransform:'uppercase',
          cursor:'pointer',
          animation: active ? 'slideUp 0.9s ease 0.1s both' : 'none',
          transition:'all 0.2s',
          boxShadow:'0 0 20px rgba(255,204,96,0.08)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background    = 'rgba(255,204,96,0.14)'
          e.currentTarget.style.borderColor   = 'rgba(255,204,96,0.7)'
          e.currentTarget.style.boxShadow     = '0 0 28px rgba(255,204,96,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background    = 'rgba(255,204,96,0.06)'
          e.currentTarget.style.borderColor   = 'rgba(255,204,96,0.45)'
          e.currentTarget.style.boxShadow     = '0 0 20px rgba(255,204,96,0.08)'
        }}
      >
        Enter Room
      </button>

      <p style={{
        fontFamily:'Inter', fontSize:11, color:'rgba(255,204,96,0.22)',
        marginTop:20, letterSpacing:'0.06em',
        animation: active ? 'fadeIn 1s ease 0.4s both' : 'none',
      }}>
        The wall opens. Step inside.
      </p>
    </div>
  )
}
