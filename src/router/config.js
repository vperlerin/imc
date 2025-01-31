import Home from "pages/home";
import Posters from "pages/posters";
import Program from "pages/program";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { menuItems } from "data/menu";

const Placeholder = ({ title }) => <div><h2>{title}</h2></div>;

const getComponentForPath = (path, title) => {
  if (!path.startsWith("/program")) {
    return <Placeholder title={title} />;
  }
 
};

const generateRoutes = (menuItems) => {
  return menuItems.flatMap((item) => [
    <Route key={item.link} path={item.link} element={getComponentForPath(item.link, item.title)} />,
    ...(item.subLinks ? item.subLinks.map(sub => (
      <Route key={sub.link} path={sub.link} element={getComponentForPath(sub.link, sub.title)} />
    )) : [])
  ]);
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       
      <Route path="/program/:day" element={<Program />} />
      <Route path="/program" element={<Program />} /> 
      
      <Route path="/posters" element={<Posters />} />

      {/* Generate other routes dynamically 
      {generateRoutes(menuItems)}*/}

      <Route path="*" element={<Placeholder title="404 - Not Found" />} />
    </Routes>
  );
};

export default AppRoutes;
