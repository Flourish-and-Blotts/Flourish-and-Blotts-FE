import { useCart } from "../configure/cardContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

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
            </tbody>
          </table>
          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;