//express
const express = require('express');

//cors
const cors = require('cors');

//Route
const userRoute = require('./routes/userRoute.js');

//create express app
const app = express();

//middleware to use cors
app.use(cors());

//middleware to accept json body in request
app.use(express.json());


//middleware to use the route
app.use('/users',userRoute);



//listen to app
app.listen(4000, () => {

    console.log('app running on port 4000')
});