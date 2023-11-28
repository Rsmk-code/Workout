const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// GET all workouts
const getWorkkouts = async (req, res)=>{ 
    try{
        const workouts = await  Workout.find({}).sort({createAt: -1})
        res.status(200).json(workouts)
    }catch(err){
        res.status(400).json({err: err.message})
    }
}
// GET a single workout
const getWorkout = async (req, res)=>{
    const { id } = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such workout'})
        }
        const workout = await Workout.findById(id)
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({err: err.message})
    }
}
// create new workout
const createWorkout = async (req, res)=>{
    const {title, load, reps} = req.body

    let emptyField = []
    if (!title) { 
        emptyField.push('title')
    }
    if (!load) { 
        emptyField.push('load')
    }
    if (!reps) {
        emptyField.push('reps')
    }
    if(emptyField.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyField})
    }
    // add doc to db
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// DELETE  a workout
const deleteWorkout = async (req,res)=> {
    const { id } = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such workout'})
        }

        const workout = await Workout.findOneAndDelete({_id: id})
        res.status(200).json('deleted succesfully')
        
    }catch(err){
        res.status(400).json({err: err.message})
    }
}
// UPDATE a workout
const updateWorkout = async (req,res)=> {
    const { id } = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such workout'})
        }


        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json('updated successfully')

    }catch(err){
        res.status(400).json({err: err.message})
    }
}
module.exports = {createWorkout, getWorkkouts, getWorkout, deleteWorkout, updateWorkout}