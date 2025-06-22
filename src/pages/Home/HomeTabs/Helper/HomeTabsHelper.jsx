 import {statusColors,cardBackground} from "../../../../utils/Constants/RoomStatus_constants"


 export const sendCardContent = (roomsList,activeTab) => {
     return (
        <div
          key={roomsList._id}
          className={`font-sans p-[5%] rounded-lg ${cardBackground[roomsList.status]} shadow-md`}
        >
          <div className="flex justify-between items-center">
            <p className="text-xs font-medium text-gray-700">Room No: {roomsList?.roomNo}</p>
            <span
              className={`px-[7%] py-[2%] rounded-full text-xs font-medium ${statusColors[roomsList.status]}`}
            >
              {roomsList.status}
            </span>
          </div>
          <div className="mt-2">
            <p className=" text-gray-600 text-xs">
              <span className="font-medium text-xs">Bed Type:</span> <span className="font-bold text-black">{roomsList.bedType}</span>
            </p>
            <p className="text-sm text-gray-600 text-xs">
              <span className="font-medium  ">Floor:</span> <span className="text-black">{roomsList.floor}</span>
            </p>
          </div>
        </div>
        
      );
    // return roomsList[activeTab].map((card, index) => {
    //   return (
    //     <div
    //       key={index}
    //       className={`font-sans p-[5%] rounded-lg ${cardBackground[card.status]} shadow-md`}
    //     >
    //       <div className="flex justify-between items-center">
    //         <p className="text-xs font-medium text-gray-700">Room No: {card?.roomNo}</p>
    //         <span
    //           className={`px-[7%] py-[2%] rounded-full text-xs font-medium ${statusColors[card.status]}`}
    //         >
    //           {card.status}
    //         </span>
    //       </div>
    //       <div className="mt-2">
    //         <p className=" text-gray-600 text-xs">
    //           <span className="font-medium text-xs">Bed Type:</span> <span className="font-bold text-black">{card.bedType}</span>
    //         </p>
    //         <p className="text-sm text-gray-600 text-xs">
    //           <span className="font-medium  ">Floor:</span> <span className="text-black">{card.floor}</span>
    //         </p>
    //       </div>
    //     </div>
    //   );
    // });
  };

