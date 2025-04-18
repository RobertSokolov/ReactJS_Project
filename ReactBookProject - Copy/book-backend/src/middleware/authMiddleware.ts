import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomRequest from "../types/CustomRequest";
import User from "../models/User";

export const authMiddleware = async (req:CustomRequest, res:Response, next: NextFunction) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token)
    {
         res.status(401).json({message: "UnAauthorized"});
         return;
    }

    try{
        const validity = jwt.verify(token, process.env.JWT_SECRET || "null") as JwtPayload;
        
        const user = await User.findById(validity.id);
        if (!user){
            res.status(404).json({ message: 'User not found' });
            console.log('User not found' )
            return;
        } 
        console.log('User Found' )
        req.user = user;
        next();
    } catch(err) {
         res.status(400).json({message: "Invalid Token"});
         return;
    }
}