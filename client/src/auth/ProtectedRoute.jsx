import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth.js'
import { getRoleHomePath } from './roles.js'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getRoleHomePath(user.role)} replace />
  }

  return children
}
