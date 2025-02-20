/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { ShoppingCartIcon, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Book } from "../components/BookCards";
import { getAPI } from "../service/apiService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../configure/cardContext";

const ProductDetail = () => {
    const { id } = useParams();  // Get the dynamic parameter (id) from the URL
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState<Book>();
    const cart = useCart();

    const getBookDetail = async () => {
        try {
            const response = await getAPI(`/product/${id}`);
            setItem(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBookDetail();
    }, [])

    const handleAddCard = () => {
        if (item) {
            cart.addToCart({ ...item, quantity: quantity ?? 1 })
        }
    }

    return (
        <div className="min-h-screen flex flex-col w-full">
            <main className="p-6 flex gap-6 text-gray-600">
                {/* Left Side: Image Carousel */}
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center w-[60%]">
                        <img
                            src={item?.imageUrl}
                            alt="Product"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    {/* Thumbnail Navigation (Placeholder) */}
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <button className="text-gray-600"><ChevronLeft /></button>
                        <img
                            src={item?.imageUrl}
                            alt="Thumbnail"
                            className="w-12 h-12 border rounded-md"
                        />
                        <button className="text-gray-600"><ChevronRight /></button>
                    </div>
                </div>

                {/* Right Side: Product Details */}
                <div className="flex flex-col bg-white p-4 shadow-lg rounded-lg w-[40%] max-h-96">
                    {/* Back Button */}
                    <Link to='/' className="flex items-center gap-2 text-purple-600 border border-purple-600 px-4 py-2 rounded-lg mb-4">
                        <ArrowLeft />
                        Back To All Products
                    </Link>

                    {/* Product Info */}
                    <h2 className="text-2xl font-bold ">{item?.title}</h2>
                    <p className="text-gray-600 mt-2">{item?.description}</p>
                    <p className="text-xl font-semibold mt-4">${item?.price}</p>

                    {/* Quantity & Size Select */}
                    <div className="flex items-center gap-4 mt-4 ">
                        <div>
                            <label className="text-gray-600 mr-2">Qty.</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                className="border p-2 w-16 rounded-md text-center"
                            />
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="mt-6 bg-[#191970] text-white flex items-center justify-center gap-2 w-full py-3 rounded-lg text-lg hover:bg-[#E6E6FA] hover:text-black"
                        onClick={(_e) => handleAddCard()}>
                        Add To Cart <ShoppingCartIcon />
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;
