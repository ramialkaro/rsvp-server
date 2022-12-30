
const express = require('express')
const app = express();


// connect to db
const connectDB = require('./config/db')
connectDB()

// initlilaze middleware
app.use(express.json({extended: true}))

//use rigister router
app.use('/register', require('./routes/register'))

//use auth 
app.use('/auth', require('./routes/Auth'))


//port will be 5000
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))