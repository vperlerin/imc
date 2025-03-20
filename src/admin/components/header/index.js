import smallLogo from 'assets/img/logo/small.svg';
//
import classnames from 'classnames';
import css from './index.module.scss';
import Menu from './menu';
import { authSelectors } from 'store/auth';
import { conferenceData as cd } from 'data/conference-data';
import { useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';

const Header = () => {
  const title = `${cd.name} ${cd.year}`; 
  const isLoc = useSelector(authSelectors.isLoc);
  const isSoc = useSelector(authSelectors.isSoc); 

  const adminHomeURL = isLoc ? '/admin/accommodations' :  isSoc ? '/admin/contributions/talks' : '/admin/dashboard';
  
 
  return (
    <div className="d-flex align-items-center justify-content-between border-bottom">
      <Menu cd={cd}  />
      <nav className="p-0 flex-wrap" aria-label="Main navigation">
        <div className={classnames(css.header, 'd-flex flex-row flew-wrap px-2 mb-1 justify-content-between')}>
          <Link
            aria-label="Admin"
            className={classnames('d-flex align-items-center text-dark text-decoration-none gap-2', css.title)}
            to={ adminHomeURL}
            title="Admin"
          >
            <img src={smallLogo} alt={title} className="rounded-circle border border-2 p-1" />
            <div className="d-flex flex-column">
              <h1 className="m-0 fw-bolder">{cd.name} {cd.year}</h1>
              <h2 className="m-0 d-none d-md-block">
                ADMIN AREA
                {isLoc &&  ` - Local Organizing Committee` }
                {isSoc &&  ` - Scientific Organizing Committee` }
              </h2>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Header;