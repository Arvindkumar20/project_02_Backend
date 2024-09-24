import express from "express";
import fs from 'fs'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import "dotenv/config"
// import cors from "cors";

// fies import 
import placesRoutes from "./routes/places-route.js";
import userRoutes from "./routes/users-route.js";
import HttpError from "./models/http-error.js";

// variables 
const port = process.env.PORT||4000;
const app = express();
// middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use('/uploads/images',express.static(path.join('uploads', 'images')));
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
next();
});

// routes
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req,res,next)=>{
    const error=new HttpError("Could not find this route",404);
throw error;
});
app.use((error, req, res, next) => {
    if(req.file){
fs.unlink( req.file.path,(err)=>{
    console.log(err)
})
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured!" })
});

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    
    })
}).catch((err)=>{
    console.log("server get offline " +err);
})