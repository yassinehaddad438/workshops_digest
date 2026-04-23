const SOURCE_CONFIG = {
  'UNESCO': { bg: '#e6f1fb', color: '#185fa5', icon: '🏛️' },
  'Coursera Blog': { bg: '#eaf3de', color: '#3b6d11', icon: '🎓' },
  'eLearning Industry': { bg: '#faeeda', color: '#854f0b', icon: '💡' },
  'The Report by Class Central': { bg: '#eeedfe', color: '#534ab7', icon: '📚' },
  'World Heritage Centre coming Events': { bg: '#e1f5ee', color: '#085041', icon: '🌍' },
  'TeachThought': { bg: '#fbeaf0', color: '#993556', icon: '🧠' },
  'Open Culture': { bg: '#f1efe8', color: '#5f5e5a', icon: '🎨' },
  'FutureLearn': { bg: '#e6f1fb', color: '#185fa5', icon: '🚀' },
}

const DEFAULT = { bg: '#f1efe8', color: '#5f5e5a', icon: '📡' }

export default function SourceBadge({ source, showIcon = true }) {
  const config = SOURCE_CONFIG[source] || DEFAULT

  return (
    <span style={{
      background: config.bg,
      color: config.color,
      fontSize: '10px',
      padding: '3px 10px',
      borderRadius: '20px',
      fontFamily: 'sans-serif',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      whiteSpace: 'nowrap'
    }}>
      {showIcon && <span style={{ fontSize: '10px' }}>{config.icon}</span>}
      {source}
    </span>
  )
}