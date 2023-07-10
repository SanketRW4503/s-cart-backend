import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import Razorpay from 'razorpay';
import productsRouter from './routes/productsRout.js';
import adminRouter from './routes/adminRout.js';
import orderRout from './routes/orderRout.js'
import userRouter from './routes/userRout.js';
import categoryRouter from './routes/categoryRout.js';
import paymentRouter from './routes/paymentRout.js';
import connect_to_db from './database/db.js';
import carouselRout from './routes/carouselRout.js';
import wishlistRout from './routes/wishListRout.js'
// env setup
config({
  path: './database/config.env',
});



const app = express();

// Use cors middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL,process.env.ADMIN_PANEL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true ,limit: '50mb'}))


// app.use(express.urlencoded({ extended: true }));

// Use cookie-parser middleware
app.use(cookieParser());

// connect to db
connect_to_db();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRETE_KEY,
});

app.listen(process.env.PORT, () => {
  console.log('Server is started');
});




app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/payment', paymentRouter);
app.use('/order',orderRout)
app.use('/carousel',carouselRout)
app.use('/wishlist',wishlistRout)


// homepage backend
app.get('/',(req,res)=>{
  res.send('Nice Working...')
})