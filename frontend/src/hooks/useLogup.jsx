import { useState } from 'react'
import { useAuthContext } from './useAuth'
import { useWorkoutsContext } from './useWorkouts'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return
        }
        // save the JWT to local storage
        localStorage.setItem('user', JSON.stringify(json))
        // update the auth context
        dispatch({ type: 'LOGIN', payload: json })
        setIsLoading(false)
    }
    return { signup, isLoading, error }
}

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const logout = () => {
        localStorage.removeItem('user')
        authDispatch({ type: 'LOGOUT' })
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout }
}

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return
        }
        // save the JWT to local storage
        localStorage.setItem('user', JSON.stringify(json))
        // update the auth context
        dispatch({ type: 'LOGIN', payload: json })
        setIsLoading(false)
    }
    return { login, isLoading, error }

}
