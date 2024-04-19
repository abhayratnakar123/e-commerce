import React, { useEffect } from "react";
import useApiData from "../hooks/useApiData";
import { useSelector } from "react-redux";
import { formatPrice } from "../helpers/formatPrice"; 
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import NoProductsFound from "../assets/Icon/NoProductsFound";

const formatIndianDate = (dateString) => {
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(dateString).toLocaleString("en-IN", options);
};

const Orders = () => {
  console.log("In order API ")
  const apiUrl = "http://localhost:3000/api/order/user/orders";
  console.log("In order API ")
  const authToken = useSelector((state) => state.UserReducer.authToken);
  const { data, loading } = useApiData(apiUrl, authToken);

  // Order the orders by the latest on top
  const orderedOrders = data?.orders?.sort(
    (a, b) => new Date(b.orderAt) - new Date(a.orderAt)
  );

  console.log("ORDERSSSSS",orderedOrders);

  useEffect(()=>{
  window.scrollTo(0,0)
  },[])

  return (
    !loading?<div className="flex min-h-[90vh] flex-col items-center px-2 xs:px-3 sm:px-5 py-8"> 
      {orderedOrders && orderedOrders.length > 0 ? (
        <div>
          {orderedOrders.map((order) => (
            <div
              key={order.orderId}
              className="border border-gray-300 bg-gray-100 p-3 xs:p-4 sm:p-6 mb-5 sm:mb-8 rounded-md shadow-lg"
            >
              <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-2 sm:mb-4">
                <span className="text-sm xs:text-base md:text-lg lg:text-2xl font-semibold text-gray-800">
                  Order # {order.orderId}
                </span>
                
              </div>
              <span className="text-gray-600 pt-1 sm:pt-0 text-xs xs:text-sm md:text-base">
                  <span className="font-semibold">Order date :</span> {formatIndianDate(order.date)}
                </span>

              <div className="mb-2 sm:mb-4">
               
                {/* {order.products.map((product) => (
                  <div key={product._id} className="flex mb-[0.1rem] sm:mb-2 items-center ">
                    <Link
                      to={`/product/${product.product._id}?category=${product.product.category}`}
                      className="hover:scale-105 mr-1 xs:mr-2 sm:mr-6 rounded-md focus:scale-105 transition duration-100 ease-linear"
                    >
                      <img
                        src={product.product.image}
                        alt={product.product.name}
                        className="max-w-[3.65rem] max-h-[3.65rem] xs:max-w-[4rem] xs:max-h-[4rem] sm:max-w-[4.5rem] sm:max-h-[4.5rem] object-cover"
                      />
                    </Link>
                    <Link to={`/product/${product.product._id}?category=${product.product.category}`} className="hover:scale-[1.02] focus:scale-[1.02] transition duration-100 ease-linear">
                      <p className="text-xs xs:text-base sm:text-lg font-semibold  line-clamp-1 text-gray-800">
                        {product.product.name}
                      </p>
                      <p className="text-gray-600 text-xs xs:text-sm sm:text-baseflex items-center">
                        Price: {product.quantity}
                        <span className="px-[0.1rem] sm:px-[0.15rem] pt-[0.15rem] text-xs sm:text-sm">
                          ✖
                        </span>{" "}
                        ₹{formatPrice(product.price)}
                      </p>
                    </Link>
                  </div>
                ))} */}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm xs:text-base sm:text-xl font-semibold mb-1 sm:mb-4 text-gray-800">
                    Shipping Address:
                  </h2>
                  <p className="text-gray-600 text-xs xs:text-sm sm:text-base">{order.address}</p>
                </div>
                <div>
                  <h2 className=" text-sm xs:text-base sm:te
                  
                  xt-xl font-semibold mb-1 sm:mb-4 text-gray-800">
                    Total Price:
                  </h2>
                  <p className="text-base xs:text-lg sm:text-2xl font-semibold text-black">
                    ₹ {formatPrice(order.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute top-[50%] left-0 w-full flex flex-col text-2xl sm:text-4xl  justify-center items-center">
        <div className="flex justify-center items-center gap-2 sm:gap-4">   No products found
        <span className="hidden sm:block"><NoProductsFound height={50} width={50} /></span>
        <span className="block sm:hidden"><NoProductsFound height={30} width={30} /></span>
        </div>
        <Link 
            to="/products"
            className="flex justify-center text-xs sm:text-lg hover:opacity-65 items-center gap-1 underline"
          >
            Browse products
          </Link>
      </div>
      )}
    </div>:(
      <div><Loader/></div>
    )
  );
};

export default Orders;
