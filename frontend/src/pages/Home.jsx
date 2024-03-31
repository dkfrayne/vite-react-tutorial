import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkouts"
import { useAuthContext } from '../hooks/useAuth'

import { WorkoutDetails } from '../components/WorkoutDetails'
import { WorkoutForm } from '../components/WorkoutForm'

const Home = () => {
    // const [workouts, setWorkouts] = useState(null)
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((w) => {
                    return <WorkoutDetails key={w._id} workout={w} />
                })}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home