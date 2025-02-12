import PageContain from "components/page-contain";
import React from "react";
import { gdpr } from "data/gdpr.js";

const Gdpr = () => {
  return (
    <PageContain title="Data Protection and Privacy">
      {gdpr}
    </PageContain>
  );
};

export default Gdpr;
