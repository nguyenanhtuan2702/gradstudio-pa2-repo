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

Routes currently declared in `client/src/App.jsx`. “Placeholder” means the route is protected and opens directly, but its PA#3 business flow is not implemented yet.

| Route | Role | PA#3 steps | API calls | Status |
|---|---|---|---|---|
| `/` | Visitor, Customer | G1; G3 and G6 planned | `GET /api/catalogue` | G1 catalogue loads from the mock; chat/request work for G3 and G6 are not implemented. |
| `/login` | Visitor and signed-in users | G2 | `POST /api/auth/login`, `POST /api/auth/logout` | Login, role landing, session persistence and logout are implemented. |
| `/studio` | Admin | G4–G6, G10 | `GET /api/conversations`, `GET /api/bookings`, `GET /api/catalogue`, `POST /api/conversations/:id/messages`, `POST /api/clash-check`, `POST /api/conversations/:id/proposal`, `POST /api/bookings`, `PATCH /api/bookings/:id` | Page written in `pages/StudioPage.jsx`; the route still shows the placeholder until `App.jsx` imports it. |
| `/bookings/GS-1024` | Customer | G7, G9 | Target: `/api/bookings/:id`, `/api/bookings/:id/deposit/payment`, `/api/bookings/:id/payments/remaining`, `/api/bookings/:id/receive` | Protected placeholder; booking and payment flows are not implemented. |
| `/payments/test/:id` | Customer | G7, G9 test payment | Target: `POST /api/bookings/:id/payments/confirm` | Route not implemented; it should exist after a payment session is created. |
| `/staff` | Staff | G8 (jobs exist after G7) | `GET /api/staff/jobs`, `PATCH /api/staff/jobs/:id`, `POST /api/bookings/:id/photos/preview` | Page written in `pages/StaffPage.jsx`; the route still shows the placeholder until `App.jsx` imports it. Before the deposit succeeds it shows an empty message. |
| `/superadmin` | Superadmin | G11 | Target: `/api/admin/accounts`, `/api/admin/settings` | Protected placeholder; account and settings flows are not implemented. |

`AuthContext` keeps the signed-in user and token in `sessionStorage`. The shared API client attaches `Authorization: Bearer <token>` when a protected request uses the context request helper. The public catalogue request uses the relative path `/api/catalogue` without a token.

## 5. Product owner decisions

No product-owner decision post was available in the repository at the time of initial PA#3 setup.

Team choice, not a product-owner decision (to be confirmed by the team): cancelling keeps the booking status and adds `cancelled: true`, so no new status name is introduced. See `docs/api/06-admin.md`.

## 6. Libraries

- React 19 — UI component model.
- React Router — browser routes and direct navigation.
- Vite — development and production build.
- Plain CSS — reuse of the PA#2 responsive design without an extra CSS framework.

## 7. Not done

- `/studio` (G4–G6, G10) and `/staff` (G8): the pages are written but `App.jsx` does not import them yet.
- G3, G6 (customer), G7 and G9: the customer pages are UI frames without API calls, and `/payments/test/:id` has no route.
- G11: `/superadmin` is a placeholder.
- Mock gaps found while building G8 and G10:
  - tokens are lost when the mock restarts, so Retry after a mode change answers `401`;
  - `empty` mode still returns the lists inside a single booking;
  - a booking request is not added to the conversation.
- There is no endpoint listing rooms or staff, so the Admin types them for a clash check.
