const express = require('express')
const productsRouter = require('./routes/productsRout')
const userRouter = require('./routes/userRout')
const cookieParser = require('cookie-parser');
const {config}= require('dotenv')
const connect_to_db = require('./database/db')
const cors = require('cors')




// env setup
config({
    path:'./database/config.env',
})



const app = express();
app.use(express.json())

app.use(cors({
    origin:["*"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));



// connect to db
connect_to_db()





// Use cookie-parser middleware
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log('Server is started');
})

app.use('/products', productsRouter)

app.use('/user', userRouter)
