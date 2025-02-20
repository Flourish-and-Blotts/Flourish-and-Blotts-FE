/* eslint-disable @typescript-eslint/no-unused-vars */
import ThemeToggle from "./ThemeButton";
import Cart from "./ShoppingCart";
import RightDrawer from "./ui/Drawer";
import { useState } from "react";
import { useCart } from "../configure/cardContext";
import { ShoppingCartIcon } from "lucide-react";

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const cart = useCart();

    return (
        <>
            <header className="flex justify-between items-center py-4 px-6 shadow-md bg-[#800020] text-[#FFD700]">
                <h2 className="text-xl font-bold flex items-center">
                    <span className="text-2xl">📚</span> Flourish and Blotts <span className="text-2xl">✨</span>
                </h2>
                <div className="flex flex-row gap-2">
                    <ThemeToggle />
                    <button className="bg-[#228B22] text-2xl text-black flex items-center gap-1 pl-2 pr-2" onClick={(_e) => setOpen(true)}><ShoppingCartIcon />
                    <span className="border items-center justify-center border-gray-200 rounded-[100px] h-5 w-5 text-xs font-normal bg-blue-700 text-amber-300">{cart.cart.length}</span>
                    </button>
                </div>

            </header>
            <RightDrawer openTrigger={open} setOpenTrigger={setOpen}>
                <Cart />
            </RightDrawer>
        </>
    )
};

export default Header;