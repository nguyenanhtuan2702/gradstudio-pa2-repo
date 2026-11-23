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

{"id":"GS-1024","status":"Chờ cọc 30%","customerName":"Nguyễn Thùy Linh","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","total":1800000,"deposit":540000,"remaining":1260000}
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

{"items":[{"id":"GS-1024","status":"Chờ cọc 30%","paymentStatus":"Chờ cọc","date":"2026-10-24"}]}
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

{"id":"GS-1024","status":"Chờ cọc 30%","customerName":"Nguyễn Thùy Linh","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","total":1800000,"deposit":540000,"remaining":1260000,"paymentStatus":"Chờ cọc"}
```

- `404` booking not found.

## Start deposit payment

**POST** `/api/bookings/:id/deposit/payment`

```http
POST /api/bookings/GS-1024/deposit/payment
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"success"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=deposit","paymentId":"pay-deposit-1024"}
```

- `400` scenario is not success or failure.
- `409` booking already has deposit.

## Pay remaining 70%

**POST** `/api/bookings/:id/payments/remaining`

```http
POST /api/bookings/GS-1024/payments/remaining
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"scenario":"success","selectedPhotoIds":["photo-1"]}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"gatewayUrl":"/payments/test/GS-1024?kind=remaining","paymentId":"pay-rest-1024","remaining":1260000}
```

- `400` no selected photos or too many photos.
- `409` deposit is not paid or final files are not ready.

## Changes

- 2026-11-23: Initial booking and test-payment contract created.
