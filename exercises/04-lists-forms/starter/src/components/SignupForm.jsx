import { useState } from 'react'

function SignupForm({ activityName, onSignup }) {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSignup(activityName, email)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Your email</label>
      <input
        id="email"
        type="email"
        placeholder="you@school.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm
