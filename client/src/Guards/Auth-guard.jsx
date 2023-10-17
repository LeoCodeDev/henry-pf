import { useAuthStore } from '../store/authStore'
import { Outlet, Navigate } from 'react-router-dom'

export const AuthGuard = () => {
  const { user } = useAuthStore()

  return user.role === 'User' ? <Outlet /> : <Navigate replace to="/" />
}
