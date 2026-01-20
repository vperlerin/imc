import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import StepDislay from "components/registration/stepDisplay";
import React, { useEffect } from "react";
import { countries } from 'data/countries';

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const IdentityForm = ({
  isAdmin = false,
  register,
  errors,
  isDebugMode = false,
  isOnline = false,
  step,
  stepTotal,
  trigger,
  setValue,
}) => {

  const fillTestData = () => {
    if (!isOnline) {
      setValue("title", "Dr.");
      setValue("first_name", "Vincent");
      setValue("last_name", "Perlerin");
      setValue("gender", "Male");
      setValue("phone", "+33 686753212");
      setValue("email", "vperlerin@gmail.com");
      setValue("address", "16, rue Georges Bernanos");
      setValue("postal_code", "51100");
      setValue("city", "Reims");
      setValue("country", "FR");
      setValue("organization", "AMS/IMO");
      setValue("dobDay", "10");
      setValue("dobMonth", "9");
      setValue("dobYear", "1976");
    } else {
      setValue("title", "Dr.");
      setValue("first_name", "Hélène");
      setValue("last_name", "Perlerin");
      setValue("email", "vperlerin@gmail.com");
      setValue("gender", "Female");
      setValue("country", "FR"); 
      setValue("dobDay", "10");
      setValue("dobMonth", "9");
      setValue("dobYear", "1976");
    }

    trigger();
  };

  return (
    <>
      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Personal Details
        </h4>
      )}

      <div className={classNames(cssForm.smallW, 'mx-auto position-relative w-100')}>

        {isDebugMode &&
          <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        }

        {/* Title */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Title</label>
          <div className="col-sm-10">
            <select
              className={classNames('form-select', errors.title && "is-invalid", cssForm.mdAuto)}
              {...register("title", { required: "Title is required" })}
              onBlur={() => trigger("title")}
            >
              <option value="">Select a Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
            {errors.title && <p className="text-danger mb-0"><small>{errors.title.message}</small></p>}
          </div>
        </div>

        {/* First Name */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">First Name</label>
          <div className="col-sm-10">
            <input
              className={classNames('form-control', errors.first_name && "is-invalid", cssForm.md50)}
              placeholder="First Name"
              {...register("first_name", { required: "First name is required" })}
              onBlur={() => trigger("first_name")}
            />
            {!isOnline && !isAdmin && (
              <div className="form-text">If you need a <b>visa invitation letter</b>, enter your <b>First Name exactly as on your Passport</b>.</div>
            )}
            {errors.first_name && <p className="text-danger mb-0"><small>{errors.first_name.message}</small></p>}
          </div>
        </div>

        {/* Last Name */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Last Name</label>
          <div className="col-sm-10">
            <input
              className={classNames('form-control', errors.last_name && "is-invalid", cssForm.md50)}
              placeholder="Last Name"
              {...register("last_name", { required: "Last name is required" })}
              onBlur={() => trigger("last_name")}
            />
            {!isOnline && !isAdmin && (
              <div className="form-text">If you need a <b>visa invitation letter</b>, enter your <b>Last Name exactly as on your Passport</b>.</div>
            )}
            {errors.last_name && <p className="text-danger mb-0"><small>{errors.last_name.message}</small></p>}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Gender</label>
          <div className="col-sm-10">
            <select
              className={classNames('form-select', errors.title && "is-invalid", cssForm.mdAuto)}
              {...register("gender", { required: "Gender is required" })} onBlur={() => trigger("gender")}>
              <option value="">Select a Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-danger mb-0"><small>{errors.gender.message}</small></p>}
          </div>
        </div>

        {/* Phone Number */}
        {!isOnline && (
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Phone #</label>
            <div className="col-sm-10">
              <input type="tel"
                className={classNames('form-control', errors.phone && "is-invalid", cssForm.md50)}
                placeholder="Your Phone Number"
                {...register("phone",
                  {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+\d{1,3}\s?\d+$/,
                      message: "Invalid phone number format - please add +Country Code. Ex: +33 686 753 89"
                    }
                  })}
                onBlur={() => trigger("phone")}
              />
              {errors.phone && <p className="text-danger mb-0"><small>{errors.phone.message}</small></p>}
            </div>
          </div>
        )}
 
        {/* Email */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Email</label>
          <div className="col-sm-10">
            <input type="email"
              className={classNames('form-control', errors.email && "is-invalid", cssForm.md50)}
              placeholder="Your email"
              {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: "Invalid email format" } })}
              onBlur={() => trigger("email")}
            />
            {errors.email && <p className="text-danger mb-0"><small>{errors.email.message}</small></p>}
            {isOnline && !isAdmin && (
              <div className="form-text fw-bold">
                We will use this email to send you the access details for the online conference.
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        {!isOnline && (
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Address</label>
            <div className="col-sm-10">
              <input className={classNames('form-control', errors.address && "is-invalid")} placeholder="Address" {...register("address", { required: "Address is required" })} onBlur={() => trigger("address")} />
              {errors.address && <p className="text-danger mb-0"><small>{errors.address.message}</small></p>}
              {!isAdmin && (
                <div className="form-text">If you need a <b>visa invitation letter</b>, the address in this form should be your <b>official legal domicile or your professional contact address at your institute</b>.</div>
              )}
            </div>
          </div>
        )}

        {/* Post Code */}
        {!isOnline && (
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Postal Code</label>
            <div className="col-sm-10">
              <input
                className={classNames('form-control', errors.email && "is-invalid", cssForm.md50)}
                placeholder="Postal Code"
                {...register("postal_code", { required: "Postal Code is required" })}
                onBlur={() => trigger("postal_code")} />
              {errors.postal_code && <p className="text-danger mb-0"><small>{errors.postal_code.message}</small></p>}
            </div>
          </div>
        )}

        {/* City */}
        {!isOnline && (
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">City</label>
            <div className="col-sm-10">
              <input className={classNames('form-control', errors.city && "is-invalid", cssForm.md50)} placeholder="City"
                {...register("city", { required: "City is required" })} onBlur={() => trigger("city")} />
              {errors.city && <p className="text-danger mb-0"><small>{errors.city.message}</small></p>}
            </div>
          </div>
        )}

        {/* Country */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Country</label>
          <div className="col-sm-10">
            <select className={classNames('form-select', errors.country && "is-invalid", cssForm.mdAuto)}
              {...register("country", { required: "Country is required" })}
              onBlur={() => trigger("country")}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-danger mb-0"><small>{errors.country.message}</small></p>}
          </div>
        </div>

        {/* Organization   */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Organization</label>
          <div className="col-sm-10">
            <input className={classNames('form-control', cssForm.md50)} placeholder="Organization" {...register("organization")} />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold">Date of Birth</label>
          <div className="col-sm-10 ">
            <div className="d-flex gap-2">
              {/* Day */}
              <select
                className={classNames('form-select', errors.dobDay && "is-invalid", cssForm.mdAuto)}
                {...register("dobDay", { required: "Day is required" })} onBlur={() => trigger("dobDay")}>
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              {/* Month */}
              <select
                className={classNames('form-select', errors.dobMonth && "is-invalid", cssForm.mdAuto)}

                {...register("dobMonth", { required: "Month is required" })} onBlur={() => trigger("dobMonth")}>
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </select>

              {/* Year */}
              <select
                className={classNames('form-select', errors.dobYear && "is-invalid", cssForm.mdAuto)}
                {...register("dobYear", { required: "Year is required" })} onBlur={() => trigger("dobYear")}>
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {!isOnline && !isAdmin && (
              <div className="form-text">
                <b>Underaged IMC participants</b> must be accompanied and have the <b>legalized documents for travelling abroad without parents</b>.
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-sm-2 col-form-label" />
            <div className="d-flex gap-2 col-sm-10 d-flex gap-2">
              {errors.dobYear && <p className="text-danger mb-0"><small>{errors.dobYear.message}</small></p>}
              {errors.dobMonth && <p className="text-danger mb-0"><small>{errors.dobMonth.message}</small></p>}
              {errors.dobDay && <p className="text-danger mb-0"><small>{errors.dobDay.message}</small></p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdentityForm;
