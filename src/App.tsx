import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from '@/store'
import { router } from '@/routes'
import ErrorBoundary from '@/components/ErrorBoundary'

/**
 * React Query client — global defaults.
 * staleTime: 5 min  → no refetch if data was fetched < 5 min ago
 * retry: 1          → retry once on failure before showing error
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * App root — provider stack:
 *  ErrorBoundary         → catches render errors, prevents full crash
 *  Provider (Redux)      → global UI & auth state
 *  QueryClientProvider   → server state (React Query)
 *  RouterProvider        → client-side routing
 */
function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
