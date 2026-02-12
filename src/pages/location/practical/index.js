import PageContain from "components/page-contain";
import React from "react";
import { Link } from 'react-router-dom';

const Pratical = () => {
  return (
    <PageContain title="Pratical Information">
      <h3>Weather</h3>
      <div className="ps-md-3">
        <p>Barcelonnette has a mountain climate with Alpine influences. Summers are generally sunny and pleasant during the day, while mornings and evenings can be cool due to the altitude (approximately 1,135 m).</p>
        <p>In September, average temperatures are around 14-16°C, with daytime highs often reaching 18-22°C, and nighttime temperatures dropping to 6-10°C. The weather is often clear and bright, but mountain conditions can change quickly, and short rain showers are possible. In recent years, due to climate change, more extreme conditions have occasionally occurred — including heatwaves (canicule) or, more rarely, early snowfall.</p>
        <p>We recommend bringing:</p>
        <ul>
          <li>A light jacket or sweater for the evenings</li>
          <li>A waterproof layer (just in case)</li>
          <li>Comfortable walking shoes, especially if you plan to join outdoor activities or sightseeing</li>
        </ul>
        <p>
          Please check the{' '}
          <Link
            aria-label="Weather Forecast"
            className="fw-bolder"
            to="https://meteofrance.com/previsions-meteo-france/barcelonnette/04400"
            title="Weather Forecast"
          >
            weather forecast
          </Link>{' '}
          shortly before your trip.
        </p>
      </div>

      <h3>Visas</h3>
      <div className="ps-md-3">
        <p>If you are travelling to France, you should check whether you require a visa and, if so, which type.</p>
        <p>France is part of the Schengen Area, which allows visa-free short stays (up to 90 days within a 180-day period) for many nationalities. However, requirements vary depending on your country of citizenship.</p>
        <p>For up-to-date and official information, please consult:
{' '}
          <Link
            aria-label="Weather Forecast"
            className="fw-bolder"
            to="https://www.diplomatie.gouv.fr/en/"
            title="Weather Forecast"
          >
            the French Ministry for Europe and Foreign Affairs' websit
          </Link>{' '}

          or the French consulate or embassy in your country
        </p> 
        <p>If you require an invitation letter for visa purposes, please provide: </p>
        <ul>
          <li>Your full legal name (as in passport) </li>
          <li>Your passport number </li>
          <li>Your private residence or business address </li>
          <li>The address of the French consulate or embassy where you will submit your application</li>
        </ul> 
        <p>
          Please note that the Local Organising Committee (LOC) reserves the right to decline issuing an invitation letter if there is any doubt regarding the purpose of the visit.
        </p>
      </div>
 
      <h3>Currency</h3>
      <div className="ps-md-3">
        <p>The local currency in France is the Euro (€).</p>
        <p>You can withdraw cash from ATMs at airports, major train stations, and in town centres. Credit and debit cards are widely accepted in hotels, restaurants, and shops. However, small local businesses in mountain areas may occasionally prefer card payments over large cash notes.</p>
        <p>We recommend carrying a debit or credit card for most transactions.</p>
      </div>

      <h3>Power Sockets</h3>
      <div className="ps-md-3">
        <p>France uses Type E power sockets, with a voltage of 230 V and a frequency of 50 Hz.</p>
        <p>If your country uses a different plug type, please bring a suitable travel adapter to ensure compatibility with French sockets.</p>
      </div>

      <h3>French People</h3>
      <div className="ps-md-3 mb-5">
        <p>The French may sometimes appear reserved or even a little abrupt at first, especially compared to other cultures. Don't take it personally! Politeness is very important in France, and a simple “Bonjour” before asking a question goes a long way. When approaching someone in English, it is always appreciated to first ask, “Excusez-moi, parlez-vous anglais ?” (Excuse me, do you speak English?). This small courtesy is often the key to a much warmer and more helpful response.</p>
      </div> 

      <p>The LOC can usually also provide assistance with matters not covered on these pages. They can be contacted via the  {' '}
        <Link
          aria-label="Contact"
          className="fw-bolder"
          to="/contact"
          title="Contact"
        >
          contact page
        </Link>.
      </p>
    </PageContain>
  );
};

export default Pratical;
