const express = require('express')
const app = express()
const connect = require('./config/db')
const port = process.env.PORT || 5757
const morgan = require('morgan');
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const cors = require('cors')


// custom middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Api's
app.use('/api/products',productRoute)
app.use('/api/user',userRoute)
app.use('/api',orderRoute)


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