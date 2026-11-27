import { useCallback, useState } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import useResource from '../../hooks/useResource.js'

/**
 * Loads `{ items }` or a catalogue list once, then lets the screen apply the
 * answers of later requests without going back to the loading state.
 */
export default function useApiList(path, field = 'items') {
  const { request, user } = useAuth()
  const loader = useCallback(() => request(path), [request, path])
  const resource = useResource(`${user?.id}:${path}`, loader)
  const [local, setLocal] = useState(null)

  const { data } = resource
  const loaded = data?.[field] ?? []
  const items = local && local.source === data ? local.items : loaded

  const update = useCallback((change) => {
    setLocal((current) => ({
      source: data,
      items: change(current && current.source === data ? current.items : data?.[field] ?? []),
    }))
  }, [data, field])

  const refresh = useCallback(async () => {
    const next = await request(path)
    update(() => next?.[field] ?? [])
  }, [request, path, field, update])

  return { status: resource.status, error: resource.error, retry: resource.retry, items, update, refresh }
}
