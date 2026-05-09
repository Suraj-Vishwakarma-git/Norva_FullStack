import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET="NorvaNewWebSite";


export const signup=async (req,res)=>{
   try{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({
   message: "All fields are required"
   });
    }
    if(!/\S+@\S+\.\S+/.test(email)){
       return res.status(400).json({
            message:"Invalid Email"
        });
    }
    const isExists=await User.findOne({email});
    if(isExists){
       return res.status(400).json({
            message:"Account Already Exists"
        });
    }
    const hashed=await bcrypt.hash(password,10);
    const user=await User.create({
        name,
        email,
        password:hashed
    });
   const token=await jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"7d"});
   return res.status(201).json({
        message:"Signup successfully",
        name,
        email,
        token
    });
   }catch(e){
      return res.status(500).json({
      message: "Internal Server Error"
    });
   }
}