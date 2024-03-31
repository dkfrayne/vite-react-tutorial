const Workout = require('../models/Workout')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}
// get one workout
const getWorkout = async (req, res) => {
    // url parameters are in req.params
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'Invalid ObjectId',
            method: 'getWorkout',
            id
        })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({
            error: 'No such workout.',
            method: 'getWorkout',
            id
        })
    }
    res.status(200).json(workout)
}
// create a workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body
    const emptyFields = []
    if (!title) emptyFields.push('title')
    if (!load) emptyFields.push('load')
    if (!reps) emptyFields.push('reps')
    if (emptyFields.length) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields })
    }
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, load, reps, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({
            error: err.message,
            method: 'createWorkout',
        })
    }
}
// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'Invalid ObjectId',
            method: 'deleteWorkout',
            id
        })
    }
    const user_id = req.user._id
    const workout = await Workout.findOneAndDelete({ _id: id, user_id })
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}
// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'Invalid ObjectId',
            method: 'updateWorkout',
            id
        })
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!workout) {
        return res.status(404).json({
            error: 'No such workout',
            method: 'updateWorkout',
            id
        })
    }
    res.status(200).json(workout)
}
module.exports = { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout }