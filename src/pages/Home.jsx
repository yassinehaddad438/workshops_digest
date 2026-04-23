import { Link } from 'react-router-dom'
import { useWorkshops } from '../hooks/useWorkshops'
import WorkshopCard from '../components/WorkshopCard'

export default function Home() {
  const { data: workshops, isLoading } = useWorkshops()
  const latest = workshops?.slice(0, 6) || []

  return (
    <div>
      <div style={{
        background: 'linear-gradient(160deg, #0a2540 0%, #1a3a6e 100%)',
        padding: '80px 32px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '40px',
          fontFamily: 'Georgia, serif',
          margin: '0 0 16px',
          lineHeight: 1.2
        }}>Free Workshops,<br />Delivered Daily</h1>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '16px',
          fontFamily: 'sans-serif',
          margin: '0 0 32px'
        }}>Curated from 9+ sources. 100% free. Every morning.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/workshops" style={{
            background: '#1a75ff',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}>Browse Workshops</Link>
          <Link to="/subscribe" style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>Get Daily Email</Link>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        maxWidth: '800px',
        margin: '-20px auto 0',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {[
          { label: 'Total Events', value: workshops?.length || 0, color: '#1a75ff' },
          { label: 'Sources', value: 9, color: '#2e7d32' },
          { label: 'Added Today', value: workshops?.filter(w => {
            const today = new Date().toDateString()
            return new Date(w.created_at).toDateString() === today
          }).length || 0, color: '#e65100' }
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '20px',
            textAlign: 'center',
            borderRight: i < 2 ? '0.5px solid #f0f0f0' : 'none'
          }}>
            <div style={{ fontSize: '28px', fontWeight: '500', color: stat.color, fontFamily: 'sans-serif' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#999', fontFamily: 'sans-serif', marginTop: '4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 32px' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', marginBottom: '24px' }}>
          Latest Workshops
        </h2>
        {isLoading ? (
          <p style={{ fontFamily: 'sans-serif', color: '#999' }}>Loading...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {latest.map(w => <WorkshopCard key={w.id} workshop={w} />)}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/workshops" style={{
            background: '#0a2540',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}>View All Workshops →</Link>
        </div>
      </div>
    </div>
  )
}