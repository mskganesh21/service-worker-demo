import { Link } from 'react-router-dom'

type HeaderProps = {
  onAddNote: () => void
}

export function Header({ onAddNote }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-text">
        <Link to="/" className="app-title-link">
          <h1 className="app-title">Offline Notes PWA</h1>
        </Link>
        <p className="app-tagline">
          Dashboard of your notes — tap a card to edit. Persistence and service
          worker in later phases.
        </p>
      </div>
      <div className="app-header-actions">
        <button type="button" className="btn btn-primary" onClick={onAddNote}>
          Add note
        </button>
      </div>
    </header>
  )
}
