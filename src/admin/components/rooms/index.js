import classNames from "classnames";
import React from "react";
import Loader from "components/loader";
import { Link } from "react-router-dom";
import { useApiAvailableRooms } from "@/admin/api/accomodations/index.js";

const AvailableRooms = ({ className, showLink = false }) => {
  const { availableRooms, loading, error } = useApiAvailableRooms();

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  // Function to format room availability
  const formatRoomAvailability = (roomType, available) => {
    const roomCapacity = {
      single: 1,
      double: 2,
      quadruple: 4,
    }[roomType] || 1; // Default to 1 if type is unknown

    const fullRooms = Math.floor(available);
    const remainingBeds = Math.round((available - fullRooms) * roomCapacity);

    let displayText = `${fullRooms} rooms left`;
    if (remainingBeds > 0) {
      displayText += ` + ${remainingBeds} bed${remainingBeds > 1 ? "s" : ""}`;
    }

    return displayText;
  };

  return (
    <div className={classNames(className, "p-3 border rounded-2 position-relative")}>
      {loading && <Loader />}

      {!showLink ? (
        <h5>Available Rooms by Type</h5> 
      ) : (
        <h5><Link to="/admin/accomodations">Available Rooms by Type</Link></h5> 
      )}

      {error && (
        <div className="alert alert-danger fw-bolder">{error}</div>
      )}
      {!error && !loading && (
        <div className="d-flex flex-column flex-md-row gap-2">
          {availableRooms?.filter((room) => room.registration_type !== "no")
            .map((room) => {
              const roomType = room.registration_type.toLowerCase();
              const isRoomAvailable = Math.floor(room.available_rooms) === 0;

              return (
                <div
                  key={room.registration_type_id}
                  className={classNames("p-3 border rounded-2", {
                    "text-danger": isRoomAvailable,
                  })}
                >
                  {roomType.charAt(0).toUpperCase() + roomType.slice(1)}:
                  <strong> {formatRoomAvailability(roomType, parseFloat(room.available_rooms))}</strong>
                  <small className="text-muted"> / {room.total_rooms}</small>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AvailableRooms;
