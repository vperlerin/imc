import css from './index.module.scss';
import PageContain from "components/page-contain";
import React from "react";
import { Link } from 'react-router-dom';
import { socData as soc } from "data/soc";

const Soc = () => {
  return (
    <PageContain title="Scientific and Local Organizing Committee">
      <div className='d-flex flex-column flex-md-row-reverse gap-3 mt-3'>

        <div className={css.col}>
          <h3>Scientific Organizing Committee</h3>

          {soc.soc.intro && <p dangerouslySetInnerHTML={{ __html: soc.soc.intro }} />}

          <h4>Chair</h4>
          <ul>
            {soc.soc.chair.map((chair, idx) => (
              <li key={`soc-chair-${idx}`} dangerouslySetInnerHTML={{ __html: chair }} />
            ))}
          </ul>

          <h4>Members</h4>
          <ul>
            {soc.soc.members.map((member, idx) => (
              <li key={`soc-member-${idx}`} dangerouslySetInnerHTML={{ __html: member }} />
            ))}
          </ul>

          <p>
            The  Scientific Committee can be contacted via the {' '}
            <Link
              aria-label="Contact"
              to="/contact"
              title="Contact"
            >
              contact
            </Link> page.
          </p>

        </div>

        <div className={css.col}>
          <h3>Local Organizing Committee</h3>

          {soc.loc.intro && <p dangerouslySetInnerHTML={{ __html: soc.loc.intro }} />}

          <h4>Chair</h4>
          <ul>
            {soc.loc.chair.map((chair, idx) => (
              <li key={`loc-chair-${idx}`} dangerouslySetInnerHTML={{ __html: chair }} />
            ))}
          </ul>

          <h4>Members</h4>
          <ul className={css.loc}>
            {soc.loc.members.map((member, idx) => (
              <li key={`loc-member-${idx}`} dangerouslySetInnerHTML={{ __html: member }} />
            ))}
          </ul>

          {soc.loc.reg.map((reg, idx) => (
            <p key={`loc-reg-${idx}`} dangerouslySetInnerHTML={{ __html: reg }} />
          ))}

          <p>
            The Local Organizing Committee can be contacted via the {' '}
            <Link
              aria-label="Contact"
              to="/contact"
              title="Contact"
            >
              contact
            </Link> page.
          </p>
        </div>

      </div>
    </PageContain>
  );
};

export default Soc;
