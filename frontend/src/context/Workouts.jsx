import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const WorkoutsContext = createContext()

const workoutsReducer = (state, action) => {
    // state holds the previous state
    // action.type holds the 'TYPE_OF_CHANGE'
    // action.payload holds the data to use for change
    switch (action.type) {
        case 'SET_WORKOUTS': return {
            // overwrite current state with payload
            workouts: action.payload
        }
        case 'CREATE_WORKOUT': return {
            // add payload to the beginning of the workouts array
            workouts: [action.payload, ...state.workouts]
        }
        case 'DELETE_WORKOUT': return {
            // remove the deleted workout from the array
            workouts: state.workouts.filter((w) => w._id != action.payload._id)
        }
        // no change
        default: return state
    }
}

const WorkoutsContextProvider = ({ children }) => {
    // useReducer is like useState but you get a dispatch instead of a setter
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: null })

    // dispatch({ type: 'TYPE_OF_CHANGE', payload: [{<data to use for change>}] })

    // wraps the entire <App/>
    return ( //                       workouts: state.workouts, dispatch
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

WorkoutsContextProvider.propTypes = {
    children: PropTypes.object.isRequired
}
export { WorkoutsContext, WorkoutsContextProvider }