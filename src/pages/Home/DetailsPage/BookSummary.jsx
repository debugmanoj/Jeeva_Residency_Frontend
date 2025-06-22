import React from 'react'
import Layout from '../../Layout/Layout'
import { IoIosArrowBack } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import Button from '../../../Components/Button/Button';
import { useSelector } from 'react-redux';
import { FiHome } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const BookSummary = () => {
  const navigate=useNavigate()
  const formData=useSelector((state)=>state.form.formData)

  const handleToHomeNavigate=()=>{
    navigate("/home")
  }
  return (
    <Layout>
      <div className="p-2 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {/* <IoIosArrowBack className="cursor-pointer text-xl text-gray-700" />
            <span className="ml-4 font-bold text-lg">Summary</span> */}
          </div>
          <Button 
          text="Export"
          size="small"
          disabled={true} // Disabled logic
          icon={<CiExport  className="mr-2" />}
          className="bg-red-500 text-white text-sm px-4 py-2 rounded-md flex items-center">
          </Button>
        </div>

        {/* Guest Information */}
        <div className="mb-6 p-4 bg-white rounded-md border text-xs border-md ">
          <h3 className="font-semibold text-md mb-3">Guest Information</h3>
          <p className='text-[#595D62] mb-[1%]'>Guest Name: <span className='text-gray-900'>{formData.guestName}</span></p>
          <p className='text-[#595D62] mb-[1%]'>Mobile Number: <span className='text-gray-900'>{formData.mobileNumber}</span></p>
        </div>

        {/* Availability */}
        <div className="mb-6 p-4 bg-white rounded-md border text-xs">
          <h3 className="font-semibold text-md mb-3">Availability</h3>
          <p className='mb-[1%]'><>Check In:</> <span className='text-gray-900'>{formData.checkInDate
}</span></p>
          <p className='mb-[1%]'><>Check Out:</> <span className='text-gray-900'>{formData.checkOutDate

}</span></p>
        </div>

        {/* Payment Details */}
        <div className="p-4 bg-white rounded-md border text-xs ">
          <h3 className="font-semibold text-md mb-3">Payment Details</h3>
          <p className='mb-[1%]'><>Rent Cost:</> <span>{formData.rentCost}</span></p>
          <p className='mb-[1%]'><>Discount:</> <span>{formData.discount} %</span></p>
          <p className='mb-[1%]'><>Paid:</> <span>{formData.paid}</span></p>
          <p className='mb-[1%]'><>Balance:</> <span>{formData.balance}</span></p>
          <p className='mb-[1%]'><>Payment type:</> <span>{formData.paymentType}</span></p>

        </div>
        <div>
               <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {/* <IoIosArrowBack className="cursor-pointer text-xl text-gray-700" />
            <span className="ml-4 font-bold text-lg">Summary</span> */}
          </div>
          <Button 
          text="Home"
          size="small"
          onClick={handleToHomeNavigate}
          icon={<FiHome  className="mr-2" />}
          className=" text-white text-sm px-4 py-2 rounded-md flex items-center mt-5">
          </Button>
        </div>
        </div>
      </div>

      {/* Footer with Icons */}

    </Layout>
  )
}

export default BookSummary
