import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authenticatedFetch } from './auth-interceptor'
import type {
  AuthToken,
  LoginData,
  Todo,
  TodoCreate,
  TodoUpdate,
} from '../types/todo'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let authToken: string | null = localStorage.getItem('auth_token')

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(authToken && { Authorization: `Bearer ${authToken}` }),
})

const api = {
  async login(data: LoginData): Promise<AuthToken> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const result = await response.json()
    authToken = result.access_token
    localStorage.setItem('auth_token', authToken!)
    return result
  },

  logout() {
    authToken = null
    localStorage.removeItem('auth_token')
  },

  async getTodos(): Promise<Array<Todo>> {
    const response = await authenticatedFetch(`${API_BASE_URL}/todos`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch todos')
    }

    return response.json()
  },

  async createTodo(data: TodoCreate): Promise<Todo> {
    const response = await authenticatedFetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create todo')
    }

    return response.json()
  },

  async updateTodo(id: number, data: TodoUpdate): Promise<Todo> {
    const response = await authenticatedFetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update todo')
    }

    return response.json()
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await authenticatedFetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to delete todo')
    }
  },
}

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}

export const useTodos = () => {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: api.getTodos,
    staleTime: 1000 * 60 * 5,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoUpdate }) =>
      api.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    },
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: api.login,
  })
}

export { api }
