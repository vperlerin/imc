import classNames from "classnames";
import React, { useMemo } from "react";
import Loader from "components/loader";
import { Link } from "react-router-dom";
import { useApiAvailableRooms } from "@/admin/api/accomodations/index.js";
import { formatRegistrationTypeForDisplay, formatRegistrationTypeTitle } from "utils/registration-type-display";

const pluralize = (n, singular, plural) => `${n} ${n === 1 ? singular : plural}`;

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
        const totalRooms = Number(r?.total_rooms ?? r?.total ?? r?.total_rooms ?? 0) || 0;
        const bedsPerRoom = Number(r?.beds_per_room ?? 1) || 1;
        const bedsTotal = Number(r?.beds_total ?? totalRooms * bedsPerRoom) || 0;
        const used = Number(r?.used ?? 0) || 0;
        // Prefer server-computed beds_left; fall back to room_left (now bed-meaning) or compute.
        const bedsLeftFallback = Math.max(bedsTotal - used, 0);
        const bedsLeft = Number(r?.beds_left ?? r?.room_left ?? bedsLeftFallback) || 0;
        const roomsLeft =
          r?.rooms_left != null ? Number(r.rooms_left) || 0 : Math.floor(bedsLeft / Math.max(bedsPerRoom, 1));
        const partialBedsLeft =
          r?.partial_beds_left != null
            ? Number(r.partial_beds_left) || 0
            : bedsLeft % Math.max(bedsPerRoom, 1);

        return {
          id,
          type,
          totalRooms,
          bedsPerRoom,
          bedsTotal,
          used,
          bedsLeft,
          roomsLeft,
          partialBedsLeft,
        };
      });
  }, [availableRooms]);

  const formatAvailability = (row) => {
    if (row.bedsLeft <= 0) {
      return {
        main: "Sold out",
        sub: row.bedsTotal > 0 ? ` (0 / ${row.bedsTotal} beds)` : "",
      };
    }

    const typeLabel = formatRegistrationTypeForDisplay(row.type) || "room";
    const parts = [];
    if (row.roomsLeft > 0) {
      parts.push(`${pluralize(row.roomsLeft, `${typeLabel} room`, `${typeLabel} rooms`)} left`);
    }
    if (row.partialBedsLeft > 0) {
      parts.push(`${pluralize(row.partialBedsLeft, "bed", "beds")} in a ${typeLabel} room`);
    }

    return {
      main: parts.join(" + "),
      sub: ` (${row.bedsLeft} / ${row.bedsTotal} beds)`,
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
            const label = row.type ? formatRegistrationTypeTitle(row.type) : "Unknown";
            const isSoldOut = row.bedsLeft <= 0;
            const { main, sub } = formatAvailability(row);

            return (
              <div
                key={row.id ?? row.type}
                className={classNames("p-3 border rounded-2", {
                  "text-danger": isSoldOut,
                })}
              >
                {label}: <strong>{main}</strong>
                {sub && <small className="d-block text-muted">{sub}</small>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AvailableRooms;
