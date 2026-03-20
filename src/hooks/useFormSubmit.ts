import { useState, useCallback } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

/**
 * Handles contact form submission to Formspree.
 * Manages loading, success, and error states.
 */
export function useFormSubmit(endpoint: string): {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
  handleSubmit: (data: FormData) => Promise<void>
  reset: () => void
} {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          setIsSuccess(true)
        } else {
          const errorData = await response.json().catch(() => ({}))
          setIsError(true)
          setErrorMessage(
            (errorData as { error?: string })?.error ??
              'Something went wrong. Please try again.'
          )
        }
      } catch {
        setIsError(true)
        setErrorMessage('Network error. Please check your connection.')
      } finally {
        setIsLoading(false)
      }
    },
    [endpoint]
  )

  const reset = useCallback(() => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }, [])

  return { isLoading, isSuccess, isError, errorMessage, handleSubmit, reset }
}
