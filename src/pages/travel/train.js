import PageContain from "components/page-contain";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import css from "./train.module.scss";
import cssTabs from 'styles/components/tabs.module.scss';


const Train = ({ activeTab = "start" }) => {
  const navigate = useNavigate();
  const pageTitle = activeTab === "end" ? "Trains from Gap Station on 09/27" : "Trains to Gap Station on 09/24";

  const sncfPriceLink = (price) => (
    <a href="https://www.sncf-connect.com/en-en" target="_blank" rel="noopener">
      {price}
    </a>
  );

  return (
    <PageContain title={pageTitle}>
      <div className="ps-md-3 mb-5">
        <p className="fw-bolder">All travel details can be found on our <Link to="/travel">Travel page</Link>.

          We invite you to book your trains as soon as possible — the earlier you book, the better price you are likely to get. All trains can be booked from <a href="https://www.sncf-connect.com/en-en" target="_blank" rel="noopener">SNCF Connect</a>.</p>

        <ul className={classNames('nav nav-tabs mb-3 mt-2', cssTabs.tab, 'flex-column flex-sm-row w-100', css.tabs)}>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "start" ? `${cssTabs.active}  ${css.active} border` : ""}`}
              href="/travel/train/start"
              onClick={(e) => {
                e.preventDefault();
                navigate("/travel/train/start");
              }}
            >
              Trains to Gap Station on 09/24
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "end" ? `${cssTabs.active}  ${css.active} border` : ""}`}
              href="/travel/train/end"
              onClick={(e) => {
                e.preventDefault();
                navigate("/travel/train/end");
              }}
            >
              Trains from Gap Station on 09/27
            </a>
          </li>
        </ul>


        {activeTab === "start" && (
          <div className={css.travelTableWrapper}>
            <table className={css.travelTable}>
              <thead>
                <tr>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Dep. Time</th>
                  <th>Arr. Time</th>
                  <th>Duration</th>
                  <th>Change</th>
                  <th>Ind. Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="4">Marseille Provence Airport</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="4">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Marseille Provence Airport</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">07h02</td>
                  <td data-label="Arr. Time">10h56</td>
                  <td data-label="Duration">3h54</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12h33</td>
                  <td data-label="Arr. Time">16h26</td>
                  <td data-label="Duration">3h53</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h02</td>
                  <td data-label="Arr. Time">19h58</td>
                  <td data-label="Duration">3h56</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h59</td>
                  <td data-label="Arr. Time">21h57</td>
                  <td data-label="Duration">3h58</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="4">Marseille Saint-Charles station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="4">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Marseille Saint-Charles station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">07h41</td>
                  <td data-label="Arr. Time">10h56</td>
                  <td data-label="Duration">3h15</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">13h11</td>
                  <td data-label="Arr. Time">16h26</td>
                  <td data-label="Duration">3h15</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h41</td>
                  <td data-label="Arr. Time">19h58</td>
                  <td data-label="Duration">3h17</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18h41</td>
                  <td data-label="Arr. Time">21h57</td>
                  <td data-label="Duration">3h16</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="5">Aix-en-Provence TGV station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="5">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Aix-en-Provence TGV station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">10h44</td>
                  <td data-label="Arr. Time">16h26</td>
                  <td data-label="Duration">5h42</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15h52</td>
                  <td data-label="Arr. Time">19h58</td>
                  <td data-label="Duration">4h06</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h10</td>
                  <td data-label="Arr. Time">20h29</td>
                  <td data-label="Duration">4h19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 90€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h44</td>
                  <td data-label="Arr. Time">21h57</td>
                  <td data-label="Duration">4h13</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18h28</td>
                  <td data-label="Arr. Time">22h33</td>
                  <td data-label="Duration">4h05</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 90€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="4">Lyon Saint-Exupéry airport/TGV</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="4">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Lyon Saint-Exupéry airport/TGV</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">09h14</td>
                  <td data-label="Arr. Time">12h52</td>
                  <td data-label="Duration">3h38</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h10</td>
                  <td data-label="Arr. Time">18h39</td>
                  <td data-label="Duration">4h29</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h37</td>
                  <td data-label="Arr. Time">19h58</td>
                  <td data-label="Duration">5h21</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">19h19</td>
                  <td data-label="Arr. Time">22h33</td>
                  <td data-label="Duration">3h14</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('55 to 70€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="8">Lyon Part-Dieu station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="8">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Lyon Part-Dieu station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">06h16</td>
                  <td data-label="Arr. Time">10h43</td>
                  <td data-label="Duration">4h27</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">08h20</td>
                  <td data-label="Arr. Time">12h52</td>
                  <td data-label="Duration">4h32</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">08h45</td>
                  <td data-label="Arr. Time">13h09</td>
                  <td data-label="Duration">4h24</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h10</td>
                  <td data-label="Arr. Time">16h10</td>
                  <td data-label="Duration">5h00</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">13h10</td>
                  <td data-label="Arr. Time">17h21</td>
                  <td data-label="Duration">4h11</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('65 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h16</td>
                  <td data-label="Arr. Time">18h39</td>
                  <td data-label="Duration">4h23</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h20</td>
                  <td data-label="Arr. Time">20h29</td>
                  <td data-label="Duration">4h09</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18h39</td>
                  <td data-label="Arr. Time">22h33</td>
                  <td data-label="Duration">3h54</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="6">Valence TGV station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="6">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Valence TGV station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">06h54</td>
                  <td data-label="Arr. Time">10h43</td>
                  <td data-label="Duration">3h49</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41,40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h55</td>
                  <td data-label="Arr. Time">12h52</td>
                  <td data-label="Duration">2h57</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12h25</td>
                  <td data-label="Arr. Time">16h10</td>
                  <td data-label="Duration">3h45</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41,40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h26</td>
                  <td data-label="Arr. Time">17h21</td>
                  <td data-label="Duration">2h55</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h47</td>
                  <td data-label="Arr. Time">20h29</td>
                  <td data-label="Duration">2h42</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">19h57</td>
                  <td data-label="Arr. Time">22h33</td>
                  <td data-label="Duration">2h36</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="7">Paris CDG airport/TGV</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="7">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Paris CDG airport/TGV</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">08h30</td>
                  <td data-label="Arr. Time">16h26</td>
                  <td data-label="Duration">7h56</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('90 to 110€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h57</td>
                  <td data-label="Arr. Time">17h21</td>
                  <td data-label="Duration">7h24</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('100 to 150€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h58</td>
                  <td data-label="Arr. Time">18h39</td>
                  <td data-label="Duration">6h41</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('85 to 130€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12h35</td>
                  <td data-label="Arr. Time">19h58</td>
                  <td data-label="Duration">7h23</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~70€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">13h57</td>
                  <td data-label="Arr. Time">20h29</td>
                  <td data-label="Duration">6h32</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~70€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h31</td>
                  <td data-label="Arr. Time">22h33</td>
                  <td data-label="Duration">6h02</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~100€')}</td>
                </tr>

                <tr>
                  <td data-label="Dep. Time">07h14</td>
                  <td data-label="Arr. Time">12h52</td>
                  <td data-label="Duration">5h38</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('75 to 90€')}</td>
                </tr>
                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="5">Paris Gare de Lyon station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="5">Gap station</td>
                  <td className={css.route} data-label="Route">
                    <span>Paris Gare de Lyon station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Gap station</span>
                  </td>
                  <td data-label="Dep. Time">11h46</td>
                  <td data-label="Arr. Time">17h21</td>
                  <td data-label="Duration">5h35</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('50 to 70€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12h14</td>
                  <td data-label="Arr. Time">18h39</td>
                  <td data-label="Duration">6h25</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 90€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12h38</td>
                  <td data-label="Arr. Time">19h58</td>
                  <td data-label="Duration">7h20</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('70 to 100€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h42</td>
                  <td data-label="Arr. Time">20h29</td>
                  <td data-label="Duration">5h47</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('100 to 140€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h14</td>
                  <td data-label="Arr. Time">22h33</td>
                  <td data-label="Duration">5h19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('100 to 140€')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "end" && (
          <div className={css.travelTableWrapper}>
            <table className={css.travelTable}>
              <thead>
                <tr>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Dep. Time</th>
                  <th>Arr. Time</th>
                  <th>Duration</th>
                  <th>Change</th>
                  <th>Ind. Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="6">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="6">Marseille Provence Airport</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Marseille Provence Airport</span>
                  </td>
                  <td data-label="Dep. Time">06h20</td>
                  <td data-label="Arr. Time">10h24</td>
                  <td data-label="Duration">4h04</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h40</td>
                  <td data-label="Arr. Time">13h44</td>
                  <td data-label="Duration">4h04</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">15h00</td>
                  <td data-label="Duration">5h02</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h05</td>
                  <td data-label="Arr. Time">18h03</td>
                  <td data-label="Duration">3h58</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15h24</td>
                  <td data-label="Arr. Time">20h00</td>
                  <td data-label="Duration">4h36</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18h41</td>
                  <td data-label="Arr. Time">22h59</td>
                  <td data-label="Duration">4h18</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="5">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="5">Marseille Saint-Charles station</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Marseille Saint-Charles station</span>
                  </td>
                  <td data-label="Dep. Time">06h20</td>
                  <td data-label="Arr. Time">09h49</td>
                  <td data-label="Duration">3h29</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h40</td>
                  <td data-label="Arr. Time">12h49</td>
                  <td data-label="Duration">3h09</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h05</td>
                  <td data-label="Arr. Time">17h19</td>
                  <td data-label="Duration">3h14</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15h24</td>
                  <td data-label="Arr. Time">18h49</td>
                  <td data-label="Duration">3h25</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18h41</td>
                  <td data-label="Arr. Time">21h49</td>
                  <td data-label="Duration">3h08</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="8">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="8">Aix-en-Provence TGV station</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Aix-en-Provence TGV station</span>
                  </td>
                  <td data-label="Dep. Time">06h20</td>
                  <td data-label="Arr. Time">10h32</td>
                  <td data-label="Duration">4h12</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">07h29</td>
                  <td data-label="Arr. Time">12h41</td>
                  <td data-label="Duration">5h12</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('80 to 110€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h40</td>
                  <td data-label="Arr. Time">13h44</td>
                  <td data-label="Duration">4h04</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">14h49</td>
                  <td data-label="Duration">4h51</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h05</td>
                  <td data-label="Arr. Time">18h25</td>
                  <td data-label="Duration">4h20</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h25</td>
                  <td data-label="Arr. Time">19h59</td>
                  <td data-label="Duration">5h34</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15h24</td>
                  <td data-label="Arr. Time">20h24</td>
                  <td data-label="Duration">5h00</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h28</td>
                  <td data-label="Arr. Time">22h41</td>
                  <td data-label="Duration">6h13</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('90 to 120€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="5">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="5">Lyon Saint-Exupéry airport/TGV</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Lyon Saint-Exupéry airport/TGV</span>
                  </td>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">15h20</td>
                  <td data-label="Duration">5h22</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('80 to 100€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h52</td>
                  <td data-label="Arr. Time">15h49</td>
                  <td data-label="Duration">3h57</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h25</td>
                  <td data-label="Arr. Time">17h49</td>
                  <td data-label="Duration">3h24</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h28</td>
                  <td data-label="Arr. Time">19h42</td>
                  <td data-label="Duration">3h14</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h47</td>
                  <td data-label="Arr. Time">21h48</td>
                  <td data-label="Duration">4h01</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="6">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="6">Lyon Part-Dieu station</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Lyon Part-Dieu station</span>
                  </td>
                  <td data-label="Dep. Time">07h29</td>
                  <td data-label="Arr. Time">11h48</td>
                  <td data-label="Duration">4h19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('65 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">14h40</td>
                  <td data-label="Duration">4h42</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h52</td>
                  <td data-label="Arr. Time">16h44</td>
                  <td data-label="Duration">4h52</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h25</td>
                  <td data-label="Arr. Time">18h44</td>
                  <td data-label="Duration">4h19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h28</td>
                  <td data-label="Arr. Time">20h02</td>
                  <td data-label="Duration">3h34</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('65 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h47</td>
                  <td data-label="Arr. Time">22h44</td>
                  <td data-label="Duration">4h57</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="7">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="7">Valence TGV station</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Valence TGV station</span>
                  </td>
                  <td data-label="Dep. Time">07h29</td>
                  <td data-label="Arr. Time">10h15</td>
                  <td data-label="Duration">2h46</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">12h50</td>
                  <td data-label="Duration">2h52</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h52</td>
                  <td data-label="Arr. Time">16h33</td>
                  <td data-label="Duration">4h41</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h25</td>
                  <td data-label="Arr. Time">18h33</td>
                  <td data-label="Duration">4h08</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h28</td>
                  <td data-label="Arr. Time">19h11</td>
                  <td data-label="Duration">2h43</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h47</td>
                  <td data-label="Arr. Time">21h33</td>
                  <td data-label="Duration">3h46</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18h57</td>
                  <td data-label="Arr. Time">22h50</td>
                  <td data-label="Duration">3h53</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="6">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="6">Paris CDG airport/TGV</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Paris CDG airport/TGV</span>
                  </td>
                  <td data-label="Dep. Time">06h20</td>
                  <td data-label="Arr. Time">16h02</td>
                  <td data-label="Duration">9h42</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 250€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">07h29</td>
                  <td data-label="Arr. Time">16h02</td>
                  <td data-label="Duration">8h33</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('180 to 250€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">17h34</td>
                  <td data-label="Duration">7h36</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('105 to 130€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h52</td>
                  <td data-label="Arr. Time">18h57</td>
                  <td data-label="Duration">7h05</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 230€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h25</td>
                  <td data-label="Arr. Time">20h27</td>
                  <td data-label="Duration">6h02</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('90 to 140€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h28</td>
                  <td data-label="Arr. Time">22h02</td>
                  <td data-label="Duration">5h34</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('100 to 130€')}</td>
                </tr>

                <tr>
                  <td className={css.departure} data-label="Departure" rowSpan="6">Gap station</td>
                  <td className={css.arrival} data-label="Arrival" rowSpan="6">Paris Gare de Lyon station</td>
                  <td className={css.route} data-label="Route">
                    <span>Gap station</span>
                    <span className={css.routeSeparator} aria-hidden="true">&gt;</span>
                    <span>Paris Gare de Lyon station</span>
                  </td>
                  <td data-label="Dep. Time">07h29</td>
                  <td data-label="Arr. Time">13h58</td>
                  <td data-label="Duration">6h29</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('120 to 140€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09h58</td>
                  <td data-label="Arr. Time">16h12</td>
                  <td data-label="Duration">6h14</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 220€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11h52</td>
                  <td data-label="Arr. Time">17h46</td>
                  <td data-label="Duration">5h54</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 160€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14h25</td>
                  <td data-label="Arr. Time">19h46</td>
                  <td data-label="Duration">5h21</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('140 to 150€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16h28</td>
                  <td data-label="Arr. Time">21h46</td>
                  <td data-label="Duration">5h18</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 210€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17h47</td>
                  <td data-label="Arr. Time">23h50</td>
                  <td data-label="Duration">6h03</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('80 to 100€')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}



      </div>
    </PageContain>
  );
};

export default Train;
