import classnames from 'classnames';
import css from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';

const MenuItem = React.forwardRef(({
  children,
  className, 
  goTo = null,
  isLinkActive,
  title,
  url = null,
}, ref) => {
  const [ isActive, setIsActive ] = useState(isLinkActive);
  const [ height, setHeight ] = useState('0px');
  const links = useRef(null);

  useEffect(() => {
    if (!children) {
      return;
    }

    if (isActive) {
      setHeight(`${links.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [ children, isActive, links ]);

  const toggle = (e) => {
    e.preventDefault();

    if (children) {
      setIsActive(!isActive);
    } else if (goTo && url) {
      goTo(url);
    }
  };


  const Caret = (props) => {
    return (
      <div className={classnames(props.className, isActive && css.rotate)}>
        <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            fill={props.fill}
          />
        </svg>
      </div>
    );
  };
 

  return (
    <div className={classnames(css.menuItem, 'd-flex flex-column', className)} ref={ref}>
      <a className={classnames(css.menuItemTitle, 'd-flex justify-content-between w-100 align-items-center px-3', isLinkActive && css.active)} href={url || undefined} onClick={toggle}>
        <span className="d-flex align-items-center">
          <b>{title}</b> 
        </span>
        {children && <Caret className={css.caret} />}
      </a>
      {children && (
        <div className={css.menuItemsHolder} ref={links} style={children && { maxHeight: `${height}` }}>
          {children}
        </div>
      )}
    </div>
  );
});

export default MenuItem;
