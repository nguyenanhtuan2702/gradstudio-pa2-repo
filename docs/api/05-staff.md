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

{"items":[{"id":"job-1024-makeup","bookingId":"GS-1024","staffName":"Mai","work":"Make-up","date":"2026-10-24","time":"13:00–14:00","room":"Studio","status":"Đã phân công"}]}
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

{"id":"photo-1","bookingId":"GS-1024","title":"Preview","url":"{{}}"}
```

- `400` wrong file type or file too large.
- `404` booking not found.

## Changes

- 2026-11-23: Initial staff jobs and preview-upload contract created.
