# Admin and Superadmin

## Update or cancel booking

**PATCH** `/api/bookings/:id`

Allowed role: `admin`.

```http
PATCH /api/bookings/GS-1024
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date":"2026-10-24","shoot":"14:00–16:00","room":"Phòng B","finalFileLink":"https://example.test/GS-1024"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Đã đặt lịch","paymentStatus":"Đã cọc 30%","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"},{"id":"photo-2","bookingId":"GS-1024","title":"Preview","url":"/uploads/photo-2.jpg"}],"selectedPhotoIds":["photo-1"],"reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}],"finalFileLink":"https://example.test/GS-1024"}
```

- `400` field validation failed.
- `409` the new time clashes or booking cannot be cancelled.
- `404` booking not found.

## List admin accounts

**GET** `/api/admin/accounts`

Allowed role: `superadmin`.

```http
GET /api/admin/accounts
Authorization: Bearer {{token:superadmin}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[{"id":"u-thao","name":"Thảo","email":"thao@gradstudio.test","role":"admin","active":true}]}
```

- `401` missing or invalid token.
- `403` role is not superadmin.

## Create admin account

**POST** `/api/admin/accounts`

| Field | Type | Required | Limit |
|---|---|---:|---|
| name | string | yes | 2–100 characters |
| email | string | yes | valid e-mail |
| password | string | yes | at least 8 characters |

```http
POST /api/admin/accounts
Authorization: Bearer {{token:superadmin}}
Content-Type: application/json

{"name":"Admin mới","email":"admin2@gradstudio.test","password":"admin2-demo"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":"u-admin-2","name":"Admin mới","email":"admin2@gradstudio.test","role":"admin","active":true}
```

- `400` field validation failed.
- `409` e-mail already exists.

## Get system settings

**GET** `/api/admin/settings`

```http
GET /api/admin/settings
Authorization: Bearer {{token:superadmin}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"openingTime":"08:00","closingTime":"20:00","reminderHoursBefore":24}
```

- `401` missing or invalid token.
- `403` role is not superadmin.

## Update system settings

**PUT** `/api/admin/settings`

```http
PUT /api/admin/settings
Authorization: Bearer {{token:superadmin}}
Content-Type: application/json

{"openingTime":"08:00","closingTime":"20:00","reminderHoursBefore":24}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"openingTime":"08:00","closingTime":"20:00","reminderHoursBefore":24}
```

- `400` opening or closing time is invalid.
- `409` setting value conflicts with an existing schedule.

## Changes

- 2026-11-23: Initial admin, superadmin, booking-update and settings contract created.
- 2026-11-24: Documented the complete booking response shape returned by the mock.
- 2026-11-24: Synchronized booking response fields (`maxEditedPhotos`, `previewPhotos`, `selectedPhotoIds`, `reminders`, `finalFileLink`) with `04-bookings.md`.
