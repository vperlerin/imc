import css from "./index.module.scss";
import classNames from "classnames";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useState } from "react";
import { formatFullDate } from "utils/date";

const AdminTable = ({ participants, withActions = true, customActions = null, onDelete = null }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDeleteClick = (participant) => {
    onDelete?.(participant);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => {
    if (!sortColumn) return 0;

    let valueA = a[sortColumn];
    let valueB = b[sortColumn];

    // Handle numeric fields
    if (["total_due", "total_paid", "paypal_fee"].includes(sortColumn)) {
      valueA = parseFloat(valueA) || 0;
      valueB = parseFloat(valueB) || 0;
    }

    // Handle due amount separately
    if (sortColumn === "due_amount") {
      const getDueAmount = (participant) => {
        const totalDue = parseFloat(participant.total_due) || 0;
        const totalPaid = parseFloat(participant.total_paid) || 0;
        const paypalFee = parseFloat(participant.paypal_fee || 0);
        return participant.payment_method_name?.toLowerCase() === "paypal"
          ? totalDue + paypalFee - totalPaid
          : totalDue - totalPaid;
      };
      valueA = getDueAmount(a);
      valueB = getDueAmount(b);
    }

    // Handle dates
    if (["created_at", "confirmation_date"].includes(sortColumn)) {
      valueA = valueA ? new Date(valueA).getTime() : 0;
      valueB = valueB ? new Date(valueB).getTime() : 0;
    }

    // Handle payment_method_name case-insensitively and default to empty string if missing
    if (sortColumn === "payment_method") {
      valueA = a.payment_method_name ? a.payment_method_name.toLowerCase() : "";
      valueB = b.payment_method_name ? b.payment_method_name.toLowerCase() : "";
    }

    // Handle confirmation_sent as boolean-like sorting
    if (sortColumn === "confirmation_sent") {
      valueA = valueA === "1" ? 1 : 0;
      valueB = valueB === "1" ? 1 : 0;
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });


  return (
    <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className={css.cursor} onClick={() => handleSort("id")}>#</th>
            <th className={css.cursor} onClick={() => handleSort("created_at")}>Reg. Date</th>
            <th className={css.cursor} onClick={() => handleSort("last_name")}>Name</th>
            <th className={css.cursor} onClick={() => handleSort("total_due")}>Total</th>
            <th className={css.cursor} onClick={() => handleSort("total_paid")}>Paid</th>
            <th className={css.cursor} onClick={() => handleSort("due_amount")}>Due</th>
            <th className={css.cursor} onClick={() => handleSort("payment_method")}>Method</th>
            <th className={css.cursor} onClick={() => handleSort("confirmation_sent")}>Confirmed</th>
            <th className={css.cursor} onClick={() => handleSort("confirmation_date")}>Conf. Email</th>
            {(withActions || customActions) && <th></th>}
          </tr>
        </thead>
        <tbody>
          {sortedParticipants.length > 0 ? (
            sortedParticipants.map((participant) => {
              const totalDue = parseFloat(participant.total_due) || 0;
              const totalPaid = parseFloat(participant.total_paid) || 0;
              const paypalFee = parseFloat(participant.paypal_fee || 0);
              const isPaypal = participant.payment_method_name?.toLowerCase() === "paypal";
              const amountDue = isPaypal ? totalDue + paypalFee - totalPaid : totalDue - totalPaid;

              return (
                <tr key={participant.id} className={participant.status === 'cancelled' ? 'text-warning ' : ''}>
                  <td>{participant.id}</td>
                  <td>{participant.created_at.split(" ")[0]}</td>
                  <td>{participant.title} {participant.first_name} {participant.last_name}</td>
                  <td>{isPaypal ? (totalDue + paypalFee).toFixed(2) : totalDue.toFixed(2)}€</td>
                  <td>{totalPaid.toFixed(2)}€</td>
                  <td className={classNames({ "text-success": amountDue === 0 })}>
                    {amountDue.toFixed(2)}€
                  </td>
                  <td>{participant.payment_method_name || "n/a"}</td>
                  <td>{participant.confirmation_sent === "1" ? "✅" : "❌"}</td>
                  <td className={classNames(participant.status === 'cancelled' ? "text-warning" : participant?.confirmation_date && "text-success")}>
                    {participant.status === 'cancelled'
                      ? "CANCELLED"
                      : participant.confirmation_date
                        ? formatFullDate(participant.confirmation_date)
                        : "❌"}
                  </td> 
                  {withActions && onDelete && (
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        {participant.status === 'cancelled' ? (
                          <a href={`/admin/participants/${participant.is_online ? 'online' : 'onsite'}/payment/${participant.id}`} className="btn btn-sm btn-outline-success fw-bolder">Reimbursements</a>
                        ) : (
                          <a href={`/admin/participants/${participant.is_online ? 'online' : 'onsite'}/payment/${participant.id}`} className="btn btn-sm btn-outline-success fw-bolder">Payments</a>
                        )}

                        <a href={`/admin/participants/${participant.is_online ? 'online' : 'onsite'}/${participant.id}`} className="btn btn-sm btn-outline-primary fw-bolder">Edit</a>
                        <button
                          className="btn btn-sm btn-outline-danger d-inline-flex align-items-center"
                          onClick={() => handleDeleteClick(participant)}
                          title="Delete Payment"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </td>
                  )}
                  {customActions && participant.status !== 'cancelled' && (
                    <>{customActions}</>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={withActions ? 10 : 9} className="text-center">No participants found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
