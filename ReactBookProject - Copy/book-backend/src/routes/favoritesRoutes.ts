import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import User, { FavoriteBook } from '../models/User';
import CustomRequest from '../types/CustomRequest';

const router = express.Router();

router.post("/", authMiddleware, async (req, res): Promise<any> => {
    const book = req.body.book as FavoriteBook;
    const userReq = req as CustomRequest;
    console.log(book)
    
    const user = await User.findById(userReq.user?._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyExists = user.favorites.some(fav => fav.keyProp === book.keyProp);
  if (!alreadyExists) {
    user.favorites.push(book);
    await user.save();
  }
    res.json({ favorites: user.favorites });
});

router.delete("/", authMiddleware, async (req, res): Promise<any> => {
    const { keyProp } = req.body;
    const userReq = req as CustomRequest;
  
    const user = await User.findById(userReq.user?._id);
    if (!user) return res.status(404).json({ message: "User not found" });
  
    user.favorites = user.favorites.filter(book => book.keyProp !== keyProp);
    await user.save();

    res.json({ favorites: user.favorites });
});

  

  router.get("/", authMiddleware, async (req, res): Promise<any> => {
    const userReq = req as CustomRequest;
  
    const user = await User.findById(userReq.user?._id);
    if (!user) return res.status(404).json({ message: "User not found" });
  
    res.json({ favorites: user.favorites });
  });
  export default router;