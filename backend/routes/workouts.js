const express = require('express')
// controller functions
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/Workout')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// all workouts routes are protected by requireAuth middleware
router.use(requireAuth)

router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.post('/', createWorkout)
router.delete('/:id', deleteWorkout)
router.patch('/:id', updateWorkout)

module.exports = router