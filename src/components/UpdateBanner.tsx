type UpdateBannerProps = {
  visible: boolean
  onRefresh: () => void
}

export function UpdateBanner({ visible, onRefresh }: UpdateBannerProps) {
  if (!visible) return null

  return (
    <section className="update-banner" role="status" aria-live="polite">
      <p className="update-banner-text">A new app version is available.</p>
      <button type="button" className="btn btn-primary" onClick={onRefresh}>
        Refresh
      </button>
    </section>
  )
}
