/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { deleteAPI, useDataSWR } from "../../service/apiService";
import Pagination from "../../components/ui/Pagination";
import Alert from "../../components/ui/Alert";
import OrderCard from "../../components/OrderCard";
import { Order } from "../../components/ShoppingCart";

interface ProductPage {
  searchText?: string
}

export const OrderPage: React.FC<ProductPage> = ({ searchText }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Order>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;
  const [orders, setOrder] = useState<Order[]>([]);
  const [alert, setAlert] = useState({ message: "Hi, Nice To See You !", type: "success" });


  const deleteProduct = async (order: Order) => {
    try {
      await deleteAPI(`/order/${order.id}`);
      setAlert({ message: 'Delete Success', type: 'Success' })
    } catch (error) {
      setAlert({ message: 'Delete Failed', type: 'Error' })
    } finally {
      setDeleteConfirm(undefined)
      mutate();
    }
  }

  const { data, error, isLoading, mutate } = useDataSWR("/order", { page: currentPage, limit });

  const mapOrder = (rawData: any[]): Order[] => {
    return rawData?.map((order: any) => {
      const products = order?.Products?.map((t: any) => ({
        ...t,
        authorName: t.Author?.name,
        imageUrl: JSON.parse(t.imageUrl),
        quantity: t.OrderProduct?.quantity
      })) || []; // Ensure products is always an array

      return {
        id: order?.id,
        location: order?.location,
        totalPrice: order?.totalPrice,
        item: products // Correct property name
      };
    }) as Order[];
  }


  useEffect(() => {
    if (data) {
      setOrder(mapOrder(data.data))
      setTotalPage(data.totalPage)
    }

  }, [data])

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteProduct(deleteConfirm);
    }
  };

  return (
    <div className="p-6 w-full dark:text-white min-h-screen">
      <div className="mb-2">
        {alert.message && (
          <Alert message={alert.message} type={alert.type as any} onClose={() => setAlert({ message: "", type: "success" })} />
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Order Management</h2>
      </div>
      <div className="w-full justify-center flex items-center ">
        <div className="flex flex-col gap-4 w-full xl:w-[80%] items-end text-lg">
          {orders.map((product: Order, index) => (
            <OrderCard order={product} onCancelOrder={(order: Order) => setDeleteConfirm(order)}/>
          ))}
        </div>
      </div>

      <div className="w-full justify-center items-center flex mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={(page) => setCurrentPage(page)} />
      </div>

      {modalOpen && (
        // <ProductModal editProduct={editProduct} onSubmit={handleSave} onClose={() => setModalOpen(false)} author={author} />
        <></>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to delete <strong>{deleteConfirm.id}</strong>?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setDeleteConfirm(undefined)}>Cancel</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;