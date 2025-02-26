/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import ProductModal from "../../components/modal/ProductModal";
import { Book, Author } from '../../models/interfaces';
import { deleteAPI, postAPI, putAPI, useDataSWR } from "../../service/apiService";
import Pagination from "../../components/ui/Pagination";
import Alert from "../../components/ui/Alert";

interface ProductPage {
  searchText?: string
}

export const AdminProductPage: React.FC<ProductPage> = ({ searchText }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Book>();
  const [deleteConfirm, setDeleteConfirm] = useState<Book>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;
  const [products, setProducts] = useState<Book[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);
  const [alert, setAlert] = useState({ message: "Hi, Nice To See You !", type: "success" });

  const handleSave = (product: Book) => {
    if (editProduct) {
      updateProduct(product)
    } else {
      createProduct(product);
    }
  };

  const createProduct = async (product: Book) => {
    try {
      const payload = { ...product, imageUrl: JSON.stringify(product.imageUrl) }
      await postAPI('/admin/product/create', payload);
      setAlert({ message: 'Create Success', type: 'Success' })
    } catch (error) {
      setAlert({ message: 'Create Failed', type: 'Error' })
    } finally {
      setModalOpen(false);
      mutate();
    }
  }

  const updateProduct = async (product: Book) => {
    try {
      const payload = { ...product, imageUrl: JSON.stringify(product.imageUrl) }
      await putAPI(`/admin/product/${editProduct?.id}`, payload);
      setAlert({ message: 'Update Success', type: 'Success' })
    } catch (error) {
      setAlert({ message: 'Update Failed', type: 'Error' })
    } finally {
      setModalOpen(false);
      mutate();
    }
  }

  const deleteProduct = async (product: Book) => {
    try {
      await deleteAPI(`/admin/product/${product.id}`);
      setAlert({ message: 'Delete Success', type: 'Success' })
    } catch (error) {
      setAlert({ message: 'Delete Failed', type: 'Error' })
    } finally {
      setModalOpen(false);
      mutate();
    }
  }

  const { data, mutate } = useDataSWR("/getAllProduct", { searchText: searchText, page: currentPage, limit});
  const { data: authorData } = useDataSWR("/admin/author/getAll", {});

  const mapProducts = (rawBooks: any[]): Book[] => {
    return rawBooks.map((book: any) => ({
      id: book?.id,
      imageUrl: JSON.parse(book?.imageUrl),
      title: book?.title,
      description: book?.description,
      price: book?.price,
      authorId: book?.authorId,
      authorName: book?.Author?.name
    } as Book)) as Book[];
  }


  useEffect(() => {
    if (data) {
      setProducts(mapProducts(data.data))
      setTotalPage(data.totalPage)
    }

  }, [data])

  useEffect(() => {
    if (authorData) {
      setAuthor(authorData?.data)
    }
  }, [authorData])

  const handleDelete = () => {
    if (deleteConfirm) {
      setDeleteConfirm(undefined);
      deleteProduct(deleteConfirm);
    }
  };

  return (
    <div className="p-6 w-full dark:text-white">
      <div className="mb-2">
        {alert.message && (
          <Alert message={alert.message} type={alert.type as any} onClose={() => setAlert({ message: "", type: "success" })} />
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => { setEditProduct(undefined); setModalOpen(true); }}>Add Product</button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">No.</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Book, index) => (
            <tr key={product.id} className="text-center">
              <td className="border p-2">{(currentPage - 1) * limit + index + 1}</td>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.authorName}</td>
              <td className="border p-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => { setEditProduct(product); setModalOpen(true); }}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setDeleteConfirm(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full justify-center items-center flex mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={(page) => setCurrentPage(page)} />
      </div>

      {modalOpen && (
        <ProductModal editProduct={editProduct} onSubmit={handleSave} onClose={() => setModalOpen(false)} author={author} />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?</p>
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

export default AdminProductPage;