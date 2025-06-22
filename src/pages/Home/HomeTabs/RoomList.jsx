import { useEffect, useState, useRef, useCallback } from "react";
import roomService from "../../../services/roomService";
import Card from "../../../Components/Card/Card"; // Assuming reusable room card

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchRooms = async (currentPage) => {
    try {
      const response = await roomService.fetchPaginatedRooms(currentPage, 6);
      setRooms((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRooms(page);
  }, [page]);

  const lastRoomRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {rooms.map((room, index) => (
        <div
          key={room._id}
          ref={index === rooms.length - 1 ? lastRoomRef : null}
        >
          <Card room={room} />
        </div>
      ))}
    </div>
  );
};

export default RoomList;
