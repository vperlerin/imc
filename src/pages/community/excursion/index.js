import classNames from 'classnames';
import css from './index.module.scss';
import React from "react";
import PageContain from "components/page-contain";
import { excursionData as ex } from "data/excursion";

// Import images statically
import ex1 from 'assets/img/illus/excursion/ex1.jpg';
import ex2 from 'assets/img/illus/excursion/ex2.jpg';
import ex3 from 'assets/img/illus/excursion/ex3.jpg';
import ex4 from 'assets/img/illus/excursion/ex4.jpg';
import ex5 from 'assets/img/illus/excursion/ex5.jpg';

// Store images in an array for dynamic access
const images = [ex1, ex2, ex3, ex4, ex5];

const Excursion = () => {
  return (
    <PageContain title="Excursion">
      {ex.sections.map((section, idx) => {
        const bgImage = images[idx] || null;  

        return (
          <div
            className={classNames(
              "mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch",
              { "flex-md-row-reverse": idx % 2 === 0, "flex-md-row": idx % 2 !== 0 }
            )}
            key={idx}
          >
            <div>
              <h2 dangerouslySetInnerHTML={{ __html: section.title }} />

              {section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
 
            {bgImage && (
              <div
                className={classNames(css.illusBg, 'rounded-2')}
                style={{ backgroundImage: `url(${bgImage})` }}
              />
            )}
          </div>
        );
      })}
    </PageContain>
  );
};

export default Excursion;
