import { SlClose, SlMenu } from "react-icons/sl";

import classnames from 'classnames';
import css from './index.module.scss';
import MenuItem from './item';
import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { authActions } from 'store/auth';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from 'data/admin-menu';
import { onStopPropagation } from 'utils/event';
import axios from 'axios';

const sideMenuWidth = parseInt(css.sharedSideMenuWidth, 10) || 250;

const Menu = ({ cd, isAdmin, isLoc, isSoc}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [spring, api] = useSpring(() => ({
    right: -sideMenuWidth,
    config: { tension: 350, friction: 30 }
  }));

  const handleLogout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout.php`, { withCredentials: true });
    dispatch(authActions.logout());  
    localStorage.removeItem("session");
    navigate('/');
  };

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
            <div className="m-3 text-center">
              <h4 className="fw-bolder m-0">IMC {cd.year}</h4>
              <small className="m-0">ADMIN AREA</small>
            </div>

            {menuItems.map((item) => {

              const isActive = location.pathname.startsWith(item.link) ||
                (item.subLinks && item.subLinks.some(sub => location.pathname.startsWith(sub.link)));

                const isAllowed =
                isAdmin ||  
                (isLoc && item?.allowed?.includes("loc")) ||
                (isSoc && item?.allowed?.includes("soc"));
            
              if (!isAllowed) return null; // Hide the menu item if not allowed 

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
            })}
          </div>

          <div className={classnames(css.footer, 'mt-auto')}>

            <div className="d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4">
              <button
                aria-label="Public site"
                className="btn btn-outline-success px-3 fw-bolder"
                onClick={() => goTo('/')}
                title="Public site"
              >
                Public site
              </button>
              <button
                aria-label="Logout"
                className="btn btn-outline-danger px-3 fw-bolder"
                onClick={handleLogout}
                title="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Menu;
