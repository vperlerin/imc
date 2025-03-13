import { FaFileExcel } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const formatIcons = {
  xls: <FaFileExcel />,
};

const DocButton = ({ 
  link, 
  className, 
  format = "xls", 
  title = "Download" 
}) => {
  const isPhpRoute = link.startsWith("/php/");

  return (
    isPhpRoute ? (
      <a
        href={link} 
        className={`btn btn-outline-success d-inline-flex align-items-center gap-2 ${className}`}
        aria-label={`Download ${title} in ${format.toUpperCase()} format`}
      >
        {formatIcons[format] || null} {title}
      </a>
    ) : (
      <Link
        className={`btn btn-outline-success d-inline-flex align-items-center gap-2 ${className}`}
        to={link}
        aria-label={`Download ${title} in ${format.toUpperCase()} format`}
      >
        {formatIcons[format] || null} {title}
      </Link>
    )
  );
};

export default DocButton;
