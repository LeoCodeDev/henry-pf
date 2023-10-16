import { useAuthStore } from '../store/authStore'
// import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const AuthGuard = () => {
  const { user } = useAuthStore()

  console.log(user.role);

  return user.role === 'User' ? <Outlet /> : <Navigate replace to="/" />
}
