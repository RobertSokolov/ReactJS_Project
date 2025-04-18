import { BookCardProps } from "../api/favoritesAPI";
import BookCard from "./bookCard";

function FavoriteBookList({ books }: { books: BookCardProps[] }) {
    
    
    
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-2xl mb-5">
        {books.map((book) => (
          <BookCard
            key={book.keyProp}
            isbn={book.isbn}
            title={book.title}
            authors={book.authors}
            published={book.published}
            keyProp={book.keyProp}
          />
        ))}
      </div>
    );
}
export default FavoriteBookList;