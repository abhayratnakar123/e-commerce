import React, { useState } from "react";
import LoginImage from "../assets/Icon/LoginImage";
import Alert from "../components/Alert/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../helpers/Cookie";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/UserAction";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: 'user'
  });

  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    if (formData.password === formData.confirmPassword) {
      setLoading(true);
      const sendBody = {
        name: formData.firstName + formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
      const headers = {
        "content-type": "application/json",
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/signup",
          { ...sendBody },
          { headers: { ...headers } }
        );
        const result =  response;
        const authToken = result.data.authToken;
        navigate("/login");
        setCookie("authToken", authToken);
        dispatch(updateUser(authToken));
        Alert("Registraion succesfull", "success");
      } catch (error) {
        return Alert("Error occured, please try again", "error");
      } finally {
        setLoading(false);
      }
    } else {
      return Alert("Confirm password doesn't match", "error")
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
    <div className="min-w-screen min-h-[90vh] bg-gray-200 bg-opacity-75 flex items-center justify-center px-5 py-5">
      <div
        className="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <LoginImage />
          </div>
          <div className="w-full md:w-1/2 py-6 sm:py-10 px-3 sm:px-5 md:px-10">
            <div className="text-center mb-5 sm:mb-10">
              <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">REGISTER</h1>
              <p className="text-sm sm:text-base">Enter your information to register</p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col sm:flex-row -mx-3">
                <div className="sm:w-1/2 px-3 mb-[0.35rem]  sm:mb-3">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-semibold px-1"
                  >
                    First name
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      onChange={(e) => handleFormChange(e, "firstName")}
                      required
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full -ml-10 px-3 sm:px-6  text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="sm:w-1/2 px-3 mb-[0.35rem]  sm:mb-3">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-semibold px-1"
                  >
                    Last name
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      required
                      onChange={(e) => handleFormChange(e, "lastName")}
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full -ml-10 px-3 sm:px-6  text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Smith"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-[0.35rem]  sm:mb-3">
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
                      placeholder="exapmple@gmail.com"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-[0.35rem]  sm:mb-3">
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
                      className="w-full -ml-10 px-3 sm:px-6  text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3  mb-7">
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-semibold px-1"
                  >
                    Confirm password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      required
                      onChange={(e) => handleFormChange(e, "confirmPassword")}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full -ml-10 px-3 sm:px-6  text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-[0.35rem] sm:mb-3">
                    <label htmlFor="role" className="text-xs font-semibold px-1">
                      Role
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-check-outline text-gray-400 text-lg"></i>
                      </div>
                      <select
                        required
                        onChange={(e) => handleFormChange(e, "role")}
                        id="role"
                        name="role"
                        className="w-full -ml-10  sm:px-6 text-sm sm:text-base py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-[0.5rem]  sm:mb-5">
                  <button
                    type="submit"
                    className="flex justify-center w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    {!loading ? (
                      "REGISTER NOW"
                    ) : (
                      <div className="h-6 w-6 border-r-[4px] flex justify-center border-r-white rounded-full animate-spin"></div>
                    )}
                  </button>
                </div>
              </div>
              <div className="-mx-3 text-xs sm:text-base text-center">
                <Link to="/login" className="">
                  Already have an account? <span className="underline">Signin</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
