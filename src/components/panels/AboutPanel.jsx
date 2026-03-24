import React from 'react'

const s = {
  p:    { fontFamily:'Inter', fontSize:14, lineHeight:1.78, color:'rgba(200,185,155,0.82)', fontWeight:400 },
  h:    { fontFamily:'Syne', fontWeight:700, fontSize:18, color:'rgba(255,240,210,0.95)', marginBottom:10 },
  lbl:  { fontFamily:'Inter', fontSize:10.5, color:'rgba(255,200,96,0.50)', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:4, display:'block' },
  val:  { fontFamily:'Inter', fontSize:13.5, color:'rgba(255,235,190,0.88)', fontWeight:500 },
  card: { padding:'13px 16px', background:'rgba(255,200,80,0.06)', borderRadius:8, border:'1px solid rgba(255,200,80,0.14)' },
  tag:  { padding:'3px 11px', background:'rgba(255,200,80,0.10)', border:'1px solid rgba(255,200,80,0.22)', borderRadius:20, fontFamily:'Inter', fontSize:11.5, color:'rgba(255,210,100,0.85)', display:'inline-block' },
}

export default function AboutPanel() {
  return (
    <div style={{ display:'flex', gap:28, height:'100%', flexWrap:'wrap' }}>

      {/* Portrait — natural colors, no filter */}
      <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:14, minWidth:165 }}>
        <div style={{
          width:165, height:210,
          borderRadius:12,
          border:'1px solid rgba(255,200,80,0.22)',
          overflow:'hidden',
          boxShadow:'0 6px 28px rgba(0,0,0,0.55)',
          flexShrink:0,
          background:'#0a0806',
        }}>
          <img
            src="/harshal-portrait.jpg"
            alt="Harshal Rohra"
            style={{
              width:'100%',
              height:'100%',
              objectFit:'cover',
              objectPosition:'center top',
              display:'block',
              /* NO filter, NO tint, NO overlay */
            }}
          />
        </div>
        <div style={{ textAlign:'center' }}>
          <p style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'rgba(255,240,210,0.92)' }}>Harshal Rohra</p>
          <p style={{ fontFamily:'Inter', fontSize:12, color:'rgba(255,200,80,0.55)', marginTop:2 }}>CS Undergrad · SRM University</p>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center' }}>
          {['ML','Backend','IoT','DSA'].map(tag => <span key={tag} style={s.tag}>{tag}</span>)}
        </div>
      </div>

      {/* Text */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:18, overflowY:'auto', minWidth:240 }} className="panel-scroll">
        <div>
          <h3 style={s.h}>Hey, I am Harshal</h3>
          <p style={s.p}>
            Computer Science undergraduate at SRM University with a focus on machine learning
            and backend development. I work on problems that connect data with real outcomes —
            predicting behaviour, analysing medical signals, or building backend systems that just work.
          </p>
        </div>
        <p style={s.p}>
          Outside formal projects, I spend time on competitive programming, reading about how
          ML systems degrade in production, and occasionally breaking things to understand
          how they are built. I learn best by building.
        </p>
        <div style={{ padding:'14px 18px', background:'rgba(255,170,60,0.08)', borderRadius:10, borderLeft:'3px solid rgba(255,170,60,0.40)' }}>
          <p style={{ ...s.p, color:'rgba(255,210,120,0.85)', fontStyle:'italic' }}>
            "Good software is invisible. It solves the problem so cleanly that no one notices it is there."
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            ['University',  'SRM Institute of Science and Technology'],
            ['Degree',      'BTech, Computer Science and Engineering'],
            ['CGPA',        '8.8 out of 10.0'],
            ['Looking for', 'Internships and collaborative projects'],
          ].map(([label, value]) => (
            <div key={label} style={s.card}>
              <span style={s.lbl}>{label}</span>
              <p style={s.val}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
