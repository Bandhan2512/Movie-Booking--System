import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "../backend/routes/user-routes.js";
import adminRouter from "../backend/routes/admin-routes.js";
import movieRouter from './routes/movie-routes.js';
import bookingRouter from "./routes/booking-routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);
const mongoUri = `mongodb+srv://admin:${encodeURIComponent(process.env.mongodb_pwd)}@cluster0.jiu5gt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
}); 

mongoose.connect(mongoUri)
.then(() => {
    app.listen(3000, () => {
        console.log("Connected to database.");
    });
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});










