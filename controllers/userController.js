import { validationResult } from "express-validator";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import "dotenv/config";
import HttpError from "../models/http-error.js"
import { User } from "../models/user-model.js";
export const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, "-password");
    } catch (error) {
        const err = new HttpError(error, 500);
        return next(err);
    }
    if (!users || users.length === 0) {
        const err = new HttpError("No users found", 404);
        return next(err);
    }
    return res.status(200).json({
        users: users,
        // message: "users get"
    })
}

export const signup = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError(error.array()[0].msg, 400));
    }
    const { name, email, password, address, image } = req.body;
    let user;
    try {
        user = await User.findOne({ email: email });
    } catch (error) {
        const err = new HttpError("couldn't signup please try again  " + error, 500)
        return next(err)
    }
    if (user) {
        const error = new HttpError("user already exist please login", 422);
        return next(error);
    }
    // const hashedPassword=await bcrypt.hash(password,10);/
    const createdUesr = new User({
        name: name,
        email: email,
        password: password,
        address: address,
        image: image,
        places: []
    });
    try {
        await createdUesr.save();
    } catch (error) {
        const err = new HttpError("singing up failed  " + error, 500);
        return next(err)
    }
    return res.status(201).json({
        user: createdUesr,
        message: "user created"

    })
}

export const login = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError(error.array()[0].msg, 400));
    }
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError(error, 500));
    }
    if (!user || user.password !== password) {
        const error = new HttpError("can't login please check email or password first then try", 500);
        return next(error);

    }
    // const matchPassword=bcrypt.compare(password,user.password);
    // if(!matchPassword){
    //     return next(new HttpError("wrong password or email please try again",401));
    // }
    // const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{
    //     expiresIn:"1d",
    // });
    // return res.cookie("token",token,{
    //     httpOnly:true,
    //     sameSite:'strict',
    //     maxAge:24*60*60*1000          
    // })
    return res.json({
        user: user,
        message: `Welcome back ${user.name}`

    })

}
// export const logout=async(req,res,next)=>{
//     res.clearCookie("token");
//     return res.json({message:"logged out"})
//     }
export const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findByIdAndDelete(userId);
    } catch (error) {
        const err = new HttpError(error, 500);
        return next(err);
    }
    if (!user) {
        const error = new HttpError("user doesn't exist " + user, 422);
        return next(error);
    }
    return res.status(200).json({
        message: "user deleted successfully",

    })

}