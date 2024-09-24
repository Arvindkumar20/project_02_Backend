import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";
import 'dotenv/config';
export const checkAuth = (req, res, next) => {
    if(req.method==='OPTIONS') {
         return next()
        };
    try {

    const token = req.headers.authorization.split(' ')[1];//Authorization 'Bearer TOKEN
    if (!token) {
        throw new Error('authentication failed', 403);
    }
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    req.userData={userId:decoded.userId};
    next();
    } catch (error) {
        const err = new HttpError('authentication failed ' +error, 403);
        return next(err); 
    }}