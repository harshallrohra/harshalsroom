import React, { useState } from 'react'

const GROUPS = [
  { title:'Programming Languages', accent:'#3b82f6', skills:[{n:'Python',v:90},{n:'Java',v:80},{n:'C',v:72},{n:'C++',v:70}] },
  { title:'Machine Learning',      accent:'#8b5cf6', skills:[{n:'Scikit-learn',v:88},{n:'Logistic Regression',v:85},{n:'Model evaluation',v:82},{n:'Data drift detection',v:78}] },
  { title:'Tools',                 accent:'#00d4ff', skills:[{n:'Git and GitHub',v:86},{n:'MySQL',v:78},{n:'Arduino',v:75},{n:'Linux CLI',v:70}] },
  { title:'Concepts',              accent:'#f59e0b', skills:[{n:'Data structures and algorithms',v:83},{n:'Backend development',v:78},{n:'EEG signal processing',v:72},{n:'Embedded systems',v:70}] },
]

function Group({ g, index }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, overflow:'hidden', animation:`slideUp 0.35s ease ${index*0.08}s both` }}>
      <button onClick={() => setOpen(o=>!o)} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'13px 16px',background:`${g.accent}08`,border:'none',cursor:'pointer' }}>
        <div style={{ display:'flex',alignItems:'center',gap:9 }}>
          <span style={{ width:3,height:17,borderRadius:2,background:g.accent,display:'inline-block' }}/>
          <span style={{ fontFamily:'Syne',fontWeight:700,fontSize:13.5,color:'rgba(220,235,255,0.95)' }}>{g.title}</span>
        </div>
        <span style={{ color:g.accent,fontSize:15,transition:'transform 0.2s',transform:open?'rotate(180deg)':'rotate(0)',display:'inline-block' }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding:'13px 16px 15px',display:'flex',flexDirection:'column',gap:11,background:'rgba(8,12,24,0.6)' }}>
          {g.skills.map((sk,i)=>(
            <div key={sk.n}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
                <span style={{ fontFamily:'Inter',fontSize:13,color:'rgba(200,220,255,0.78)',fontWeight:500 }}>{sk.n}</span>
                <span style={{ fontFamily:'Inter',fontSize:11.5,color:g.accent,fontWeight:500 }}>{sk.v}%</span>
              </div>
              <div style={{ height:4,background:'rgba(255,255,255,0.06)',borderRadius:2,overflow:'hidden' }}>
                <div style={{ height:'100%',width:`${sk.v}%`,background:g.accent,borderRadius:2,boxShadow:`0 0 6px ${g.accent}88`,'--bw':`${sk.v}%`,animation:`barGrow 0.75s ease ${index*0.08+i*0.05+0.15}s both` }}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SkillsPanel() {
  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',gap:9,overflowY:'auto' }} className="panel-scroll">
      <p style={{ fontFamily:'Inter',fontSize:12.5,color:'rgba(160,190,230,0.45)',marginBottom:4 }}>A self-assessment across the tools and concepts I work with regularly.</p>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:9 }}>
        {GROUPS.map((g,i)=><Group key={g.title} g={g} index={i}/>)}
      </div>
    </div>
  )
}
