import SearchBar from "../components/Searchbar";
import SubjectList from "../components/subjects";
import { GetSubjectWorks } from "../api/openlibraryAPI";
import { useEffect, useState } from "react";
import BookList from "../components/BookList";

function Home() {
  const [Books, setBooks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Film");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    GetSubjectWorks(selectedSubject, 200, 0).then((data) => {
      setBooks(data.works || []);
    });
  }, [selectedSubject]);

  const handleSubjectSelection = (subject: string) => {
    setSelectedSubject(subject);
  };
  // Filter books by title and ISBN
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredBooks = Books.filter((book: any) => {
    const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isbnMatch = book.availability?.isbn?.includes(searchQuery);
    return titleMatch || isbnMatch;
  });

  return (
    <>


      <div className="flex flex-col  flex-wrap justify-center">
        <div className=" flex justify-center mb-5">
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <SubjectList
          defaultSubject={selectedSubject}
          onSelect={handleSubjectSelection}
        />
        {filteredBooks.length > 0 ? (
          <BookList works={filteredBooks} />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner loading-md"/>
            </div>
        )
        }
      </div>






    </>
  )


}

export default Home;