import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useApiData from "../hooks/useApiData";
import { useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { inititalizeCategoriesProducts } from "../redux/actions/CategoriesAction";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import axios from "axios";
import Alert from "../components/Alert/Alert";
import { formatPrice } from "../helpers/formatPrice";
import SmallLoader from "../components/Loader/SmallLoader";
import { addCartProduct } from "../redux/actions/UserAction";

const buttonCss = {
  minus:
    "px-2 xl:px-4 py-1 xl:py-2 text-base xl:text-lg min-w-10 xl:min-w-12  text-center bg-white text-black hover:bg-black hover:text-white transition duration-150 ease-in border-r border-r-black",
  plus: "px-2 xl:px-4  py-1 xl:py-2 text-base xl:text-lg min-w-10 xl:min-w-12  text-center bg-white text-black hover:bg-black hover:text-white transition duration-150 ease-in   border-l border-l-black",
};

const SingleProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loadingOnApi, setLoadingOnApi] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const apiUrl = `http://localhost:3000/api/product/${id}`;
  const relatedProductsApiUrl = `https://luxe-lane-backend.vercel.app/api/product?category=${category}`;

  const authToken = useSelector((state) => state.UserReducer.authToken);
  const { data, loading } = useApiData(apiUrl);
  const { data: relatedProductsData } = useApiData(relatedProductsApiUrl);

  const adjustQuantity = (type) => {
    if (quantity >= 0) {
      if (type === "increment") {
        setQuantity((prev) => prev + 1);
      } else {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const addProductToCart = async () => {
    const addToCartApiUrl = `http://localhost:3000/api/order/user/orders/${id}`;
    if (authToken !== null) {
      setLoadingOnApi(true);
      const sendBody = { quantity: quantity };
      console.log("SEND BODY",sendBody)
      const headers = { "content-type": "application/json", token: authToken };
      try {
        const response = await axios.post(
          addToCartApiUrl,
          { ...sendBody },
          { headers: { ...headers } }
        );
        const result = await response.data; 
        setQuantity(0); 
        dispatch(addCartProduct(result.cart[0]));
        setLoadingOnApi(false);
        return Alert("Product added to cart", "success");
      } catch (error) { 
        setQuantity(0);
        setLoadingOnApi(false);
        if (error.response?.status === 403) {
          return Alert("Product already exists in your cart", "info");
        } else {
          return Alert("Error occured, please try again", "error");
        }
      }
    } else {
      setQuantity(0);
      navigate("/login");
      setLoadingOnApi(false);
      return Alert("Login to your account", "info");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    if (relatedProductsData !== null && data !== null) {
      const relatedProducts = relatedProductsData.products.filter(
        (e, i) => e._id !== data.product._id
      );
      setRelatedProducts(relatedProducts);
      dispatch(inititalizeCategoriesProducts(relatedProductsData.products));
    }
    if (data !== null) {
      setProduct(data.product);
      console.log(data.product);
    }
  }, [data, relatedProductsData]);

  return !loading ? (
    <div className="flex flex-col py-4 items-center min-h-[80vh] justify-center w-full">
      {/* Product  */}
      {loadingOnApi && (
        <div className="fixed flex justify-center top-[45%] left-0 w-full">
          <div className=" px-20  py-4 bg-opacity-50 bg-white rounded-sm ">
            <SmallLoader />
          </div>
        </div>
      )}
      <div className="w-[93%] md:w-[90%] xl:w-[73%]   min-h-[85vh] my-4 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
        <div className="h-[100%]">
          <img
            loadin
            g="lazy"
            className=" bg-red-900 bg-opacity-15 max-h-[100%] w-full object-contain"
            src={product !== null ? product.image : ""}
            alt="Not found"
          />
        </div>
        <div className="flex  gap-2 sm:gap-4 xl:gap-8   flex-col">
          <div className="text-lg sm:text-xl xl:text-2xl font-bold">
            {product !== null ? product.name : ""}
          </div>
          <div className="text-lg sm:text-xl xl:text-2xl font-semibold">
            ₹ {product !== null ? formatPrice(product.price) : ""}
          </div>
          <div className="text-xs xl:text-[0.83rem] leading-5">
            {product !== null ? product.description : ""}
          </div>
          <div className="flex  items-center my-2 sm:my-0 gap-5 sm:gap-7">
            <div className="flex border border-black  rounded-sm  items-center">
              <button
                disabled={quantity <= 0}
                onClick={() => adjustQuantity("decrement")}
                className={buttonCss.minus}
              >
                -
              </button>
              <span className="px-2xl:px-4 py-1 xl:py-2 min-w-10 text-center">{quantity}</span>
              <button
                disabled={quantity < 0}
                onClick={() => adjustQuantity("increment")}
                className={buttonCss.plus}
              >
                +
              </button>
            </div>
            <button
              disabled={quantity <= 0}
              onClick={addProductToCart}
              className="px-2 xl:px-4 py-1 xl:py-2 text-base xl:text-lg text-white border border-black rounded-sm bg-black bg-opacity-90 flex items-center gap-2"
            >
              <FaCartPlus /> Add to cart
            </button>
          </div>
          <div className="text-xs xl:text-sm">
            <span className="font-semibold ">Category : </span>{" "}
            {product !== null ? product.category : ""}
          </div>
        </div>
      </div>
      <div className="w-[93%] md:w-[90%] xl:w-[73%]">
      <RelatedProducts
        setQuantity={setQuantity}
        relatedProducts={relatedProducts}
      />
      </div>
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default SingleProduct;
