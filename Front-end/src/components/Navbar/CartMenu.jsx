import React, { useEffect, useMemo, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CloseIcon from "../../assets/Icon/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartProduct,
  updateQuantity,
} from "../../redux/actions/UserAction";
import { formatPrice } from "../../helpers/formatPrice";
import axios from "axios";
import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";
import _debounce from "lodash/debounce";
import { Link, useNavigate } from "react-router-dom";
import NoProductsFound from "../../assets/Icon/NoProductsFound";

const buttonCss = {
  minus:
    "px-2 text-center w-9 text-lg bg-white text-black hover:bg-black hover:text-white transition duration-150 ease-in  border-r border-r-black",
  plus: "px-2 text-center w-9 text-lg bg-white text-black hover:bg-black hover:text-white transition duration-150 ease-in  border-l border-l-black",
};

const CartMenu = ({ setCartMenu, cartMenu, cartMenuLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.UserReducer.cart);
  const authToken = useSelector((state) => state.UserReducer.authToken);
  const totalCartPrice = useSelector(
    (state) => state.UserReducer.totalCartPrice
  );
  const [viewPortWidth, setViewPortWidth] = useState(null);

  //Remove product
  const removeCartItem = async (id, cartId) => {
    const deleteCartItemApiUrl = `http://localhost:3000/api/user/cart/delete?productid=${id}`;
    const headers = { "content-type": "application/json", token: authToken };
    try {
      const response = await axios.delete(deleteCartItemApiUrl, {
        headers: { ...headers },
      });
      const result = await response.data;
      dispatch(removeCartProduct(cartId));
      console.log(result);
      return Alert("Product removed", "success");
    } catch (error) {
      console.log("error", error.response);
      return Alert("Error occured, please try again", "error");
    }
  };

  const debouncedUpdateQuantity = useMemo(
    () =>
      _debounce(async (id, quantity) => {
        const updateQuantityApiUrl = `http://localhost:3000/api/user/cart/update?productid=${id}`;
        const sendBody = { quantity: quantity };
        const headers = {
          "content-type": "application/json",
          token: authToken,
        };
        try {
          const response = await axios.put(
            updateQuantityApiUrl,
            { ...sendBody },
            { headers: { ...headers } }
          );
          const result = await response.data; 
        } catch (error) { 
          return Alert("Error occurred, please try again", "error");
        }
      }, 1000),
    [authToken]
  );

  const updateCartItemQuantity = (type, id, quantity, cartId) => {
    if (type === "increment") {
      dispatch(updateQuantity({ quantity: quantity + 1, id: cartId }));
      debouncedUpdateQuantity(id, quantity + 1);
    } else {
      dispatch(updateQuantity({ quantity: quantity - 1, id: cartId }));
      debouncedUpdateQuantity(id, quantity - 1);
    }
  };

  const checkoutFunc = () => {
    navigate("/placeorder");
    setCartMenu(false);
  };

  useEffect(() => {
    let width = window.visualViewport.width;
    setViewPortWidth(width); 
  }, [window.visualViewport.width]);
  return (
    <SlidingPane
      isOpen={cartMenu}
      from="right" 
      width={`${
        viewPortWidth > 1024
          ? "50vw"
          : viewPortWidth > 768
          ? "80vw"
          : viewPortWidth > 640
          ? "90vw"
          : "100vw"
      }`}
      overlayClassName="z-[1000]"
      hideHeader
      onRequestClose={() => setCartMenu(false)}
    >
      {!cartMenuLoading && cartData !== null && cartData.length > 0 ? (
        <div
          style={{ zIndex: 20000 }}
          className="absolute  gap-3 flex flex-col px-3 sm:px-10 top-0 left-0 w-[100vw] sm:w-[90vw] md:w-[80vw] lg:w-[50vw]  h-full"
        >
          <button className="py-2" onClick={() => setCartMenu(false)}>
            <CloseIcon height={30} width={30} />
          </button>
          <div className="text-black h-[85vh] overflow-y-auto custom-scrollbar flex flex-col sm:gap-3">
            {cartData !== null
              ? cartData.map((item, index) => {
                  return (
                    <div key={index + 301}>
                      <Link
                        onClick={() => setCartMenu(false)}
                        to={`/product/${item.product._id}?category=${item.product.category}`}
                        className="flex relative hover:bg-red-900 hover:bg-opacity-5 focus:bg-red-900 focus:bg-opacity-5 items-center   p-2 gap-3 sm:gap-4"
                      >
                        {/* img  */}
                        <div className="block h-16 w-16 sm:h-24 sm:w-24 border border-red-900 border-opacity-20 bg-red-900 bg-opacity-15">
                          <img
                            src={item.product.image}
                            alt="Not Found"
                            className="max-h-16 max-w-16 sm:max-w-24  sm:max-h-24 p-1 object-contain "
                          />
                        </div>
                        <div className="flex gap-2 flex-col">
                          {/* name  */}
                          <div className="line-clamp-1 text-xs xs:text-sm sm:text-base pr-6 font-semibold">
                            {item.product.name}
                          </div>
                          {/* + / - button  */}
                          <div className="flex border w-24  rounded-sm border-black items-center">
                            <button
                              style={{ zIndex: 10 }}
                              disabled={item.quantity <= 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                updateCartItemQuantity(
                                  "decrement",
                                  item.product._id,
                                  item.quantity,
                                  item._id
                                );
                              }}
                              className={buttonCss.minus}
                            >
                              -
                            </button>
                            <span className="px-2  text-center w-9">
                              {item.quantity}
                            </span>
                            <button
                              style={{ zIndex: 10 }}
                              disabled={item.quantity < 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                updateCartItemQuantity(
                                  "increment",
                                  item.product._id,
                                  item.quantity,
                                  item._id
                                );
                              }}
                              className={buttonCss.plus}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-xs xs:text-sm  sm:text-base">
                            {item.quantity} X ₹
                            <span className="font-semibold">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeCartItem(item.product._id, item._id);
                          }}
                          className="absolute right-2 top-0"
                        >
                          <CloseIcon height={25} width={25} />
                        </button>
                      </Link>
                     {index<cartData.length-1 && <div className="h-[1px] mb-1 bg-red-900 bg-opacity-20"></div>} 
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="w-full pb-3">
            <div className="h-[1px] mb-1 bg-red-900 bg-opacity-20"></div>
            <div className="py-2 text-lg sm:text-xl ">
              Subtotal : ₹{" "}
              <span className="font-semibold">
                {formatPrice(totalCartPrice)}
              </span>
            </div>
            <div className="h-[1px] mb-1 bg-red-900 bg-opacity-20"></div>
            <button
              onClick={checkoutFunc}
              className="text-center mt-4 py-2 w-full uppercase text-white text-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-600"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : cartMenuLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="flex absolute top-0 left-0 w-[100vw] sm:w-[90vw] md:w-[80vw] lg:w-[50vw]  flex-col h-full justify-center items-center">
          <button
            className="absolute top-2 left-2"
            onClick={() => setCartMenu(false)}
          >
            <CloseIcon height={30} width={30} />
          </button>
          <div className=" flex justify-center items-center text-lg xs:text-xl sm:text-3xl">
            Cart is empty, add products{" "}
            <span className="pl-2 hidden sm:block pt-1">
              <NoProductsFound height={38} width={38} />
            </span>
            <span className="pl-2 hidden xs:block sm:hidden pt-1">
              <NoProductsFound height={30} width={30} />
            </span>
            <span className="pl-2 block xs:hidden pt-1">
              <NoProductsFound height={25} width={25} />
            </span>
          </div>
          <Link
            onClick={() => {
              setCartMenu(false);
            }}
            to="/products"
            className="flex justify-center text-xs sm:text-lg hover:opacity-65 items-center gap-1 underline"
          >
            Browse products
          </Link>
        </div>
      )}
    </SlidingPane>
  );
};

export default CartMenu;
