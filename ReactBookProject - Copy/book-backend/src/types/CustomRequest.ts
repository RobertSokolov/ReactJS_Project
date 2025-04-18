
import { Request } from "express";
import { UserDocument } from "../models/User";

interface AuthRequest extends Request {
    user?: UserDocument | null;
}

export default AuthRequest  