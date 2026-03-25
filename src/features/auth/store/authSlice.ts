import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
}

const storedToken = localStorage.getItem('accessToken')

const initialState: AuthState = {
  user: null,
  token: storedToken,
  isAuthenticated: storedToken !== null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Called after a successful login or register */
    setCredentials(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    /** Clear session – also clears localStorage */
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('accessToken')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
