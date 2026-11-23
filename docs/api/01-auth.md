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

{"token":"{{token:linh}}","user":{"id":"u-linh","name":"Nguyễn Thùy Linh","role":"customer"}}
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

## Changes

- 2026-11-23: Initial contract created for PA#3.
