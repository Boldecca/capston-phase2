'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signUpError } = await signUp(email, password, name)
    
    if (signUpError) {
      setError(signUpError.message)
    } else {
      router.push('/dashboard')
    }
    
    setLoading(false)
  }

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}