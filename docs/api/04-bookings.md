# Bookings and Payments

## Booking response

The booking endpoints return these shared fields:

| Field | Type | Meaning |
|---|---|---|
| `status` | string | `Chờ cọc 30%`, `Đã đặt lịch`, or `Hoàn thành` |
| `paymentStatus` | string | Deposit/full-payment state |
| `remaining` | number | Amount currently due |
| `maxEditedPhotos` | integer | Maximum photos included by the package |
| `previewPhotos` | array | Preview image metadata available to the customer |
| `selectedPhotoIds` | string array | Photo IDs chosen by the customer |
| `finalFileLink` | string | Final delivery link; empty until the Admin adds it |
| `reminders` | array | Reminder schedule and mock email state |

Each reminder contains `id`, `title`, `scheduledAt`, `channel`, `recipient`, and `emailStatus`. The mock data is illustrative; it does not send an actual email.

## Create booking

**POST** `/api/bookings`

Allowed role: `admin`. The linked conversation proposal must have been agreed. Creating a booking does not hold the resources.

| Field | Type | Required |
|---|---|---:|
| conversationId | string | yes |
| customerId | string | yes |
| packageId | string | yes |
| agreedMakeup | string | yes |
| agreedShoot | string | yes |
| room | string | yes |

```http
POST /api/bookings
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"conversationId":"conv-linh","customerId":"u-linh","packageId":"pkg-premium","agreedMakeup":"13:00–14:00","agreedShoot":"14:00–16:00","room":"Phòng B"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":[],"finalFileLink":"","reminders":[]}
```

- `400` required fields are missing or invalid.
- `401` missing or invalid token.
- `403` caller is not an Admin.
- `409` the conversation has not agreed, the submitted schedule differs from the agreed proposal, an active booking already exists for a different proposal, or resources are unavailable.
- The booking uses the agreed proposal and starts at `Chờ cọc 30%`. It holds resources only after a successful deposit confirmation.

## List bookings

**GET** `/api/bookings`

Allowed roles: `customer`, `admin`.

```http
GET /api/bookings
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":[],"finalFileLink":"","reminders":[]}]}
```

- `401` missing or invalid token.
- `403` caller is not a Customer or Admin.

## Get booking

**GET** `/api/bookings/:id`

Allowed roles: `customer`, `admin`.

```http
GET /api/bookings/GS-1024
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":[],"finalFileLink":"","reminders":[]}
```

- `401` missing or invalid token.
- `403` caller is not a Customer or Admin.
- `404` booking not found.

## Start deposit payment

**POST** `/api/bookings/:id/deposit/payment`

Creates a test payment session and returns its `gatewayUrl` and `paymentId`. It does not hold the slot or mark the booking as booked.

```http
POST /api/bookings/GS-1024/deposit/payment
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"failure"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=deposit&scenario=failure&paymentId=pay-deposit-1024-fail","paymentId":"pay-deposit-1024-fail"}
```

- `401` missing or invalid token.
- `403` caller is not the booking customer.
- `404` booking not found.
- `409` deposit has already been paid.

## Confirm deposit failure

**POST** `/api/bookings/:id/payments/confirm`

Allowed role: the booking `customer`.

`kind` is `deposit` or `remaining`; `result` is `success` or `failure`. Confirmation of a successful deposit rechecks resources before changing booking status.

```http
POST /api/bookings/GS-1024/payments/confirm
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"paymentId":"pay-deposit-1024-fail","kind":"deposit","result":"failure"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"paymentId":"pay-deposit-1024-fail","kind":"deposit","result":"failure","bookingStatus":"Chờ cọc 30%","paymentStatus":"Chờ cọc","remaining":1260000}
```

- `400` invalid `kind`, `result`, or missing fields.
- `401` missing or invalid token.
- `403` caller is not the booking customer.
- `404` booking or payment session not found.
- `409` resources are unavailable after a successful deposit result.

## Start deposit payment retry
```http
POST /api/bookings/GS-1024/deposit/payment
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"success"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=deposit&scenario=success&paymentId=pay-deposit-1024","paymentId":"pay-deposit-1024"}
```

## Confirm successful deposit

```http
POST /api/bookings/GS-1024/payments/confirm
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"paymentId":"pay-deposit-1024","kind":"deposit","result":"success"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"paymentId":"pay-deposit-1024","kind":"deposit","result":"success","bookingStatus":"Đã đặt lịch","paymentStatus":"Đã cọc 30%","remaining":1260000}
```

After this result, and only after the resource recheck succeeds, the mock activates staff assignments and the reminder record.

## Get booking after deposit

```http
GET /api/bookings/GS-1024
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Đã đặt lịch","paymentStatus":"Đã cọc 30%","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":[],"finalFileLink":"","reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}]}
```

## Start remaining payment

The request stores the selected photo IDs but does not mark the remaining amount paid until payment confirmation.

```http
POST /api/bookings/GS-1024/payments/remaining
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"failure","selectedPhotoIds":["photo-1"]}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=remaining&scenario=failure&paymentId=pay-rest-1024-fail","paymentId":"pay-rest-1024-fail","remaining":1260000}
```

- `400` `selectedPhotoIds` must contain 1–30 photos included in the booking preview gallery.
- `401` missing or invalid token.
- `403` caller is not the booking customer.
- `404` booking not found.
- `409` deposit has not been paid.

## Confirm remaining payment failure

```http
POST /api/bookings/GS-1024/payments/confirm
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"paymentId":"pay-rest-1024-fail","kind":"remaining","result":"failure"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"paymentId":"pay-rest-1024-fail","kind":"remaining","result":"failure","bookingStatus":"Đã đặt lịch","paymentStatus":"Đã cọc 30%","remaining":1260000}
```

## Start remaining payment retry

Validates and stores `selectedPhotoIds` (1 to `maxEditedPhotos`, maximum 30 photos) and returns a test payment URL without marking the remaining balance as paid until gateway confirmation.

```http
POST /api/bookings/GS-1024/payments/remaining
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"success","selectedPhotoIds":["photo-1"]}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=remaining&scenario=success&paymentId=pay-rest-1024","paymentId":"pay-rest-1024","remaining":1260000}
```

## Confirm successful remaining payment

```http
POST /api/bookings/GS-1024/payments/confirm
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"paymentId":"pay-rest-1024","kind":"remaining","result":"success"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"paymentId":"pay-rest-1024","kind":"remaining","result":"success","bookingStatus":"Đã đặt lịch","paymentStatus":"Đã thanh toán đủ","remaining":0}
```

## Get booking after full payment

```http
GET /api/bookings/GS-1024
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Đã đặt lịch","paymentStatus":"Đã thanh toán đủ","total":1800000,"deposit":540000,"remaining":0,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":["photo-1"],"finalFileLink":"","reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}]}
```

## Customer receives final photos

**POST** `/api/bookings/:id/receive`

Allowed role: the booking `customer`. The customer can receive the final delivery only after full payment and a final file link are present. This marks both the booking and its conversation complete.

```http
POST /api/bookings/GS-1024/receive
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"CONFLICT","message":"Chưa đủ điều kiện nhận ảnh: cần thanh toán đủ 100% và có link file hoàn thiện từ studio."}}
```

- `401` missing or invalid token.
- `403` caller is not the booking customer.
- `404` booking not found.
- `409` payment is incomplete or final files are not available. The example reaches this response because the Admin has not added `finalFileLink` yet.

On success, the endpoint returns the updated booking object directly, including its non-empty `finalFileLink` and `status: "Hoàn thành"`. The associated conversation is also updated to `Hoàn thành`; its state can be verified through `GET /api/conversations`. A successful request is exercised after the Admin adds `finalFileLink` in `06-admin.md`.

## Changes

- 2026-11-23: Initial booking and test-payment contract created.
- 2026-11-24: Documented the complete booking response shape and the exact deposit gateway URL.
- 2026-11-24: Added payment confirmation, reminders, preview gallery, selected photo, and receive-photo workflow per the technical agreement.
- 2026-11-24: Clarified that successful receive returns the updated booking object directly.
- 2026-11-24: Added `reminders` (scheduledAt, channel, recipient, emailStatus), `maxEditedPhotos`, `previewPhotos`, `selectedPhotoIds`, `finalFileLink`, `/api/bookings/:id/payments/confirm` and `/api/bookings/:id/receive`.
- 2026-11-27: A booking cancelled by the Admin (`cancelled: true`, see `06-admin.md`) answers `409` to deposit start, remaining-payment start, payment confirmation and photo receipt.
