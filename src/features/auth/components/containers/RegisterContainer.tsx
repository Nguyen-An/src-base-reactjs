import { useNavigate } from 'react-router-dom'
import { useRegister } from '../../hooks/useRegister'
import { RegisterForm } from '../presentational/RegisterForm'
import { getErrorMessage } from '@/lib/utils'
import type { RegisterRequest } from '../../types'

/**
 * CONTAINER (smart) component — owns the registration logic.
 * - Calls useRegister hook
 * - Handles navigation after success
 * - Passes down only plain data/callbacks to RegisterForm
 */
export function RegisterContainer() {
  const navigate = useNavigate()
  const { mutate: register, isPending, error } = useRegister()

  const handleSubmit = (data: RegisterRequest) => {
    register(data, {
      onSuccess: () => void navigate('/'),
    })
  }

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      error={error ? getErrorMessage(error) : undefined}
      onLoginClick={() => void navigate('/login')}
    />
  )
}
