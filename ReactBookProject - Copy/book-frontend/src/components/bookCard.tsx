import { Link } from "react-router";
import { useAuth } from "../Context/authContext";
interface bookCardProps{
    isbn:number;
    title: string;
    keyProp: string;
    authors: {name: string}[];
    published: number;

}   


function BookCard({isbn, title, keyProp, authors, published }: bookCardProps) {
    const {isLoggedIn,favorites, addFavorite, removeFavorite } = useAuth(); 
    
    const book = { isbn, title, keyProp, authors, published };
    const workId = keyProp.replace("/works/", "");    
    const isFavorited = favorites.some(fav => fav.keyProp === keyProp); 

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorited) {
            removeFavorite(keyProp);
        } else {
            addFavorite(book);
        }
    };
    return (
        <>
         <Link to={`/book/${workId}`} state={{ book }} className="w-96 no-underline text-inherit">
            <div className="card bg-base-100 w-96 h-[600px] flex flex-col shadow-2xl">
            {isLoggedIn && (
                    <button 
                        onClick={toggleFavorite}
                        className="absolute top-2 right-2 z-10 text-red-500 hover:scale-110 transition-transform"
                    >
                        {isFavorited ? "❤️" : "🤍"}
                    </button>
                )}
                <figure className="h-[60%] overflow-hidden flex items-center justify-center bg-gray-100">
                    <img  
                    className="object-contain h-full" 
                    src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}
                    onError={(e) => {
                        e.currentTarget.src = "/no-cover.jpg"; 
                      }}
                    alt={title}
                    />
                </figure>
                <div className="card-body flex-1 overflow-hidden">
                    
                    <h2 className="card-title">{title}</h2>
                    <h3 className="text-sm">ISBN: {isbn}</h3>
                    <p className="text-sm">By: {authors.map((a) => a.name).join(", ")}</p>
                    <p className="text-sm text-gray-600">Published: {published}</p>
                </div>
            </div>
         </Link>
        </>
    )
};

export default BookCard;