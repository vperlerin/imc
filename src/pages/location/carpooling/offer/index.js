import classNames from 'classnames';
import cssForm from 'styles/components/form.module.scss';
import PageContain from 'components/page-contain';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { conferenceData as cd } from 'data/conference-data';
import { formatFullDate } from 'utils/date';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, fetchUser } from 'store/auth';

const getDateRange = (startDate, endDate, startOffsetDays = -1, endOffsetDays = 1) => {
  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setDate(start.getDate() + startOffsetDays);
  end.setDate(end.getDate() + endOffsetDays);
  return Array.from(
    { length: (end - start) / (1000 * 60 * 60 * 24) + 1 },
    (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const value = d.toISOString().split('T')[0];
      return { value, label: formatFullDate(value, false, false) };
    }
  );
};

const carpoolingLocations = (cd?.carpooling?.locations || []).map((loc) =>
  typeof loc === 'string'
    ? { value: loc, label: loc }
    : { value: loc.key, label: loc.label || loc.key }
);

const availableDates =
  cd?.dates?.start && cd?.dates?.end ? getDateRange(cd.dates.start, cd.dates.end) : [];

const CUSTOM_LOCATION_VALUE = '__other__';

const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: String(i).padStart(2, '0'),
}));

const minutes = Array.from({ length: 6 }, (_, i) => ({
  value: i * 10,
  label: String(i * 10).padStart(2, '0'),
}));

const seatOptions = Array.from({ length: 8 }, (_, i) => i + 1);

const luggageOptions = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'small_bag', label: 'Small bag' },
  { value: 'cabin_suitcase', label: 'Cabin suitcase' },
  { value: 'large_suitcase', label: 'Large suitcase' },
  { value: 'limited', label: 'Limited' },
];

const CarpoolingOffer = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDebugMode = new URLSearchParams(location.search).get('debug') === '1';
  const user = useSelector(authSelectors.getUser);
  const participantId = useSelector((state) => state.auth.participantId);
  const isAdmin = useSelector(authSelectors.isAdmin);

  const [loadingOffer, setLoadingOffer] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    reset,
  } = useForm();

  const selectedDeparture = watch('departure_location_key');
  const isCustomDeparture = selectedDeparture === CUSTOM_LOCATION_VALUE;

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  useEffect(() => {
    if (!isEditMode) return;

    const loadOffer = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/carpooling/get_offer.php?id=${id}`,
          { withCredentials: true }
        );

        if (!response.data.success) {
          setSubmitError(response.data.message || 'Failed to load offer.');
          return;
        }

        const offer = response.data.data;
        const isOwner = participantId && parseInt(offer.participant_id) === parseInt(participantId);

        if (!isOwner && !isAdmin) {
          navigate('/location/carpooling', { replace: true });
          return;
        }

        const locKey = carpoolingLocations.some((l) => l.value === offer.departure_location_key)
          ? offer.departure_location_key
          : CUSTOM_LOCATION_VALUE;

        reset({
          departure_location_key: locKey,
          departure_location_custom:
            locKey === CUSTOM_LOCATION_VALUE
              ? offer.departure_location_custom || offer.departure_location_key
              : '',
          departure_date: offer.departure_date,
          departure_hour: offer.departure_hour ?? '',
          departure_minute: offer.departure_minute ?? '',
          total_seats: String(offer.total_seats),
          luggage_capacity: offer.luggage_capacity || 'unknown',
          possible_detour: offer.possible_detour ? '1' : '0',
          languages: offer.languages || '',
          comments: offer.comments || '',
          status: offer.status || 'open',
        });
      } catch (err) {
        setSubmitError(err.response?.data?.message || 'Failed to load the offer. Please try again.');
      } finally {
        setLoadingOffer(false);
      }
    };

    if (participantId !== null || isAdmin) {
      loadOffer();
    }
  }, [id, isEditMode, participantId, isAdmin, navigate, reset]);

  const fillTestData = () => {
    setValue('departure_location_key', carpoolingLocations[0]?.value);
    setValue('departure_date', availableDates[0]?.value);
    setValue('departure_hour', 10);
    setValue('departure_minute', 0);
    setValue('total_seats', '3');
    setValue('luggage_capacity', 'cabin_suitcase');
    setValue('possible_detour', '1');
    setValue('languages', 'English, French');
    setValue('comments', 'I will be driving from the airport. Happy to make a short detour.');
    trigger();
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const payload = {
        departure_location_key:
          data.departure_location_key === CUSTOM_LOCATION_VALUE
            ? (data.departure_location_custom || '').trim()
            : data.departure_location_key,
        departure_location_custom:
          data.departure_location_key === CUSTOM_LOCATION_VALUE
            ? (data.departure_location_custom || '').trim()
            : null,
        departure_date: data.departure_date,
        departure_hour: data.departure_hour !== '' ? parseInt(data.departure_hour) : null,
        departure_minute: data.departure_minute !== '' ? parseInt(data.departure_minute) : null,
        destination: 'Conference venue',
        total_seats: parseInt(data.total_seats),
        luggage_capacity: data.luggage_capacity || 'unknown',
        possible_detour: data.possible_detour === '1',
        languages: data.languages || null,
        comments: data.comments || null,
        status: data.status || 'open',
      };

      let response;
      if (isEditMode) {
        payload.id = parseInt(id);
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/carpooling/update_offer.php`,
          payload,
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/carpooling/create_offer.php`,
          payload,
          { withCredentials: true }
        );
      }

      if (response.data.success) {
        navigate('/location/carpooling', {
          state: {
            alert: {
              type: 'success',
              message: isEditMode
                ? 'Your carpooling offer has been updated.'
                : 'Your carpooling offer has been published.',
            },
          },
        });
      } else {
        setSubmitError(response.data.message || 'Failed to save the offer.');
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOffer) {
    return (
      <PageContain title={`Carpooling — ${isEditMode ? 'Edit' : 'Offer a ride'}`}>
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </PageContain>
    );
  }

  return (
    <PageContain title={`Carpooling — ${isEditMode ? 'Edit offer' : 'Offer a ride'}`}>
      <div className="ps-md-3 mb-4">
        <p>
          {isEditMode
            ? 'Update the details of your carpooling offer below.'
            : 'Fill in the form below to offer available seats in your car.'}
        </p>
      </div>

      {submitError && (
        <div className="alert alert-danger mx-md-3" role="alert">{submitError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames(cssForm.smallW, 'mx-auto position-relative')}>
          {isDebugMode && (
            <button
              type="button"
              className="position-absolute top-0 end-0 btn btn-secondary btn-sm"
              onClick={fillTestData}
            >
              Fill Test Data
            </button>
          )}

          {/* Departure location */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Departure location</label>
            <div className="col-sm-9">
              <select
                className={classNames('form-select', errors.departure_location_key && 'is-invalid')}
                {...register('departure_location_key', { required: 'Departure location is required' })}
                onBlur={() => trigger('departure_location_key')}
              >
                <option value="">Select a departure location</option>
                {carpoolingLocations.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
                <option value={CUSTOM_LOCATION_VALUE}>Other (specify below)</option>
              </select>
              {errors.departure_location_key && (
                <p className="text-danger mb-0"><small>{errors.departure_location_key.message}</small></p>
              )}
              {isCustomDeparture && (
                <input
                  type="text"
                  className={classNames('form-control mt-2', errors.departure_location_custom && 'is-invalid')}
                  placeholder="Enter your departure location"
                  {...register('departure_location_custom', {
                    validate: (v) =>
                      !isCustomDeparture || (v && v.trim().length > 0) || 'Please specify your departure location',
                  })}
                  onBlur={() => trigger('departure_location_custom')}
                />
              )}
              {errors.departure_location_custom && (
                <p className="text-danger mb-0"><small>{errors.departure_location_custom.message}</small></p>
              )}
            </div>
          </div>

          {/* Departure date */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Departure date</label>
            <div className="col-sm-9">
              <select
                className={classNames('form-select', errors.departure_date && 'is-invalid')}
                {...register('departure_date', { required: 'Departure date is required' })}
                onBlur={() => trigger('departure_date')}
              >
                <option value="">Select a date</option>
                {availableDates.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {errors.departure_date && (
                <p className="text-danger mb-0"><small>{errors.departure_date.message}</small></p>
              )}
            </div>
          </div>

          {/* Departure time */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Time window</label>
            <div className="col-sm-9">
              <div className="d-flex gap-2 align-items-center">
                <select className="form-select w-auto" {...register('departure_hour')}>
                  <option value="">HH</option>
                  {hours.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <span>:</span>
                <select className="form-select w-auto" {...register('departure_minute')}>
                  <option value="">MM</option>
                  {minutes.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <small className="text-muted">Optional. Approximate departure time.</small>
            </div>
          </div>

          {/* Destination (disabled) */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Destination</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" value="Conference venue" disabled />
            </div>
          </div>

          {/* Total seats */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Available seats</label>
            <div className="col-sm-9">
              <select
                className={classNames('form-select', cssForm.mdAuto, errors.total_seats && 'is-invalid')}
                {...register('total_seats', { required: 'Number of seats is required' })}
                onBlur={() => trigger('total_seats')}
              >
                <option value="">Select</option>
                {seatOptions.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              {errors.total_seats && (
                <p className="text-danger mb-0"><small>{errors.total_seats.message}</small></p>
              )}
            </div>
          </div>

          {/* Luggage capacity */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Luggage capacity</label>
            <div className="col-sm-9">
              <select
                className="form-select"
                {...register('luggage_capacity')}
              >
                {luggageOptions.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Possible detour */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Possible detour</label>
            <div className="col-sm-9">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="1"
                  id="detour-yes"
                  {...register('possible_detour')}
                />
                <label className="form-check-label" htmlFor="detour-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="0"
                  id="detour-no"
                  defaultChecked
                  {...register('possible_detour')}
                />
                <label className="form-check-label" htmlFor="detour-no">No</label>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Languages</label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                placeholder="e.g. English, French"
                {...register('languages')}
              />
            </div>
          </div>

          {/* Comments */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Comments</label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Any additional information for potential passengers."
                {...register('comments')}
              />
            </div>
          </div>

          {/* Status (edit mode only) */}
          {isEditMode && (
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">Status</label>
              <div className="col-sm-9">
                <select className="form-select" {...register('status')}>
                  <option value="open">Open</option>
                  <option value="full">Full</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Link to="/location/carpooling" className="btn btn-outline-secondary fw-bolder">
              Back
            </Link>
            <button
              type="submit"
              className="btn btn-outline-success fw-bolder px-4"
              disabled={submitting}
            >
              {submitting
                ? 'Saving...'
                : isEditMode
                ? 'Update offer'
                : 'Publish offer'}
            </button>
          </div>
        </div>
      </form>
    </PageContain>
  );
};

export default CarpoolingOffer;
