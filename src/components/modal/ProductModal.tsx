/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Book, Author } from '../../models/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

interface ProductFormProps {
  editProduct?: Book; // Replace `any` with a proper type
  author?: Author[]; // Replace `any` with a proper type
  onClose: () => void;
  onSubmit: (productData: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ editProduct, onClose, onSubmit, author }) => {
  const [imageUrls, setImageUrls] = useState<string[]>(editProduct?.imageUrl || [""]);

  const handleImageChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    // Convert FormData to an object
    const productData = {
      title: formData.get("title"),
      price: formData.get("price"),
      authorId: formData.get("authorId"),
      description: formData.get("description"),
      imageUrl: imageUrls, // Store multiple image URLs
    };

    onSubmit(productData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
      <div className="bg-white p-6 rounded shadow-md w-1/3 max-h-screen overflow-auto">
        <h2 className="text-lg font-bold mb-4">{editProduct ? "Edit Product" : "Add Product"}</h2>

        {/* Image Previews */}
        <div className="flex gap-2 overflow-x-auto p-2">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="text-black items-center"
          >
            {imageUrls.map((url, index) => (
              url && <SwiperSlide>
                <div className="flex items-center justify-center pb-10">
                  <img key={index} src={url} className="max-w-44" alt={`Preview ${index}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        <form onSubmit={handleSubmitForm}>
          <input className="w-full border p-2 mb-2" type="text" name="title" placeholder="Title" defaultValue={editProduct?.title} required />
          <input className="w-full border p-2 mb-2" type="number" name="price" placeholder="Price" defaultValue={editProduct?.price} required />
          <select className="w-full border p-2 mb-2" name="authorId" defaultValue={editProduct?.authorId} required>
            {author?.map((t: Author) =>
              (<option value={t.id}>{t.name}</option>)
            )}
          </select>
          <input className="w-full border p-2 mb-2" type="text" name="description" placeholder="Description" defaultValue={editProduct?.description} />

          {/* Multiple Image URL Inputs */}
          {imageUrls.map((url, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                className="w-full border p-2"
                type="text"
                placeholder="Image URL"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              <button type="button" className="ml-2 bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeImageField(index)}>
                ✕
              </button>
            </div>
          ))}

          {/* Add more image fields */}
          <button type="button" className="w-full bg-gray-300 text-black p-2 rounded mb-2" onClick={addImageField}>
            + Add Image URL
          </button>

          <div className="flex justify-end mt-4">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
