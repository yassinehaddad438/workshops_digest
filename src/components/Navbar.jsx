import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const link = (to, label) => (
    <Link to={to} style={{
      color: pathname === to ? '#1a75ff' : '#555',
      textDecoration: 'none',
      fontSize: '14px',
      fontFamily: 'sans-serif',
      fontWeight: pathname === to ? '500' : '400'
    }}>{label}</Link>
  )

  return (
    <nav style={{
      background: '#0a2540',
      padding: '12px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontFamily: 'Georgia, serif',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🎓 WorkshopDigest
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {link('/workshops', 'Browse')}
        {link('/subscribe', 'Subscribe')}
        {link('/cahier-des-charges', 'Cahier des charges')}
        <Link to="/subscribe" style={{
          background: '#1a75ff',
          color: 'white',
          padding: '6px 16px',
          borderRadius: '20px',
          textDecoration: 'none',
          fontSize: '13px',
          fontFamily: 'sans-serif'
        }}>Get Digest</Link>
      </div>
    </nav>
  )
}