import { FaFileExcel } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const formatIcons = {
  xls: <FaFileExcel />, 
};

const DocButton = ({ link, format = "xls", title = "Download" }) => {
  return (
    <Link
      className="btn btn-outline-success d-inline-flex align-items-center gap-2"
      to={link}
      aria-label={`Download ${title} in ${format.toUpperCase()} format`}
    >
      {formatIcons[format] || null} {title}
    </Link>
  );
};

export default DocButton;
