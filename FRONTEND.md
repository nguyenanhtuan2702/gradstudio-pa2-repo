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

| Name in examples | Role | E-mail or user name | Password |
|---|---|---|---|
| linh | Customer | linh@gradstudio.test | linh-demo |
| thao | Admin | thao@gradstudio.test | thao-demo |
| mai | Staff — Makeup | mai@gradstudio.test | mai-demo |
| tuan | Staff — Photographer | tuan@gradstudio.test | tuan-demo |
| superadmin | Superadmin | superadmin@gradstudio.test | superadmin-demo |

## 4. Routes

| Route | Role | PA#3 steps | Endpoints |
|---|---|---|---|
| `/` | Visitor | G1 | `/api/catalogue` |
| `/studio` | Admin | G4–G6 | `/api/conversations`, `/api/clash-check`, `/api/bookings` |
| `/bookings/GS-1024` | Customer | G7 | `/api/bookings/GS-1024`, `/api/bookings/GS-1024/deposit/payment` |
| `/payments/test/GS-1024` | Customer | G7 test payment | Exists after a payment is created; `/api/bookings/GS-1024/deposit/payment` |

The route list will be expanded as G2–G11 are implemented.

## 5. Product owner decisions

No product-owner decision post was available in the repository at the time of initial PA#3 setup.

## 6. Libraries

- React 19 — UI component model.
- React Router — browser routes and direct navigation.
- Vite — development and production build.
- Plain CSS — reuse of the PA#2 responsive design without an extra CSS framework.

## 7. Not done

The initial PA#3 implementation contains the PA#2 React migration and route shell. Authentication, React API integration and the complete G2–G11 flows still require implementation.
