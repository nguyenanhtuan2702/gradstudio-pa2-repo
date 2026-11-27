# Admin and Superadmin

## Update or cancel booking

**PATCH** `/api/bookings/:id`

Allowed role: `admin`.

Send at least one field. Unknown fields are rejected.

| Field | Type | Required | Limit |
|---|---|---:|---|
| date | string | no | a real date, `YYYY-MM-DD` |
| makeup | string | no | `HH:MM–HH:MM` (en dash), end after start |
| shoot | string | no | `HH:MM–HH:MM` (en dash), end after start |
| room | string | no | 1–100 characters |
| finalFileLink | string | no | `http` or `https` URL, at most 2000 characters; booking must be fully paid |
| cancel | boolean | no | only `true`; must be the only field |

A change of `date`, `makeup`, `shoot` or `room` is checked for clashes again. When it succeeds, the related staff jobs and the reminder time follow the new schedule. A successful cancellation keeps `status` unchanged, adds `"cancelled": true` to the booking, clears `reminders` and removes the related staff jobs. A booking without the `cancelled` field is not cancelled. Completed and cancelled bookings cannot be rescheduled or cancelled.

```http
PATCH /api/bookings/GS-1024
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date":"2026-10-24","shoot":"14:00–16:00","room":"Phòng B","finalFileLink":"https://example.test/GS-1024"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Đã đặt lịch","paymentStatus":"Đã thanh toán đủ","total":1800000,"deposit":540000,"remaining":0,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"},{"id":"photo-2","bookingId":"GS-1024","title":"Preview","url":"/uploads/photo-2.jpg"}],"selectedPhotoIds":["photo-1"],"finalFileLink":"https://example.test/GS-1024","reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}]}
```

- `400` field validation failed (one message per field).
- `401` missing or invalid token.
- `403` caller is not an Admin.
- `404` booking not found.
- `409` the new time clashes, the booking is completed or cancelled, or `finalFileLink` is sent before full payment.

```http
PATCH /api/bookings/GS-1024
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date":"2026-10-24","makeup":"09:00–10:00","shoot":"14:00–16:00","room":"Phòng B"}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"CONFLICT","message":"Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00.","fields":{"makeup":"Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00."}}}
```

```http
PATCH /api/bookings/GS-1024
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"shoot":"16:00–14:00"}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error":{"code":"VALIDATION_ERROR","message":"Dữ liệu booking không hợp lệ.","fields":{"shoot":"Nhập khung giờ theo HH:MM–HH:MM, giờ kết thúc sau giờ bắt đầu."}}}
```

## Customer receives final photos

The customer-only `POST /api/bookings/:id/receive` endpoint is documented in `04-bookings.md`. Its successful flow requires a fully paid booking and a non-empty `finalFileLink`:

```http
POST /api/bookings/GS-1024/receive
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Hoàn thành","paymentStatus":"Đã thanh toán đủ","total":1800000,"deposit":540000,"remaining":0,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"},{"id":"photo-2","bookingId":"GS-1024","title":"Preview","url":"/uploads/photo-2.jpg"}],"selectedPhotoIds":["photo-1"],"finalFileLink":"https://example.test/GS-1024","reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}]}
```

A completed booking can no longer be cancelled:

```http
PATCH /api/bookings/GS-1024
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"cancel":true}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"CONFLICT","message":"Booking đã hoàn thành hoặc đã hủy nên không thể đổi hay hủy lịch."}}
```

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

```http
GET /api/admin/settings
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Không có quyền truy cập."}}
```

```http
GET /api/admin/settings
Authorization: Bearer {{token:mai}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Không có quyền truy cập."}}
```

```http
GET /api/admin/settings
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Không có quyền truy cập."}}
```

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
- 2026-11-24: Updated the successful receive example to return the booking object directly.
- 2026-11-24: Synchronized booking response fields (`maxEditedPhotos`, `previewPhotos`, `selectedPhotoIds`, `reminders`, `finalFileLink`) with `04-bookings.md`.
- 2026-11-26: Add Customer, Staff, and Admin denial examples for Superadmin-only settings.
- 2026-11-27: Define `PATCH /api/bookings/:id` fields, limits and errors for G10; add cancellation (`cancel`, `cancelled`), clash re-check on reschedule and the related staff-job/reminder updates, with `400` and `409` examples. The contract named change/cancel but did not say how to send either.
