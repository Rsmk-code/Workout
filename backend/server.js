require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout');

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
// middleware
app.use(express.json());

//routes
app.use('/api/workouts',workoutRoutes);

// connect to db
mongoose.connect(MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`connected to db and server listening on port ${PORT}`)
    });
}).catch((err)=>{
    console.error(`could not connect to the database: ${err}`);
})
