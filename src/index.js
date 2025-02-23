import AppHeight from "hooks/app-height";
import "./styles/bootstrap.scss";
import "./index.module.scss";

import AppRoutes from "./router/config";
import React, { useEffect } from "react";
import store from "./store";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);

const RootApp = () => {
  const location = useLocation();
  
  useEffect(() => {
    const rootElement = document.getElementById("root");
    
    if (location.pathname.startsWith("/admin")) {
      rootElement.classList.add("is-admin");
    } else {
      rootElement.classList.remove("is-admin");
    }
  }, [location.pathname]);

  return (
    <>
      <AppRoutes />
      <AppHeight />
    </>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <RootApp />
        </Router>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
