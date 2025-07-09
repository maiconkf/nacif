import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Check, Edit, Trash2 } from 'lucide-react'
import { useDeleteTodo, useUpdateTodo } from '../services/api'
import type { Todo, TodoUpdate } from '../types/todo'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const form = useForm({
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateTodoMutation.mutateAsync({
          id: todo.id,
          data: value as TodoUpdate,
        })
        setIsEditing(false)
      } catch (error) {
        console.error('Failed to update todo:', error)
      }
    },
  })

  const handleToggleComplete = async () => {
    try {
      await updateTodoMutation.mutateAsync({
        id: todo.id,
        data: { completed: !todo.completed },
      })
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodoMutation.mutateAsync(todo.id)
      } catch (error) {
        console.error('Failed to delete todo:', error)
      }
    }
  }

  if (isEditing) {
    return (
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-3"
        >
          <form.Field
            name="title"
            children={(field) => (
              <input
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <textarea
                rows={2}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateTodoMutation.isPending}
              className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 cursor-pointer"
            >
              {updateTodoMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div
      className={`bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-4 transition-all duration-200 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          disabled={updateTodoMutation.isPending}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors duration-200 cursor-pointer flex items-center justify-center ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          } disabled:opacity-50`}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium text-gray-900 leading-none ${
              todo.completed ? 'line-through' : ''
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`mt-1 text-sm text-gray-600 ${
                todo.completed ? 'line-through' : ''
              }`}
            >
              {todo.description}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Created: {new Date(todo.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            title="Edit todo"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteTodoMutation.isPending}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            title="Delete todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
