import classNames from 'classnames';
import css from './index.module.scss';
import React from "react";
import PageContain from "components/page-contain";

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
      <p>Come back soon.</p>

      {/*
      <p>Due to an update in logistics, the originally planned boat trip on the river Vecht has been replaced with a rich cultural excursion to the historic city of Utrecht. While we were unable to secure a boat with sufficient capacity, we're excited to offer an alternative program that will be equally memorable and enriching.</p>

      <div className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row">
        <div>
          <h2>Discover Utrecht</h2>
          <p>Utrecht, located just 30 km from the IMC venue, is one of the Netherlands' oldest cities. Its picturesque canals, cobbled streets, and centuries-old architecture make it the perfect destination for an afternoon of exploration. Utrecht is a vibrant university city with a history dating back to Roman times. Its iconic Dom Tower dominates the skyline, while hidden gardens and quiet canals reveal the city's charm at every turn. With a blend of medieval heritage and modern Dutch culture, Utrecht offers something for every visitor.</p>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${ex1})` }}
        />
      </div>


      <div className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row-reverse">
        <div>
          <h2> Sonnenborgh Observatory</h2>
          <p>Our first stop will be the Sonnenborgh Observatory, founded in 1853 by the famous Dutch meteorologist Buys Ballot. This historic site served as the original location of the Royal Netherlands Meteorological Institute (KNMI) and is one of the oldest university observatories in the world.</p>
          <p>Today, Sonnenborgh is a museum where:</p>
          <ul>
            <li>
              The original telescopes are still fully operational
            </li>
            <li>
              Visitors can explore a beautiful historical library
            </li>
            <li>
              Exhibits include scientific instruments and artefacts relevant to astronomy and meteorology—of special interest to IMC participants

            </li>
          </ul>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${ex2})` }}
        />
      </div>


      <div className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row">
        <div>
          <h2>Museum Speelklok</h2>
          <p>Our second stop takes us to Museum Speelklok, located in a former medieval church in the heart of Utrecht. This uniquely Dutch museum is dedicated to self-playing musical instruments and offers a charming, interactive experience.</p>
          <p>Highlights include:</p>
          <ul>
            <li>
              Ornate street organs, musical clocks, and barrel pianos
            </li>
            <li>
              Live demonstrations of historical instruments
            </li>
            <li>
              A playful and family-friendly atmosphere filled with music and movement
            </li>
          </ul>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${ex3})` }}
        />
      </div>


      <div className="mt-3 mb-4 d-flex flex-column gap-3 align-items-stretch flex-md-row-reverse">
        <div>
          <h2>Time to Explore</h2>
          <p>Between the two museum visits, we'll take a scenic walk through the old town, allowing time to:</p> 
          <ul>
            <li>
              Admire Utrecht's medieval canals and architecture
            </li>
            <li>
              Enjoy one of the many cozy Dutch cafés
            </li>
            <li>
              Take in the city's unique atmosphere at your own pace
            </li>
          </ul>
        </div>
        <div
          className={classNames(css.illusBg, 'rounded-2')}
          style={{ backgroundImage: `url(${ex4})` }}
        />
      </div>

        */}



    </PageContain>
  );
};

export default Excursion;

/*

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

      */