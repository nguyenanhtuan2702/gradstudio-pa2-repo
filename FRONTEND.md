# GradStudio Frontend

## 1. Team

- Nguyễn Anh Tuấn — 23120184
- Lê Công Phúc — 23120330
- Đặng Hồng Minh — 24120090

## 2. How to run

Open PowerShell in the repository root. Start the mock server in terminal 1:

```powershell
node mock/server.mjs
```

In terminal 2, start Vite:

```powershell
cd client
npm ci
npm run dev
```

Build and preview:

```powershell
cd client
npm run build
npx vite preview
```

### Mock server modes

The mock server reads `MOCK_MODE` at startup. Stop it with `Ctrl+C` before changing the mode, then run one of these commands from the repository root:

```powershell
$env:MOCK_MODE = 'normal'
node mock/server.mjs
```

```powershell
$env:MOCK_MODE = 'slow'
node mock/server.mjs
```

```powershell
$env:MOCK_MODE = 'error'
node mock/server.mjs
```

```powershell
$env:MOCK_MODE = 'empty'
node mock/server.mjs
```

`normal` delays responses by about 150 ms; `slow` delays them by 2 seconds; `error` returns HTTP 500 for requests except sign-in; `empty` returns empty arrays for list data. The default port is `3001`; override it with `$env:PORT = '3002'` before starting the server.

## 3. Demo accounts

The application uses **5 demo accounts** across **4 sign-in roles** (`customer`, `admin`, `staff`, `superadmin`); `mai` and `tuan` share the `staff` role.

| Name in examples | Role | E-mail or user name | Password |
|---|---|---|---|
| linh | Customer | linh@gradstudio.test | linh-demo |
| thao | Admin | thao@gradstudio.test | thao-demo |
| mai | Staff — Makeup | mai@gradstudio.test | mai-demo |
| tuan | Staff — Photographer | tuan@gradstudio.test | tuan-demo |
| superadmin | Superadmin | superadmin@gradstudio.test | superadmin-demo |

## 4. Routes

Current implemented routes and target routes for G1–G11:

| Route | Role | PA#3 steps | Endpoints |
|---|---|---|---|
| `/` | Visitor, Customer | G1, G3, G6 | `/api/catalogue`, `/api/conversations`, `/api/conversations/:id/messages`, `/api/conversations/:id/request`, `/api/conversations/:id/agree` |
| `/login` *(target)* | Visitor | G2 | `/api/auth/login`, `/api/auth/logout` |
| `/studio` | Admin | G4–G6, G10 | `/api/conversations`, `/api/clash-check`, `/api/conversations/:id/proposal`, `/api/bookings`, `/api/bookings/:id` |
| `/bookings/GS-1024` | Customer | G7, G9 | `/api/bookings/GS-1024`, `/api/bookings/GS-1024/deposit/payment`, `/api/bookings/GS-1024/payments/remaining`, `/api/bookings/GS-1024/receive` |
| `/payments/test/GS-1024` | Customer | G7, G9 test payment | Exists after a payment is created; `/api/bookings/GS-1024/payments/confirm` |
| `/staff` *(target)* | Staff | G8 | `/api/staff/jobs`, `/api/staff/jobs/:id`, `/api/bookings/:id/photos/preview` |
| `/superadmin` *(target)* | Superadmin | G11 | `/api/admin/accounts`, `/api/admin/settings` |

## 5. Product owner decisions

No product-owner decision post was available in the repository at the time of initial PA#3 setup.

## 6. Libraries

- React 19 — UI component model.
- React Router — browser routes and direct navigation.
- Vite — development and production build.
- Plain CSS — reuse of the PA#2 responsive design without an extra CSS framework.

## 7. Not done

The initial PA#3 implementation contains the PA#2 React migration and route shell. Authentication, React API integration and the complete G2–G11 flows still require implementation.
