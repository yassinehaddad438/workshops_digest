import { useState } from 'react'
import { useWorkshops } from '../hooks/useWorkshops'
import WorkshopCard from '../components/WorkshopCard'

const SOURCES = ['All', 'UNESCO', 'Coursera Blog', 'eLearning Industry',
  'The Report by Class Central', 'World Heritage Centre coming Events']

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [source, setSource] = useState('All')
  const { data: workshops, isLoading } = useWorkshops({ source, search })

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 32px' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', marginBottom: '8px' }}>
        All Workshops
      </h1>
      <p style={{ fontFamily: 'sans-serif', color: '#777', marginBottom: '28px', fontSize: '14px' }}>
        {workshops?.length || 0} free events found
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search workshops..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '0.5px solid #ddd',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}
        />
        <select
          value={source}
          onChange={e => setSource(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '0.5px solid #ddd',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            background: 'white'
          }}
        >
          {SOURCES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {isLoading ? (
        <p style={{ fontFamily: 'sans-serif', color: '#999' }}>Loading workshops...</p>
      ) : workshops?.length === 0 ? (
        <p style={{ fontFamily: 'sans-serif', color: '#999' }}>No workshops found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {workshops.map(w => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      )}
    </div>
  )
}