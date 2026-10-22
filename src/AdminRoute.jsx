import { Navigate, useLocation } from 'react-router'
import { ADMIN_AUTH_KEY } from './adminAuth.js'

export default function AdminRoute({ children }) {
  const location = useLocation()

  if (sessionStorage.getItem(ADMIN_AUTH_KEY) !== 'true') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}
