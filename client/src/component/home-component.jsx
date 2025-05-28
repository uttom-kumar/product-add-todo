import React, { useState, useRef } from 'react';
import { RiCloseLargeLine } from "react-icons/ri";
import ProductList from "./ProductList.jsx";
import toast from "react-hot-toast";

const HomeComponent = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState('');
    const [products, setProducts] = useState([]);

    const fileInputRef = useRef(null);

    const generateCode = Math.floor(100000 + Math.random() * 900000);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            setErrors('Title is required');
        } else if (!category) {
            setErrors('Category is required');
        } else if (!image) {
            setErrors('Image is required');
        } else {
            setErrors('');
            setProducts([...products, { title, category, image:imagePreview , code:generateCode}]);
            setTitle('');
            setCategory('');
            setImage('');
            setImagePreview('');
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            toast.success('Product added successfully');
        }
    };



    const imagePreviewHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImagePreview = () => {
        setImage('');
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <div className="container mx-auto py-5 px-4">
            <form onSubmit={handleSubmit} className="w-full sm:w-[500px] mx-auto p-5 shadow-md rounded space-y-5 bg-white">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter product title"
                        className="w-full px-4 py-2 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full cursor-pointer px-4 py-2 border outline-none border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="tshirt">T-Shirt</option>
                        <option value="shirt">Shirt</option>
                        <option value="pant">Pant</option>
                        <option value="men_dress">Men Dress</option>
                        <option value="women_dress">Women Dress</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={imagePreviewHandler}
                        className="w-full cursor-pointer px-4 py-2 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {imagePreview && (
                        <div className="relative mt-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="aspect-video object-contain border border-gray-300 rounded-lg shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={removeImagePreview}
                                className=" cursor-pointer absolute top-0 right-0 mt-2 mr-2 text-red-500"
                            >
                                <RiCloseLargeLine size={20} />
                            </button>
                        </div>
                    )}
                </div>
                {errors && (
                    <div className="text-red-500 text-sm font-medium">{errors}</div>
                )}
                <div>
                    <button
                        type="submit"
                        className="cursor-pointer w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        Add Product
                    </button>
                </div>
            </form>

            <div className={"mt-5"}>
                <ProductList products={products} />
            </div>
        </div>
    );
};

export default HomeComponent;
