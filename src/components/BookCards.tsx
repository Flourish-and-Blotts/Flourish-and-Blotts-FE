/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "../configure/routerPath";

export interface Book {
    id: string,
    imageUrl: string,
    title: string,
    description: string,
    price: number,
    currency: string,
    authorName: string,
}

interface BookCardProp {
    book: Book
}

const BookCard: React.FC<BookCardProp> = ({ book }) => {
    const navigate = useNavigate();
    const handleClick = (id: string) => {
        navigate(ROUTER_PATH.BOOK_DETAIL.replace(':id', id))
    } 

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 text-center">
            <div className="font-semibold w-full justify-end flex">
                <span className="w-14 bg-purple-200 dark:bg-gray-500 dark:text-white ">${book.price}</span>
            </div>
            <img src={book.imageUrl} alt={book.title} className="mx-auto p-4" />
            <div className="p-4 border-t border-gray-200 ">
                <h3 className=" text-gray-600 text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600 text-sm">{book.description}</p>
                <div className="mt-4 font-semibold bg-[#191970] inline-block px-4 py-1 rounded-lg text-white 
            hover:bg-[#E6E6FA] hover:text-black cursor-pointer" onClick={(_e) => handleClick(book.id) }>
                    Get
                </div>

            </div>
        </div>
    )
};

export default BookCard