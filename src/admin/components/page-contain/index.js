import css from './index.module.scss';
import classnames from 'classnames';
import Header from '@/admin/components/header';
import Menu from '@/admin/components/header/menu';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { conferenceData as cd } from 'data/conference-data';
import BreadCrumb from '@/admin/components/breadcrumb';
import classNames from 'classnames';


const PageContain = ({
  breadcrumb = [],
  title = '',
  rightContent,
  children,
  isMaxWidth = false,
}) => {
  const pageTitle = title ? `${title} | ${cd.name_display} ${cd.year}` : `${cd.name_display} ${cd.year}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={classnames(css.pageContain, 'position-relative')}>
        <Header />
        <div className='d-flex flex-row'>
          <Menu cd={cd} />

          <div className="mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0">
            {breadcrumb.length !== 0 && (
              <BreadCrumb links={breadcrumb} />
            )}
            <div className="d-flex justify-content-between align-items-center">
              {title && <h2>{title}</h2>}
              {rightContent && <div>{rightContent}</div>}
            </div>
            <div className={classNames(isMaxWidth && css.maxW)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageContain;
