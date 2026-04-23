import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async () => {
    if (!email) return
    setStatus('loading')
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }])
    setStatus(error ? 'error' : 'success')
  }

  return (
    <div style={{ maxWidth: '560px', margin: '80px auto', padding: '0 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
      <h1 style={{ fontFamily: 'Georgia, serif', color: '#0a2540', marginBottom: '12px' }}>
        Get the Daily Digest
      </h1>
      <p style={{ fontFamily: 'sans-serif', color: '#777', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
        Every morning at 07:00, we send you the best free workshops and learning events from 9+ sources. No spam, ever.
      </p>

      {status === 'success' ? (
        <div style={{ background: '#eaf3de', color: '#3b6d11', padding: '20px', borderRadius: '12px', fontFamily: 'sans-serif' }}>
          ✅ You're subscribed! Check your inbox tomorrow morning.
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              border: '0.5px solid #ddd',
              fontFamily: 'sans-serif',
              fontSize: '14px',
              width: '260px'
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{
              background: '#0a2540',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontFamily: 'sans-serif',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </div>
      )}

      {status === 'error' && (
        <p style={{ color: '#a32d2d', fontFamily: 'sans-serif', fontSize: '13px', marginTop: '12px' }}>
          Something went wrong. You may already be subscribed!
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginTop: '48px'
      }}>
        {[
          { icon: '📬', title: 'Daily at 07:00', desc: 'Fresh workshops every morning' },
          { icon: '🆓', title: '100% Free', desc: 'Only free events, always' },
          { icon: '🚫', title: 'No Spam', desc: 'Unsubscribe anytime' }
        ].map((item, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            border: '0.5px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#0a2540', marginBottom: '4px' }}>{item.title}</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}