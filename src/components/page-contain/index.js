import css from './index.module.scss';
import classnames from 'classnames';
import illustration from 'assets/img/illus/main.jpg';
import logo from 'assets/img/logo/logo.svg';
import Header from 'components/header';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { conferenceData as cd } from 'data/conference-data';

const topIllus = (
  <div className={classnames(css.illustration, 'd-flex align-items-center justify-content-center')} 
       style={{ backgroundImage: `url(${illustration})` }}>
    <img className={classnames(css.logo, 'd-block mx-auto')} src={logo} alt={`${cd.name} ${cd.year}`} />
  </div>
);

const PageContain = ({
  padding = true,
  title = '',
  homeIllus = false,
  children
}) => {
  return (
    <>
      <Helmet>

      </Helmet>
      <div className={classnames(css.pageContain,' position-relative')}>
      <Header />
      
      {title && (
        <div className={classnames(css.title,'p-3 p-md-4')} style={{ backgroundImage: `url(${illustration})` }}>
          <h2 className="m-0">{title}</h2>
        </div>  
      )}
      
      {homeIllus && topIllus}

      <div className={classnames({ 'p-3': padding })}>
        {children}
      </div>
    </div>
    </>

  );
};

export default PageContain;
