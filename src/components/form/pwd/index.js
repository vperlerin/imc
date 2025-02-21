import React, { useState } from "react";
import { FiEye, FiEyeOff  } from "react-icons/fi";

import classNames from "classnames";

const PasswordInput = ({ value, onChange, placeholder = "Enter password", disabled = false, className = "", props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={classNames("position-relative", className)}>
      <input
        type={isVisible ? "text" : "password"}
        className="form-control pe-5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <button
        type="button"
        className="btn position-absolute end-0 top-50 translate-middle-y p-2 border-0 bg-transparent"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        {isVisible ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
