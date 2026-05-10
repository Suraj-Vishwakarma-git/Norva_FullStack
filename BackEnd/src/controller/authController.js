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


export const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password ){
            return res.json({
                message:"All fields are required"
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                message:"User Not Found"
            });
        }
        const cpair=await bcrypt.compare(password,user.password);
        if(!cpair){
            return res.status(401).json({
                message:"Incorrect Password"
            });
        }
        const token=await jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"7d"});
        return res.status(201).json({
            message:"LogedIn Successfully",
            token
        });

    }catch(e){
        return res.status(500).json({
            message:e.message
        });
    }
}