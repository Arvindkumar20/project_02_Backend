import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import HttpError from "../models/http-error.js"
import { User } from "../models/user-model.js";
export const getUsers=async(req,res,next)=>{
    let users;

    try {
        users=await User.find();
    } catch (error) {
        return next(new HttpError(error,500))
    }
    if(!users||users.length<=0){
        return next(new HttpError("No users found",404))
    }
    return res.status(200).json({
        users:users.map(user=>user.toObject()),
message:"users get"
    })
}

export const signup=async(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return next(new HttpError(error.array()[0].msg,400));
    }
    const {name,email,password,address}=req.body;
    let user;
    try {
        user=await User.findOne({email});
        console.log(user)
        if (user) {
            return next(new HttpError("user already exist can't  sign up again",422));
        }
    } catch (error) {
        return next(new HttpError(error,422))
    }
    
    const hashedPassword=await bcrypt.hash(password,10);
    try {
        user=await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            address:address

        })
    } catch (error) {
       return next(new HttpError("can't sign in due to  "+error,500)) 
    }
    await user.save();
    if(!user||user===null){
        return next(new HttpError("can't  sign in",500))
    }
    return res.status(201).json({
        user:user.toObject(),
        message:"user created"

    })
}

export const login=async(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return next(new HttpError(error.array()[0].msg,400));
        }
        const {email,password}=req.body;
        let user;
        try {
             user=await User.findOne({email})
        } catch (error) {
           return next(new HttpError(error,500)) 
        }
        if (!user||user===null) {
            return next(new HttpError("can't login please signup first then try",500));

        }
        const matchPassword=bcrypt.compare(password,user.password);
if(!matchPassword){
    return next(new HttpError("wrong password or email please try again",401));
}
const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{
    expiresIn:"1d",
});
        return res.cookie("token",token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:24*60*60*1000          
        }).json({
            user:user,
            message:`Welcome back ${user.name}`

        })

}
export const logout=async(req,res,next)=>{
    res.clearCookie("token");
    return res.json({message:"logged out"})
    }