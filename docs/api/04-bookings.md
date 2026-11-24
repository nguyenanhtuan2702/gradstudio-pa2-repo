# Bookings and Payments

## Create booking

**POST** `/api/bookings`

Allowed role: `admin`.

| Field | Type | Required |
|---|---|---:|
| conversationId | string | yes |
| customerId | string | yes |
| packageId | string | yes |
| agreedMakeup | string | yes |
| agreedShoot | string | yes |

```http
POST /api/bookings
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"conversationId":"conv-linh","customerId":"u-linh","packageId":"pkg-premium","agreedMakeup":"13:00–14:00","agreedShoot":"14:00–16:00","room":"Phòng B"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":[],"reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}],"finalFileLink":""}
```

- `400` required field missing.
- `409` customer has not agreed or resources became unavailable.

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

{"items":[{"id":"GS-1024","conversationId":"conv-linh","customerName":"Nguyễn Thùy Linh","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","total":1800000,"deposit":540000,"remaining":1260000}]}
```

- `401` missing or invalid token.
- `403` role is not allowed.

## Get booking

**GET** `/api/bookings/:id`

```http
GET /api/bookings/GS-1024
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","total":1800000,"deposit":540000,"remaining":1260000,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"}],"selectedPhotoIds":[],"reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}],"finalFileLink":""}
```

- `404` booking not found.

## Start deposit payment

**POST** `/api/bookings/:id/deposit/payment`

Creates a test payment URL without holding the slot or changing the booking status to `Đã đặt lịch` yet.

```http
POST /api/bookings/GS-1024/deposit/payment
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"success"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=deposit&scenario=success","paymentId":"pay-deposit-1024"}
```

- `400` scenario is not success or failure.
- `409` booking already has deposit.

## Pay remaining 70%

**POST** `/api/bookings/:id/payments/remaining`

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

{"gatewayUrl":"/payments/test/GS-1024?kind=remaining&scenario=success","paymentId":"pay-rest-1024","remaining":1260000,"selectedPhotoIds":["photo-1"]}
```

- `400` no selected photos or more than 30 photos.
- `409` deposit is not paid or final files are not ready.

## Confirm gateway payment result

**POST** `/api/bookings/:id/payments/confirm`

Allowed role: `customer`.

Confirms the test payment outcome from the gateway page. A deposit confirmation with `result: "success"` re-checks staff and room availability before transitioning the booking to `Đã đặt lịch` and `paymentStatus: "Đã cọc 30%"`. A remaining payment confirmation with `result: "success"` transitions `paymentStatus` to `"Đã thanh toán đủ"` and `remaining` to `0`.

| Field | Type | Required | Allowed values |
|---|---|---:|---|
| paymentId | string | yes | payment identifier from deposit or remaining initiation |
| kind | string | yes | `deposit`, `remaining` |
| result | string | yes | `success`, `failure` |

```http
POST /api/bookings/GS-1024/payments/confirm
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"paymentId":"pay-deposit-1024","kind":"deposit","result":"success"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"bookingId":"GS-1024","paymentId":"pay-deposit-1024","kind":"deposit","result":"success","status":"Đã đặt lịch","paymentStatus":"Đã cọc 30%","remaining":1260000}
```

- `400` invalid `kind`, `result` or missing `paymentId`.
- `404` booking not found.
- `409` resources are no longer available when confirming deposit.

## Receive final photos

**POST** `/api/bookings/:id/receive`

Allowed role: `customer`.

Completes the booking after the customer has paid 100% and the studio has provided `finalFileLink`.

```http
POST /api/bookings/GS-1024/receive
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"CONFLICT","message":"Chưa đủ điều kiện nhận ảnh: cần thanh toán đủ 100% và có link file hoàn thiện từ studio."}}
```

- `404` booking not found.
- `409` remaining balance is unpaid or `finalFileLink` is empty.

## Changes

- 2026-11-23: Initial booking and test-payment contract created.
- 2026-11-24: Documented the complete booking response shape and the exact deposit gateway URL.
- 2026-11-24: Added `reminders` (scheduledAt, channel, recipient, emailStatus), `maxEditedPhotos`, `previewPhotos`, `selectedPhotoIds`, `finalFileLink`, `/api/bookings/:id/payments/confirm` and `/api/bookings/:id/receive`.
