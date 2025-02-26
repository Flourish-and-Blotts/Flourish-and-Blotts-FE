/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { SavedBook, useCart } from "../configure/cardContext";

export interface Order {
  item: SavedBook[]
  location: string,
  totalPrice?: number,
  id?: string
}
interface CartProps {
  order: (order: Order) => void,
  isNotOrderAble?: boolean
}

const Cart: React.FC<CartProps> = ({ order, isNotOrderAble = false }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [location, setLocation] = useState('');

  return (
    <div className="p-6 text-black">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Book Title</th>
                <th className="px-4 py-2 text-left border-b">Price</th>
                <th className="px-4 py-2 text-left border-b">Quantity</th>
                <th className="px-4 py-2 text-left border-b">Total</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((book) => (
                <tr key={book.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{book.title}</td>
                  <td className="px-4 py-2 border-b">${book.price}</td>
                  <td className="px-4 py-2 border-b">{book.quantity}</td>
                  <td className="px-4 py-2 border-b">${(book.price * book.quantity).toFixed(2)}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 "></td>
                <td className="px-4 py-2 "></td>
                <td className="px-4 py-2 "></td>
                <td className="px-4 py-2  font-semibold">Total:</td>
                <td className="px-4 py-2  font-semibold">${cart.map((book) => Number(book.price * book.quantity)).reduce((acc, num) => acc + num, 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Cart
          </button>
          <h2 className="text-2xl font-bold mt-4">Order Details</h2>
          {!isNotOrderAble ?
            <div>
              <div>
                <span>Location: </span>
                <input className="border border-gray-300 p-1 rounded-[8px] mt-2 mb-2" value={location} onChange={(e) => setLocation(e.currentTarget.value)} />
              </div>

              <button
                onClick={(_e) => order({ item: cart, location: location })}
                className="mt-4 px-4 py-2 ml-2 bg-blue-700 text-white rounded hover:bg-black"
                disabled = {cart.length === 0}
              >
                Order
              </button>
            </div>
            : <p className="text-red-400 font-semibold mt-2">Please login to place your order!</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;