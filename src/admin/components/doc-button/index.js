import { FaFileExcel } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const formatIcons = {
  xls: <FaFileExcel className="mt-1" />,
};

const DocButton = ({
  className,
  format = "xls",
  link,
  subTitle = "",
  title = "Download",
}) => {
  const isPhpRoute = true;

  return (
    isPhpRoute ? (
      <a
        href={link}
        className={`btn btn-outline-success d-inline-flex align-items-start gap-2 ${className}`}
        aria-label={`Download ${title} in ${format.toUpperCase()} format`}

      >
        {formatIcons[format] || null}
        <div className="d-flex flex-column align-items-start">
          {title}
          {subTitle && (
            <span className="text-muted fw-normal">{subTitle}</span>
          )}
        </div>
      </a>
    ) : (
      <Link
        className={`btn btn-outline-success d-inline-flex align-items-start gap-2 ${className}`}
        to={link}
        aria-label={`Download ${title} in ${format.toUpperCase()} format`}
      >
        {formatIcons[format] || null} {title}
        <div className="d-flex flex-column align-items-start">
          {title}
          {subTitle && (
            <span className="text-muted fw-normal">{subTitle}</span>
          )}
        </div>
      </Link>
    )
  );
};

export default DocButton;
