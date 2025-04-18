import mongoose from 'mongoose';


const favoriteBookSchema = new mongoose.Schema<FavoriteBook>({
    isbn: Number,
    title: String,
    keyProp: String,
    authors: [{ name: String }],
    published: Number,
  }, { _id: false });
export interface FavoriteBook {
    isbn: number;
    title: string;
    keyProp: string;
    authors: { name: string }[];
    published: number;
  }

export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    favorites: FavoriteBook[];
  
  }
  const userSchema = new mongoose.Schema<UserDocument>({
username: {
    type:String,
    required: true,
    unique: true,
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type:String,
    required:true,

},
favorites: [favoriteBookSchema]

});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
