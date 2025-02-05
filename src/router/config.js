import Home from "pages/home";
import Disclaimer from "pages/disclaimer";
import Contact from "pages/contact"; 
import Excursion from "pages/community/excursion";
import Extra from "pages/location/extra";
import Gdpr from "pages/gdpr";
import Guidelines from "pages/submission/guidelines";
import Membership from "pages/register/membership"; 
import Online from "pages/register/online";
import Onsite from "pages/register/onsite"; 
import Participants from "pages/community/participants";
import Posters from "pages/program/posters";
import Pratical from "pages/location/pratical";
import Program from "pages/program";
import Register from "pages/register";
import Soc from "pages/community/soc";
import Suroundings from "pages/community/suroundings";
import Travel from "pages/location/travel";
import Topics from "pages/submission/topics";
import Venue from "pages/location/venue";
import Workshops from "pages/program/workshops";
import React from "react";
import { Routes, Route } from "react-router-dom";
 
const Placeholder = ({ title }) => <div><h2>{title}</h2></div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/disclaimer" element={<Disclaimer />} />

      <Route path="/contact" element={<Contact />} /> 
      
      <Route path="/community/excursion" element={<Excursion />} />
      <Route path="/community/participants" element={<Participants />} />
      <Route path="/community/soc" element={<Soc />} /> 
      <Route path="/community/suroundings" element={<Suroundings />} />

      <Route path="/gdpr" element={<Gdpr />} />
      
      <Route path="/location/extra" element={<Extra />} />
      <Route path="/location/practical" element={<Pratical />} />
      <Route path="/location/travel" element={<Travel />} />
      <Route path="/location/venue" element={<Venue />} />
      
      <Route path="/program" element={<Program />} />
      <Route path="/program/:day" element={<Program />} />
      <Route path="/program/posters" element={<Posters />} />
      <Route path="/program/workshops" element={<Workshops />} />
      
      <Route path="/register" element={<Register />} />
      <Route path="/register/online" element={<Online />} /> 
      <Route path="/register/onsite" element={<Onsite />} />
      <Route path="/register/membership" element={<Membership />} />
 
      <Route path="/submission/guidelines" element={<Guidelines />} />
      <Route path="/submission/topics" element={<Topics />} />

 
      <Route path="*" element={<Placeholder title="404 - Not Found" />} />
    </Routes>
  );
};

export default AppRoutes;
