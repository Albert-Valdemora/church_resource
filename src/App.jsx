
import { AppRouter } from './routes/AppRouter'
import { ThemeProvider } from './components/theme-provider'
import AuthProvider from './context/AuthProvider'

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
