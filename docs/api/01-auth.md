# Authentication

## Login

**POST** `/api/auth/login`

This endpoint is public.

Request body:

| Field | Type | Required | Limit |
|---|---|---:|---|
| email | string | yes | valid e-mail |
| password | string | yes | demo password |

```http
POST /api/auth/login
Content-Type: application/json

{"email":"linh@gradstudio.test","password":"linh-demo"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"token":"…","user":{"id":"u-linh","name":"Nguyễn Thùy Linh","role":"customer"}}
```

### Errors

- `400` field validation.
- `401` e-mail or password is incorrect.

## Logout

**POST** `/api/auth/logout`

```http
POST /api/auth/logout
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"ok":true}
```

- `401` missing or invalid token.
- On a successful logout, the server immediately revokes the supplied bearer token. Reusing that same token on any protected endpoint must return `401`.

### Reuse of a logged-out token

This request intentionally reuses the exact token from the successful logout example above.

```http
GET /api/bookings
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error":{"code":"UNAUTHORIZED","message":"Thiếu hoặc sai token."}}
```

## Changes

- 2026-11-23: Initial contract created for PA#3.
- 2026-11-24: Use the documented ellipsis wildcard for the generated login token.
- 2026-11-26: Specify immediate token revocation on successful logout and require protected requests with the revoked token to return `401`.
