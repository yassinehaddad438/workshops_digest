const SOURCES = [
  'All',
  'UNESCO',
  'Coursera Blog',
  'eLearning Industry',
  'The Report by Class Central',
  'World Heritage Centre coming Events',
  'TeachThought',
  'Open Culture',
  'FutureLearn'
]

const DATE_FILTERS = [
  { label: 'Any Date', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
]

export default function FilterBar({
  source, onSourceChange,
  dateFilter, onDateChange,
  totalCount
}) {
  const selectStyle = {
    padding: '9px 14px',
    borderRadius: '8px',
    border: '0.5px solid #ddd',
    fontFamily: 'sans-serif',
    fontSize: '13px',
    background: 'white',
    cursor: 'pointer',
    outline: 'none'
  }

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '14px 16px',
      background: 'white',
      borderRadius: '10px',
      border: '0.5px solid #e0e0e0',
      marginBottom: '20px'
    }}>
      <span style={{
        fontSize: '12px',
        color: '#999',
        fontFamily: 'sans-serif',
        marginRight: '4px'
      }}>
        {totalCount} events
      </span>

      <select
        value={source}
        onChange={e => onSourceChange(e.target.value)}
        style={selectStyle}
      >
        {SOURCES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={dateFilter}
        onChange={e => onDateChange(e.target.value)}
        style={selectStyle}
      >
        {DATE_FILTERS.map(d => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      {(source !== 'All' || dateFilter !== 'all') && (
        <button
          onClick={() => {
            onSourceChange('All')
            onDateChange('all')
          }}
          style={{
            background: '#fcebeb',
            color: '#a32d2d',
            border: 'none',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'sans-serif',
            cursor: 'pointer'
          }}
        >
          Clear filters ✕
        </button>
      )}
    </div>
  )
}