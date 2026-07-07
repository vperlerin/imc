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
                  <td data-label="Dep. Time">07:02</td>
                  <td data-label="Arr. Time">10:56</td>
                  <td data-label="Duration">3:54</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12:33</td>
                  <td data-label="Arr. Time">16:26</td>
                  <td data-label="Duration">3:53</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:02</td>
                  <td data-label="Arr. Time">19:58</td>
                  <td data-label="Duration">3:56</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45,60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:59</td>
                  <td data-label="Arr. Time">21:57</td>
                  <td data-label="Duration">3:58</td>
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
                  <td data-label="Dep. Time">07:41</td>
                  <td data-label="Arr. Time">10:56</td>
                  <td data-label="Duration">3:15</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">13:11</td>
                  <td data-label="Arr. Time">16:26</td>
                  <td data-label="Duration">3:15</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:41</td>
                  <td data-label="Arr. Time">19:58</td>
                  <td data-label="Duration">3:17</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18:41</td>
                  <td data-label="Arr. Time">21:57</td>
                  <td data-label="Duration">3:16</td>
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
                  <td data-label="Dep. Time">10:44</td>
                  <td data-label="Arr. Time">16:26</td>
                  <td data-label="Duration">5:42</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15:52</td>
                  <td data-label="Arr. Time">19:58</td>
                  <td data-label="Duration">4:06</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:10</td>
                  <td data-label="Arr. Time">20:29</td>
                  <td data-label="Duration">4:19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 90€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:44</td>
                  <td data-label="Arr. Time">21:57</td>
                  <td data-label="Duration">4:13</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18:28</td>
                  <td data-label="Arr. Time">22:33</td>
                  <td data-label="Duration">4:05</td>
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
                  <td data-label="Dep. Time">09:14</td>
                  <td data-label="Arr. Time">12:52</td>
                  <td data-label="Duration">3:38</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:10</td>
                  <td data-label="Arr. Time">18:39</td>
                  <td data-label="Duration">4:29</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:37</td>
                  <td data-label="Arr. Time">19:58</td>
                  <td data-label="Duration">5:21</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">19:19</td>
                  <td data-label="Arr. Time">22:33</td>
                  <td data-label="Duration">3:14</td>
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
                  <td data-label="Dep. Time">06:16</td>
                  <td data-label="Arr. Time">10:43</td>
                  <td data-label="Duration">4:27</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">08:20</td>
                  <td data-label="Arr. Time">12:52</td>
                  <td data-label="Duration">4:32</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">08:45</td>
                  <td data-label="Arr. Time">13:09</td>
                  <td data-label="Duration">4:24</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:10</td>
                  <td data-label="Arr. Time">16:10</td>
                  <td data-label="Duration">5:00</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">13:10</td>
                  <td data-label="Arr. Time">17:21</td>
                  <td data-label="Duration">4:11</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('65 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:16</td>
                  <td data-label="Arr. Time">18:39</td>
                  <td data-label="Duration">4:23</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:20</td>
                  <td data-label="Arr. Time">20:29</td>
                  <td data-label="Duration">4:09</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18:39</td>
                  <td data-label="Arr. Time">22:33</td>
                  <td data-label="Duration">3:54</td>
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
                  <td data-label="Dep. Time">06:54</td>
                  <td data-label="Arr. Time">10:43</td>
                  <td data-label="Duration">3:49</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41,40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:55</td>
                  <td data-label="Arr. Time">12:52</td>
                  <td data-label="Duration">2:57</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12:25</td>
                  <td data-label="Arr. Time">16:10</td>
                  <td data-label="Duration">3:45</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41,40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:26</td>
                  <td data-label="Arr. Time">17:21</td>
                  <td data-label="Duration">2:55</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:47</td>
                  <td data-label="Arr. Time">20:29</td>
                  <td data-label="Duration">2:42</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34,20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">19:57</td>
                  <td data-label="Arr. Time">22:33</td>
                  <td data-label="Duration">2:36</td>
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
                  <td data-label="Dep. Time">08:30</td>
                  <td data-label="Arr. Time">16:26</td>
                  <td data-label="Duration">7:56</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('90 to 110€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:57</td>
                  <td data-label="Arr. Time">17:21</td>
                  <td data-label="Duration">7:24</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('100 to 150€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:58</td>
                  <td data-label="Arr. Time">18:39</td>
                  <td data-label="Duration">6:41</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('85 to 130€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12:35</td>
                  <td data-label="Arr. Time">19:58</td>
                  <td data-label="Duration">7:23</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~70€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">13:57</td>
                  <td data-label="Arr. Time">20:29</td>
                  <td data-label="Duration">6:32</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~70€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:31</td>
                  <td data-label="Arr. Time">22:33</td>
                  <td data-label="Duration">6:02</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~100€')}</td>
                </tr>

                <tr>
                  <td data-label="Dep. Time">07:14</td>
                  <td data-label="Arr. Time">12:52</td>
                  <td data-label="Duration">5:38</td>
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
                  <td data-label="Dep. Time">11:46</td>
                  <td data-label="Arr. Time">17:21</td>
                  <td data-label="Duration">5:35</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('50 to 70€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12:14</td>
                  <td data-label="Arr. Time">18:39</td>
                  <td data-label="Duration">6:25</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 90€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">12:38</td>
                  <td data-label="Arr. Time">19:58</td>
                  <td data-label="Duration">7:20</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('70 to 100€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:42</td>
                  <td data-label="Arr. Time">20:29</td>
                  <td data-label="Duration">5:47</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('100 to 140€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:14</td>
                  <td data-label="Arr. Time">22:33</td>
                  <td data-label="Duration">5:19</td>
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
                  <td data-label="Dep. Time">06:20</td>
                  <td data-label="Arr. Time">10:24</td>
                  <td data-label="Duration">4:04</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:40</td>
                  <td data-label="Arr. Time">13:44</td>
                  <td data-label="Duration">4:04</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">15:00</td>
                  <td data-label="Duration">5:02</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:05</td>
                  <td data-label="Arr. Time">18:03</td>
                  <td data-label="Duration">3:58</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15:24</td>
                  <td data-label="Arr. Time">20:00</td>
                  <td data-label="Duration">4:36</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45.60€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18:41</td>
                  <td data-label="Arr. Time">22:59</td>
                  <td data-label="Duration">4:18</td>
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
                  <td data-label="Dep. Time">06:20</td>
                  <td data-label="Arr. Time">09:49</td>
                  <td data-label="Duration">3:29</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:40</td>
                  <td data-label="Arr. Time">12:49</td>
                  <td data-label="Duration">3:09</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:05</td>
                  <td data-label="Arr. Time">17:19</td>
                  <td data-label="Duration">3:14</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15:24</td>
                  <td data-label="Arr. Time">18:49</td>
                  <td data-label="Duration">3:25</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.00€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18:41</td>
                  <td data-label="Arr. Time">21:49</td>
                  <td data-label="Duration">3:08</td>
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
                  <td data-label="Dep. Time">06:20</td>
                  <td data-label="Arr. Time">10:32</td>
                  <td data-label="Duration">4:12</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">07:29</td>
                  <td data-label="Arr. Time">12:41</td>
                  <td data-label="Duration">5:12</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('80 to 110€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:40</td>
                  <td data-label="Arr. Time">13:44</td>
                  <td data-label="Duration">4:04</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">14:49</td>
                  <td data-label="Duration">4:51</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:05</td>
                  <td data-label="Arr. Time">18:25</td>
                  <td data-label="Duration">4:20</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:25</td>
                  <td data-label="Arr. Time">19:59</td>
                  <td data-label="Duration">5:34</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">15:24</td>
                  <td data-label="Arr. Time">20:24</td>
                  <td data-label="Duration">5:00</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('40 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:28</td>
                  <td data-label="Arr. Time">22:41</td>
                  <td data-label="Duration">6:13</td>
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
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">15:20</td>
                  <td data-label="Duration">5:22</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('80 to 100€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:52</td>
                  <td data-label="Arr. Time">15:49</td>
                  <td data-label="Duration">3:57</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('45 to 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:25</td>
                  <td data-label="Arr. Time">17:49</td>
                  <td data-label="Duration">3:24</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:28</td>
                  <td data-label="Arr. Time">19:42</td>
                  <td data-label="Duration">3:14</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('60 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:47</td>
                  <td data-label="Arr. Time">21:48</td>
                  <td data-label="Duration">4:01</td>
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
                  <td data-label="Dep. Time">07:29</td>
                  <td data-label="Arr. Time">11:48</td>
                  <td data-label="Duration">4:19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('65 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">14:40</td>
                  <td data-label="Duration">4:42</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:52</td>
                  <td data-label="Arr. Time">16:44</td>
                  <td data-label="Duration">4:52</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:25</td>
                  <td data-label="Arr. Time">18:44</td>
                  <td data-label="Duration">4:19</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('~ 50€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:28</td>
                  <td data-label="Arr. Time">20:02</td>
                  <td data-label="Duration">3:34</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('65 to 80€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:47</td>
                  <td data-label="Arr. Time">22:44</td>
                  <td data-label="Duration">4:57</td>
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
                  <td data-label="Dep. Time">07:29</td>
                  <td data-label="Arr. Time">10:15</td>
                  <td data-label="Duration">2:46</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">12:50</td>
                  <td data-label="Duration">2:52</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:52</td>
                  <td data-label="Arr. Time">16:33</td>
                  <td data-label="Duration">4:41</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:25</td>
                  <td data-label="Arr. Time">18:33</td>
                  <td data-label="Duration">4:08</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:28</td>
                  <td data-label="Arr. Time">19:11</td>
                  <td data-label="Duration">2:43</td>
                  <td data-label="Change">Direct</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('34.20€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:47</td>
                  <td data-label="Arr. Time">21:33</td>
                  <td data-label="Duration">3:46</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('41.40€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">18:57</td>
                  <td data-label="Arr. Time">22:50</td>
                  <td data-label="Duration">3:53</td>
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
                  <td data-label="Dep. Time">06:20</td>
                  <td data-label="Arr. Time">16:02</td>
                  <td data-label="Duration">9:42</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 250€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">07:29</td>
                  <td data-label="Arr. Time">16:02</td>
                  <td data-label="Duration">8:33</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('180 to 250€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">17:34</td>
                  <td data-label="Duration">7:36</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('105 to 130€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:52</td>
                  <td data-label="Arr. Time">18:57</td>
                  <td data-label="Duration">7:05</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 230€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:25</td>
                  <td data-label="Arr. Time">20:27</td>
                  <td data-label="Duration">6:02</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('90 to 140€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:28</td>
                  <td data-label="Arr. Time">22:02</td>
                  <td data-label="Duration">5:34</td>
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
                  <td data-label="Dep. Time">07:29</td>
                  <td data-label="Arr. Time">13:58</td>
                  <td data-label="Duration">6:29</td>
                  <td data-label="Change">2</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('120 to 140€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">09:58</td>
                  <td data-label="Arr. Time">16:12</td>
                  <td data-label="Duration">6:14</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 220€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">11:52</td>
                  <td data-label="Arr. Time">17:46</td>
                  <td data-label="Duration">5:54</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 160€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">14:25</td>
                  <td data-label="Arr. Time">19:46</td>
                  <td data-label="Duration">5:21</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('140 to 150€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">16:28</td>
                  <td data-label="Arr. Time">21:46</td>
                  <td data-label="Duration">5:18</td>
                  <td data-label="Change">1</td>
                  <td data-label="Ind. Price" className={css.price}>{sncfPriceLink('150 to 210€')}</td>
                </tr>
                <tr>
                  <td data-label="Dep. Time">17:47</td>
                  <td data-label="Arr. Time">23:50</td>
                  <td data-label="Duration">6:03</td>
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
