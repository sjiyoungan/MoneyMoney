import { Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function App() {
  return (
    <div className="bg-background text-foreground min-h-svh">
      <div className="mx-auto flex min-h-svh max-w-lg flex-col justify-center gap-8 px-4 py-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-2xl shadow-sm">
            <Wallet className="size-7" aria-hidden />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">MoneyMoney</h1>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            React, Vite, Tailwind CSS v4, and shadcn/ui. Use this screen as a
            starting point for your finance app.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick sign-in</CardTitle>
            <CardDescription>
              Placeholder form — wire this to your auth backend when you are
              ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" type="button" className="w-full sm:w-auto">
              Create account
            </Button>
            <Button type="button" className="w-full sm:w-auto">
              Continue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default App
