import express from "express";
import { signup } from "../controller/authController.js";

const accountRouter=express.Router();

accountRouter.get("/",(req,res)=>{
    res.status(201).json({
        message:"Account Router Working"
    })
});
accountRouter.post("/signup",signup);

export default accountRouter;