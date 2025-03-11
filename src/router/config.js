import css from "./index.module.scss";
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "components/loader";
import ProtectedRoute from "hooks/protected-route";



// Lazy-load pages using relative paths (Webpack resolves them correctly)
const lazyPages = {
  Home: lazy(() => import("pages/home")),
  Disclaimer: lazy(() => import("pages/disclaimer")),
  Contact: lazy(() => import("pages/contact")),
  Excursion: lazy(() => import("pages/community/excursion")),
  Extra: lazy(() => import("pages/location/extra")),
  ForgotPassword: lazy(() => import("pages/password/forgot.js")),
  Gdpr: lazy(() => import("pages/gdpr")),
  Guidelines: lazy(() => import("pages/submission/guidelines")),
  Login: lazy(() => import("pages/login")),
  Membership: lazy(() => import("pages/register/membership")),
  Online: lazy(() => import("pages/register/online")),
  Onsite: lazy(() => import("pages/register/onsite")),
  Participants: lazy(() => import("pages/community/participants")),
  Payment: lazy(() => import("pages/register/payment")),
  Posters: lazy(() => import("pages/program/posters")),
  Practical: lazy(() => import("pages/location/practical")),
  Program: lazy(() => import("pages/program")),
  Register: lazy(() => import("pages/register")),
  ResetPassword: lazy(() => import("pages/password/reset.js")),
  Soc: lazy(() => import("pages/community/soc")),
  Surroundings: lazy(() => import("pages/community/surroundings")),
  Travel: lazy(() => import("pages/location/travel")),
  Topics: lazy(() => import("pages/submission/topics")),
  UpdateRegistration: lazy(() => import("pages/update-registration")),
  Venue: lazy(() => import("pages/location/venue")),
  WorkshopRadio: lazy(() => import("pages/program/workshops/radio")),
  WorkshopSpectro: lazy(() => import("pages/program/workshops/spectro")),
  // ADMIN
  AdminDashboard: lazy(() => import("admin/pages/dashboard")),
  AdminParticipantsOnsite: lazy(() => import("admin/pages/participants/onsite")),
  AdminParticipantsOnline: lazy(() => import("admin/pages/participants/online")),
  AdminParticipantsWorkshops: lazy(() => import("admin/pages/participants/workshops")),
  AdminParticipantsUser: lazy(() => import("admin/pages/participants/single")),
  AdminParticipantsPayment: lazy(() => import("admin/pages/participants/payment")),
};

// Placeholder component for 404
const Placeholder = ({ title }) => (
  <div className={css.p404}>
    <h2>{title}</h2>
    <Link to="/" className="btn btn-outline-primary fw-bolder mt-3">Go back to safety</Link>
  </div>
);

const routeConfig = [
  { path: "/", element: <lazyPages.Home /> },
  { path: "/disclaimer", element: <lazyPages.Disclaimer /> },
  { path: "/contact", element: <lazyPages.Contact /> },
  { path: "/community/excursion", element: <lazyPages.Excursion /> },
  { path: "/community/participants", element: <lazyPages.Participants /> },
  { path: "/community/soc", element: <lazyPages.Soc /> },
  { path: "/forgot-password", element: <lazyPages.ForgotPassword /> },
  { path: "/gdpr", element: <lazyPages.Gdpr /> },
  { path: "/login", element: <lazyPages.Login /> },
  { path: "/location/extra", element: <lazyPages.Extra /> },
  { path: "/location/practical", element: <lazyPages.Practical /> },
  { path: "/location/travel", element: <lazyPages.Travel /> },
  { path: "/location/venue", element: <lazyPages.Venue /> },
  { path: "/location/surroundings", element: <lazyPages.Surroundings /> },
  { path: "/program", element: <lazyPages.Program /> },
  { path: "/program/:day", element: <lazyPages.Program /> },
  { path: "/program/posters", element: <lazyPages.Posters /> },
  { path: "/program/workshops", element: <lazyPages.WorkshopRadio /> },
  { path: "/program/workshops/radio", element: <lazyPages.WorkshopRadio /> },
  { path: "/program/workshops/spectro", element: <lazyPages.WorkshopSpectro /> },
  { path: "/register", element: <lazyPages.Register /> },
  { path: "/register/online", element: <lazyPages.Online /> },
  { path: "/register/onsite", element: <lazyPages.Onsite /> },
  { path: "/register/membership", element: <lazyPages.Membership /> },
  { path: "/register/payment", element: <lazyPages.Payment /> },
  { path: "/reset-password", element: <lazyPages.ResetPassword /> },
  { path: "/update-registration", element: <lazyPages.UpdateRegistration /> },
  { path: "/submission/guidelines", element: <lazyPages.Guidelines /> },
  { path: "/submission/topics", element: <lazyPages.Topics /> },
  // ADMIN (protected routes)
  { path: "/admin/dashboard", element: <ProtectedRoute><lazyPages.AdminDashboard /></ProtectedRoute> },
  { path: "/admin/participants/online", element: <ProtectedRoute><lazyPages.AdminParticipantsOnline /></ProtectedRoute> },
  { path: "/admin/participants/onsite", element: <ProtectedRoute><lazyPages.AdminParticipantsOnsite /></ProtectedRoute> },
  { path: "/admin/participants/workshops/radio", element: <ProtectedRoute><lazyPages.AdminParticipantsWorkshops workshopId={2} /></ProtectedRoute> },
  { path: "/admin/participants/workshops/spectro", element: <ProtectedRoute><lazyPages.AdminParticipantsWorkshops workshopId={1} /></ProtectedRoute> },
  { path: "/admin/participants/onsite/:participantId/:tab?", element: (<ProtectedRoute><lazyPages.AdminParticipantsUser isCurOnline={false} /></ProtectedRoute>) },
  { path: "/admin/participants/online/:participantId/:tab?", element: (<ProtectedRoute><lazyPages.AdminParticipantsUser isCurOnline/></ProtectedRoute>) }, 
  { path: "/admin/participants/onsite/payment/:participantId", element: (<ProtectedRoute><lazyPages.AdminParticipantsPayment isCurOnline={false} /></ProtectedRoute>) },
  { path: "/admin/participants/online/payment/:participantId", element: (<ProtectedRoute><lazyPages.AdminParticipantsPayment isCurOnline /></ProtectedRoute>) },


  // 404
  { path: "*", element: <Placeholder title="Oops! Looks like you’ve taken a wrong turn into the meteor shower. This page has burned up in the atmosphere!" /> },
];


const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </Suspense>
);

export default AppRoutes;
