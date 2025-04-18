import React, { createContext, useContext, useEffect, useState } from "react";
import { addFavorite as apiAddFavorite, removeFavorite as apiRemoveFavorite, BookCardProps, getFavorite } from "../api/favoritesAPI"
type User = {
  id: string;
  username: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  register: (user: User, token: string) => void;
  logout: () => void;
  favorites: BookCardProps[];
  addFavorite: (book: BookCardProps) => void;
  removeFavorite: (keyProp: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<BookCardProps[]>([]);
    useEffect(() => {
     
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
  
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        getFavorite(storedToken)
        .then(data => setFavorites(data.favorites || []))
        .catch(err => console.error("Failed to load favorites", err));
      }
    }, []);
    const addFavorite = async (book: BookCardProps) => {
      if (!token) return;
      try {
        const data = await apiAddFavorite(token, book);
        setFavorites(data.favorites); 
      } catch (err) {
        console.error("Failed to add favorite", err);
      }
    };
    
    const removeFavorite = async (keyProp: string) => {
      if (!token) return;
      try {
        const data = await apiRemoveFavorite(token, keyProp);
        setFavorites(data.favorites); 
      } catch (err) {
        console.error("Failed to remove favorite", err);
      }
    };
    const login = async (user: User, token: string) => {
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      try {
        const data = await getFavorite(token);
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };
  
    const register = login; 
  
    const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          isLoggedIn: !!token,
          login,
          register,
          logout,
          favorites,
          addFavorite,
          removeFavorite
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  
  // eslint-disable-next-line react-refresh/only-export-components
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
  };