import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import { LoginForm } from '../presentational/LoginForm'
import { getErrorMessage } from '@/lib/utils'
import type { LoginRequest } from '../../types'

/**
 * CONTAINER (smart) component — owns the login logic.
 * - Calls useLogin hook
 * - Handles navigation after success
 * - Passes down only plain data/callbacks to LoginForm
 */
export function LoginContainer() {
  const navigate = useNavigate()
  const { mutate: login, isPending, error } = useLogin()

  const handleSubmit = (data: LoginRequest) => {
    login(data, {
      onSuccess: () => void navigate('/'),
    })
  }

  return (
    <LoginForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      error={error ? getErrorMessage(error) : undefined}
      onRegisterClick={() => void navigate('/register')}
    />
  )
}
