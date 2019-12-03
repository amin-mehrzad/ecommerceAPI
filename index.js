const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const app = express();




app.use(logger('dev'));

// Import routes
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/ecommerceAPI', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")



// Send message for default URL
app.get('/',(req, res) => res.send('Hello World with Express and Nodemon'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
var port = process.env.PORT || 8080;
app.listen(port, function (){
    console.log(`Running ecommerceAPI on port ${port}`)
});
