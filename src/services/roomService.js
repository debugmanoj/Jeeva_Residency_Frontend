import roomRepository from "../respositories/roomRepository.js";

const fetchPaginatedRooms = async (page, limit,activeTab) => {
  try {
    const res = await roomRepository.getRoomsPaginated(page, limit,activeTab);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Unable to fetch rooms" };
  }
};

const fetchCount = async () => {
  try {
    const res = await roomRepository.getRoomsCount();
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Unable to fetch rooms" };
  }
};

const fetchAvailableRooms = async () => {
  try {
    const res = await roomRepository.getAvailabelRooms();
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Unable to fetch rooms" };
  }
};



export default { fetchPaginatedRooms,fetchCount,fetchAvailableRooms };
