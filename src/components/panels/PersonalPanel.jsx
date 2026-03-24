import React, { useState } from 'react'

const CARDS = [
  { title:'Dance', sub:'Jattsquad', accent:'#ec4899', short:'Part of the Jattsquad crew. Movement is how I decompress.', full:'Dance is something I have done long enough that it feels less like a hobby and more like a language. Being part of Jattsquad means performing together, building choreography, and making a room full of people feel something.' },
  { title:'Music and Freestyling', sub:'Singing, improv', accent:'#f59e0b', short:'Singing and freestyling, usually when no one is watching.', full:'I sing, sometimes write, and often freestyle. There is something about improvising lyrics or melodies that feels very different from writing code. No backspace, no undo.' },
  { title:'Portrait Sketching', sub:'Pencil work', accent:'#8b5cf6', short:'Pencil portraits. Trying to catch something beyond the face.', full:'I sketch portraits, mostly in pencil. What draws me to it is the attempt to capture something that a camera cannot: the mood behind the expression, the character in the line of a jaw.' },
  { title:'Performing Arts', sub:'Theatre, stage', accent:'#00d4ff', short:'Theatre and performance. Presence is a learned skill.', full:'Stage work taught me that being present in a room is a learned skill. Theatre showed me how to inhabit a character, use silence, and how vulnerability on stage reads as strength to an audience.' },
  { title:'Organisation', sub:'Systems, clarity', accent:'#22d36a', short:'Clean spaces, clean systems, clean code.', full:'I like things to be tidy in a way that actually makes them easier to work with. This shows up in my code architecture, notes, and yes, my room. Less about aesthetics, more about reducing friction between having an idea and executing it.' },
]

function Card({ c, index }) {
  const [flip, setFlip] = useState(false)
  return (
    <div onClick={() => setFlip(f=>!f)} style={{ perspective:'1000px',cursor:'pointer',animation:`slideUp 0.4s ease ${index*0.08}s both`,height:168 }}>
      <div style={{ position:'relative',height:'100%',transformStyle:'preserve-3d',transition:'transform 0.5s cubic-bezier(0.4,0,0.2,1)',transform:flip?'rotateY(180deg)':'rotateY(0deg)' }}>
        <div style={{ position:'absolute',inset:0,backfaceVisibility:'hidden',background:`${c.accent}0a`,border:`1px solid ${c.accent}25`,borderRadius:10,padding:'17px',display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
          <div>
            <span style={{ display:'block',width:24,height:3,borderRadius:2,background:c.accent,marginBottom:10,boxShadow:`0 0 8px ${c.accent}` }}/>
            <h3 style={{ fontFamily:'Syne',fontWeight:700,fontSize:14,color:'rgba(220,235,255,0.95)',marginBottom:4 }}>{c.title}</h3>
            <p style={{ fontFamily:'Inter',fontSize:11.5,color:c.accent,fontWeight:500 }}>{c.sub}</p>
          </div>
          <p style={{ fontFamily:'Inter',fontSize:12.5,color:'rgba(160,190,230,0.65)',lineHeight:1.55 }}>{c.short}</p>
          <p style={{ fontFamily:'Inter',fontSize:10.5,color:'rgba(160,190,230,0.25)',marginTop:5 }}>Click to read more</p>
        </div>
        <div style={{ position:'absolute',inset:0,backfaceVisibility:'hidden',transform:'rotateY(180deg)',background:`${c.accent}0d`,border:`1px solid ${c.accent}25`,borderRadius:10,padding:'17px',display:'flex',flexDirection:'column',justifyContent:'center' }}>
          <p style={{ fontFamily:'Inter',fontSize:12.5,lineHeight:1.72,color:'rgba(180,210,240,0.78)' }}>{c.full}</p>
        </div>
      </div>
    </div>
  )
}

export default function PersonalPanel() {
  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',gap:12,overflowY:'auto' }} className="panel-scroll">
      <p style={{ fontFamily:'Inter',fontSize:12.5,color:'rgba(160,190,230,0.45)' }}>The parts of me that exist outside a code editor. Click any card to read more.</p>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(235px,1fr))',gap:10 }}>
        {CARDS.map((c,i)=><Card key={c.title} c={c} index={i}/>)}
      </div>
    </div>
  )
}
