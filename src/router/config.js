import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "components/loader";

// Lazy-load pages using relative paths (Webpack resolves them correctly)
const lazyPages = {
  Home: lazy(() => import("pages/home")),
  Disclaimer: lazy(() => import("pages/disclaimer")),
  Contact: lazy(() => import("pages/contact")),
  Excursion: lazy(() => import("pages/community/excursion")),
  Extra: lazy(() => import("pages/location/extra")),
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
  Soc: lazy(() => import("pages/community/soc")),
  Surroundings: lazy(() => import("pages/community/surroundings")),
  Travel: lazy(() => import("pages/location/travel")),
  Topics: lazy(() => import("pages/submission/topics")),
  Venue: lazy(() => import("pages/location/venue")),
  Workshops: lazy(() => import("pages/program/workshops")),
};

// Placeholder component for 404
const Placeholder = ({ title }) => (
  <div>
    <h2>{title}</h2>
  </div>
);

const routeConfig = [
  { path: "/", element: <lazyPages.Home /> },
  { path: "/disclaimer", element: <lazyPages.Disclaimer /> },
  { path: "/contact", element: <lazyPages.Contact /> },
  { path: "/community/excursion", element: <lazyPages.Excursion /> },
  { path: "/community/participants", element: <lazyPages.Participants /> },
  { path: "/community/soc", element: <lazyPages.Soc /> },
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
  { path: "/program/workshops", element: <lazyPages.Workshops /> },
  { path: "/register", element: <lazyPages.Register /> },
  { path: "/register/online", element: <lazyPages.Online /> },
  { path: "/register/onsite", element: <lazyPages.Onsite /> },
  { path: "/register/membership", element: <lazyPages.Membership /> },
  { path: "/register/payment", element: <lazyPages.Payment /> },
  { path: "/submission/guidelines", element: <lazyPages.Guidelines /> },
  { path: "/submission/topics", element: <lazyPages.Topics /> },
  { path: "*", element: <Placeholder title="404 - Not Found" /> },
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
