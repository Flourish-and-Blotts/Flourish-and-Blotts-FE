/* eslint-disable @typescript-eslint/no-unused-vars */
import ThemeToggle from "./ui/ThemeButton";
import Cart, { Order } from "./ShoppingCart";
import RightDrawer from "./ui/Drawer";
import { useState } from "react";
import { SavedBook, useCart } from "../configure/cardContext";
import { ShoppingCartIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../service/apiService";
import swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";
import { ROUTER_PATH } from "../configure/routerPath";

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const cart = useCart();
    const name = localStorage.getItem('username') ?? '';
    const token = localStorage.getItem('authToken') ?? '';
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        navigate('/login')
    }
    const handleOrder = async (order: Order) => {
        try {
            const products = order?.item.map((t: SavedBook) => ({ productId: t.id, quantity: t.quantity }))
            const payload = {
                products: products,
                location: order.location
            }
            await postAPI('/order', payload)
            swal('Success', 'Your Order Placed', 'success')
            cart.clearCart()
        } catch (error) {
            swal('Failed', 'Your Order Failed', 'error')
        }
    }

    return (
        <>
            <header className="flex justify-between items-center py-4 px-6 shadow-md bg-[#800020] text-[#FFD700]">
                <h2 className="text-xl font-bold flex items-center cursor-pointer" onClick={(_e) => navigate(ROUTER_PATH.HOME)}>
                    <span className="text-2xl">📚</span> Flourish and Blotts <span className="text-2xl">✨</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                    <ThemeToggle />
                    <button className="bg-[#228B22] text-2xl text-black flex items-center gap-1 pl-2 pr-2" onClick={(_e) => setOpen(true)}><ShoppingCartIcon />
                        <span className="border items-center justify-center border-gray-200 rounded-[100px] h-5 w-5 text-xs font-normal bg-blue-700 text-amber-300">{cart.cart.length}</span>
                    </button>
                    <div className="relative">
                        {token ? (
                            <>
                                <button
                                    className="bg-white text-2xl text-black flex items-center gap-2 px-4 py-2 border rounded-md shadow-md"
                                    onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <span>{name}</span>
                                    {!isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-700 rounded-md shadow-lg z-10">
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black" onClick={() => navigate('/myOrder')}>
                                                My Orders
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black" onClick={handleLogOut}>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}</>) : (
                            <button className="bg-blue-800 text-white text-center p-2" onClick={handleLogOut}>Login</button>
                        )}

                    </div>

                </div>

            </header>
            <RightDrawer openTrigger={open} setOpenTrigger={setOpen}>
                <Cart order={handleOrder} isNotOrderAble={!token} />
            </RightDrawer>
        </>
    )
};

export default Header;