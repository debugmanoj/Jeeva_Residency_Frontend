import axiosInstance from "../api/axiosInstance";
import endpoints from "../api/endPoints";

const createCustomer = (data) => {
  return axiosInstance.post(endpoints.customer.createCustomer, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export default {
  createCustomer,
};
