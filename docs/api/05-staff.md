# Staff and Previews

## List assigned jobs

**GET** `/api/staff/jobs`

Allowed role: `staff`.

```http
GET /api/staff/jobs
Authorization: Bearer {{token:mai}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[{"id":"job-1024-makeup","bookingId":"GS-1024","staffName":"Mai","work":"Make-up","date":"2026-10-24","time":"13:00–14:00","room":"Studio","status":"Đã phân công"},…]}
```

- `401` missing or invalid token.
- `403` role is not staff.

## Update job

**PATCH** `/api/staff/jobs/:id`

```http
PATCH /api/staff/jobs/job-1024-makeup
Authorization: Bearer {{token:mai}}
Content-Type: application/json

{"status":"Hoàn thành"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"job-1024-makeup","status":"Hoàn thành"}
```

- `400` status is invalid.
- `404` job not found.

## Upload preview photo

**POST** `/api/bookings/:id/photos/preview`

Allowed role: `staff`.

Accepted formats: JPEG, PNG. Maximum size: 10 MB.

```sh
curl -i http://localhost:3001/api/bookings/GS-1024/photos/preview \
  -H "Authorization: Bearer {{token:tuan}}" \
  -F "title=Preview" \
  -F "file=@{{file:preview.jpg:200KB}};type=image/jpeg"
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":"photo-2","bookingId":"GS-1024","title":"Preview","url":"…"}
```

- `400` wrong file type or file too large.
- `401` missing or invalid token.
- `403` caller is not Staff.
- `404` booking not found.

## Confirm uploaded preview is available on the booking

```http
GET /api/bookings/GS-1024
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"GS-1024","conversationId":"conv-linh","customerId":"u-linh","customerName":"Nguyễn Thùy Linh","packageId":"pkg-premium","packageName":"Gói Tốt nghiệp Premium","date":"2026-10-24","makeup":"13:00–14:00","shoot":"14:00–16:00","room":"Phòng B","status":"Đã đặt lịch","paymentStatus":"Đã thanh toán đủ","total":1800000,"deposit":540000,"remaining":0,"maxEditedPhotos":30,"previewPhotos":[{"id":"photo-1","bookingId":"GS-1024","title":"Ảnh tốt nghiệp mẫu 01","url":"/assets/images/TotNghiep.jpg"},{"id":"photo-2","bookingId":"GS-1024","title":"Preview","url":"/uploads/photo-2.jpg"}],"selectedPhotoIds":["photo-1"],"finalFileLink":"","reminders":[{"id":"rem-1024-24h","title":"Nhắc lịch make-up và chụp trước 24 giờ","scheduledAt":"2026-10-23T13:00:00+07:00","channel":"Email","recipient":"linh@gradstudio.test","emailStatus":"Đã gửi"}]}
```

## Changes

- 2026-11-23: Initial staff jobs and preview-upload contract created.
- 2026-11-24: Documented upload metadata persistence and the booking gallery response.
- 2026-11-24: Updated uploaded preview identifier (`photo-2`) as the uploaded photo is appended to the booking's `previewPhotos` list.
