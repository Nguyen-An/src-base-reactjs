export interface AuthUser {
  id: string
  name: string
  gmail: string
  role: string
}

export interface LoginRequest {
  gmail: string
  password: string
}

export interface RegisterRequest {
  name: string
  gmail: string
  password: string
}

/** Shape of data.data returned by POST /api/auth/login and /register */
export interface AuthLoginData {
  user: AuthUser
  token: string
}
