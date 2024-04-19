import React, { useEffect, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CloseIcon from "../../assets/Icon/Close";
import { Link, useNavigate } from "react-router-dom";
import {FaSignOutAlt,FaBoxOpen,FaHeadphones,FaHome,FaQuestion} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../../helpers/Cookie";
import { updateCart, updateUser } from "../../redux/actions/UserAction";
import Alert from "../Alert/Alert"

const SlidingLeftleftMenu = ({ setLeftMenu, leftMenu }) => {
  const authToken=useSelector((state)=>state.UserReducer.authToken);
  const [viewPortWidth, setViewPortWidth] = useState(null)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const closeMenu = () => {
    setLeftMenu({ isPaneOpenLeft: false });
  };
  const hadleLogin=()=>{
    closeMenu();
    if(authToken!==null){
      removeCookie("authToken");
      dispatch(updateUser(null));
      navigate("/")
      dispatch(updateCart(null))
      return Alert("Logged out of your account","success")
    }else{
      navigate("/login")
    }
  }

useEffect(() => {
  let width=window.visualViewport.width;
  setViewPortWidth(width); 
}, [window.visualViewport.width])

  return (  
    <SlidingPane
      isOpen={leftMenu.isPaneOpenLeft}
      from="left"  
      overlayClassName="z-[1000]"
      width={`${viewPortWidth>1024?"20vw":viewPortWidth>768?"32vw":viewPortWidth>640?"45vw":"80vw"}`}
      hideHeader
      onRequestClose={closeMenu}
    >
      <div style={{zIndex:1000}} className="absolute z-[110] gap-3 flex items-end  py-7 flex-col top-0 left-0 w-[80vw] sm:w-[45vw] md:w-[32vw] lg:w-[20vw] text-black bg-white h-full">
        <button className="absolute top-3 right-5" onClick={closeMenu}>
          <CloseIcon height={30} width={30} />
        </button>
        <Link
          to="/"
          onClick={closeMenu}
          className="w-[80%] mt-5 flex items-center gap-2 text-lg px-3 py-2 rounded-md hover:opacity-65"
        >
         <FaHome/> Home
        </Link>
        <Link
          to="/products"
          onClick={closeMenu}
          className="w-[80%] text-start flex items-center gap-2 text-lg px-3 py-2 rounded-md hover:opacity-65"
        >
         <FaHeadphones/> Products
        </Link>
        <Link
          to="/orders"
          onClick={closeMenu}
          className="w-[80%] text-start flex items-center gap-2 text-lg px-3 py-2 rounded-md hover:opacity-65"
        >
         <FaBoxOpen/> Orders
        </Link>
        <Link
          to="/addProduct"
          onClick={closeMenu}
          className="w-[80%] text-start flex items-center gap-2 text-lg px-3 py-2 rounded-md hover:opacity-65"
        >
         <FaQuestion/> About
        </Link>
        <button 
          onClick={hadleLogin}
          className="w-[80%] text-start flex items-center gap-2 text-lg px-3 py-2 rounded-md hover:opacity-65"
        >
         <FaSignOutAlt/> {authToken!==null?"Signout":"Sign In"}
        </button>
      </div>
    </SlidingPane> 
  );
};

export default SlidingLeftleftMenu;
