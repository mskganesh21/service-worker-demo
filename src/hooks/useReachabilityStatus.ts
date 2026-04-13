import { useEffect, useState } from 'react'

export type ReachabilityStatus = 'checking' | 'reachable' | 'unreachable'

const CHECK_INTERVAL_MS = 15000
const CHECK_TIMEOUT_MS = 4000

async function checkReachability(): Promise<boolean> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => {
    controller.abort()
  }, CHECK_TIMEOUT_MS)

  try {
    const response = await fetch('https://www.gstatic.com/generate_204', {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    })
    return response.type === 'opaque' || response.ok
  } catch {
    return false
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export function useReachabilityStatus(isOnline: boolean): ReachabilityStatus {
  const [status, setStatus] = useState<ReachabilityStatus>('checking')

  useEffect(() => {
    if (!isOnline) return

    let isCancelled = false

    const runCheck = async () => {
      const reachable = await checkReachability()
      if (!isCancelled) {
        setStatus(reachable ? 'reachable' : 'unreachable')
      }
    }

    void runCheck()

    const intervalId = window.setInterval(() => {
      void runCheck()
    }, CHECK_INTERVAL_MS)

    return () => {
      isCancelled = true
      window.clearInterval(intervalId)
    }
  }, [isOnline])

  if (!isOnline) return 'unreachable'
  return status
}
