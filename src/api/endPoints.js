const endPoints = {
    auth:{
        checkUser:"/auth/checkUser"
    },
  customer: {
    createCustomer: "/customer/createCustomer",
  },
 rooms: {
    scroll: "/room/getRooms",
    getCount: "/room/getCheckInCheckOutCount",
    getAvaialbeRooms: "/room/getAvaialbeRoom",
  },
};

export default endPoints;
