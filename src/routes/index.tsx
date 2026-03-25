import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { AuthRoute } from './AuthRoute'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { UsersPage } from '@/pages/UsersPage'
import { UserDetailPage } from '@/pages/UserDetailPage'
import { BlogsPage } from '@/pages/BlogsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * Application router — feature-based layout routes.
 *
 * Layout hierarchy:
 *  /login, /register  →  AuthRoute (AuthLayout)
 *  /*, /users, /blogs →  PrivateRoute (MainLayout + auth guard)
 */
export const router = createBrowserRouter([
  // ── Authenticated routes ──────────────────────────────────────────────────
  {
    element: <PrivateRoute />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/users/:id', element: <UserDetailPage /> },
      { path: '/blogs', element: <BlogsPage /> },
    ],
  },

  // ── Public auth routes ────────────────────────────────────────────────────
  {
    element: <AuthRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },

  // ── Fallback ──────────────────────────────────────────────────────────────
  { path: '*', element: <NotFoundPage /> },
])
