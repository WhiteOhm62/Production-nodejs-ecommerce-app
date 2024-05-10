import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Stripe from "stripe";
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongoSantitze from 'express-mongo-sanitize';

import connectDB from './config/db.js';
// dot env config
dotenv.config();

//mongodb database connection
connectDB();

//stripe configuration
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);


//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

//rest object
const app = express();



//middlewares
app.use(helmet());
app.use(mongoSantitze());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//route
import testRoutes from './routes/testRoute.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
app.use('/api/v1/', testRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cat', categoryRoutes);
app.use('/api/v1/order', orderRoutes);


app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to node server!</h1>")
});


//port
const PORT = process.env.PORT || 8080;


//listen
app.listen(PORT, () => {
    console.log(`server listening on PORT NO : ${PORT} on ${process.env.NODE_ENV} MODE`.bgMagenta.white)
})