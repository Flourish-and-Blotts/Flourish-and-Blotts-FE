/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Order } from "./ShoppingCart";
import { CircleDollarSign } from 'lucide-react'

interface OrderCardProps {
    order: Order;
    onCancelOrder: (order: Order) => void
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onCancelOrder }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 w-full">
            <div className=" border-b border-gray-300 pb-2 flex flex-row items-center gap-2">
                <h3 className="text-lg font-semibold flex justify-start">Order #{order.id}</h3>
                <div className="w-full flex flex-wrap justify-end gap-2">
                    <span className="p-2 bg-yellow-400 text-black flex items-center justify-end rounded-[16px]">
                        <CircleDollarSign  className="mr-2"/> Cash On Delivery</span>
                    <span className="p-2 bg-green-300 flex justify-end rounded-[100px]">Confirmed</span>
                </div>

            </div>
            <p className="text-gray-600 pt-2">Location: {order.location}</p>



            <div className="space-y-4 mt-2">
                {order.item.map((product) => (
                    <div key={product.id} className="flex gap-4 border-b pb-2 overflow-auto">
                        {product?.imageUrl?.length > 0 && (
                            <img
                                src={product.imageUrl[0]}
                                alt={product.title}
                                className="max-w-30 object-cover rounded"
                            />
                        )}
                        <div className="w-[30%]">
                            <h5 className="text-lg font-semibold ">{product.title}</h5>
                            <p className="text-md text-gray-500">{product.authorName}</p>

                        </div>
                        <div className="w-10 items-center justify-center flex text-center">
                            <p className="text-md text-gray-500 font-bold ">X{product.quantity}</p>
                        </div>
                        <div className="flex justify-end w-full pr-10 items-center">
                            <p className="font-medium text-xl text-green-950">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-2 items-center flex flex-row">
                <button className="items-center justify-between border border-gray-300 bg-red-400 p-2 h-full" onClick={(_e) =>onCancelOrder(order)}>Cancel</button>
                <p className="text-gray-800 font-semibold w-full text-right">Total: ${order?.totalPrice}</p>
            </div>

        </div>
    );
};

export default OrderCard;
