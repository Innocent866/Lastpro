const express = require('express')
const app = express()
const connect = require('./config/db')
const port = process.env.PORT || 5757
const morgan = require('morgan');
const productRoute = require('./routes/productRoute')


// custom middleware
app.use(morgan('dev'))

// Api's
app.use('/api/products',productRoute)


// routes
app.get('/',(req,res)=>{
    res.status(200).json({message:'app is running'})
})

app.use((req,res)=>{
    res.status(404).json({message:"that route doesn't exist"})
})

// server and db


connect()
.then(()=>{
    try{
        app.listen(port,(req,res)=>{
            console.log(`Server is Connected to http://localhost:${port}`);
        })
    }
    catch(error){
        console.log('can not connect to the server');
    }
})
.catch((error)=>{
    console.log("invalid database connection...!",error);
})