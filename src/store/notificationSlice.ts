import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// ─── State Shape ─────────────────────────────────────────────────────────────

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string            // unique id để remove đúng toast
  type: NotificationType
  title: string
  message?: string
  duration?: number     // ms, default 4000
}

interface NotificationState {
  items: Notification[]
}

const initialState: NotificationState = {
  items: [],
}

// ─── Slice ────────────────────────────────────────────────────────────────────
/**
 * notificationSlice — manages a queue of toast notifications.
 *
 * Pattern: dùng Redux cho notification vì nhiều nơi trong app
 * đều cần push toast (hooks, containers, error boundaries).
 * Thay vì prop drilling hoặc Context, Redux cho phép dispatch từ bất kỳ đâu.
 *
 * Usage:
 *   dispatch(addNotification({ type: 'success', title: 'Saved!' }))
 *   dispatch(removeNotification(id))
 */
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    /** Push a new toast into the queue */
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      state.items.push({ ...action.payload, id })
    },

    /** Remove a specific toast by id (called after auto-dismiss timer fires) */
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },

    /** Clear all toasts at once (e.g. on logout) */
    clearNotifications(state) {
      state.items = []
    },
  },
})

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions
export default notificationSlice.reducer
