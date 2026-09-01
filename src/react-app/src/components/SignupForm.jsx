import { useState } from 'react'
import { signupForActivity } from '../api/activities'

function SignupForm({ activityName, onSuccess }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')  // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await signupForActivity(activityName, email)
      setEmail('')
      setStatus('success')
      onSuccess?.()
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Sign Up for {activityName}</h3>
      <label htmlFor="signup-email">School email</label>
      <input
        id="signup-email"
        type="email"
        placeholder="you@mergington.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Signing up…' : 'Sign Up'}
      </button>
      {status === 'success' && <p className="success-msg">You're signed up!</p>}
      {status === 'error' && <p className="error-msg">{errorMsg}</p>}
    </form>
  )
}

export default SignupForm
