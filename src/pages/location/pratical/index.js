import PageContain from "components/page-contain";
import React from "react";
import { Link } from 'react-router-dom';

const Pratical = () => {
  return (
    <PageContain title="Pratical Information">
      <div className="md-mx-3">
      <h3>Weather</h3>
      <p>
        The Netherlands has a temperate maritime climate influenced by the North Sea and Atlantic Ocean, with cool summers and moderate winters. In September temperatures average around 15°C, but can reach 19.5 °C during daytime, and 10 °C at night. While September can bring sunny spells, rainfall is always a possibility so be sure to pack some rain gear. Please check the weather forecast before you travel. If you plan to join the sightseeing tour on Saturday afternoon, be sure to bring a pair of comfortable walking shoes.
      </p>


      <h3 className="mt-4">Visas</h3>
      <p>
        If you are coming to the Netherlands you should always check if you need a visa and, if so, what type of visa. Find out how to apply for a visa and how to track the status of your application via the website of the <a href="https://www.netherlandsworldwide.nl/visa-the-netherlands" rel="noopener noreferrer">Dutch Government</a>.
      </p>

      <p>
        If you require an invitation letter for a visa, please provide your legal private residence or business address, your passport number, and the address of the Dutch consulate or Embassy where your visa application will be submitted. Please note that the LOC reserves the right to refuse to issue an invitation letter if there is any doubt about the purpose of your visit.
      </p>

      <h3 className="mt-4">Currency</h3>
      <p>
        The local currency in the Netherlands is the Euro (€). You can exchange foreign currencies to Euro in the main cities or withdraw some cash at the main train stations or at the airports. At Utrecht Central station you can also find the GWK Travelex. <b>Note that Stayokay Soest is a cashless hostel. You can pay with debit or credit card, but they do not accept cash money.</b></p>

      <h3 className="mt-4">Power Sockets</h3>
      <p>The sockets are type F with a voltage of 230 V and a frequency of 50 Hz (standard Euro plug). Please take a travel adapter with you to ensure that your plug fits.</p>

      <p>The LOC can usually also provide assistance with matters not covered on these pages. They can be contacted via the  {' '}
        <Link
        aria-label="Contact"
        to="/contact"
        title="Contact"
      >
        contact page
      </Link>.</p>

      </div>
    </PageContain>
  );
};

export default Pratical;
