import css from './index.module.scss';
import classnames from 'classnames';
import illustration from 'assets/img/illus/main.jpg';
import logo from 'assets/img/logo/logo.svg';
import Header from 'components/header';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { conferenceData as cd } from 'data/conference-data';

const topIllus = (
  <div className={classnames(css.illustration, 'd-flex align-items-center justify-content-center mt-2')}
    style={{ backgroundImage: `url(${illustration})` }}>
    <img className={classnames(css.logo, 'd-block mx-auto')} src={logo} alt={`${cd.name} ${cd.year}`} />
  </div>
);

const PageContain = ({
  padding = false,
  title = '',
  homeIllus = false,
  children,
  showRegBtn = true,
}) => {
  const pageTitle = title ? `${title} | ${cd.name_display} ${cd.year}` : `${cd.name_display} ${cd.year}`;
  const pageDescription = `Welcome to the ${cd.num} ${cd.name_display}, the annual gathering for meteor enthusiasts, researchers, and professionals. Join us from ${cd.dates.start} to ${cd.dates.end} to explore the latest in meteor science.`;

  return (
    <>
      <Helmet> 
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="IMC, International Meteor Conference, meteor astronomy, meteor research, IMO" />
        <meta name="author" content="International Meteor Organization (IMO)" />
        <meta name="theme-color" content="#002B36" />
 
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://imc{${cd.year}.imo.net`} />
 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={logo} />
 
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>

      <div className={classnames(css.pageContain, 'position-relative')}>
        <Header showRegBtn={showRegBtn} />

        {title && (
          <div className={classnames(css.title, 'p-3 p-md-4')} style={{ backgroundImage: `url(${illustration})` }}>
            <h2 className="m-0">{title}</h2>
          </div>
        )}

        {homeIllus && topIllus}

        <div className={classnames({ 'p-3': padding }, 'mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0')}>
          {children}
        </div>
      </div>
    </>
  );
};


export default PageContain;
