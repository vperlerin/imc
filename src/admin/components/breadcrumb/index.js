import { authSelectors } from 'store/auth';
import { useSelector } from 'react-redux';
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import classNames from "classnames";
import cssBreadcrumb from 'styles/components/breadcrumb.module.scss';

const BreadCrumb = ({ links = [] }) => {
  const isAdmin = useSelector(authSelectors.isAdmin);
  
  if(!isAdmin) return null;

  return (
    <nav aria-label="breadcrumb" className={cssBreadcrumb.nav}>
      <ol className={classNames("breadcrumb")}>
        
        <li className="breadcrumb-item lh-0">
          <Link to="/admin/dashboard">
            <IoHomeOutline className="me-1" /> 
          </Link>
        </li>
 
        {links.map((link, index) => (
          <li
            key={index}
            className={classNames("breadcrumb-item", {
              active: index === links.length - 1, 
            })}
            aria-current={index === links.length - 1 ? "page" : undefined}
          >
            {index === links.length - 1 ? (
              <b>{link.name}</b>  
            ) : (
              <Link to={link.url}>{link.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
