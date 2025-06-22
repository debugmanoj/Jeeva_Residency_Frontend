import authRepository from "../respositories/authRepository/authRepository";

export const checkValidUser = async (data) => {
  try {
    const res = await authRepository.checkUser(data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export default {
  checkValidUser,
};
