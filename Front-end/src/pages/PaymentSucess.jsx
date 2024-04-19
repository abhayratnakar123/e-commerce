import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {

    const searchQuery = useSearchParams()[0]

    const referenceNum = searchQuery.get("reference")


const navigate = useNavigate();
    return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-4">Payment Successful! </h2>
          <p className="text-green-800 text-base md:text-lg mb-4">Thank you for your purchase. Your transaction Id : <span className='text-red-500'>{referenceNum}</span>  has been completed, and a receipt for your purchase has been emailed to you.</p>
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>{
            navigate("/");
          }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
