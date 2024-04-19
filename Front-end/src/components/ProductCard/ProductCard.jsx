import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatPrice } from "../../helpers/formatPrice";
import SmallLoader from "../Loader/SmallLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "../Alert/Alert";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    price: product.price,
    description: product.description,
    image: product.image
  });
  const authToken = useSelector((state) => state.UserReducer.authToken);
  const formattedPrice = formatPrice(product.price);
  console.log("Prodect js ", product._id);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Api For Edit Product 
  const handleEditProduct = async () => {
    if (!authToken) {
      console.error("Authentication token is undefined.");
      Alert("Authentication token is missing."); 
      return; 
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/edit/${product._id}`,
        formData,
        {headers:{token:authToken}},
      );
  
      if (response.status === 200) {
        Alert("Product updated successfully");
        setEditMode(false);
        navigate("/")
      } else {
        console.error("Failed to update the product with status:", response.status);
        Alert("Failed to update the product");
      }
    } catch (error) {
      console.error("Error in updating product:", error);
      Alert("Error in updating product: Only Admin Can Perform This" );
    }
  };
  
  //For Delete
  async function handleDelete() {
    setLoading(true);
    const productId = product._id;
  
    console.log("TOKENNNN", authToken);
    console.log("Product Id In delete Function", productId);
  
    if (!authToken) {
      console.error("Authentication token is undefined.");
      setLoading(false);  
      Alert("Authentication token is missing."); 
      return; 
    }
  
    try {
      const response = await axios.delete(`http://localhost:3000/api/product/delete/${productId}`, 
        {headers:{token:authToken}},
      );
  
      if (response.status === 200) {
        navigate("/");
        Alert("Product deleted successfully")
      } else {
        console.error("Failed to delete the product:", response.status);
        Alert(`Failed to delete the product: Status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error in deleting product:", error);
      Alert("Error in deleting product: " + error.message);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div>
      {editMode ? (
        <div className="absolute w-96 mx-auto flex flex-col  justify-center items-center bg-white shadow-lg p-8">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="w-full p-2 mb-6 border border-gray-300 rounded"
          />
          <button
            onClick={handleEditProduct}
            type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            Save
          </button>
          <button type="button" onClick={() => setEditMode(false)} className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors">
            Cancel
          </button>
        </div>

      ) : (
        <Link
          className={` flex mb-2 flex-col border border-red-900 border-opacity-20 hover:scale-105 focus:scale-105 transition duration-150 ease-linear `}
          key={product._id}
        >
          <div
            style={{ zIndex: 0 }} className={`bg-red-900 bg-opacity-15 flex justify-center items-center p-2`}>
           <Link  to={`/product/${product._id}?category=${product.category}`} >
            <LazyLoadImage
              src={product.image}
              onLoad={() => setLoading(false)}
              className="object-contain "
              alt="Not found"
            />
            </Link>
            {loading && (
              <div className="">
                <SmallLoader />
              </div>
            )}
          </div>
          <div className="px-1">
            <div className="line-clamp-1 text-sm md:text-base">{product.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex pt-1 px-1 sm:pt-1  md:pt-3 font-semibold sm:text-xl md:text-2xl">
              {" "}
              <span className="text-sm sm:text-lg md:text-xl  align-top">₹</span>{" "}
              {formattedPrice}
            </div>

            <button onClick={handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" id="delete">
                <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79
     4-4V14H12v24zM38 8h-7l-2-2H19l-2 
     2h-7v4h28V8z">

                </path>
                <path fill="none" d="M0 0h48v48H0z">
                </path>
              </svg>
            </button>

            <button onClick={() => setEditMode(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px"
                y="0px" width="30" height="30"
                viewBox="0 0 30 30">
                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 
    L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 
    6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 
    3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 
    6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 
    23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 
    L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 
    4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
              </svg>
            </button>
          </div>
        </Link>


      )}


    </div>



  );
};

export default ProductCard;
