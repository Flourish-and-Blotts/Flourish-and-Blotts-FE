/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import BookCard, { Book } from "../../components/BookCards"
import { useDataSWR } from "../../service/apiService"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import ChatBot from '@sky_thien_vo/my-chatbot-ui';

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);

  const { data, error } = useDataSWR("/getAllProduct", {searchText: searchQuery, page:currentPage, limit:10 });

const mapProducts = (rawBooks: any[]): Book[] => {
    console.log(rawBooks)
    return rawBooks.map((book: any) => ({
      id: book?.id,
      imageUrl: JSON.parse(book?.imageUrl),
      title: book?.title,
      description: book?.description,
      price: book?.price,
      authorId: book?.authorId,
      authorName: book?.Author?.name
    } as Book)) as Book[];
  }

    useEffect(() => {
      if (data) {
        setBooks(mapProducts(data.data))
        setTotalPage(data.totalPage)
      }
  
    }, [data])

  return (<div className="min-h-screen flex flex-col w-full">
    <main className="flex flex-col text-center py-12 px-4 justify-between items-center">
      <h2 className="text-3xl font-bold">Get Enchanted Books!</h2>
      <p className="text-gray-600 mt-2 dark:text-yellow-400">Time to learn. Enrich your life with the magic of books.</p>
      <div className="flex items-center border border-gray-400 rounded-[100px] p-2 w-full max-w-md bg-white shadow-md mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-1 px-3 py-1 text-gray-800 focus:outline-none"
        />
        <button className="!bg-white !items-center !justify-center !p-2 !rounded-[100px] hover:!bg-[#191970] hover:text-white" onClick={(e) => setSearchQuery((query))}>
          <Search className="w-5 h-5 text-[#333333]"/>
        </button>

      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {books.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
    <div>
          <ChatBot/>
    </div>
  </div>)
}

export default HomePage