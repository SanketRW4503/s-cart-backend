import  express  from 'express'
import productsRouter from './routes/productsRout.js'
import adminRouter from './routes/adminRout.js'
import userRouter from './routes/userRout.js'
import categoryRouter from './routes/categoryRout.js'
import paymentRouter from './routes/paymentRout.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import connect_to_db from './database/db.js';
import cors from 'cors';
import Razorpay from 'razorpay'

// Rest of your code





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


    
export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRETE_KEY,
})

app.listen(process.env.PORT, () => {
    console.log('Server is started');
})



app.use('/products', productsRouter)

app.use('/user', userRouter)

app.use('/admin', adminRouter)


app.use('/category', categoryRouter)

app.use('/payment', paymentRouter)


