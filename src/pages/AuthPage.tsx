import { useState, type FormEvent } from 'react'

import { MoneyMoneyLogo } from '@/components/brand/MoneyMoneyLogo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

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

    const supabase = getSupabase()

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
      <div className="mx-auto flex min-h-svh w-full max-w-lg items-center px-4 py-8 sm:py-12">
        <Card className="w-full gap-0 p-6 ring-1 ring-foreground/10">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-start text-left"
          >
            <MoneyMoneyLogo className="h-6 w-auto" />

            <h2 className="mt-10 text-xl font-medium sm:text-2xl">
              {isSignUp ? 'Create account' : 'Sign in'}
            </h2>

            <div className="mt-6 grid w-full gap-4">
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
            </div>

            <Button
              type="submit"
              className="mt-6 w-full"
              disabled={loading}
            >
              {loading
                ? 'Please wait…'
                : isSignUp
                  ? 'Create account'
                  : 'Continue'}
            </Button>

            <p className="mt-4 w-full text-left">
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
        </Card>
      </div>
    </div>
  )
}
