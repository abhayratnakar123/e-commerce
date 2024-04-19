 import React, { useState } from "react";
import LoginImage from "../assets/Icon/LoginImage";
import Alert from "../components/Alert/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../helpers/Cookie";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/UserAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const registerUser = async () => {
    setLoading(true);
    const sendBody = {
      email: formData.email,
      password: formData.password,
    };
    const headers = {
      "content-type": "application/json",
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { ...sendBody },
        { headers: { ...headers } }
      );
      const result = await response;
      const authToken = result.data.authToken;
      navigate("/");
      setCookie("authToken", authToken);
      dispatch(updateUser(authToken));
      Alert("Welcome back", "success");
    } catch (error) {
      return Alert("Invalid Credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  const handleFormChange = (e, field) => {
    let tempFormData = { ...formData };
    tempFormData[field] = e.target.value;
    setFormData(tempFormData);
  };
  return (
   <div className="min-w-screen h-[90vh] bg-gray-200 bg-opacity-75 flex items-center justify-center px-5 py-5">
      <div
        className="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <LoginImage />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              <p>Fill the details to login to your account</p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="flex -mx-3"></div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      required
                      onChange={(e) => handleFormChange(e, "email")}
                      type="email"
                      id="email"
                      name="email"
                      className="w-full -ml-10 px-3 sm:px-6  text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold px-1"
                  >
                    Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      required
                      onChange={(e) => handleFormChange(e, "password")}
                      type="password"
                      id="password"
                      name="password"
                      className="w-full -ml-10 px-3 sm:px-6 text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    type="submit"
                    className="flex justify-center w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    {!loading ? (
                      "LOGIN"
                    ) : (
                      <div className="h-6 w-6 border-r-[4px] flex justify-center border-r-white rounded-full animate-spin"></div>
                    )}
                  </button>
                </div>
              </div>
              <div className="-mx-3 text-sm sm:text-base text-center">
                <Link to="/signup" className="">
                  Don't have an account?{" "}
                  <span className="underline">Register</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
