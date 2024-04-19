import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../helpers/formatPrice";
import CloseIcon from "../assets/Icon/Close";
import { updateCart, updateTotalCartPrice } from "../redux/actions/UserAction";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Alert from "../components/Alert/Alert";
import SmallLoader from "../components/Loader/SmallLoader";

const ConfirmOrderPage = () => {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cartData = useSelector((state) => state.UserReducer.cart);
  const totalCartPrice = useSelector(
    (state) => state.UserReducer.totalCartPrice
  );
  const authToken = useSelector((state) => state.UserReducer.authToken);
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [addressToBeAdded, setAddressToBeAdded] = useState(null);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openSelectAddressModal, setOpenSelectAddressModal] = useState(false);
  const [loadingOnApi, setLoadingOnApi] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const apiUrl = "http://localhost:3000/api/user/getUser";
      const headers = { "content-type": "application/json", token: authToken };
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, { headers: { ...headers } });
        const result = await response.data;
        setAddress(result.user.address);
        const cartItems = result.user.cartItems;
        dispatch(updateCart(cartItems));
        dispatch(updateTotalCartPrice(result.totalCartPrice));
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };
    if (authToken !== null) {
      fetchUser();
    } else {
      navigate("/");
    }
  }, []);

  const onCloseAddressModal = () => setOpenAddressModal(false);
  const openAddressAddModal = () => setOpenAddressModal(true);

  const openChooseAddressModal = () => setOpenSelectAddressModal(true);
  const closeChooseAddressModal = () => setOpenSelectAddressModal(false);

  const setSelectedAdress = (addressToBeSelected) => {
    closeChooseAddressModal();
    let tempAddress = [...address];
    tempAddress.sort((a, b) => {
      if (a === addressToBeSelected) {
        return -1; // Place addressToBeSelected at the top
      } else if (b === addressToBeSelected) {
        return 1;
      } else {
        return 0;
      }
    });
    setAddress(tempAddress);
  };

  const addAddress = async (event) => {
    event.preventDefault();
    const addAddressApiUrl = `http://localhost:3000/api/user/update`;
    if (authToken !== null) {
      setLoadingOnApi(true);
      const sendBody = { address: addressToBeAdded }; 
      const headers = { "content-type": "application/json", token: authToken };
      try {
        const response = await axios.put(
          addAddressApiUrl,
          { ...sendBody },
          { headers: { ...headers } }
        );
        const result = await response.data; 
        setAddress(result.user.address); 
        onCloseAddressModal();
        return Alert("Address added", "success");
      } catch (error) { 
        Alert("Some error occured, please try again", "error");
      } finally {
        setLoadingOnApi(false);
      }
    } else {
      navigate("/login");
      setLoadingOnApi(false);
      return Alert("Login to your account", "info");
    }
  };

  const placeOrder= async ()=>{
    const {data} = await axios.get("http://localhost:3000/api/getkey");
    console.log("ketyyyy" , data.key);
    const key_id = data.key;
    if(address.length>0){
      const placeOrderApiUrl = `http://localhost:3000/api/order/payment`; 
        setLoadingOnApi(true);
        const sendBody = { address: address[0],totalPrice:totalCartPrice }; 
        console.log(sendBody.totalPrice);
        const headers = { "content-type": "application/json", token: authToken };
        console.log("hearderssssssss",headers);
        try {
          const response = await axios.post(
            placeOrderApiUrl,
            sendBody,
            { headers: { ...headers } }
          );
          const result = await response.data; 
          console.log("results " , result);

          const totalamount = result.amount;
          var options = {
            key:key_id, // Enter the Key ID generated from the Dashboard
            amount: totalamount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Abhay Ratnakar",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: result.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url:"http://localhost:3000/api/order/verifyPayment",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "63976183919"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            },
        };
        const razor = new window.Razorpay(options);
        razor.open();

          // navigate("/");
          return Alert("Order placed", "success");
        } catch (error) { 
          Alert("Some error occured, please try again", "error");
        } finally {
          setLoadingOnApi(false);
        }
    }else{
      return Alert("Please add an address","error")
    }
   
  }
  return !loading ? (
    <div className="flex justify-center py-7 items-center px-2 min-h-screen bg-gray-100">
      <div className="bg-white px-4 py-6 sm:p-8 rounded-md shadow-md  sm:w-[70vw] md:w-[65vw] lg:w-[55vw] xl:w-[35vw]">
        <div>
          {loadingOnApi && (
          <div className="absolute flex justify-center top-[45%] left-0 w-full"> 
            <div className=" px-20  py-4 bg-opacity-50 bg-white rounded-sm ">
              <SmallLoader />
            </div>
          </div>
          )}
          {/* Add address modal  */}
          <Modal open={openAddressModal} onClose={onCloseAddressModal} center>
            <form onSubmit={addAddress} className="flex flex-col gap-4 p-3">
              <h1 className="text-sm sm:text-base">
                Add an address so that we can deliver the products to your
                doorstep, make sure to provide <b>accurate address</b> :
              </h1>
              <div className="w-full">
                <input
                  required
                  onChange={(e) => setAddressToBeAdded(e.target.value)}
                  type="text"
                  className=" border-2 text-sm sm:text-base border-black rounded-sm w-full p-2"
                />
              </div>
              <button 
                className="p-3 rounded-sm  text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600"
              >
                Confirm
              </button>
            </form>
          </Modal>
          {/* Choose address modal  */}
          <Modal
            open={openSelectAddressModal}
            onClose={closeChooseAddressModal}
            center
          >
            <div className="flex flex-col text-xs xs:text-sm sm:text-base gap-2 sm:gap-4 p-3">
              <h1 className="">
                <b>Select an address</b> so that we can deliver the products to
                your doorstep :
              </h1>
              <ul className="w-full list-disc flex gap-1 flex-col">
                {address !== null &&
                  address.map((item, index) => {
                    return (
                      <li key={index + 801} className="w-full">
                        <button
                          onClick={() => setSelectedAdress(item)}
                          className={`p-2 outline-none w-full rounded-md ${
                            index === 0
                              ? "bg-green-400 text-white"
                              : "hover:bg-gray-200"
                          } text-start `}
                          key={index + 701}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Modal>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Confirm Your Order
        </h2>

        {/* Order Summary */}
        <h3 className="text:sm sm:text-lg font-medium mb-2">Order Summary</h3>
        <div className="mb-6">
          {cartData !== null
            ? cartData.map((item, index) => {
                return (
                  <div
                    key={index + 601}
                    className="flex justify-between gap-1 sm:gap-4 mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-[0.15rem] max-w-7 max-h-7 flex bg-gray-100">
                        <img
                          src={item.product.image}
                          className="max-h-full max-w-full object-contain"
                          alt={item.name}
                        />
                      </span>
                      <Link
                        to={`/product/${item.product._id}?category=${item.product.category}`}
                        className="text-gray-600 hover:bg-gray-100 px-1  line-clamp-1 text-xs sm:text-sm"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold min-w-[4rem] sm:min-w-[5rem] flex justify-between items-center">
                      <span className="flex items-center">
                        {item.quantity}
                        <CloseIcon height={15} width={15} />
                      </span>
                      {"₹ " + formatPrice(item.price)}
                    </span>
                  </div>
                );
              })
            : ""}
          <hr />
          <div className="py-1 text-sm sm:text-base flex justify-between items-center">
            <span>Total price</span>
            <span className=" font-semibold ">
              ₹ {formatPrice(totalCartPrice)}
            </span>
          </div>
          <div className="py-4 text-xs xs:text-sm sm:text-base flex justify-between gap-2 sm:gap-16">
            <span className="min-w-[7rem] ">Shipping address</span>
            <span className=" font-semibold ">
              {address !== null && address.length > 0 ? (
                <div
                  onClick={openChooseAddressModal}
                  className="line-clamp-1 cursor-pointer hover:opacity-60 underline"
                >
                  {address[0]}
                </div>
              ) : (
                <div>No address found</div>
              )}
            </span>
          </div>
          <div className=" flex justify-end items-center">
            <button onClick={openChooseAddressModal} title="Choose address">
              <img
                src="/assets/Icon/address-icon.png"
                className="h-7 w-7 mr-2 hover:opacity-80"
                alt=""
              />
            </button>
            <button
              onClick={openAddressAddModal}
              title="Add another address"
              className="h-6 w-6 border hover:bg-black hover:text-white focus:bg-black focus:text-white border-black"
            >
              +
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button onClick={placeOrder} className="bg-blue-500 text-white px-6 text-sm sm:text-base py-3 rounded-md hover:bg-blue-600 w-full">
          Confirm Order
        </button>
        {/* Cancel Link */}
        <p className="mt-4 text-gray-600 text-xs sm:text-sm text-center">
          <Link to="/" className="underline hover:text-blue-500">
            Cancel and go back
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default ConfirmOrderPage;
