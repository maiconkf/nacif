export const handleUnauthorizedError = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth-storage')
  window.location.href = '/login'
}

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
) => {
  const response = await fetch(url, options)

  if (response.status === 401) {
    handleUnauthorizedError()
    throw new Error('Unauthorized access - please log in again')
  }

  return response
}
