export default function SearchBar({ value, onChange, placeholder = 'Search workshops...' }) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
      <span style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '14px',
        pointerEvents: 'none'
      }}>🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 16px 10px 36px',
          borderRadius: '8px',
          border: '0.5px solid #ddd',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          background: 'white',
          boxSizing: 'border-box',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        onFocus={e => e.target.style.borderColor = '#1a75ff'}
        onBlur={e => e.target.style.borderColor = '#ddd'}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#999',
            padding: 0
          }}
        >✕</button>
      )}
    </div>
  )
}