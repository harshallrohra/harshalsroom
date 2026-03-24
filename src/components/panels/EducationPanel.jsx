import React from 'react'

const ITEMS = [
  { period:'2022 — Present', title:'BTech, Computer Science and Engineering', org:'SRM Institute of Science and Technology', accent:'#3b82f6', points:['CGPA of 8.8 out of 10','Specialisation in AI and machine learning','Active in technical clubs and hackathons'] },
  { period:'2024', title:'Field Survey Intern', org:'PRADAN — Professional Assistance for Development Action', accent:'#22d36a', points:['Field research in rural development contexts','Collected and analysed community data','Worked with households across survey regions'] },
  { period:'2023 — 2024', title:'Hackathon Participant', org:'Multiple national-level events', accent:'#8b5cf6', points:['Smart Blind Stick project in IoT category','Medical diagnosis ML model shortlisted','Presented to technical judging panels'] },
  { period:'2022', title:'Merit Scholarship', org:'SRM University Academic Recognition', accent:'#f59e0b', points:['Top-percentile academic performance','Maintained performance throughout semesters'] },
]

export default function EducationPanel() {
  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',gap:4,overflowY:'auto',paddingRight:4 }} className="panel-scroll">
      <p style={{ fontFamily:'Inter',fontSize:12.5,color:'rgba(160,190,230,0.45)',marginBottom:12 }}>A timeline of where I have been and what I have done.</p>
      <div style={{ position:'relative',paddingLeft:30 }}>
        <div style={{ position:'absolute',left:7,top:8,bottom:0,width:2,background:'rgba(255,255,255,0.07)',borderRadius:1 }}/>
        <div style={{ display:'flex',flexDirection:'column',gap:18 }}>
          {ITEMS.map((item,i)=>(
            <div key={i} style={{ position:'relative',animation:`slideUp 0.35s ease ${i*0.09}s both` }}>
              <div style={{ position:'absolute',left:-24,top:15,width:16,height:16,borderRadius:'50%',background:'rgba(8,12,24,0.95)',border:`2px solid ${item.accent}`,boxShadow:`0 0 8px ${item.accent}66` }}/>
              <div style={{ padding:'14px 16px',background:`${item.accent}07`,border:`1px solid ${item.accent}22`,borderRadius:10 }}>
                <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:5,gap:8 }}>
                  <h3 style={{ fontFamily:'Syne',fontWeight:700,fontSize:13.5,color:'rgba(220,235,255,0.95)',flex:1 }}>{item.title}</h3>
                  <span style={{ fontFamily:'Inter',fontSize:11,color:item.accent,fontWeight:500,background:`${item.accent}14`,border:`1px solid ${item.accent}28`,padding:'2px 8px',borderRadius:20,flexShrink:0,whiteSpace:'nowrap' }}>{item.period}</span>
                </div>
                <p style={{ fontFamily:'Inter',fontSize:12.5,color:item.accent,fontWeight:500,marginBottom:9 }}>{item.org}</p>
                <div style={{ display:'flex',flexDirection:'column',gap:4 }}>
                  {item.points.map(pt=>(
                    <div key={pt} style={{ display:'flex',gap:7,alignItems:'flex-start' }}>
                      <span style={{ width:4,height:4,borderRadius:'50%',background:item.accent,flexShrink:0,marginTop:5,display:'inline-block' }}/>
                      <span style={{ fontFamily:'Inter',fontSize:12.5,color:'rgba(160,190,230,0.62)',lineHeight:1.52 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
