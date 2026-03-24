import React, { useState } from 'react'

const LINKS = [
  { name:'Email', handle:'harshalrohra4@gmail.com', href:'mailto:harshalrohra4@gmail.com', accent:'#ef4444', logo:<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#ea4335"/><path d="M4 8l8 5 8-5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/><rect x="4" y="8" width="16" height="10" rx="1" stroke="#fff" strokeWidth="1.4" fill="none"/></svg> },
  { name:'GitHub', handle:'github.com/harshalrohra', href:'https://github.com/harshalrohra', accent:'#e8f4ff', logo:<svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#24292e"/><path fill="#fff" d="M12 3C7.03 3 3 7.03 3 12c0 3.97 2.58 7.35 6.16 8.54.45.08.61-.2.61-.43v-1.53c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.61.75.08-.58.31-.98.57-1.2-2-.22-4.1-.99-4.1-4.44 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.38 0 0 .76-.24 2.48.93A8.62 8.62 0 0112 7.55c.77 0 1.54.1 2.26.3 1.72-1.17 2.48-.93 2.48-.93.49 1.24.18 2.15.09 2.38.58.63.93 1.43.93 2.41 0 3.46-2.1 4.22-4.11 4.44.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.43A9.01 9.01 0 0021 12c0-4.97-4.03-9-9-9z"/></svg> },
  { name:'LinkedIn', handle:'Harshal Rohra', href:'https://linkedin.com/in/harshalrohra', accent:'#0a66c2', logo:<svg width="26" height="26" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0a66c2"/><path fill="#fff" d="M7 9H5v9h2V9zm-1-3a1 1 0 100 2 1 1 0 000-2zm10 3c-1.3 0-2.1.7-2.5 1.3V9H11v9h2v-5c0-.8.6-1.5 1.5-1.5S16 12.2 16 13v5h2v-5c0-2.2-1.3-4-3-4z"/></svg> },
  { name:'Instagram', handle:'@harshal.rohra', href:'https://instagram.com/harshal.rohra', accent:'#e1306c', logo:<svg width="26" height="26" viewBox="0 0 24 24"><defs><linearGradient id="ig5" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#ig5)"/><rect x="6" y="6" width="12" height="12" rx="3" stroke="#fff" strokeWidth="1.4" fill="none"/><circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.4" fill="none"/><circle cx="16.5" cy="7.5" r="0.8" fill="#fff"/></svg> },
]

function LinkRow({ l, i }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={l.href} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ display:'flex',alignItems:'center',gap:15,padding:'13px 17px',background:hov?`${l.accent}0e`:'rgba(255,255,255,0.02)',border:`1px solid ${hov?l.accent+'38':'rgba(255,255,255,0.07)'}`,borderRadius:10,textDecoration:'none',transition:'all 0.18s',transform:hov?'translateX(4px)':'translateX(0)',animation:`slideUp 0.35s ease ${i*0.07}s both`,cursor:'pointer' }}>
      <div style={{ flexShrink:0 }}>{l.logo}</div>
      <div>
        <p style={{ fontFamily:'Syne',fontWeight:700,fontSize:13.5,color:'rgba(220,235,255,0.92)' }}>{l.name}</p>
        <p style={{ fontFamily:'Inter',fontSize:12.5,color:l.accent,marginTop:1 }}>{l.handle}</p>
      </div>
      <span style={{ marginLeft:'auto',color:'rgba(160,190,230,0.28)',fontSize:17 }}>→</span>
    </a>
  )
}

export default function ContactPanel() {
  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',gap:13,overflowY:'auto' }} className="panel-scroll">
      <div style={{ padding:'17px 20px',background:'rgba(0,212,255,0.06)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:10,animation:'slideUp 0.3s ease both' }}>
        <h3 style={{ fontFamily:'Syne',fontWeight:700,fontSize:17,color:'rgba(220,235,255,0.95)',marginBottom:8 }}>Currently open to internships</h3>
        <p style={{ fontFamily:'Inter',fontSize:13.5,lineHeight:1.72,color:'rgba(160,190,230,0.72)' }}>Building something in ML, backend development, or at the intersection of both — I would like to hear about it. Open to research collaborations and interesting side projects too.</p>
        <div style={{ display:'flex',alignItems:'center',gap:8,marginTop:11 }}>
          <span style={{ width:8,height:8,borderRadius:'50%',background:'#22d36a',display:'inline-block',boxShadow:'0 0 8px rgba(34,211,106,0.6)',animation:'pulse 2.2s infinite' }}/>
          <span style={{ fontFamily:'Inter',fontSize:12.5,color:'#22d36a',fontWeight:500 }}>Available for new opportunities</span>
        </div>
      </div>
      <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
        {LINKS.map((l,i)=><LinkRow key={l.name} l={l} i={i}/>)}
      </div>
      <p style={{ fontFamily:'Inter',fontSize:11.5,color:'rgba(160,190,230,0.22)',textAlign:'center',marginTop:'auto',paddingTop:8 }}>Built with React Three Fiber — Harshal Rohra, 2024</p>
    </div>
  )
}
