# GradStudio API Contract

Base URL: `/api`

## Authentication

Protected endpoints require:

```text
Authorization: Bearer <token>
```

Roles: `visitor`, `customer`, `admin`, `staff`, `superadmin`.

## Error shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "fields": {
      "preferredTime": "Khung giờ 09:00 không khả dụng"
    }
  }
}
```

## Status codes

- `200 OK`
- `201 Created`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `500 Internal Server Error`

## Endpoints

| Method | Path | Roles | Contract |
|---|---|---|---|
| POST | `/api/auth/login` | visitor, customer, admin, staff, superadmin | `01-auth.md` |
| POST | `/api/auth/logout` | customer, admin, staff, superadmin | `01-auth.md` |
| GET | `/api/catalogue` | visitor | `02-catalogue.md` |
| GET | `/api/conversations` | customer, admin | `03-chat.md` |
| POST | `/api/conversations/:id/messages` | customer, admin | `03-chat.md` |
| POST | `/api/conversations/:id/request` | customer | `03-chat.md` |
| POST | `/api/clash-check` | admin | `03-chat.md` |
| POST | `/api/conversations/:id/proposal` | admin | `03-chat.md` |
| POST | `/api/conversations/:id/agree` | customer | `03-chat.md` |
| POST | `/api/bookings` | admin | `04-bookings.md` |
| GET | `/api/bookings` | customer, admin | `04-bookings.md` |
| GET | `/api/bookings/:id` | customer, admin | `04-bookings.md` |
| POST | `/api/bookings/:id/deposit/payment` | customer | `04-bookings.md` |
| POST | `/api/bookings/:id/payments/remaining` | customer | `04-bookings.md` |
| POST | `/api/bookings/:id/payments/confirm` | customer | `04-bookings.md` |
| POST | `/api/bookings/:id/receive` | customer | `04-bookings.md` |
| GET | `/api/staff/jobs` | staff | `05-staff.md` |
| PATCH | `/api/staff/jobs/:id` | staff | `05-staff.md` |
| POST | `/api/bookings/:id/photos/preview` | staff | `05-staff.md` |
| PATCH | `/api/bookings/:id` | admin | `06-admin.md` |
| POST | `/api/admin/accounts` | superadmin | `06-admin.md` |
| GET | `/api/admin/accounts` | superadmin | `06-admin.md` |
| GET | `/api/admin/settings` | superadmin | `06-admin.md` |
| PUT | `/api/admin/settings` | superadmin | `06-admin.md` |

## Changes

- 2026-11-24: Reviewed the endpoint inventory and aligned it with the resource contracts.
- 2026-11-24: Added payment-result confirmation and the customer photo-receipt endpoint from the technical agreement.
