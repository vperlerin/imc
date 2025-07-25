import classames from "classnames";
import React, { useEffect } from "react";

const Consent = ({
  isAdmin = false,
  register,
  errors,
  isDebugMode = false,
  step,
  stepTotal,
  trigger,
  setValue,
  initialData
}) => {
  const defaultChecked = initialData === undefined || initialData?.can_be_public === "1" || initialData?.can_be_public === true;

  useEffect(() => {
    setValue("can_be_public", initialData?.can_be_public ?? true);
  }, [initialData, setValue]);

  return (
    <div className="mx-md-3 mb-3">
      <div className={classames('form-check', isAdmin && 'mt-4')}>
        <input
          className="form-check-input"
          id="canBePublic"
          type="checkbox"
          defaultChecked={defaultChecked}
          {...register("can_be_public")}
        />
        <label className="form-check-label" htmlFor="canBePublic">
          By ticking this box, I agree that my first and last name, affiliation, and country will be publicly displayed on the <a href="/community/participants" target="_blank" rel="noopener noreferrer">participants page</a>.
        </label>
      </div>
      {errors.can_be_public && <p className="text-danger">{errors.can_be_public.message}</p>}
    </div>
  );
};

export default Consent;