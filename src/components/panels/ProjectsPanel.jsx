import React, { useState } from 'react'

const PROJECTS = [
  {
    title: 'AI Personal Finance Analyzer',
    period: '2024',
    accent: '#ffb840',
    stack: ['Python', 'Scikit-learn', 'Prophet', 'Streamlit', 'Plotly'],
    points: [
      'Processed 1,000+ financial transactions using a complete ML pipeline',
      'Engineered 12+ behavioral features for user spending patterns',
      'Detected 40+ anomalies using Isolation Forest',
      'Forecasted 30-day expenses using Prophet time-series model',
      'Built interactive dashboard using Streamlit and Plotly',
    ],
  },
  {
    title: 'Customer Churn Prediction with Drift Detection',
    period: '2024',
    accent: '#ffd080',
    stack: ['Python', 'Scikit-learn'],
    points: [
      'Built churn prediction model using Logistic Regression',
      'Focused on recall metric for better churn detection',
      'Detected data drift using statistical drift methods',
      'Retrained model automatically to restore performance',
      'Developed end-to-end pipeline with monitoring',
    ],
  },
  {
    title: "Parkinson's Disease Detection using EEG Signals",
    period: '2024',
    accent: '#ffcc60',
    stack: ['Python', 'Deep Learning', 'EEG Processing'],
    points: [
      'Built deep learning model for EEG signal classification',
      'Designed preprocessing pipeline for biomedical signals',
      'Applied ITDO optimization for hyperparameter tuning',
      'Improved model performance through iterative tuning',
    ],
  },
  {
    title: 'Medical AI Chatbot – Aug Medix',
    period: '2023',
    accent: '#ffaa40',
    stack: ['Java', 'MySQL'],
    points: [
      'Developed backend-driven chatbot for medical queries',
      'Designed modular architecture with clean separation of concerns',
      'Integrated MySQL for persistent storage',
    ],
  },
  {
    title: 'Smart Blind Stick',
    period: '2023',
    accent: '#ffe0a0',
    stack: ['Arduino', 'Embedded Systems'],
    points: [
      'Built assistive device using ultrasonic sensors',
      'Implemented real-time obstacle detection',
      'Used buzzer and LED feedback for user alerts',
    ],
  },
]

function Card({ p, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div
      style={{
        border: `1px solid ${open ? p.accent + '44' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 10,
        overflow: 'hidden',
        background: open ? `${p.accent}09` : 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s ease',
        animation: `slideUp 0.35s ease ${index * 0.06}s both`,
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', width:'100%', padding:'14px 17px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left', gap:12 }}
      >
        <div style={{ flex:1 }}>
          <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:14, color:'rgba(255,240,210,0.95)', lineHeight:1.3, marginBottom:7 }}>
            {p.title}
          </h3>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
            {p.stack.map(s => (
              <span key={s} style={{ padding:'2px 8px', borderRadius:20, border:`1px solid ${p.accent}44`, color:p.accent, fontFamily:'Inter', fontSize:11, background:`${p.accent}0e` }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <span style={{ fontFamily:'Inter', fontSize:11, color:'rgba(200,170,100,0.45)' }}>{p.period}</span>
          <span style={{ color:p.accent, fontSize:15, transition:'transform 0.2s', transform:open ? 'rotate(180deg)' : 'rotate(0)', display:'inline-block' }}>⌄</span>
        </div>
      </button>

      {open && (
        <div style={{ padding:'0 17px 16px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {p.points.map((pt, i) => (
              <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:p.accent, flexShrink:0, marginTop:6, display:'inline-block', boxShadow:`0 0 5px ${p.accent}` }} />
                <span style={{ fontFamily:'Inter', fontSize:13, color:'rgba(200,180,140,0.72)', lineHeight:1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectsPanel() {
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', gap:9, overflowY:'auto' }} className="panel-scroll">
      <p style={{ fontFamily:'Inter', fontSize:12.5, color:'rgba(200,170,100,0.50)', marginBottom:4 }}>
        5 projects across AI, ML, backend development, and embedded systems.
      </p>
      {PROJECTS.map((p, i) => <Card key={p.title} p={p} index={i} />)}
    </div>
  )
}
