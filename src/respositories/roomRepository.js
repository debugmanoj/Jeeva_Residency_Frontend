import axios from "../api/axiosInstance";
// import endpoints from "../api/endpoints.js";
import endpoints from "/src/api/endPoints.js";

const getRoomsPaginated = (page = 1, limit = 10,activeTab="ALL") => {
  return axios.get(`${endpoints.rooms.scroll}?page=${page}&limit=${limit}&status=${activeTab}`);
};

const getRoomsCount = () => {
  return axios.get(`${endpoints.rooms.getCount}`);
};

const getAvailabelRooms = () => {
  return axios.get(`${endpoints.rooms.getAvaialbeRooms}`);
};

export default { getRoomsPaginated,getRoomsCount,getAvailabelRooms };
