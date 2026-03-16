import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

interface Device {
  id: string
  device_id: string
  created_at: string
}

interface Props {
  onClose?: () => void
}

export default function DeviceRegistration({ onClose }: Props) {
  const { user } = useAuth()
  const [devices, setDevices] = useState<Device[]>([])
  const [mac, setMac] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDevices()
  }, [])

  async function fetchDevices() {
    const { data } = await supabase
      .from('devices')
      .select('id, device_id, created_at')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
    if (data) setDevices(data)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const { error } = await supabase
      .from('devices')
      .insert({ device_id: mac.trim().toLowerCase(), user_id: user!.id })

    if (error) {
      setError(error.message.includes('unique') ? 'This MAC address is already registered.' : error.message)
    } else {
      setMessage('Device registered!')
      setMac('')
      fetchDevices()
    }
    setLoading(false)
  }

  async function handleRemove(id: string) {
    await supabase.from('devices').delete().eq('id', id)
    setDevices(d => d.filter(dev => dev.id !== id))
  }

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="auth-card">
        <div className="auth-logo">
          <span className="nav-logo-icon">&#9679;</span> Pomodoro
        </div>
        <h2 className="auth-title">My Devices</h2>
        <p className="auth-sub">Register your Pico W to link its sessions to your account.</p>

        {devices.length > 0 && (
          <ul className="device-list">
            {devices.map(d => (
              <li key={d.id} className="device-item">
                <span className="device-mac">{d.device_id}</span>
                <button className="device-remove" onClick={() => handleRemove(d.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}

        <form className="auth-form" onSubmit={handleRegister} style={{ marginTop: devices.length ? '1.25rem' : '0' }}>
          <div className="auth-field">
            <label htmlFor="mac">MAC Address</label>
            <input
              id="mac"
              type="text"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
              placeholder="aa:bb:cc:dd:ee:ff"
              required
              pattern="^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$"
              title="Format: aa:bb:cc:dd:ee:ff"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Registering…' : 'Register Device'}
          </button>
        </form>
      </div>
    </div>
  )
}
