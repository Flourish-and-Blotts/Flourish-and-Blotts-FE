/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import BookCard, { Book } from "../components/BookCards"
import { useDataSWR } from "../service/apiService"
import { Search } from "lucide-react";
import { useState } from "react";
import ChatBot from '@sky_thien_vo/my-chatbot-ui';

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { data: rawBooks = [], error } = useDataSWR("/getAllProduct", {searchText: searchQuery, page:currentPage, limit:10 });
  const books = rawBooks.map((book: Book) => ({
    id: book.id,
    title: book.title,  // Assuming 'name' is the title
    author: book.authorName || "Unknown", // Handle missing values
    price: book.price || 0,
    imageUrl: book.imageUrl
  }));

  return (<div className="min-h-screen flex flex-col w-full">
    <main className="flex flex-col text-center py-12 px-4 justify-between items-center">
      <h2 className="text-3xl font-bold">Get Enchanted Books!</h2>
      <p className="text-gray-600 mt-2">Time to learn. Enrich your life with the magic of books.</p>
      <div className="flex items-center border border-gray-400 rounded-[100px] p-2 w-full max-w-md bg-white shadow-md mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-1 px-3 py-1 text-gray-800 focus:outline-none"
        />
        <button className="!bg-white !items-center !justify-center !p-2 !rounded-[100px] hover:!bg-[#191970] hover:text-white" onClick={(e) => setSearchQuery((query))}>
          <Search className="w-5 h-5 "/>
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