import { useState } from 'react'

// Bug 2: handleSubmit missing the event parameter 'e'
// Bug 3: e.preventDefault() not called — form submission reloads the page
// Bug 4: input is uncontrolled — no value or onChange binding

function SignupForm({ activityName, onSignup }) {
  const [email, setEmail] = useState('')

  function handleSubmit() {
    // prevent default form behavior here
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
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm
