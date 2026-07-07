import classNames from 'classnames';
import cssForm from 'styles/components/form.module.scss';
import PageContain from 'components/page-contain';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { conferenceData as cd } from 'data/conference-data';
import { formatFullDate } from 'utils/date';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, fetchUser } from 'store/auth';
import { sendEmail } from 'hooks/send-email';

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

const locationMap = Object.fromEntries(carpoolingLocations.map((l) => [l.value, l.label]));

const availableDates =
  cd?.dates?.start && cd?.dates?.end ? getDateRange(cd.dates.start, cd.dates.end) : [];

const LUGGAGE_LABELS = {
  unknown: 'Unknown',
  small_bag: 'Small bag',
  cabin_suitcase: 'Cabin suitcase',
  large_suitcase: 'Large suitcase',
  limited: 'Limited',
};

const formatTime = (hour, minute) => {
  if (hour === null || hour === undefined) return null;
  const h = String(hour).padStart(2, '0');
  const m = String(minute ?? 0).padStart(2, '0');
  return `${h}:${m}`;
};

const Carpooling = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(authSelectors.getUser);
  const participantId = useSelector((state) => state.auth.participantId);
  const isAdmin = useSelector(authSelectors.isAdmin);
  const isOnlineParticipant = useSelector(authSelectors.isOnlineParticipant);

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(location.state?.alert || null);
  const [contactedOffers, setContactedOffers] = useState(new Set());
  const [contactingId, setContactingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  const loadOffers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterDate) params.append('departure_date', filterDate);
      if (filterLocation) params.append('departure_location_key', filterLocation);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/carpooling/get_offers.php?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setOffers(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to load offers.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load carpooling offers. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filterDate, filterLocation]);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleDelete = async (offerId) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      setDeletingId(offerId);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/carpooling/delete_offer.php`,
        { id: offerId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setAlert({ type: 'success', message: 'Your carpooling offer has been deleted.' });
        loadOffers();
      } else {
        setAlert({ type: 'danger', message: response.data.message || 'Failed to delete offer.' });
      }
    } catch (err) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'An error occurred while deleting the offer.' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleContact = async (offer) => {
    if (contactedOffers.has(offer.id)) return;
    try {
      setContactingId(offer.id);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/carpooling/get_offer.php?id=${offer.id}`,
        { withCredentials: true }
      );

      if (!response.data.success) {
        setAlert({ type: 'danger', message: response.data.message || 'Failed to load offer details.' });
        return;
      }

      const offerData = response.data.data;
      const requester = response.data.requester;

      if (!requester || !offerData.driver_email) {
        setAlert({ type: 'danger', message: 'Unable to retrieve contact details.' });
        return;
      }

      const departureLabel = locationMap[offer.departure_location_key] || offer.departure_location_custom || offer.departure_location_key;
      const departureDateLabel = formatFullDate(offer.departure_date, true, false);

      const driverEmail = await sendEmail({
        subject: 'Carpooling request for your conference ride offer',
        message:
          `Hello ${offerData.driver_first_name},<br><br>` +
          `${requester.first_name} ${requester.last_name} is interested in your carpooling offer from ${departureLabel} on ${departureDateLabel}.<br><br>` +
          `For privacy and security reasons, participant contact details are not displayed directly on the website.<br><br>` +
          `You can reply directly to this email to contact ${requester.first_name} and arrange the ride.<br><br>` +
          `Best regards,<br>The IMC organizing team`,
        to: offerData.driver_email,
        toName: `${offerData.driver_first_name} ${offerData.driver_last_name}`,
        fromName: 'IMC 2026',
        replyTo: requester.email,
        replyName: `${requester.first_name} ${requester.last_name}`,
        bcc: process.env.REACT_APP_BCC_ALL ? process.env.REACT_APP_BCC_ALL.split(',').map(email => ({ email, name: 'BCC Recipient' })) : [],
      });

      if (!driverEmail.success) {
        setAlert({ type: 'danger', message: driverEmail.message || 'Failed to send the contact email.' });
        return;
      }

      const requesterEmail = await sendEmail({
        subject: 'Your carpooling request has been sent',
        message:
          `Hello ${requester.first_name},<br><br>` +
          `Your interest in the carpooling offer from ${departureLabel} on ${departureDateLabel} has been sent to ${offerData.driver_first_name} ${offerData.driver_last_name}.<br><br>` +
          `They may contact you directly if they can offer you a seat.<br><br>` +
          `Best regards,<br>The IMC organizing team`,
        to: requester.email,
        toName: `${requester.first_name} ${requester.last_name}`,
        fromName: 'IMC 2026',
        bcc: process.env.REACT_APP_BCC_ALL ? process.env.REACT_APP_BCC_ALL.split(',').map(email => ({ email, name: 'BCC Recipient' })) : [],
      });

      if (!requesterEmail.success) {
        setAlert({ type: 'warning', message: 'Your request was sent to the driver, but the confirmation email to you could not be delivered.' });
        setContactedOffers((prev) => new Set(prev).add(offer.id));
        return;
      }

      setContactedOffers((prev) => new Set(prev).add(offer.id));
      setAlert({
        type: 'success',
        message: 'Your request has been sent to the participant who posted this offer.',
      });
    } catch (err) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'An error occurred while sending the contact request.' });
    } finally {
      setContactingId(null);
    }
  };

  const isOnsiteParticipant = participantId && !isOnlineParticipant;

  const filteredOffers = offers;
  const hasOffers = filteredOffers.length > 0;
  const hasAnyOffers = offers.length > 0 || !loading;

  return (
    <PageContain title="Carpooling">
      <div className="ps-md-3 mb-4">

        <p >
          By using this carpooling feature, you agree that the information you submit may be shared
          only with confirmed on-site conference participants, and only for the purpose of organizing
          shared rides.
        </p>

        <p >
          This feature is intended solely to help confirmed on-site participants organize shared
          rides. Any misuse, inappropriate behavior, or abuse should be reported immediately to the
          Organizing Committee via the{' '}
          <Link className="fw-bolder" to="/contact">contact form</Link>. 
          The IMO does not manage or take responsibility for any financial arrangements between
          drivers and passengers. We trust all participants to handle this matter responsibly,
          fairly, and respectfully.
        </p>
        <p>
          <b>Arrangements for return journeys after the conference should be coordinated directly
            between participants during the conference.</b>
        </p>

        {(isOnsiteParticipant || isAdmin) && (
          <div className="d-flex justify-content-center my-4">
            <Link
              className="btn btn-outline-success fw-bolder px-4"
              to="/travel/carpooling/offer"
            >
              Offer a ride
            </Link>
          </div>
        )}
      </div>

      {alert && (
        <div className={classNames('alert', `alert-${alert.type}`, 'mx-md-3')} role="alert">
          {alert.message}
        </div>
      )}

      <div className={classNames(cssForm.smallW, 'mx-auto mb-4')}>

        {hasAnyOffers && (
          <div className="row g-2 mb-3">
            <div className="col-sm-6">
              <select
                className="form-select"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="">All dates</option>
                {availableDates.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-6">
              <select
                className="form-select"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">All departure locations</option>
                {carpoolingLocations.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        )} 

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">{error}</div>
        )}

        {!loading && !error && !hasOffers && (
          <div className="text-center py-4 text-muted">
            {(filterDate || filterLocation)
              ? 'No carpooling offer matches your search.'
              : 'No carpooling offers have been posted yet.'}
          </div>
        )}

        {!loading && hasOffers && (
          <>
            <h4 className="mt-3">Current offers to the conference venue</h4>

            <div className="d-flex flex-column gap-3">
              {filteredOffers.map((offer) => {
                const isOwner = participantId && parseInt(offer.participant_id) === parseInt(participantId);
                const canEdit = isOwner || isAdmin;
                const departureLabel = locationMap[offer.departure_location_key] || offer.departure_location_custom || offer.departure_location_key;
                const timeStr = formatTime(offer.departure_hour, offer.departure_minute);
                const alreadyContacted = contactedOffers.has(offer.id);

                return (
                  <div key={offer.id} className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title mb-0 fw-bolder">
                          {offer.driver_first_name} {offer.driver_last_name} - From {departureLabel}
                        </h6>
                        {offer.status !== 'open' && (
                          <span className={classNames(
                            'badge',
                            offer.status === 'full' ? 'bg-warning text-dark' : 'bg-secondary'
                          )}>
                            {offer.status}
                          </span>
                        )}
                      </div>

                      <div className="row g-2 small mb-2">
                        <div className="col-sm-6">
                          <strong>Date:</strong> {formatFullDate(offer.departure_date, true, false)}
                          {timeStr && ` at ${timeStr}`}
                        </div>
                        <div className="col-sm-6">
                          <strong>To:</strong> {offer.destination || 'Conference venue'}
                        </div>

                        <div className="col-sm-6">
                          <strong>Seats:</strong> {offer.total_seats}
                        </div>
                        <div className="col-sm-6">
                          <strong>Luggage:</strong> {LUGGAGE_LABELS[offer.luggage_capacity] || offer.luggage_capacity}
                        </div>
                        <div className="col-sm-6">
                          <strong>Detour possible:</strong> {offer.possible_detour ? 'Yes' : 'No'}
                        </div>
                        {offer.languages && (
                          <div className="col-sm-6">
                            <strong>Languages:</strong> {offer.languages}
                          </div>
                        )}
                      </div>

                      {offer.comments && (
                        <p className="small mb-3">{offer.comments}</p>
                      )}

                      <div className="d-flex gap-2 mt-2 justify-content-end">
                        {!isOwner && (isOnsiteParticipant || isAdmin) && (
                          <button
                            className={classNames(
                              'btn  fw-bolder',
                              alreadyContacted ? 'btn-secondary' : 'btn-outline-success'
                            )}
                            disabled={alreadyContacted || contactingId === offer.id}
                            onClick={() => handleContact(offer)}
                          >
                            {contactingId === offer.id
                              ? 'Sending...'
                              : alreadyContacted
                                ? 'Already contacted'
                                : 'Contact'}
                          </button>
                        )}
                        {canEdit && (
                          <>
                            <Link
                              className="btn  btn-outline-primary fw-bolder"
                              to={`/travel/carpooling/offer/${offer.id}`}
                            >
                              Edit
                            </Link>
                            <button
                              className="btn  btn-outline-danger fw-bolder"
                              disabled={deletingId === offer.id}
                              onClick={() => handleDelete(offer.id)}
                            >
                              {deletingId === offer.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </PageContain>
  );
};

export default Carpooling;
