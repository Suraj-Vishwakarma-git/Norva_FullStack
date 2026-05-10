import express from "express";
import { login, signup } from "../controller/authController.js";

const accountRouter=express.Router();

accountRouter.get("/",(req,res)=>{
    res.status(201).json({
        message:"Account Router Working"
    })
});


accountRouter.post("/signup",signup);
accountRouter.post("/login",login);

export default accountRouter;