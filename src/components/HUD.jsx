import React, { useState } from 'react'

const NAV = [
  { key:'about',     label:'About'     },
  { key:'projects',  label:'Projects'  },
  { key:'skills',    label:'Skills'    },
  { key:'personal',  label:'Personal'  },
  { key:'education', label:'Education' },
  { key:'contact',   label:'Contact'   },
]

export default function HUD({ phase, onSectionClick, onBack }) {
  const [hov, setHov] = useState(null)
  if (phase !== 'inside') return null

  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, zIndex:30,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 28px',
      background:'rgba(5,8,16,0.75)',
      backdropFilter:'blur(16px)',
      borderBottom:'1px solid rgba(255,204,96,0.10)',
      animation:'slideDown 0.5s ease both',
    }}>
      {/* Left — name + back */}
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <button
          onClick={onBack}
          style={{
            fontFamily:'Inter', fontSize:11, color:'rgba(255,204,96,0.45)',
            background:'transparent', border:'none', cursor:'pointer',
            letterSpacing:'0.08em', transition:'color 0.15s', padding:'4px 8px', borderRadius:4,
          }}
          onMouseEnter={e => e.currentTarget.style.color='rgba(255,204,96,0.9)'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,204,96,0.45)'}
        >
          ← Exit
        </button>
        <span style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'rgba(200,220,255,0.88)', letterSpacing:'0.04em' }}>
          Harshal Rohra
        </span>
      </div>

      {/* Nav links */}
      <nav style={{ display:'flex', gap:2 }}>
        {NAV.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSectionClick(key)}
            onMouseEnter={() => setHov(key)}
            onMouseLeave={() => setHov(null)}
            style={{
              fontFamily:'Inter', fontSize:12, fontWeight:500,
              color: hov===key ? 'rgba(255,204,96,0.95)' : 'rgba(160,190,230,0.55)',
              background: hov===key ? 'rgba(255,204,96,0.08)' : 'transparent',
              border:'none', padding:'7px 14px', borderRadius:5,
              cursor:'pointer', letterSpacing:'0.02em', transition:'all 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Status */}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <span style={{
          width:7, height:7, borderRadius:'50%', background:'#22d36a',
          display:'inline-block', boxShadow:'0 0 8px rgba(34,211,106,0.6)',
          animation:'pulse 2.2s infinite',
        }}/>
        <span style={{ fontFamily:'Inter', fontSize:11, color:'rgba(34,211,106,0.65)', letterSpacing:'0.04em' }}>
          Open to work
        </span>
      </div>
    </div>
  )
}
