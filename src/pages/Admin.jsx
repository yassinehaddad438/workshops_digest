import { useState } from 'react'
import { useWorkshops } from '../hooks/useWorkshops'
import { supabase } from '../lib/supabase'

const SOURCES = [
  { name: 'UNESCO', status: 'active' },
  { name: 'Coursera Blog', status: 'active' },
  { name: 'eLearning Industry', status: 'active' },
  { name: 'The Report by Class Central', status: 'active' },
  { name: 'World Heritage Centre coming Events', status: 'active' },
  { name: 'TeachThought', status: 'active' },
  { name: 'Open Culture', status: 'active' },
  { name: 'FutureLearn', status: 'active' },
  { name: 'Meetup', status: 'inactive' },
]

export default function Admin() {
  const { data: workshops, isLoading, refetch } = useWorkshops()
  const [triggerStatus, setTriggerStatus] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState(null)
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  // Simple password protection
  if (!authenticated) {
    return (
      <div style={{
        maxWidth: '360px',
        margin: '120px auto',
        padding: '32px',
        background: 'white',
        borderRadius: '12px',
        border: '0.5px solid #e0e0e0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔐</div>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', marginBottom: '20px' }}>
          Admin Access
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && password === 'admin123') {
              setAuthenticated(true)
            }
          }}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '0.5px solid #ddd',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}
        />
        <button
          onClick={() => {
            if (password === 'admin123') setAuthenticated(true)
          }}
          style={{
            width: '100%',
            background: '#0a2540',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            fontFamily: 'sans-serif',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >Enter</button>
        <p style={{ fontSize: '11px', color: '#bbb', fontFamily: 'sans-serif', marginTop: '12px' }}>
          Default password: admin123 (change in Admin.jsx)
        </p>
      </div>
    )
  }

  // Stats
  const today = new Date().toDateString()
  const addedToday = workshops?.filter(w =>
    new Date(w.created_at).toDateString() === today
  ).length || 0

  const bySource = SOURCES.map(s => ({
    ...s,
    count: workshops?.filter(w => w.source === s.name).length || 0
  }))

  // Trigger n8n webhook manually
  const triggerN8n = async () => {
    setTriggerStatus('loading')
    try {
      // Replace with your actual n8n webhook URL
      const res = await fetch('YOUR_N8N_WEBHOOK_URL', { method: 'POST' })
      setTriggerStatus(res.ok ? 'success' : 'error')
    } catch {
      setTriggerStatus('error')
    }
    setTimeout(() => setTriggerStatus(null), 3000)
  }

  // Delete old workshops
  const deleteOld = async () => {
    setDeleteStatus('loading')
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 30)
    const { error } = await supabase
      .from('workshops')
      .delete()
      .lt('created_at', cutoff.toISOString())
    setDeleteStatus(error ? 'error' : 'success')
    if (!error) refetch()
    setTimeout(() => setDeleteStatus(null), 3000)
  }

  const statCard = (label, value, color) => (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      border: '0.5px solid #e0e0e0',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '28px',
        fontWeight: '500',
        color,
        fontFamily: 'sans-serif'
      }}>{value}</div>
      <div style={{
        fontSize: '12px',
        color: '#999',
        fontFamily: 'sans-serif',
        marginTop: '4px'
      }}>{label}</div>
    </div>
  )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', margin: '0 0 4px' }}>
            Admin Dashboard
          </h1>
          <p style={{ fontFamily: 'sans-serif', color: '#999', fontSize: '13px', margin: 0 }}>
            {new Date().toDateString()}
          </p>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          style={{
            background: 'none',
            border: '0.5px solid #ddd',
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'sans-serif',
            fontSize: '13px',
            cursor: 'pointer',
            color: '#666'
          }}
        >Logout</button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '28px'
      }}>
        {statCard('Total Workshops', isLoading ? '...' : workshops?.length || 0, '#1a75ff')}
        {statCard('Added Today', addedToday, '#2e7d32')}
        {statCard('Active Sources', SOURCES.filter(s => s.status === 'active').length, '#e65100')}
        {statCard('Inactive Sources', SOURCES.filter(s => s.status === 'inactive').length, '#a32d2d')}
      </div>

      {/* Actions */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '0.5px solid #e0e0e0',
        padding: '20px 24px',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', margin: '0 0 16px' }}>
          Actions
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

          {/* Trigger n8n */}
          <button
            onClick={triggerN8n}
            disabled={triggerStatus === 'loading'}
            style={{
              background: triggerStatus === 'success' ? '#eaf3de'
                : triggerStatus === 'error' ? '#fcebeb' : '#0a2540',
              color: triggerStatus === 'success' ? '#3b6d11'
                : triggerStatus === 'error' ? '#a32d2d' : 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontFamily: 'sans-serif',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {triggerStatus === 'loading' ? '⏳ Triggering...'
              : triggerStatus === 'success' ? '✅ Triggered!'
              : triggerStatus === 'error' ? '❌ Failed'
              : '▶ Trigger n8n Now'}
          </button>

          {/* Refresh data */}
          <button
            onClick={() => refetch()}
            style={{
              background: '#e6f1fb',
              color: '#185fa5',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontFamily: 'sans-serif',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >🔄 Refresh Data</button>

          {/* Delete old */}
          <button
            onClick={deleteOld}
            disabled={deleteStatus === 'loading'}
            style={{
              background: deleteStatus === 'success' ? '#eaf3de'
                : deleteStatus === 'error' ? '#fcebeb' : '#fcebeb',
              color: deleteStatus === 'success' ? '#3b6d11' : '#a32d2d',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontFamily: 'sans-serif',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {deleteStatus === 'loading' ? '⏳ Deleting...'
              : deleteStatus === 'success' ? '✅ Deleted!'
              : '🗑️ Delete Workshops Older Than 30 Days'}
          </button>
        </div>
      </div>

      {/* Sources Status */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '0.5px solid #e0e0e0',
        padding: '20px 24px',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', margin: '0 0 16px' }}>
          Sources
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {bySource.map(s => (
            <div key={s.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              background: '#f9f9f9',
              borderRadius: '8px'
            }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#333' }}>
                {s.name}
              </span>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999' }}>
                  {s.count} workshops
                </span>
                <span style={{
                  background: s.status === 'active' ? '#eaf3de' : '#fcebeb',
                  color: s.status === 'active' ? '#3b6d11' : '#a32d2d',
                  fontSize: '11px',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontFamily: 'sans-serif'
                }}>
                  {s.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workshops */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '0.5px solid #e0e0e0',
        padding: '20px 24px'
      }}>
        <h3 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', margin: '0 0 16px' }}>
          Recent Workshops
        </h3>
        {isLoading ? (
          <p style={{ fontFamily: 'sans-serif', color: '#999', fontSize: '13px' }}>Loading...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'sans-serif' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #eee' }}>
                {['Title', 'Source', 'Date', 'Added'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left',
                    padding: '8px 10px',
                    color: '#999',
                    fontWeight: '400'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workshops?.slice(0, 10).map(w => (
                <tr key={w.id} style={{ borderBottom: '0.5px solid #f5f5f5' }}>
                  <td style={{ padding: '10px', maxWidth: '280px' }}>
                    <a href={w.url} target="_blank" rel="noreferrer"
                      style={{ color: '#1a75ff', textDecoration: 'none' }}>
                      {w.title?.slice(0, 50)}{w.title?.length > 50 ? '...' : ''}
                    </a>
                  </td>
                  <td style={{ padding: '10px', color: '#666' }}>{w.source}</td>
                  <td style={{ padding: '10px', color: '#666' }}>
                    {w.date ? new Date(w.date).toDateString() : 'TBD'}
                  </td>
                  <td style={{ padding: '10px', color: '#aaa' }}>
                    {new Date(w.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}