import { useState } from 'react'
import { useSignup, useLogin } from '../hooks/useLogup'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const submit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={submit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const submit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className="login" onSubmit={submit}>
            <h3>Log In</h3>
            <label>Email:</label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Log In</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export { Signup, Login }