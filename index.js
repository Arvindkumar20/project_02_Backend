import express from "express";
import bodyParser from "body-parser";


// fies import 
import placesRoutes from "./routes/places-route.js"
import userRoutes from "./routes/users-route.js"

// variables 
const port =3000;
const app = express();

// middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// routes
app.use("/api/places",placesRoutes);
app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code||500);
    res.json({message:error.message||"An unknown error occured!"})
    });

app.use("/api/users",userRoutes);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)

})