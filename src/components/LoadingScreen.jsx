import React, { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [dots,     setDots]     = useState('')

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 88) { clearInterval(iv); return 88 } return p + Math.random()*14 })
    }, 160)
    const dv = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400)
    return () => { clearInterval(iv); clearInterval(dv) }
  }, [])

  const pct = Math.min(Math.round(progress), 88)

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:200, background:'#050810',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:22,
    }}>
      {/* Logo */}
      <div style={{
        width:72, height:72, borderRadius:18,
        background:'linear-gradient(135deg,#ffcc6022,#cc993022)',
        border:'1px solid rgba(255,204,96,0.35)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 0 32px rgba(255,204,96,0.2)',
        animation:'float 2s ease infinite',
      }}>
        <span style={{ fontFamily:'Syne', fontWeight:800, fontSize:30, color:'#ffcc60' }}>H</span>
      </div>

      <div style={{ textAlign:'center' }}>
        <p style={{ fontFamily:'Syne', fontWeight:700, fontSize:17, color:'rgba(200,220,255,0.88)', marginBottom:5 }}>
          Building the room{dots}
        </p>
        <p style={{ fontFamily:'Inter', fontSize:12, color:'rgba(255,204,96,0.45)', letterSpacing:'0.08em' }}>
          {pct}%
        </p>
      </div>

      <div style={{ width:200, height:2, background:'rgba(255,255,255,0.06)', borderRadius:1, overflow:'hidden' }}>
        <div style={{
          height:'100%', width:`${pct}%`,
          background:'linear-gradient(90deg,#ffcc60,#cc9930)',
          borderRadius:1, transition:'width 0.18s ease',
          boxShadow:'0 0 8px #ffcc60',
        }}/>
      </div>
    </div>
  )
}
