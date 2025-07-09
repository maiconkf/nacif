import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import { useCreateTodo } from '../services/api'
import type { TodoCreate } from '../types/todo'

interface TodoFormProps {
  onSuccess?: () => void
}

export default function TodoForm({ onSuccess }: TodoFormProps) {
  const createTodoMutation = useCreateTodo()

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    } as TodoCreate,
    onSubmit: async ({ value }) => {
      try {
        await createTodoMutation.mutateAsync(value)
        form.reset()
        onSuccess?.()
      } catch (error) {
        console.error('Failed to create todo:', error)
      }
    },
  })

  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Todo</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <form.Field
          name="title"
          children={(field) => (
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                name={field.name}
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter todo title..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        <form.Field
          name="description"
          children={(field) => (
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name={field.name}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                placeholder="Enter todo description..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={createTodoMutation.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {createTodoMutation.isPending ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                Creating...
              </>
            ) : (
              'Add Todo'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
