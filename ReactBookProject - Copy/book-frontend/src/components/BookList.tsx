import BookCard from "./bookCard";

function BookList({works}: { works: any[]}) {
    
    const validBooks = works
    .filter((work) => work.availability?.isbn)
    .map((work) => ({
        isbn: parseInt(work.availability.isbn),
        title: work.title,
        key: work.key,
        authors: work.authors.map((a: any)=> ({name: a.name})),
        published: work.first_publish_year
        ,
    }));
    
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-2x mb-5">
        {validBooks.map((book) => (
            <BookCard
                key={book.isbn}
                isbn={book.isbn}
                title={book.title}
                authors={book.authors}
                published={book.published}
                keyProp={book.key}
            />
        ))}
        </div>
    );
}
export default BookList;