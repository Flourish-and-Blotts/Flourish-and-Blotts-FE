/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { ShoppingCartIcon, ArrowLeft } from "lucide-react";
import { Book } from "../../components/BookCards";
import { getAPI } from "../../service/apiService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../../configure/cardContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const ProductDetail = () => {
    const { id } = useParams();  // Get the dynamic parameter (id) from the URL
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState<Book>();
    const cart = useCart();

    const getBookDetail = async () => {
        try {
            const response = await getAPI(`/product/${id}`);
            setItem({...response.data, imageUrl: JSON.parse(response.data.imageUrl) });
            console.log({...response.data, imageUrl: JSON.parse(response.data.imageUrl) })
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
            <main className="p-6 flex flex-wrap gap-6 text-gray-600 items-center justify-center">
                {/* Left Side: Image Carousel */}
                <div className="flex flex-col items-center justify-center w-full bg-white shadow-md rounded-[16px] p-4 xl:w-[40%]">
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="text-black items-center w-full"
                    >
                        {item?.imageUrl?.map((url, index) => (
                            url && <SwiperSlide>
                                <div className="flex items-center justify-center pb-10">
                                    <img key={index} src={url} className="w-full object-contain max-h-80 lg:max-h-96" alt={`Preview ${index}`}/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Side: Product Details */}
                <div className="flex flex-col bg-white p-4 shadow-lg rounded-lg w-full max-h-96 xl:w-[40%]">
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
