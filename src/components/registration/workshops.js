import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useState } from "react";
import StepDislay from "components/registration/stepDisplay";
import axios from "axios";

const Workshops = ({
  isAdmin = false,
  initialData,
  isDebugMode = false,
  register,
  errors,
  step,
  stepTotal,
  trigger,
  setValue,
  watch
}) => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_workshops.php`);
        if (response.data.success) {
          setWorkshops(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch workshops.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (initialData?.workshops && workshops.length > 0) {
      workshops.forEach(workshop => {
        const isAttending = initialData.workshops.some(selected => selected.id === workshop.id);
        setValue(`workshops.${workshop.id}`, isAttending ? "true" : "false");
      });
    }
  }, [initialData, setValue, workshops]);

  if (loading) return <p>Loading workshops...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="position-relative">
      {isDebugMode && (
        <button
          type="button"
          className="position-absolute top-0 end-0 btn btn-secondary"
          onClick={() => {
            workshops.forEach(workshop => setValue(`workshops.${workshop.id}`, "true"));
            trigger();
          }}
        >
          Fill Test Data
        </button>
      )}

      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Workshops
        </h4>
      )}

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {workshops.map((workshop) => {
          const workshopId = workshop.id.toString();
          const selectedWorkshop = watch(`workshops.${workshopId}`) || "false";

          // Format date for readability
          const formattedDate = new Date(workshop.date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <div className="mb-5 row" key={workshopId}>
              <label className={classNames("text-md-center", cssForm.balance)}>
                <b>{workshop.title}</b> will be held on <b>{formattedDate}</b> from <b>{workshop.period}</b>.<br />
                Do you wish to attend for an extra price of {parseFloat(workshop.price).toFixed(2)}€?
              </label>

              <div className="text-center btn-group d-block mt-3" role="group">
                {/* Yes Button */}
                <input
                  type="radio"
                  className="btn-check"
                  id={`workshop-${workshopId}-yes`}
                  value="true"
                  {...register(`workshops.${workshopId}`, { required: "Please select an option" })}
                  onChange={() => setValue(`workshops.${workshopId}`, "true")}
                  checked={selectedWorkshop === "true"}
                />
                <label className="btn btn-outline-primary" htmlFor={`workshop-${workshopId}-yes`}>
                  Yes
                </label>

                {/* No Button */}
                <input
                  type="radio"
                  className="btn-check"
                  id={`workshop-${workshopId}-no`}
                  value="false"
                  {...register(`workshops.${workshopId}`, { required: "Please select an option" })}
                  onChange={() => setValue(`workshops.${workshopId}`, "false")}
                  checked={selectedWorkshop === "false"}
                />
                <label className="btn btn-outline-primary" htmlFor={`workshop-${workshopId}-no`}>
                  No
                </label>
              </div>

         
              {errors.workshops?.[workshopId] && (
                <p className="text-danger fw-bold text-center">
                  <small>{errors.workshops[workshopId].message}</small>
                </p>
              )}
            </div>
          );
        })}

        {!isAdmin && (
          <p>
            Read more about the <a href="/program/workshops/radio" target="_blank">Radio Workshop</a>
            and the <a href="/program/workshops/specto" target="_blank">Spectroscopy Workshop</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Workshops;
