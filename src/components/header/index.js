import smallLogo from 'assets/img/logo/small.svg';
//
import authSlice from 'store/auth';
import classnames from 'classnames';
import css from './index.module.scss';
import Menu from './menu';
import { conferenceData as cd } from 'data/conference-data';
import { formatConferenceDates } from 'utils/date';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ showRegister = true }) => {
  const authUser = useSelector(authSlice.selectors.getUser);
  const title = `${cd.name} ${cd.year}`;

  return (
    <>
      <div className={classnames(showRegister && css.minWrap, 'd-flex align-items-center justify-content-between')}>
        <nav className="p-0 flex-wrap" aria-label="Main navigation">
          <div className={classnames(css.header, 'd-flex flex-row flew-wrap px-2 mb-1 justify-content-between')}>
            <a href="/" className={classnames('d-flex align-items-center text-dark text-decoration-none gap-2', css.title)}>
              <img src={smallLogo} alt={title} className="rounded-circle border border-2 p-1" />
              <div className="d-flex flex-column">
                <h1 className="m-0 fw-bolder">{cd.name} {cd.year}</h1>
                <h2 className="m-0 d-none d-md-block">{formatConferenceDates(cd.dates.start, cd.dates.end)} - {cd.location}</h2>
              </div>
            </a>
          </div>
        </nav>
        {showRegister && (
          <Link
            aria-label="Register"
            className="btn btn-outline-primary fw-bolder"
            to="/register"
            title="Register"
          >
            Register <span className="d-none d-sm-inline-block">Now!</span>
          </Link>
        )}
      </div>
      <Menu cd={cd} />
    </>

  )
}

export default Header;