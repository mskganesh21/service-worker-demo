import type { ReachabilityStatus } from '../hooks/useReachabilityStatus'

type AppStatusPanelProps = {
  isOnline: boolean
  reachabilityStatus: ReachabilityStatus
  isHydrated: boolean
  noteCount: number
  serviceWorkerStatus: 'not-registered' | 'registered' | 'offline-ready' | 'update-available'
  hasUpdate: boolean
  showUpdatedNotice: boolean
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
  reachabilityStatus,
  isHydrated,
  noteCount,
  serviceWorkerStatus,
  hasUpdate,
  showUpdatedNotice,
}: AppStatusPanelProps) {
  const reachabilityLabel =
    reachabilityStatus === 'checking'
      ? 'Checking'
      : reachabilityStatus === 'reachable'
        ? 'Reachable'
        : 'Unreachable'

  const reachabilityClass =
    reachabilityStatus === 'checking'
      ? 'status-chip--pending'
      : reachabilityStatus === 'reachable'
        ? 'status-chip--ok'
        : 'status-chip--warn'

  return (
    <section className="status-panel" aria-label="App status">
      <div className="status-chip-list">
        <span className={`status-chip ${isOnline ? 'status-chip--ok' : 'status-chip--warn'}`}>
          Network: {isOnline ? 'Online' : 'Offline'}
        </span>
        <span className={`status-chip ${isHydrated ? 'status-chip--ok' : 'status-chip--pending'}`}>
          Notes: {isHydrated ? 'Ready' : 'Loading'}
        </span>
        <span className={`status-chip ${reachabilityClass}`}>Server: {reachabilityLabel}</span>
        <span className="status-chip status-chip--neutral">
          SW: {prettyWorkerStatus(serviceWorkerStatus)}
        </span>
        <span className={`status-chip ${hasUpdate ? 'status-chip--warn' : 'status-chip--neutral'}`}>
          Update: {hasUpdate ? 'Available' : 'None'}
        </span>
        {showUpdatedNotice ? (
          <span className="status-chip status-chip--ok">Update: Activated</span>
        ) : null}
      </div>
      <p className="status-debug-text">Debug: {noteCount} notes currently in memory.</p>
    </section>
  )
}
