const mongoose  = require('mongoose');
const { findByIdAndDelete, findByIdAndUpdate, findOneAndUpdate } = require('../models/workoutModel');
const Workout = require('../models/workoutModel');


///////////// creating a workout
const createWorkout = async(req,res) =>{
        
    const {title,reps,load} = req.body;
    let emptyFields = []
    
    if(!title){
        emptyFields.push('title')
    } 

    if(!reps){
        emptyFields.push('reps')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(emptyFields.length > 0){
       return res.status(400).json({error : 'Please fill in all the fields',emptyFields})
    }

    try{
      const user_id = req.user._id  
      const workout = await Workout.create({title,reps,load,user_id})
      res.status(200).json(workout);  

    }catch(error){
        res.status(400).json({error:error.message})

    }


}

///////////// getting all the workouts
const getAllWorkouts = async(req,res) => {
const user_id = req.user._id  
    
const workout = await Workout.find({user_id}).sort({createdAt:-1})
res.status(200).json(workout);

}



/////////getting specific workout using id 

const getAWorkout = async(req,res) =>{
const {id} = req.params;
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"Opsss no such workout present"}) 
}
const workout = await Workout.findById(id);

if(!workout){
   return res.status(404).json({error:"Opsss no such workout present"})
}
res.status(200).json(workout);


}

//////////////// deleting a specific workout

const deleteAWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Opsss no such workout present"}) 
    }

    const workout = await Workout.findOneAndDelete({_id:id})    
    if(!workout){
        return res.status(404).json({error:"Opsss no such workout present"})
     }
     res.status(200).json(workout);

}


//////////////////////// updating a specific workout

const updateAWorkout = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Opsss no such workout present"}) 
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{...req.body}) 
    if(!workout){
        return res.status(404).json({error:"Opsss no such workout present for updating"})
     }
     res.status(200).json(workout);


} 


module.exports = {
createWorkout,
getAllWorkouts,
getAWorkout,
deleteAWorkout,
updateAWorkout
}