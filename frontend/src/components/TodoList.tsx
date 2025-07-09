import { useState } from 'react'
import { ClipboardList, XCircle } from 'lucide-react'
import { useTodos } from '../services/api'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import type { Todo } from '../types/todo'

type FilterType = 'all' | 'active' | 'completed'

export default function TodoList() {
  const [filter, setFilter] = useState<FilterType>('all')
  const { data: todos = [], isLoading, error, refetch } = useTodos()

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  const stats = {
    total: todos.length,
    active: todos.filter((todo: Todo) => !todo.completed).length,
    completed: todos.filter((todo: Todo) => todo.completed).length,
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading todos
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => refetch()}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 cursor-pointer"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Todos</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto w-full">
          <TodoForm onSuccess={() => refetch()} />

          <div className="mb-6 mt-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              {(['all', 'active', 'completed'] as Array<FilterType>).map(
                (filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 cursor-pointer ${
                      filter === filterType
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {filterType}
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {filterType === 'all'
                        ? stats.total
                        : filterType === 'active'
                          ? stats.active
                          : stats.completed}
                    </span>
                  </button>
                ),
              )}
            </nav>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {filter === 'all'
                    ? 'No todos yet'
                    : filter === 'active'
                      ? 'No active todos'
                      : 'No completed todos'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all'
                    ? 'Get started by creating a new todo.'
                    : filter === 'active'
                      ? 'All your todos are completed!'
                      : 'Complete some todos to see them here.'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
