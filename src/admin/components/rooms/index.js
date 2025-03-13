import classNames from "classnames";
import React from "react";
import Loader from "components/loader";
import { useApiAvailableRooms } from "@/admin/api/accomodations/index.js";  // Import available rooms hook

const AvailableRooms = ({ className }) => {
  // Fetch available rooms data
  const { availableRooms, loading, error } = useApiAvailableRooms();



  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div className={classNames(className, "p-3 border rounded-2 position-relative")}>
      {loading && <Loader />}


      <h5>Available Rooms by Type</h5>

      {error && (
        <div className="alert alert-danger fw-bolder">{error}</div>
      )}
      {!error && !loading && (
        <div className="d-flex flex-column flex-md-row gap-2">
          {availableRooms?.filter((room) => room.registration_type !== "no")
            .map((room) => {
              const roomType = room.registration_type.charAt(0).toUpperCase() + room.registration_type.slice(1); // Capitalize first letter
              const isRoomAvailable = Math.floor(room.available_rooms) === 0; // Check if rooms are available

              return (
                <div
                  key={room.registration_type_id}
                  className={classNames("p-3 border rounded-2", {
                    "text-danger": isRoomAvailable, // Add text-danger if no rooms are available
                  })}
                >
                  {roomType}: <strong>{parseFloat(room.available_rooms).toFixed(2)}</strong> <small>/ {room.total_rooms}</small> 
                </div>
              );
            })}
        </div>
      )}

    </div>
  );
};

export default AvailableRooms;
