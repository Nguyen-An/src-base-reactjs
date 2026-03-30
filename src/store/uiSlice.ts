import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// ─── State Shape ─────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark' | 'system'

interface UiState {
  sidebarOpen: boolean
  theme: Theme
  pageTitle: string
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
  pageTitle: '',
}

// ─── Slice ────────────────────────────────────────────────────────────────────
/**
 * uiSlice — manages purely client-side UI preferences.
 * No API calls. No async. Pure synchronous state.
 *
 * Examples of what belongs here:
 *  - Sidebar open/close
 *  - Theme selection
 *  - Current page title (for <title> tag or breadcrumb)
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /** Toggle sidebar between open and closed */
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },

    /** Explicitly set sidebar state */
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },

    /** Switch between light / dark / system theme */
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },

    /** Update the current page title shown in nav/breadcrumb */
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setTheme, setPageTitle } = uiSlice.actions
export default uiSlice.reducer
