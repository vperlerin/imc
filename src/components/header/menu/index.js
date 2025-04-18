import logo from 'assets/img/logo/logo.svg';
import { SlClose, SlMenu } from "react-icons/sl";
import classnames from 'classnames';
import css from './index.module.scss';
import MenuItem from './item';
import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { authSelectors } from 'store/auth';
import { formatConferenceDates } from 'utils/date';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from 'data/menu';
import { onStopPropagation } from 'utils/event';
import { useApiLogout } from 'api/oauth/logout';

const sideMenuWidth = parseInt(css.sharedSideMenuWidth, 10) || 250;

const Menu = ({ cd }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = useSelector(authSelectors.isAdmin);
  const isLoc = useSelector(authSelectors.isLoc);
  const isSoc = useSelector(authSelectors.isSoc);
  const isParticipant = useSelector(authSelectors.isParticipant);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const { logout, loading: logoutLoading, error: logoutError } = useApiLogout(); // Use logout hook

  const [spring, api] = useSpring(() => ({
    right: -sideMenuWidth,
    config: { tension: 350, friction: 30 }
  }));

  useEffect(() => {
    if (isMenuOpened) {
      setIsFullyClosed(false);
      api.start({ right: 0 });
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
    } else {
      api.start({ right: -sideMenuWidth, onRest: () => setIsFullyClosed(true) });
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [isMenuOpened, api]);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpened(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onToggle = () => {
    setIsMenuOpened(prev => !prev);
  };

  const goTo = (url) => {
    navigate(url);
    onToggle();
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpened(false);
  };

  return (
    <>
      <button className={css.menuBtn} onClick={onToggle}>
        <SlMenu className={css.menuIcon} />
      </button>

      {!isFullyClosed && (
        <div
          className={classnames(css.menuOpenOverlay)}
          onClick={onToggle}
          onMouseDown={onStopPropagation}
          onTouchStart={onStopPropagation}
        />
      )}

      <animated.div className={classnames(css.swipeWrap)} style={spring}>
        <div className={classnames(css.menu, 'd-flex flex-column h-100')}>
          <button className={css.menuCloseBtn} onClick={onToggle}>
            <SlClose className={css.menuIcon} />
          </button>

          <div className="mb-3">
            <img className={classnames(css.logo, 'd-block mx-auto my-2')} src={logo} alt={`${cd.name} ${cd.year}`} />

            <div className="mx-3 text-center mb-3">
              <h4 className="fw-bolder m-0">IMC {cd.year}</h4>
              <small className="m-0">{formatConferenceDates(cd.dates.start, cd.dates.end)}<br />{cd.location}</small>
            </div>

            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.link) ||
                (item.subLinks && item.subLinks.some(sub => location.pathname.startsWith(sub.link)));

              if (!item.hideFromMenu) {
                return (
                  <MenuItem
                    key={item.link}
                    className={"py-2"}
                    isLinkActive={isActive}
                    goTo={goTo}
                    title={item.title}
                    url={item.link}
                  >
                    {item.subLinks && (
                      <>
                        {item.subLinks.map((sub) => {
                          const isSubActive = location.pathname === sub.link;
                          return (
                            <Link
                              aria-label={sub.title}
                              key={sub.link}
                              onClick={onToggle}
                              to={sub.link}
                              className={classnames(isSubActive && css.active)}
                              title={sub.title}
                            >
                              {sub.title}
                            </Link>
                          );
                        })}
                      </>
                    )}
                  </MenuItem>
                );
              }
              return null;
            })}
          </div>

          <div className={classnames(css.footer, 'mt-auto')}>
            <div className="d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4">
              {!isLoggedIn ? (
                <div className="d-flex justify-content-center mb-3 p-3">
                  <Link
                    aria-label="Login"
                    className="btn btn-outline-primary px-3 fw-bolder"
                    to="/login"
                    onClick={(e) => { e.preventDefault();  goTo('/login'); }}
                    title="Login"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <>
                  {isAdmin && (
                    <Link
                      aria-label="Admin"
                      className="btn btn-outline-tertiary px-3 fw-bolder"
                      to="/admin/dashboard"
                      onClick={(e) => { e.preventDefault();  goTo('/admin/dashboard'); }}
                      title="Admin"
                    >
                      Admin
                    </Link>
                  )}

                  {isLoc && (
                    <Link
                      aria-label="Admin"
                      className="btn btn-outline-tertiary px-3 fw-bolder"
                      to="/admin/accomodations"
                      onClick={(e) => { e.preventDefault();  goTo('/admin/accomodations'); }}
                      title="Admin"
                    >
                      LOC Admin
                    </Link>
                  )}

                  {isSoc && (
                    <Link
                      aria-label="Admin"
                      className="btn btn-outline-tertiary px-3 fw-bolder"
                      to="/admin/contributions/talks"
                      onClick={(e) => { e.preventDefault();  goTo('/admin/contributions/talks'); }}
                      title="Admin"
                    >
                      SOC Admin
                    </Link>
                  )}

                  {isParticipant && (
                    <Link
                      aria-label="Edit your record"
                      className="btn btn-outline-tertiary px-3 fw-bolder"
                      to="/update-registration"
                      onClick={(e) => { e.preventDefault();  goTo('/update-registration'); }}
                      title="Register"
                    >
                      Update Your Record
                    </Link>
                  )}

                  <button
                    aria-label="Logout"
                    className="btn btn-outline-danger px-3 fw-bolder"
                    onClick={handleLogout}
                    title="Logout"
                    disabled={logoutLoading}
                  >
                    {logoutLoading ? "Logging out..." : "Logout"}
                  </button>

                  {logoutError && <p className="text-danger mt-2">{logoutError}</p>}
                </>
              )}
            </div>

            <div className="border-top p-3">
              <Link
                aria-label="Service agreement & disclaimer"
                className="d-block"
                onClick={() => goTo('/disclaimer')}
                to={'/disclaimer'}
                title="Service agreement & disclaimer"
              >
                Service agreement & disclaimer
              </Link>

              <Link
                aria-label="Data Protection and Privacy"
                className="d-block"
                onClick={() => goTo('/gdpr')}
                to={'/gdpr'}
                title="Data Protection and Privacy"
              >
                Data Protection and Privacy
              </Link>
              <br />
              developed & maintained by<br />Vincent Perlerin for<br />
              <a href="https://www.mikehankey.com/html/" target="_blank" rel="noopener noreferrer">
                Mike Hankey & Associates
              </a>, LLC © {cd.year}
            </div>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Menu;
