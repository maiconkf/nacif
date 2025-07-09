import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../services/api'
import type { LoginData } from '../types/todo'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (data: LoginData) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: !!localStorage.getItem('auth_token'),
      isLoading: false,
      error: null,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null })
        try {
          await api.login(data)
          set({ isAuthenticated: true, isLoading: false })
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Login failed'
          set({
            error: errorMessage,
            isLoading: false,
          })
          throw error
        }
      },

      logout: () => {
        api.logout()
        set({ isAuthenticated: false, error: null })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
