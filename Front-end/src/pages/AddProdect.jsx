import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from '../components/Alert/Alert';

const AddProduct  = ({ product, setEditing }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '' });

  const authToken = useSelector((state) => state.UserReducer.authToken);
  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Uncomment and adjust headers if necessary
    // const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` };
  
    try {
      let response;
      if (product) {
        // Update product
        response = await axios.put(`/api/products/${product._id}`, formData, {headers:{token:authToken}},
        );
      } else {
        // Add new product
        response = await axios.post('http://localhost:3000/api/product/add', formData, 
          {headers:{token:authToken}},
        );
      }
  
      if (response.status === 200) {
        Alert('Product has been successfully saved.');
        navigate("/products");
      } else {
        console.error("Failed to save the product with status:", response.status);
        Alert("Failed to save the product");
      }
    } catch (error) {
      console.error("Error in saving product:", error);
      Alert("Error in saving product: " + error.message);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="max-w-lg mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
    <div className="mb-6">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
      <input
        id="description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
      <input
        id="price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-6">
  <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
  <input
    id="image"
    name="image"
    type="url"
    value={formData.image}
    onChange={handleChange}
    placeholder="https://example.com/image.jpg"
    required
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>

    <div className="mb-6">
     
    </div>
    <div className="flex items-center justify-between">
      <button 
      onClick={handleSubmit}
      type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
      <button type="button" onClick={() => setEditing(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Cancel
      </button>
    </div>
  </form>
  
  );
};

export default AddProduct;

