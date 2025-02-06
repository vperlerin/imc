import logo from 'assets/img/logo/logo.svg';
import { SlClose, SlMenu } from "react-icons/sl";

import classnames from 'classnames';
import css from './index.module.scss';
import MenuItem from './item';
import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { formatConferenceDates } from 'utils/date';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from 'data/menu';
import { onStopPropagation } from 'utils/event';

const sideMenuWidth = parseInt(css.sharedSideMenuWidth, 10) || 250;

const Menu = ({ cd }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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
              <small className="m-0">{formatConferenceDates(cd.dates.start, cd.dates.end)}<br/>{cd.location}</small>
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
            })}
          </div>

          <div className={classnames(css.footer, 'p-3 mt-3 border-top mt-auto')}>
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
            developed & maintained by<br />
            <a href="https://https://www.mikehankey.com/html/" target="_blank" rel="noopener noreferrer">
              Mike Hankey & Associates
            </a>, LLC © {cd.year}
          </div>

        </div>
      </animated.div>
    </>
  );
};

export default Menu;
