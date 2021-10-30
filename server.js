require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRouter = require('./routes/UserRouter')
const noteRouter = require('./routes/noteRouter')
const app = express()
app.use(express.json())
app.use(cors())
const path = require('path')

//Routes


app.use('/users',UserRouter)
app.use('/api/notes',noteRouter)



//Connect to Database
const URI = process.env.MONGODB_URL;
mongoose.connect(URI,{
    // useCreateIndex:true,
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
},err =>{
    if(err) throw err;
    console.log('COnnect to MOngoDB')
})
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client',"build","index.html"))
    })
}



// Listen to server

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log('Port is running on port ',PORT)
})
