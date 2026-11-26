import { useEffect, useState } from 'react'

const inFlightRequests = new Map()

function loadOnce(key, loader) {
  const existing = inFlightRequests.get(key)
  if (existing) return existing

  const request = Promise.resolve().then(loader)
  inFlightRequests.set(key, request)
  const clearRequest = () => {
    if (inFlightRequests.get(key) === request) inFlightRequests.delete(key)
  }
  request.then(clearRequest, clearRequest)
  return request
}

export default function useResource(key, loader) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    let active = true

    loadOnce(`${key}:${attempt}`, loader)
      .then((data) => {
        if (active) setResult({ key, loader, attempt, status: 'success', data, error: null })
      })
      .catch((error) => {
        if (active) setResult({ key, loader, attempt, status: 'error', data: null, error })
      })

    return () => { active = false }
  }, [key, loader, attempt])

  const state = result?.key === key && result?.loader === loader && result?.attempt === attempt
    ? result
    : { status: 'loading', data: null, error: null }

  return {
    ...state,
    retry: () => setAttempt((current) => current + 1),
  }
}
