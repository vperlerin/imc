import PageContain from "components/page-contain";
import React from "react";
import { grdp } from "data/gdpr.js";

const Gdpr = () => {
  return (
    <PageContain title="Data Protection and Privacy"> 
        {grdp}
    </PageContain>
  );
};

export default Gdpr;
