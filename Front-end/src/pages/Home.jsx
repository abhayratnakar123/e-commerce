import React, { useState } from "react";
import Hero from "../components//Hero/Hero";
import Category from "../components/Category/Category";
import AllProducts from "../components/AllProducts/AllProducts"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, updateTotalCartPrice } from "../redux/actions/UserAction";
import axios from "axios";

const Home = () => {

  console.log("Windows -------------- ",window);
  const dispatch=useDispatch(); 

  const authToken = useSelector((state) => state.UserReducer.authToken);

  useEffect(() => {
    const fetchUser = async () => {
      const apiUrl = "http://localhost:3000/api/user/getUser";
      const headers = { "content-type": "application/json", token: authToken };
      try {  
        const response = await axios.get(apiUrl, { headers: { ...headers } });
        const result = await response.data;
        const cartItems = result.user.cartItems;  
        dispatch(updateCart(cartItems));
        dispatch(updateTotalCartPrice(result.totalCartPrice)); 
      } catch (error) {
        
      }finally{ 
      }
    };
    if(authToken!==null){
      fetchUser();
    }
  }, [])
  

  return (
    <div className="">
      <Hero />
      <div className="flex justify-center w-full">
        <div className="w-[94%] sm:w-[90%] md:w-[80%] py-10"> 
          <Category /> 
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl mt-14 mb-8 sm:mt-14 sm:mb-14 relative font-semibold">
              Popular Products
              <span className="absolute -bottom-2 sm:-bottom-4 left-0 w-20 h-1 bg-red-500"></span>
            </h1>
            <div className="">
            <AllProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
