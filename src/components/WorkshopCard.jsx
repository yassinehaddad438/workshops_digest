const sourceColors = {
  'UNESCO': { bg: '#e6f1fb', text: '#185fa5', border: '#1a75ff' },
  'Coursera Blog': { bg: '#eaf3de', text: '#3b6d11', border: '#2e7d32' },
  'eLearning Industry': { bg: '#faeeda', text: '#854f0b', border: '#e65100' },
  'The Report by Class Central': { bg: '#eeedfe', text: '#534ab7', border: '#7f77dd' },
  'World Heritage Centre coming Events': { bg: '#e1f5ee', text: '#085041', border: '#1d9e75' },
}

const getColor = (source) =>
  sourceColors[source] || { bg: '#f1efe8', text: '#5f5e5a', border: '#888' }

export default function WorkshopCard({ workshop }) {
  const color = getColor(workshop.source)

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      borderLeft: `3px solid ${color.border}`,
      border: '0.5px solid #e0e0e0',
      borderLeft: `3px solid ${color.border}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      transition: 'transform 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          background: color.bg,
          color: color.text,
          fontSize: '10px',
          padding: '2px 10px',
          borderRadius: '20px',
          fontFamily: 'sans-serif'
        }}>{workshop.source}</span>
        <span style={{
          background: '#eaf3de',
          color: '#3b6d11',
          fontSize: '10px',
          padding: '2px 8px',
          borderRadius: '20px',
          fontFamily: 'sans-serif'
        }}>Free</span>
      </div>

      <a href={workshop.url} target="_blank" rel="noreferrer" style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#0a2540',
        textDecoration: 'none',
        lineHeight: '1.4',
        fontFamily: 'Georgia, serif'
      }}>{workshop.title}</a>

      {workshop.description && (
        <p style={{
          fontSize: '12px',
          color: '#777',
          margin: 0,
          lineHeight: '1.6',
          fontFamily: 'sans-serif'
        }}>{workshop.description.slice(0, 120)}...</p>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '0.5px solid #f0f0f0',
        paddingTop: '10px'
      }}>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#999', fontFamily: 'sans-serif' }}>
          <span>📅 {workshop.date ? new Date(workshop.date).toDateString() : 'TBD'}</span>
          <span>📍 {workshop.location}</span>
        </div>
        <a href={workshop.url} target="_blank" rel="noreferrer" style={{
          fontSize: '11px',
          color: '#1a75ff',
          textDecoration: 'none',
          fontFamily: 'sans-serif'
        }}>View →</a>
      </div>
    </div>
  )
}