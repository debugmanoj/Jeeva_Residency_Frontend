import React, { useEffect,  useState } from 'react'
import Button from '../../Components/Button/Button'
import { IoMdAdd } from "react-icons/io";
import roomService from "../../services/roomService"
import { useNavigate } from 'react-router-dom';

const HomeOverview = () => {
const navigate=useNavigate()
const [counts, setCounts] = useState({ checkInCount: 0, checkOutCount: 0 });


 // Using useEffect to fetch the data
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await roomService.fetchCount();
        // Update the state with the fetched values
        setCounts({
          checkInCount: response.checkInCount,
          checkOutCount: response.checkOutCount,
        });
      } catch (error) {
        console.error('Error fetching check-in/check-out counts:', error);
      }
    };
    
    fetchCount();
  }, []);  // Empty dependency array means this runs once when the component mounts


  const handleCreateBookNavigate=()=>{
    navigate("/viewAllAvailablerooms")

  }

  return (
    <>

      <div className="mt-3 grid grid-cols-2 grid-rows-2 gap-4 w-full h-auto bg-[#0000000A] rounded-2xl p-2">
        <div className='p-3 text-lg'><h1>Overivew</h1></div>

        <div className="p-3">
          <Button
            text="Create Booking"
            onClick={handleCreateBookNavigate}
            size="small"
            icon={<IoMdAdd  className="h-5 w-5 text-white" />}  // Passing icon as prop
          />
        </div>
        <div className='flex justify-around'>
          <div className='w-1/2 text-[#858D9D] text-sm'>Today's <span className='text-[#5D6679] text-base font-medium'>Check-in</span></div>

          <div className='text-xl text-custom-red mt-[11%] font-bold'>{counts.checkInCount}</div>
        </div>
        <div className='flex justify-around'>
          <div className='w-1/2 text-[#858D9D] text-sm'>Today's <span className='text-[#5D6679] text-base font-medium'>Check-out</span></div>
          <div className='text-xl text-custom-red mt-[11%] font-bold'>{counts.checkOutCount}</div>
        </div>
      </div>

    </>
  )
}

export default HomeOverview