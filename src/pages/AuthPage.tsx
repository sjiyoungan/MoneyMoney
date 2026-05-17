import { useState, type FormEvent } from 'react'
import { Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

type AuthMode = 'sign-in' | 'sign-up'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const switchMode = (next: AuthMode) => {
    setMode(next)
    setError(null)
    setMessage(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    if (!isSupabaseConfigured) {
      setError(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a .env.local file.',
      )
      return
    }

    setLoading(true)

    if (mode === 'sign-up') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      setLoading(false)

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.session) {
        setMessage('Account created. You are signed in.')
        return
      }

      setMessage(
        'Account created. Check your email to confirm your address, then sign in.',
      )
      setMode('sign-in')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message)
    }
  }

  const isSignUp = mode === 'sign-up'

  return (
    <div className="bg-background text-foreground min-h-svh">
      <div className="mx-auto flex min-h-svh w-full max-w-lg flex-col justify-center gap-6 px-4 py-8 sm:gap-8 sm:py-12">
        <header className="flex flex-col items-center gap-3 text-center">
          <div className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-2xl shadow-sm">
            <Wallet className="size-7" aria-hidden />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">MoneyMoney</h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{isSignUp ? 'Create account' : 'Sign in'}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={
                    isSignUp ? 'new-password' : 'current-password'
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              {error ? (
                <p className="text-destructive text-sm" role="alert">
                  {error}
                </p>
              ) : null}
              {message ? (
                <p className="text-muted-foreground text-sm" role="status">
                  {message}
                </p>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? 'Please wait…'
                  : isSignUp
                    ? 'Create account'
                    : 'Continue'}
              </Button>
            </CardFooter>
          </Card>

          <p className="text-center">
            {isSignUp ? (
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors disabled:opacity-50"
                onClick={() => switchMode('sign-in')}
                disabled={loading}
              >
                Already have an account? Sign in
              </button>
            ) : (
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors disabled:opacity-50"
                onClick={() => switchMode('sign-up')}
                disabled={loading}
              >
                Create account
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}
