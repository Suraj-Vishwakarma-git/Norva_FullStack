import express from "express";
import connectDB from "./config/db.js";
import accountRouter from "./routes/authRoute.js";
const app=express();
app.use(express.json());
connectDB();

app.use("/api/auth",accountRouter);


export default app;