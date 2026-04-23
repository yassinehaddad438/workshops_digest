import SourceBadge from './SourceBadge'
import { useSaved } from '../hooks/useSaved'

export default function WorkshopCard({ workshop }) {
  const { toggleSave, isSaved } = useSaved()
  const saved = isSaved(workshop.id)

  return (
    <div className="workshop-card">
      {/* ...existing card content... */}

      <SourceBadge source={workshop.source} />

      <span
        onClick={() => toggleSave(workshop)}
        style={{ cursor: 'pointer', fontSize: '16px' }}
        title={saved ? 'Remove from saved' : 'Save'}
      >
        {saved ? '❤️' : '🤍'}
      </span>
    </div>
  )
}