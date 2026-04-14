import PageContain from "components/page-contain";
import React from "react";

const Extra = () => {
  return (
    <PageContain title="Extra Accommodations">
      <p>
        If for whatever reason you cannot or do not wish to use the accommodation offered by the conference, you are welcome to arrange your own accommodation.
        In that case, please select the <strong>"no accommodation"</strong> option on the registration form.
        The registration fee will then not include accommodation.
      </p>

      <p>
        Barcelonnette and the Ubaye Valley offer a range of hotels, guesthouses, holiday residences, and campsites.
        As the town is relatively small and September is still part of the tourist season, we recommend booking early.
      </p>


      <h4>Hotels (city center, 1 km from the LOC venue) :</h4>
      <ul>
        <li><a href="https://www.legrandhotelbarcelonnette.com/" target="_blank" rel="noopener noreferrer">Le Grand Hôtel 🞸🞸</a> - 80-200€/night</li>
        <li><a href="https://www.hotel-barcelonnette.fr/" target="_blank" rel="noopener noreferrer">Hôtel de la Placette 🞸🞸</a> - 80-110€/night</li>
        <li><a href="https://www.chevalblancbarcelonnette.com/" target="_blank" rel="noopener noreferrer">Hôtel du Cheval Blanc 🞸🞸</a> - 80-110€/night</li>
        <li><a href="https://www.azteca-hotel.fr/uk" target="_blank" rel="noopener noreferrer">Hôtel Spa Azteca 🞸🞸🞸</a> - 140-170€/night</li>
        <li><a href="https://www.hotelgrandeperviere.com/" target="_blank" rel="noopener noreferrer">La Grande Epervière 🞸🞸🞸</a> - 120-150€/night</li>
        <li><a href="https://www.lechoucas-barcelonnette.fr/choucas-hotel/" target="_blank" rel="noopener noreferrer">Le Choucas</a> - 50-90€/night</li>
      </ul>


      <h4>Appart'hotels (city center, 1 km from the LOC venue) :</h4>
      <ul>
        <li><a href="https://www.barceloapparthotel.fr/" target="_blank" rel="noopener noreferrer">Barcelo Appart'Hotel</a> - 80-100€/night</li>
        <li><a href="https://www.appart-hotel-barcelonnette.fr/" target="_blank" rel="noopener noreferrer">Appart'Hotel de la Paix</a> - 80€/night</li>
      </ul>
    </PageContain>
  );
};

export default Extra;
