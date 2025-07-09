export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TodoCreate {
  title: string
  description: string
}

export interface TodoUpdate {
  title?: string
  description?: string
  completed?: boolean
}

export interface User {
  id: number
  username: string
}

export interface LoginData {
  username: string
  password: string
}

export interface AuthToken {
  access_token: string
  token_type: string
}
