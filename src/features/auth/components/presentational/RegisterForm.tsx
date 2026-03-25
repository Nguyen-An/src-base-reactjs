import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import type { RegisterRequest } from '../../types'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  gmail: z.string().email('Invalid gmail address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

interface RegisterFormProps {
  onSubmit: (data: RegisterRequest) => void
  isLoading: boolean
  error?: string
  onLoginClick: () => void
}

/**
 * PRESENTATIONAL component — renders the registration form.
 * No API calls, no Redux. Receives everything via props.
 */
export function RegisterForm({ onSubmit, isLoading, error, onLoginClick }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({ resolver: zodResolver(registerSchema) })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register('name')} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

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
        <Button form="register-form" type="submit" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary underline-offset-4 hover:underline"
            onClick={onLoginClick}
          >
            Sign in
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}
