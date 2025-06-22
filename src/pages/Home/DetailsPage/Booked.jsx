import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { FaHandshake } from 'react-icons/fa'; // Handshake icon
import { RiHome5Line } from 'react-icons/ri'; // Home icon
import { MdCreditCard } from 'react-icons/md'; // Expense icon
import Layout from '../../Layout/Layout';
import Button from '../../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Booked = () => {
const navigate=useNavigate()

  const handleNavigate=()=>{
navigate("/BookSummary")
  }
  return (
    <Layout>
    <div className="flex flex-col h-screen bg-white font-sans">

      {/* Content */}
      <div className="flex flex-col justify-center items-center flex-grow p-4 text-center">
        <FaHandshake className="text-9xl text-black mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-wide">Successfully Booked</h2>
        <p className="text-md text-gray-600 mb-6">Your Booking has been successfully submit</p>
        
        <Button 
        width="w-full"
        onClick={handleNavigate}
        className="bg-red-500 text-white py-3 px-6 rounded-md text-xs hover:bg-red-600"
        text="View Booking details"
        size='small'
        >

        </Button>
      </div>


    </div>
    </Layout>
  );
}

export default Booked;
