import React, { useState } from "react";
import { HamburgerIcon } from "../../assets/Icon/Hamburger";
import Search from "../../assets/Icon/Search";
import Cart from "../../assets/Icon/Cart";
import SlidingLeftMenu from "./SlidingLeftMenu";
import SearchPane from "./SearchPane";
import CartMenu from "./CartMenu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateCart,
  updateTotalCartPrice,
} from "../../redux/actions/UserAction";
import Alert from "../Alert/Alert";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [leftMenu, setLeftMenu] = useState({ isPaneOpenLeft: false });
  const [searchPane, setSearchPane] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [cartMenuLoading, setCartMenuLoading] = useState(false);
  const cartDataRedux = useSelector((state) => state.UserReducer.cart);

  const authToken = useSelector((state) => state.UserReducer.authToken);

  const fetchUser = async () => {
    const apiUrl = "http://localhost:3000/api/user/getUser";
    const headers = { "content-type": "application/json", token: authToken };
    try {
      setCartMenuLoading(true);
      const response = await axios.get(apiUrl, { headers: { ...headers } });
      const result = await response.data;
      const cartItems = result.user.cartItems;
      setCartData(cartItems); 
      dispatch(updateCart(cartItems));
      dispatch(updateTotalCartPrice(result.totalCartPrice)); 
      setCartMenuLoading(false);
    } catch (error) { 
      setCartMenuLoading(false);
    }
  };

  const onCartClick = () => {
    if (authToken !== null) {
      setCartMenu(true);
      fetchUser();
    } else {
      navigate("/login");
      return Alert("Please login to your account", "info");
    }
  };
  return (
    <div
      style={{ zIndex: 60 }}
      className="bg-black    fixed top-0 left-0 w-full text-white px-4 sm:px-8 py-5 items-center flex justify-between"
    >
      <div className="flex sm:gap-5 items-center">
        <div
          style={{ zIndex: 1000 }}
          className="absolute z-[1000] left-0 top-0"
        >
          <SlidingLeftMenu leftMenu={leftMenu} setLeftMenu={setLeftMenu} />
        </div>
        <button
          className="hidden sm:block"
          onClick={() => setLeftMenu({ isPaneOpenLeft: true })}
        >
          <HamburgerIcon height={30} width={30} />
        </button>
        <button
          className="block sm:hidden"
          onClick={() => setLeftMenu({ isPaneOpenLeft: true })}
        >
          <HamburgerIcon height={25} width={25} />
        </button>
        <div className="space-x-5 hidden md:block">
          <Link
            to="/"
            className="pl-3 transition duration-150 hover:opacity-80 focus:opacity-80"
          >
            Home
          </Link>
          <Link
            className=" transition duration-150 hover:opacity-80 focus:opacity-80"
            to="/products"
          >
            Products
          </Link>
          <Link
            className=" transition duration-150 hover:opacity-80 focus:opacity-80"
            to="/addProduct"
          >
            Add Prodect
          </Link>
        </div>
      </div>
      <Link
        to="/"
        className="uppercase md:-ml-[11rem] text-4xl sm:text-5xl font-penna font-semibold"
      >
        LuxeLane
      </Link>
      <div className="flex items-center gap-3  sm:gap-5">
        <div style={{ zIndex: 1000 }} className="absolute bottom-0">
          <SearchPane searchPane={searchPane} setSearchPane={setSearchPane} />
        </div>
        <button
          className="outline-none hidden sm:block"
          onClick={() => setSearchPane(true)}
        >
          <Search height={22} width={22} />
        </button>
        <button
          className="outline-none block sm:hidden"
          onClick={() => setSearchPane(true)}
        >
          <Search height={16} width={16} />
        </button>
        <div style={{ zIndex: 1000 }} className="absolute bottom-0">
          <CartMenu
            cartMenuLoading={cartMenuLoading}
            setCartMenuLoading={setCartMenuLoading}
            cartMenu={cartMenu}
            setCartMenu={setCartMenu}
          />
        </div>
        <button className="outline-none hidden sm:block relative" onClick={onCartClick}>
          {cartDataRedux!==null && cartDataRedux.length>0 && <span className="h-6 w-6 p-1  bg-red-500 absolute -top-3 -right-4 text-white text-[0.6rem] rounded-full flex justify-center items-center">{cartDataRedux!==null && cartDataRedux.length>10?"10+":cartDataRedux.length}</span>}
          <Cart height={24} width={24} />
        </button>
        <button className="outline-none relative block sm:hidden" onClick={onCartClick}>
        {cartDataRedux!==null && cartDataRedux.length>0 && <span className="h-5 w-5  bg-red-500 absolute -top-3 -right-3 text-white text-[0.5rem] rounded-full flex justify-center items-center">{cartDataRedux!==null && cartDataRedux.length>10?"10+":cartDataRedux.length}</span>}
          <Cart height={18} width={18} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
