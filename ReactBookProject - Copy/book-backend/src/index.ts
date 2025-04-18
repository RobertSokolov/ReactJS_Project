import express,{Response} from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import  { authMiddleware } from "./middleware/authMiddleware";
import path from "path";
import authRoutes from './routes/authRoutes';
import favoritesRoutes from './routes/favoritesRoutes';
import openlibraryRoutes from './routes/openlibraryRoutes';
dotenv.config({ path: path.resolve(__dirname, "../.env")});

const app = express();
const PORT = 3000;

// Middleware 
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_STRING || "null")
        .then(() => {
            console.log("Connnected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:",err);
        });


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/openlibrary",openlibraryRoutes)
app.use("/api/favorites",favoritesRoutes)

app.listen(PORT,()=> {
    console.log(`Server Started at port: ${PORT}` )
});