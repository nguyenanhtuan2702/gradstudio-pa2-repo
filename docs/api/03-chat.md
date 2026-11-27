# Chat and Clash Check

## List conversations

**GET** `/api/conversations`

Allowed roles: `customer`, `admin`.

```http
GET /api/conversations
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[{"id":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","status":"Đang tư vấn","date":"2026-10-24","messages":[{"id":"msg-1","text":"Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?","sender":"customer"}],"proposal":{"proposalId":"proposal-linh","status":"pending","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B"}}]}
```

- `401` missing or invalid token.
- `403` role is not allowed.

Each item includes `customerId`; the Admin sends it back as `customerId` in `POST /api/bookings`.

## Send message

**POST** `/api/conversations/:id/messages`

Allowed roles: `customer`, `admin`.

| Field | Type | Required | Limit |
|---|---|---:|---|
| text | string | yes | 1–2000 characters |

```http
POST /api/conversations/conv-linh/messages
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"text":"Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"msg-2","conversationId":"conv-linh","text":"Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?","sender":"customer"}
```

- `400` text is required or too long.
- `404` conversation not found.

## Send booking request

**POST** `/api/conversations/:id/request`

```http
POST /api/conversations/conv-linh/request
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"shootType":"Tốt nghiệp cá nhân","preferredDate":"2026-10-24","preferredTime":"09:00","extras":["Makeup"]}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"CONFLICT","message":"Mai bận 08:00–12:00 nên khung giờ 09:00 không khả dụng.","fields":{"preferredTime":"Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00."}}}
```

- `400` a field is missing or invalid.
- `409` the preferred time is unavailable.

## Check clash

**POST** `/api/clash-check`

Allowed role: `admin`.

Required request fields: non-empty `date`, `time`, and `room`, plus a non-empty `staff` array.

```http
POST /api/clash-check
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date":"2026-10-24","time":"09:00","room":"Phòng B","staff":["Mai","Tuấn"]}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"hasClash":true,"reason":"Mai bận 08:00–12:00 nên không thể nhận make-up lúc 09:00.","suggestions":[{"makeup":"13:00–14:00","makeupArtist":"Mai","shoot":"14:00–16:00","photographer":"Tuấn","room":"Phòng B"}]}
```

- `400` date, time or resources are missing.
- `401` missing or invalid token.
- `403` caller is not an Admin.
- `409` no resource combination is available.

```http
POST /api/clash-check
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date":"2026-10-24","time":"09:00"}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error":{"code":"VALIDATION_ERROR","message":"Thiếu dữ liệu kiểm tra.","fields":{"room":"Chọn phòng.","staff":"Chọn ít nhất một nhân sự."}}}
```

```http
POST /api/clash-check
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"date":"2026-10-24","time":"09:00","room":"Phòng B","staff":["Mai","Tuấn"]}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Không có quyền truy cập."}}
```

```http
POST /api/clash-check
Authorization: Bearer {{token:mai}}
Content-Type: application/json

{"date":"2026-10-24","time":"09:00","room":"Phòng B","staff":["Mai","Tuấn"]}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Không có quyền truy cập."}}
```

## Propose time

**POST** `/api/conversations/:id/proposal`

```http
POST /api/conversations/conv-linh/proposal
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"proposalId":"proposal-linh","status":"pending","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B"}
```

- `404` conversation not found.

## Agree to proposal

**POST** `/api/conversations/:id/agree`

```http
POST /api/conversations/conv-linh/agree
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"proposalId":"proposal-linh","decision":"decline"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"status":"Đang tư vấn","decision":"decline","proposalId":"proposal-linh","proposalStatus":"declined"}
```

```http
POST /api/conversations/conv-linh/proposal
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"proposalId":"proposal-linh","status":"pending","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B"}
```

```http
POST /api/conversations/conv-linh/agree
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"proposalId":"proposal-linh","decision":"agree"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"status":"Đã chốt lịch","decision":"agree","proposalId":"proposal-linh","proposalStatus":"agreed"}
```

- `400` decision is not agree or decline.
- `404` proposal not found.
- When `decision` is `agree`, the proposal status becomes `agreed` and the conversation status becomes `Đã chốt lịch`.
- When `decision` is `decline`, the proposal status becomes `declined` and the conversation remains in `Đang tư vấn`.

## Changes

- 2026-11-23: Initial chat, booking-request and clash-check contract created.
- 2026-11-24: Aligned the message response example with the mock identifier and retained the 09:00 conflict response.
- 2026-11-24: Clarified that the conversation starts in consultation and transitions after the customer's agreement.
- 2026-11-24: Documented full conversation messages/proposal and both decline-then-agree proposal outcomes.
- 2026-11-24: Included `messages` and `proposal` in the conversation list response and documented the `decline` behavior keeping the conversation in `Đang tư vấn`.
- 2026-11-26: Make `room` and non-empty `staff` required for clash checks; add missing-resource and non-Admin authorization examples.
- 2026-11-27: Add `customerId` to conversation items. `POST /api/bookings` requires it and no other Admin endpoint returned it before a booking existed.
