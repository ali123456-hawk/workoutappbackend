require('dotenv').config()
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/users')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})



app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    
    app.listen(process.env.PORT,()=>{
        console.log("connected to mongodb & listening on port ",process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error);
})

