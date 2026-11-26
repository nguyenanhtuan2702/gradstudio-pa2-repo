import { useCallback, useMemo, useState } from 'react'
import { apiRequest } from '../api/apiClient.js'
import { ROLE_HOME_PATHS } from './roles.js'
import AuthContext from './authContext.js'

const SESSION_STORAGE_KEY = 'gradstudio.session'

function readStoredSession() {
  try {
    const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!stored) return null

    const session = JSON.parse(stored)
    if (session?.token && session?.user?.id && Object.hasOwn(ROLE_HOME_PATHS, session?.user?.role)) return session
  } catch {
    // Ignore unavailable storage or an invalid saved session.
  }

  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
  } catch {
    // Storage can be disabled by the browser.
  }
  return null
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  const login = useCallback(async (email, password) => {
    const result = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (!result?.token || !result?.user?.id || !Object.hasOwn(ROLE_HOME_PATHS, result?.user?.role)) {
      throw new Error('Phản hồi đăng nhập không đầy đủ từ API.')
    }

    const nextSession = { token: result.token, user: result.user }
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession))
    } catch {
      // Keep the active session in memory if browser storage is unavailable.
    }
    setSession(nextSession)
    return nextSession.user
  }, [])

  const logout = useCallback(async () => {
    const token = session?.token
    try {
      if (token) {
        await apiRequest('/api/auth/logout', { method: 'POST', token })
      }
    } finally {
      try {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
      } catch {
        // Clearing in-memory state still signs the user out of this app view.
      }
      setSession(null)
    }
  }, [session?.token])

  const request = useCallback((path, options = {}) => (
    apiRequest(path, { ...options, token: options.token ?? session?.token })
  ), [session?.token])

  const value = useMemo(() => ({
    user: session?.user ?? null,
    token: session?.token ?? null,
    isAuthenticated: Boolean(session?.token),
    login,
    logout,
    request,
  }), [session, login, logout, request])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
