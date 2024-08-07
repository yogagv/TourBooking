import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import tourRoute from "./routes/tour.js"
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/booking.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

const dbConect = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connection Established!");

    }catch(error){

        console.log(error);

    }    

}

app.use(express.json());

app.use(cors({

    origin: function (origin, callback) {
        return callback(null, true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(cookieparser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tour", tourRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

dbConect()
.then(() => {
app.listen(port, ()=>{
    console.log(`Port is running on ${port}`);
})
})
.catch((error)=> {    
    console.log(error)
});