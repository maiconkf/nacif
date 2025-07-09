import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const isAuthenticated = !!localStorage.getItem('auth_token')
    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    } else {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: () => null,
})
