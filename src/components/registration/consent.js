import classNames from "classnames";
import React, { useEffect } from "react";

const Consent = ({
  isAdmin = false,
  register,
  errors,
  trigger,
  setValue,
  initialData,
  watch
}) => {
  const canBePublic = watch("can_be_public");

  useEffect(() => {
    register("can_be_public");
  }, [register]);

  useEffect(() => {
    // Default to true if initialData is undefined or null
    const canBePublic =
      initialData?.can_be_public !== undefined
        ? !!Number(initialData.can_be_public)
        : true;

    setValue("can_be_public", canBePublic);
  }, [initialData, setValue]);

  return (
    <div className="mx-md-3 mb-3">
      <div className={classNames("form-check", isAdmin && "mt-4")}>
        <input
          className="form-check-input"
          id="canBePublic"
          type="checkbox"
          checked={canBePublic === true || canBePublic === "true"}
          {...register("can_be_public")}
        />
        <label className="form-check-label" htmlFor="canBePublic">
          By ticking this box, I agree that my first and last name, affiliation,
          and country will be publicly displayed on the{" "}
          <a
            href="/community/participants"
            target="_blank"
            rel="noopener noreferrer"
          >
            participants page
          </a>
          .
        </label>
      </div>
      {errors.can_be_public && (
        <p className="text-danger">{errors.can_be_public.message}</p>
      )}
    </div>
  );
};

export default Consent;
