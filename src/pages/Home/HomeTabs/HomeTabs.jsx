import React, { useEffect, useRef, useState } from 'react';
import Tabs from '../../../Components/Tabs/Tabs'; // Import Tabs component
import Loader from "../../../Components/Loader/Loader.jsx";
import Card from "../../../Components/Card/Card";
import { sendCardContent } from "./Helper/HomeTabsHelper.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, fetchRooms, setPage } from "../../../Redux/rooms/roomSlice.js";

const HomeTabs = () => {
  const dispatch = useDispatch();
  const { activeTab, rooms, page, hasMore, loading } = useSelector((state) => state.rooms);
  const tabs = ['All', 'Overdue', 'Occupied', 'Available'];

  const observer = useRef();
  const lastRoomRef = useRef();
  const [uniqueRooms, setUniqueRooms] = useState([]);
 // Set a limit for each page (for example, 10)
  const limit = 8;

  // Fetch rooms when page or activeTab changes
  useEffect(() => {
    dispatch(fetchRooms({ page, activeTab ,limit}));
  }, [activeTab, dispatch, page,limit]);

  // Detect when user scrolls to bottom and fetch more data
  useEffect(() => {
    // Initialize IntersectionObserver
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        dispatch(setPage(page + 1)); // Load next page when bottom is reached
      }
    });

    // Observe the last room ref
    if (lastRoomRef.current) {
      observer.current.observe(lastRoomRef.current); // Attach observer to the last room
    }
  }, [dispatch, hasMore, loading, page]);

  // Deduplicate rooms based on _id
  useEffect(() => {
    const uniqueRoomsArray = [];
    rooms.forEach((room) => {
      if (!uniqueRoomsArray.some((existingRoom) => existingRoom._id === room._id)) {
        uniqueRoomsArray.push(room);  // Only add room if it doesn't exist already
      }
    });
    setUniqueRooms(uniqueRoomsArray); // Update the state with unique rooms
  }, [rooms]);

  // Handle tab click to switch between tabs
  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <>
      <div className="mt-[8%]">
        <Tabs
          size="small"
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="mt-4 overflow-y-auto max-h-[calc(100vh-3rem)]">
          <div className="grid grid-cols-2 grid-rows-1 gap-4">
            {uniqueRooms?.map((room, index) => {
              // Ensure key is unique
              const key = room._id || `${room.roomNo}-${index}`;
              return (
                <div
                  key={key}
                  ref={index === uniqueRooms.length - 1 ? lastRoomRef : null} // Attach ref to the last room
                >
                  <Card content={sendCardContent(room, activeTab)} />
                </div>
              );
            })}
          </div>

          {loading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default HomeTabs;
