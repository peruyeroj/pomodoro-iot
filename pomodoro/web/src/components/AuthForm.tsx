import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface Props {
  onClose?: () => void
}

export default function AuthForm({ onClose }: Props) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error)
      else onClose?.()
    } else {
      const { error } = await signUp(email, password)
      if (error) setError(error)
      else setMessage('Check your email for a confirmation link.')
    }

    setLoading(false)
  }

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="auth-card">
        <div className="auth-logo">
          <span className="nav-logo-icon">&#9679;</span> Pomodoro
        </div>

        <h2 className="auth-title">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="auth-sub">
          {mode === 'login'
            ? 'Sign in to track your focus sessions.'
            : 'Start tracking your productivity today.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <p className="auth-toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setMessage(null) }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
