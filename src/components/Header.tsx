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
          Notes persist locally. Service-worker status and update lifecycle come
          next.
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
