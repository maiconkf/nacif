import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginForm from '../components/LoginForm'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isAuthenticated = !!localStorage.getItem('auth_token')
    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: LoginForm,
})
