export const ROLE_HOME_PATHS = Object.freeze({
  customer: '/',
  admin: '/studio',
  staff: '/staff',
  superadmin: '/superadmin',
})

export const ROLE_LABELS = Object.freeze({
  customer: 'Khách hàng',
  admin: 'Quản trị studio',
  staff: 'Nhân viên studio',
  superadmin: 'Quản trị hệ thống',
})

export function getRoleHomePath(role) {
  return ROLE_HOME_PATHS[role] || '/'
}

export function roleCanVisitPath(role, pathname) {
  if (pathname === '/') return role === 'customer'
  if (pathname === '/studio' || pathname.startsWith('/studio/')) return role === 'admin'
  if (pathname.startsWith('/bookings/')) return role === 'customer'
  if (pathname === '/staff' || pathname.startsWith('/staff/')) return role === 'staff'
  if (pathname === '/superadmin' || pathname.startsWith('/superadmin/')) return role === 'superadmin'
  return false
}
