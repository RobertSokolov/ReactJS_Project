import { useAuth } from "../Context/authContext";
import { useEffect, useState } from "react";

import SearchBar from "../components/Searchbar";
import { BookCardProps } from "../api/favoritesAPI";
import FavoriteBookList from "../components/FavoriteBookList";

function FavoritePage() {
  const { isLoggedIn, favorites } = useAuth();
  const [filteredBooks, setFilteredBooks] = useState<BookCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isLoggedIn && favorites) {
      setFilteredBooks(favorites);
      
    }
  }, [isLoggedIn, favorites]);

  // Filter favorites based on title or ISBN
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    console.log("Search query:", query);
    console.log("Favorites before filter:", favorites);
  
    const result = favorites.filter((book) => {
      const titleMatch = book?.title?.toLowerCase().includes(query);
      const isbnMatch = book?.isbn?.toString().includes(query);
      return titleMatch || isbnMatch;
    });
  
    console.log("Filtered results:", result);
    setFilteredBooks(result);
  }, [searchQuery, favorites]);

  return (
    <div className="flex flex-col flex-wrap justify-center">
      <div className="flex justify-center mb-5">
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {filteredBooks.length > 0 ? (
        <FavoriteBookList books={filteredBooks} />
      ) : (
        <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner loading-md"/>
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
