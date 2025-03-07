import classNames from 'classnames';
import css from './index.module.scss';
import React, { useState, useEffect } from "react";

const Loader = ({ hasOverlay = true, text = '' }) => {
  const [isFirstText, setIsFirstText] = useState(true);

  // Split text if contains "|"
  const textParts = text.includes('|') ? text.split('|').map(t => t.trim()) : [text];

  useEffect(() => {
    if (textParts.length > 1) {
      const interval = setInterval(() => {
        setIsFirstText(prev => !prev);
      }, 2000); // Switch text every 2 seconds
      return () => clearInterval(interval);
    }
  }, [text]);

  return (
    <>
      {hasOverlay && (
        <div className={classNames(css.overlay, 'position-fixed top-0 bottom-0 start-0 end-0 w-100 h-100')} />
      )}

      <div className={classNames(css.universe, 'position-absolute top-0 bottom-0 start-0 end-0 w-100 h-100')}>
        <div className={css.galaxy}>
          <div className={css.circle}></div>
          <div className={css.circle2}></div>
          <div className={css.circle3}></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={css[`orbit${i}`]}>
              <div className={css[`pos${i}`]}>
                <div className={css[`dot${i}`]}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!!text && (
        <div className={classNames(css.text, 'position-absolute top-0 bottom-0 start-0 end-0 w-100 h-100 d-flex align-items-center justify-content-center align-content-center text-center mx-auto')}>
          {textParts.length > 1 ? (
           <>
              <span className={isFirstText ? css.visible : css.hidden}>{textParts[0]}</span>
              <span className={isFirstText ? css.hidden : css.visible}>{textParts[1]}</span>
            </>
          ) : (
            <div>{text}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
