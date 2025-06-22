import customerRepository from "../respositories/customerRepostiory.js";

const createCustomer = async (formData) => {
  try {
    const res = await customerRepository.createCustomer(formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export default {
  createCustomer,
};
