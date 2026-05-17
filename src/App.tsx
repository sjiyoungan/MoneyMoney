import { Button } from '@/components/ui/button'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { AuthPage } from '@/pages/AuthPage'

function AppContent() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="bg-background text-foreground flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col items-center justify-center gap-4 px-4">
      <p className="text-sm">
        Signed in as <span className="font-medium">{user.email}</span>
      </p>
      <Button type="button" variant="outline" onClick={() => void signOut()}>
        Sign out
      </Button>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
