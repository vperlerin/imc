import Loader from 'components/loader';
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/home"));
const Disclaimer = lazy(() => import("pages/disclaimer"));
const Contact = lazy(() => import("pages/contact"));
const Excursion = lazy(() => import("pages/community/excursion"));
const Extra = lazy(() => import("pages/location/extra"));
const Gdpr = lazy(() => import("pages/gdpr"));
const Guidelines = lazy(() => import("pages/submission/guidelines"));
const Membership = lazy(() => import("pages/register/membership"));
const Online = lazy(() => import("pages/register/online"));
const Onsite = lazy(() => import("pages/register/onsite"));
const Participants = lazy(() => import("pages/community/participants"));
const Posters = lazy(() => import("pages/program/posters"));
const Practical = lazy(() => import("pages/location/pratical"));
const Program = lazy(() => import("pages/program"));
const Register = lazy(() => import("pages/register"));
const Soc = lazy(() => import("pages/community/soc"));
const Surroundings = lazy(() => import("pages/community/surroundings"));
const Travel = lazy(() => import("pages/location/travel"));
const Topics = lazy(() => import("pages/submission/topics"));
const Venue = lazy(() => import("pages/location/venue"));
const Workshops = lazy(() => import("pages/program/workshops"));

const Placeholder = ({ title }) => <div><h2>{title}</h2></div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/community/excursion" element={<Excursion />} />
        <Route path="/community/participants" element={<Participants />} />
        <Route path="/community/soc" element={<Soc />} /> 
        <Route path="/gdpr" element={<Gdpr />} />
        <Route path="/location/extra" element={<Extra />} />
        <Route path="/location/practical" element={<Practical />} />
        <Route path="/location/travel" element={<Travel />} />
        <Route path="/location/venue" element={<Venue />} />
        <Route path="/location/surroundings" element={<Surroundings />} /> 
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
    </Suspense>
  );
};

export default AppRoutes;