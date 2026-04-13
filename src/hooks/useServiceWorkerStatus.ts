import { useMemo } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export type ServiceWorkerStatus =
  | 'not-registered'
  | 'registered'
  | 'offline-ready'
  | 'update-available'

type UseServiceWorkerStatusResult = {
  status: ServiceWorkerStatus
  hasUpdate: boolean
  applyUpdate: () => Promise<void>
}

export function useServiceWorkerStatus(): UseServiceWorkerStatusResult {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
  })

  const status = useMemo<ServiceWorkerStatus>(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) {
      return 'not-registered'
    }
    if (needRefresh) return 'update-available'
    if (offlineReady) return 'offline-ready'
    return 'registered'
  }, [needRefresh, offlineReady])

  return {
    status,
    hasUpdate: Boolean(needRefresh),
    applyUpdate: async () => {
      await updateServiceWorker(true)
    },
  }
}
