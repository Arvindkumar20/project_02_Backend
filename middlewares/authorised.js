import { jwt } from "jsonwebtoken";
import "dotenv/config";
export const isAuthenticated=async(req,res,next)=>{
try {
    const token=req.cookies?.token;
    if(!token){
        return res.status(401).json({message:"Please login to access this resource"});
    }
    const decoded=await jwt.verify(token,process.env.SECRET_KEY);
    if(!decoded){
        return res.status(401).json({message:"Please login to access this resource"});
    }
    req.id=decoded.userId;
    next();
} catch (error) {
   console.log(error);
}
}
