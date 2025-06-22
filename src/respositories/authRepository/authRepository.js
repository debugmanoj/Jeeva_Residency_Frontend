import axiosInstance from "../../api/axiosInstance.js";
import endpoints from "../../api/endPoints.js";

const checkUser = (data) => {
    return axiosInstance.post(endpoints.auth.checkUser, data
        // {
        //     headers: { "Content-Type": "multipart/form-data" },
        // }
    );
};


export default {
    checkUser,
};
