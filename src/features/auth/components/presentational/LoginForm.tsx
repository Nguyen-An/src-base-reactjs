import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import type { LoginRequest } from '../../types'

const loginSchema = z.object({
  gmail: z.string().email('Invalid gmail address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void
  isLoading: boolean
  error?: string
  onRegisterClick: () => void
}

/**
 * PRESENTATIONAL component — renders the login form.
 * No API calls, no Redux. Receives everything via props.
 */
export function LoginForm({ onSubmit, isLoading, error, onRegisterClick }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({ resolver: zodResolver(loginSchema) })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="gmail">Gmail</Label>
            <Input id="gmail" type="email" placeholder="you@gmail.com" {...register('gmail')} />
            {errors.gmail && <p className="text-xs text-destructive">{errors.gmail.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button form="login-form" type="submit" className="w-full" isLoading={isLoading}>
          Sign In
        </Button>
        <p className="text-sm text-muted-foreground">
          No account?{' '}
          <button
            type="button"
            className="text-primary underline-offset-4 hover:underline"
            onClick={onRegisterClick}
          >
            Register here
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}
