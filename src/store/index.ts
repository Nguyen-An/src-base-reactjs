import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/store/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Inferred types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
