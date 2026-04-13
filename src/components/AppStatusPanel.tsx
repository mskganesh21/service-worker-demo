type AppStatusPanelProps = {
  isOnline: boolean
  isHydrated: boolean
  noteCount: number
  serviceWorkerStatus: 'not-registered' | 'registered' | 'offline-ready' | 'update-available'
  hasUpdate: boolean
}

function prettyWorkerStatus(status: AppStatusPanelProps['serviceWorkerStatus']) {
  switch (status) {
    case 'registered':
      return 'registered'
    case 'offline-ready':
      return 'offline ready'
    case 'update-available':
      return 'update available'
    default:
      return 'not registered'
  }
}

export function AppStatusPanel({
  isOnline,
  isHydrated,
  noteCount,
  serviceWorkerStatus,
  hasUpdate,
}: AppStatusPanelProps) {
  return (
    <section className="status-panel" aria-label="App status">
      <div className="status-chip-list">
        <span className={`status-chip ${isOnline ? 'status-chip--ok' : 'status-chip--warn'}`}>
          Network: {isOnline ? 'Online' : 'Offline'}
        </span>
        <span className={`status-chip ${isHydrated ? 'status-chip--ok' : 'status-chip--pending'}`}>
          Notes: {isHydrated ? 'Ready' : 'Loading'}
        </span>
        <span className="status-chip status-chip--neutral">
          SW: {prettyWorkerStatus(serviceWorkerStatus)}
        </span>
        <span className={`status-chip ${hasUpdate ? 'status-chip--warn' : 'status-chip--neutral'}`}>
          Update: {hasUpdate ? 'Available' : 'None'}
        </span>
      </div>
      <p className="status-debug-text">Debug: {noteCount} notes currently in memory.</p>
    </section>
  )
}
