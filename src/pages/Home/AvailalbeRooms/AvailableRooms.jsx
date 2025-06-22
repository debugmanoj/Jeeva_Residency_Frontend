import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import Chip from '../../../Components/chip/chip'; // Assuming Chip component is placed here
import { IoIosArrowRoundBack } from "react-icons/io";
import { setSelectedRoom } from "../../../Redux/rooms/roomSlice";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableRooms } from '../../../Redux/rooms/roomSlice';
import { hideLoader, showLoader } from '../../../Redux/Loader/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { setRoomId } from '../../../Redux/formData/formSlice';

const AvailableRooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { availableRooms} = useSelector((state) => state.rooms.availableRoom); // Access Redux state
  const  {loading}  = useSelector((state) => state.rooms); // Access Redux state
  

  // Fetch available rooms when the component mounts
  useEffect(() => {
    try {
      dispatch(showLoader());
      dispatch(fetchAvailableRooms()); // Dispatch the action to fetch available rooms
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
    }
  }, [dispatch]);

  const handleNavigate = (roomId, roomNo) => {
    try {
      // Dispatch setSelectedRoom to store the selected room in Redux
      dispatch(setSelectedRoom({ roomId, roomNo }));
       // Now set the roomId in form state (formSlice)
      dispatch(setRoomId(roomId));  // Set roomId in the form slice

      navigate("/detailsPage")
    } catch (error) {
      console.error('Error selecting room:', error);
    }
  };


  const handleBackNavigate=()=>{
    navigate("/home")
  }

  // If no available rooms are fetched yet, show a loading state or message


if(availableRooms?.length===0&&!loading){
    return (
<Layout>
        <div className="max-w-4xl mx-auto px-4 py-6 font-sans flex flex-col justify-center items-center h-full">
          <div className="text-lg font-bold text-custom-red mb-4">No Available Rooms</div>
          <div className="text-sm text-gray-500 mb-4">We couldn't find any rooms at the moment.</div>
        </div>
      </Layout>
    );
}

  if (!availableRooms || availableRooms.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
          <div className='text-xs font-bold text-custom-red mb-[10%]'>Loading Available Rooms...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
        <div className='flex items-center mb-[13%] cursor-default'>
          <IoIosArrowRoundBack className='cursor-pointer'onClick={handleBackNavigate} />
          <span className='ml-[3%] font-extrabold text-xs font-sans'>Room Booking</span>
        </div>
        <div className='text-xs font-bold text-custom-red mb-[10%]'>Available Room</div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {availableRooms.map((room) => (
            <Chip
              key={room._id}
              label={`${room.roomNo}`}
              className="w-full text-xs"
              onClick={() => handleNavigate(room._id, room.roomNo)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AvailableRooms;
