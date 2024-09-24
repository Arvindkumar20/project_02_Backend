import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    const { name, email, password, address } = req.body;
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
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);

    } catch (error) {
        const err = new HttpError("error due to pass hashing " + error, 500);
        return next(err);
    }
    const createdUesr = new User({
        name: name,
        email: email,
        password: hashedPassword,
        address: address,
        image: req.file.path,
        places: []
    });
    try {
        await createdUesr.save();
    } catch (error) {
        const err = new HttpError("sing up failed  " + error, 500);
        return next(err)
    }
    let token;
    try {
        token = jwt.sign({ userId: createdUesr.id, email: createdUesr.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    } catch (error) {
        return next(new HttpError("error due to cookie  " + error, 500))
    }
    return res.status(201).json({
        // user:createdUesr,
        userId: createdUesr.id,
        email: createdUesr.email,
        token: token,
        message: "user created"

    });
    // res.status(201).json({user:createdUesr, message: "user created" });
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
    if (!user) {
        const error = new HttpError("can't login please check email  ", 500);
        return next(error);

    }
    let matchPassword;
    try {
        matchPassword = await bcrypt.compare(password, user.password);
    } catch (error) {
        const err = new HttpError('error maching password ' + error, 500);
        return next(err);
    }
    if (!matchPassword) {
        return next(new HttpError("wrong password or email please try again", 403));
    }
    let token;
    try {
        token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
    } catch (error) {
        return next(new HttpError('errordue to generating token ' + error, 500));
    }
    // return res.cookie("token", token, {
    //     httpOnly: true,
    //     sameSite: 'strict',
    //     maxAge: 24 * 60 * 60 * 1000
    // })
    return res.json({
        // user:user,
        userId: user.id,
        email:user.email,
        token: token,
        message: `Welcome back ${user.name}`

    });

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