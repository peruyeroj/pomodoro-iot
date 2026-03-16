import { useState } from 'react'
import './App.css'
import { useAuth } from './context/AuthContext'
import AuthForm from './components/AuthForm'
import DeviceRegistration from './components/DeviceRegistration'

function App() {
  const { user, loading, signOut } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [showDevices, setShowDevices] = useState(false)

  if (loading) {
    return (
      <div className="loading-screen">
        <span className="nav-logo-icon">&#9679;</span>
      </div>
    )
  }

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-icon">&#9679;</span> Pomodoro
        </div>
        {user ? (
          <div className="nav-user">
            <span className="nav-email">{user.email}</span>
            <button className="nav-cta nav-cta--ghost" onClick={() => setShowDevices(true)}>Devices</button>
            <button className="nav-cta" onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <button className="nav-cta" onClick={() => setShowAuth(true)}>Start Focusing</button>
        )}
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Focus deeper.<br />Work smarter.</h1>
          <p className="hero-sub">
            A minimal Pomodoro timer that helps you stay in flow, beat
            procrastination, and protect your energy throughout the day.
          </p>
          {user ? (
            <p className="btn-primary" style={{ cursor: 'default' }}>You're logged in ✓</p>
          ) : (
            <button className="btn-primary" onClick={() => setShowAuth(true)}>
              Get Started — it's free
            </button>
          )}
        </div>
        <div className="hero-timer">
          <div className="timer-ring">
            <svg viewBox="0 0 200 200" className="timer-svg">
              <circle cx="100" cy="100" r="88" className="timer-track" />
              <circle cx="100" cy="100" r="88" className="timer-progress" />
            </svg>
            <div className="timer-display">
              <span className="timer-time">25:00</span>
              <span className="timer-label">Focus</span>
            </div>
          </div>
          <div className="timer-controls">
            <button className="timer-btn">&#9654;</button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Pick a task</h3>
            <p>Decide what you want to work on before you start the timer.</p>
          </div>
          <div className="step-divider" />
          <div className="step">
            <div className="step-number">2</div>
            <h3>Work for 25 min</h3>
            <p>Focus entirely on your task until the timer rings. No distractions.</p>
          </div>
          <div className="step-divider" />
          <div className="step">
            <div className="step-number">3</div>
            <h3>Take a break</h3>
            <p>Rest for 5 minutes, then repeat. After 4 rounds, take a longer break.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span>&#9679; Pomodoro</span>
        <span>Built with focus in mind.</span>
      </footer>

      {showAuth && <AuthForm onClose={() => setShowAuth(false)} />}
      {showDevices && <DeviceRegistration onClose={() => setShowDevices(false)} />}
    </div>
  )
}

export default App
