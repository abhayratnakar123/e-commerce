import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";   
import Navbar from "./components/Navbar/Navbar";  
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ConfirmOrder from "./pages/ConfirmOrder";
import Orders from "./pages/Orders";
import Footer from "./components/Footer/Footer";
// import Loader from "./components/Loader/Loader";
import {useSelector} from "react-redux"
import PaymentSucess from "./pages/PaymentSucess";
import AddProduct from "./pages/AddProdect";
function App() {
  
const authToken= useSelector (state=>state.UserReducer.authToken) 

  
  return ( 
    <div className=" h-screen">
      <BrowserRouter>
      <div className="mb-20">
      <Navbar />
      </div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct  />} />
          <Route path="/products" element={<Products  />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={authToken===null? <Login />:<Navigate to="/"/>} />
          <Route path="/signup" element={authToken===null? <Signup />:<Navigate to="/"/>} />
          <Route path="/placeorder" element={authToken!==null? <ConfirmOrder />:<Navigate to="/login"/>} />
          <Route path="/orders" element={authToken!==null? <Orders />:<Navigate to="/login"/>} />
          <Route path="/paymentsucess" element={<PaymentSucess></PaymentSucess>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;