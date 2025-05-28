import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";

const ProductList = ({ products }) => {
    const [category, setCategory] = useState('');
    const [productList, setProductList] = useState(products);


    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const deleteProduct = (id) => {
        const updatedList = productList.filter((product) => product.id !== id);
        setProductList(updatedList);
        toast.success('Product deleted successfully');
    };

    const filteredProducts = category
        ? productList.filter((product) => product.category === category)
        : productList;


    useEffect(() => {
        if (products && Array.isArray(products)) {
            setProductList(products);
        }
    }, [products]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product List</h2>

            <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="cursor-pointer w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="tshirt">T-Shirt</option>
                    <option value="shirt">Shirt</option>
                    <option value="pant">Pant</option>
                    <option value="men_dress">Men Dress</option>
                    <option value="women_dress">Women Dress</option>
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-gray-500 text-sm">No products found for this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-4 h-full"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full cursor-pointer h-48 object-contain rounded-md mb-4"
                            />
                            <h3 className="text-sm cursor-pointer text-gray-900 mb-1">{product.title}</h3>
                            <p className="text-sm px-3 bg-blue-500 rounded text-white capitalize absolute top-2 right-3">{product.category}</p>
                            <div className="absolute bottom-2 right-3">
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className='cursor-pointer px-2 rounded text-white bg-red-500'>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
