import { createFileRoute, redirect } from '@tanstack/react-router'
import TodoList from '../components/TodoList'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    const isAuthenticated = !!localStorage.getItem('auth_token')
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: TodoList,
})
