import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    addres:{type:String},
    places:[{type:mongoose.Schema.Types.ObjectId,ref:"Places",required:true}],
})
export const User=mongoose.model('User',userSchema);