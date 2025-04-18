import { useLocation, useParams } from "react-router";

import { useEffect, useState } from "react";
import { getWorks, WorkDetail } from "../api/openlibraryAPI";

import { useAuth } from "../Context/authContext";
import { BookCardProps } from "../api/favoritesAPI";
function BookDetail() {
  const { id } = useParams();
  const {isLoggedIn,favorites, addFavorite, removeFavorite } = useAuth(); 
  const location = useLocation();
  const book = location.state?.book as BookCardProps | undefined;
  const[work,setWork] = useState<WorkDetail| null>(null);
  useEffect(() => {
    const fetchWork = async () => {
      if (id) {
        try {
          const data = await getWorks(id);
          console.log(data);
          setWork(data);
        } catch (err) {
          console.error("Failed to fetch work details", err);
        }
      }
    };
    
    fetchWork();
  }, [id]);


  const isFavorited = favorites.some((fav) => fav.keyProp === book?.keyProp);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorited) {
      if(book)
      removeFavorite(book.keyProp);
    } else {
      if(book)
      addFavorite(book);
    }
  };
  if (!book) {
    return <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-md"/>
           </div>;
  }
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
  const description =
  typeof work?.description === "string"
    ? work.description
    : work?.description?.value;

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-6 gap-8">
   
    <div className="flex-1 max-w-md space-y-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
      {isLoggedIn && (
                    <button 
                        onClick={toggleFavorite}
                        className="text-red-500 hover:scale-110 transition-transform"
                    >
                        {isFavorited ? "❤️" : "🤍"}
                    </button>
                )}
      <img
        className="object-contain  w-full"
        src={coverUrl}
        onError={(e) => {
          e.currentTarget.src = "/no_cover.jpg";
        }}
        alt={book.title}
      />

      <p><span className="font-semibold">Authors:</span> {book.authors.map((a) => a.name).join(", ")}</p>
      <p><span className="font-semibold">Published:</span> {book.published}</p>
    </div>

    
    {work && (
      <div className="flex-1 mt-20 space-y-6">
        {description && (
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-700">{description}</p>
          </div>
        )}

        {work.subjects && work.subjects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">Subjects</h2>
            <div className="flex flex-wrap gap-2">
              {work.subjects.map((subject) => (
                <span key={subject} className="badge badge-outline">{subject}</span>
              ))}
            </div>
          </div>
        )}

        {work.subject_people && work.subject_people.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">Notable People</h2>
            <p>{work.subject_people.join(", ")}</p>
          </div>
        )}
      </div>
    )}
  </div>
  );

};

export default BookDetail;