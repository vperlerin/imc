import logo from 'assets/img/logo/logo.svg';
import illustration from 'assets/img/illus/main.jpg';
import org1 from 'assets/img/org/1.svg';
import org2 from 'assets/img/org/2.png';
//
import classnames from 'classnames';
import css from './index.module.scss';
import PageContain from 'components/page-contain';
import React from "react";
import { conferenceData as cd } from 'data/conference-data';
import { formatConferenceDates, formatFullDate } from 'utils/date';
import { Link } from 'react-router-dom';


const Home = () => {
  const illus = (
    <div className={classnames(css.illustration, 'd-flex align-items-center justify-content-center')} style={{ backgroundImage: `url(${illustration})` }}>
      <img className={classnames(css.logo, 'd-block mx-auto')} src={logo} alt={`${cd.name} ${cd.year}`} />
    </div>
  );

  const orgImages = [org1, org2];
  const showEarlyBirdNotice = new Date() < new Date(cd.deadlines.early_birds);

  const showEndMessage = false;

  return (
    <PageContain homeIllus>
      <div className={classnames('d-flex flex-column-reverse flex-md-row mt-2', css.wrapInner)}>
        <div className={classnames(css.col1, 'p-md-0 p-3 pt-md-2')}>
          <h4 className="fw-bolder">Join the IMO!</h4>
          <p>
            Join the International Meteor Organization (IMO) and connect with a global community of meteor enthusiasts! The International Meteor Conference (IMC) offers a <b>€5 discount on your first-year membership</b>, and <b>current members can save €5 on renewal at the conference</b>. Membership includes the <b>WGN journal and exclusive access to essential meteor observation resources</b>. Join today on the <a href="https://www.imo.net" target="_blank" rel="noopener noreferrer">IMO website</a>!
          </p>
          <div className="text-center text-md-start">
            <a className="btn btn-outline-primary fw-bolder mx-auto " href="https://www.imo.net/members/imo_registration/register/" target="_blank" rel="noopener noreferrer">Join the IMO</a>
          </div>
        </div>
        <div>
          <h2 className="mb-3 fw-bolder">{cd.welcome}</h2>

          {showEndMessage ? (
            <>
              The International Meteor Conference {cd.year} in Soest was a great success, bringing together professional and amateur meteor enthusiasts from around the world.
              You can relive the best moments through our shared photo gallery:
              <div className="my-3">
                <a href="https://www.flickr.com/photos/203547527@N07/"> <img src="https://live.staticflickr.com/65535/54811827937_a8c898d7f8_c.jpg" alt="IMC2025 Group Photo" class="img-fluid w-100" /></a>
              </div>
            </>
          ) : (
            <>
              <p>
                The {cd.num} International Meteor Conference (IMC {cd.year}) will be held in {cd.location} from {formatConferenceDates(cd.dates.start, cd.dates.end)}.
                The IMC is the annual meeting of the IMO, which brings together amateurs from all over the world who engage in meteor observation, analysis and instrumentation.
              </p>
              <p>
                Its objectives are to encourage, support and coordinate meteor observing, to improve the quality of amateur observations, to disseminate observations and results to other amateurs and professionals and to make global analyses of observations received world-wide. The program includes talks on the latest developments, poster sessions and entertainment.
              </p>

              <div className={classnames('d-flex flex-column align-items-center justify-content-center mb-3 p-3', showEarlyBirdNotice && ' border rounded-2')}>
                <Link
                  aria-label="Register"
                  className={classnames('btn btn-outline-primary fw-bolder d-block', showEarlyBirdNotice && 'mb-2')}
                  to="/register"
                  title="Register Now"
                >
                  Register before {formatFullDate(cd.deadlines.reg)}
                </Link>
                {showEarlyBirdNotice && (
                  <b className="fw-bolder d-block text-md-start text-center">
                    Enjoy an early bird discount of {cd.costs.after_early_birds}€ by signing up before{' '}
                    <span className="text-info">{formatFullDate(cd.deadlines.early_birds)}</span>!
                  </b>
                )}
              </div>
            </>
          )}

          <p>
            IMC {cd.year} was jointly organized by
            {cd.co_organizer.map((org, index) => (
              <React.Fragment key={org.abbr}>
                {index === 0 ? " " : " and "}
                <a href={org.website} target="_blank" rel="noopener noreferrer">{org.name}</a>
                {org?.abbr && (
                  <>{' '}
                    ({org.abbr})
                  </>
                )} 
              </React.Fragment>
            ))}.
          </p>

          <div className={classnames(css.organizers, 'd-flex align-items-center justify-content-center gap-3')}>
            {cd.co_organizer.slice(0, 2).map((org, index) => (
              <a className={css.org} key={org.abbr} href={org.website} target="_blank" rel="noopener noreferrer">
                <img src={orgImages[index]} className={classnames('img-fluid', css.orgImg)} alt={org.name} />
              </a>
            ))}

          </div>
        </div>
      </div>
    </PageContain >
  );
};

export default Home;
