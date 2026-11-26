export class ApiError extends Error {
  constructor(message, { status, code, fields } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.fields = fields ?? {}
  }
}

export async function apiRequest(path, { method = 'GET', token, body, headers, signal } = {}) {
  if (typeof path !== 'string' || !path.startsWith('/api/')) {
    throw new Error('API request paths must start with /api/.')
  }

  const requestHeaders = new Headers(headers)
  requestHeaders.set('Accept', 'application/json')
  if (token) requestHeaders.set('Authorization', `Bearer ${token}`)

  let requestBody
  if (body !== undefined) {
    if (body instanceof FormData) {
      requestBody = body
    } else {
      requestHeaders.set('Content-Type', 'application/json')
      requestBody = JSON.stringify(body)
    }
  }

  const response = await fetch(path, {
    method,
    headers: requestHeaders,
    body: requestBody,
    signal,
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const error = payload?.error
    throw new ApiError(error?.message || `Yêu cầu thất bại (HTTP ${response.status}).`, {
      status: response.status,
      code: error?.code,
      fields: error?.fields,
    })
  }

  return payload
}
