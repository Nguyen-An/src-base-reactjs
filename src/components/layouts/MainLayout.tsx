import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'

interface MainLayoutProps {
  children: ReactNode
}

/** App shell with top nav for authenticated pages */
export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-10 border-b bg-card px-6 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-lg font-bold tracking-tight">
              MyApp
            </Link>
            <Link to="/users" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Users
            </Link>
            <Link to="/blogs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Blogs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.name ?? user?.gmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  )
}
