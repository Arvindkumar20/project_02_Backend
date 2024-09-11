import {v4 as uuid} from 'uuid';
import HttpError from "../models/http-error.js"
const DUMMY_DATA = [{
    id: "u1",
    name: "john Rozzer",
    email:"test@gmail.com",
    password:"wygyvwsgtt223yr23fq"
},{
    id: "u2",
    name: "Rozzer Berom",
     email:"test2@gmail.com",
    password:"wygyvwsgtt223yr23fq"
}]
const getUsers= (req, res, next) => {
  res.json({
    DUMMY_DATA
  })
   next();
}

const signup=(req,res,next)=>{
    const {name,email,password}=req.body;
    const hasUser=DUMMY_DATA.find(u=>u.email===email);
    if(hasUser){
        throw new HttpError('Email already exists',422)
        }
    const createdUser={
        id:uuid(),
        name,
        email,
        password
    }
    DUMMY_DATA.push(createdUser);
    res.status(201).json({
        createdUser
    })

}
const login=(req,res,next)=>{
    const {email,password}=req.body;
    const veryfiedEmail=DUMMY_DATA.find(user=>user.email===email);
    if(!veryfiedEmail||veryfiedEmail.password!==password){
       throw new HttpError("your email or password incorrect",401)
    }
   res.json({
    message:"logged in"
   })
}

export {
    getUsers,
    signup,
    login
}