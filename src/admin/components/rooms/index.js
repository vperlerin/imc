import classNames from "classnames";
import React, { useMemo } from "react";
import Loader from "components/loader";
import { Link } from "react-router-dom";
import { useApiAvailableRooms } from "@/admin/api/accomodations/index.js";

const AvailableRooms = ({ className, showLink = false }) => {
  const { availableRooms, loading, error } = useApiAvailableRooms();

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  } 
 
  const normalized = useMemo(() => {
    const rows = Array.isArray(availableRooms) ? availableRooms : [];

    return rows
      .filter((r) => (r?.type || r?.registration_type) !== "no")
      .map((r) => {
        const id = r?.id ?? r?.registration_type_id ?? null;
        const type = (r?.type ?? r?.registration_type ?? "").toString();
        const roomLeft = r?.room_left ?? r?.available_rooms ?? 0;
        const total = r?.total ?? r?.total_rooms ?? null;
        const used = r?.used ?? null;

        return {
          id,
          type,
          roomLeft: Number(roomLeft) || 0,
          total: total === null ? null : Number(total) || 0,
          used: used === null ? null : Number(used) || 0,
        };
      });
  }, [availableRooms]);

  const formatAvailability = (row) => {
    // Prefer the new live fields
    if (row.total !== null) {
      // Example: "12 left / 40"
      return {
        main: `${row.roomLeft} left`,
        sub: ` / ${row.total}`,
      };
    }

    // Fallback to old API if total is missing
    return {
      main: `${row.roomLeft} left`,
      sub: "",
    };
  };

  return (
    <div className={classNames(className, "position-relative", showLink && " border rounded-2 p-3 ")}>
      {loading && <Loader />}

      {showLink && (
        <h5>
          <Link to="/admin/accomodations">Available Rooms by Type</Link>
        </h5>
      )}

      {!loading && (
        <div className="d-flex flex-column flex-md-row gap-2">
          {normalized.map((row) => {
            const label = row.type ? row.type.charAt(0).toUpperCase() + row.type.slice(1) : "Unknown";
            const isSoldOut = row.roomLeft <= 0;
            const { main, sub } = formatAvailability(row);

            return (
              <div
                key={row.id ?? row.type}
                className={classNames("p-3 border rounded-2", {
                  "text-danger": isSoldOut,
                })}
              >
                {label}:<strong> {main}</strong>
                {sub && <small className="text-muted">{sub}</small>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AvailableRooms;
