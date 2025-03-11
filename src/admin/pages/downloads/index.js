
import PageContain from "@/admin/components/page-contain";
import DocButton from "@/admin/components/doc-button";

import React from "react";

const AdminDownloads = () => {

  const breadcrumb = [
    { url: "/admin/downloads", name: "Downloads" },
  ];


  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title="Downloads"
    >

      <div className="mb-4">
        <h5 className="mb-3">Finance</h5>
        <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_participants.php`} title="All participants financial details" />
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Accomomdations</h5>
        <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_accommodations.php`} title="All participants accomodations" />
      </div>


      <div className="mb-4">
        <h5 className="mb-3">Workshops:</h5>
        <div className="d-flex flex-columnd flex-md-row gap-2">
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=1`} title="All Spectrography Workshop Participants" />
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=2`} title="All Radio Workshop Participants" />
        </div>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">For the SOC</h5>
        <div className="d-flex gap-2">
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_posters.php`} title="All posters" />
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_talks.php`} title="All talks" />
        </div>
      </div>

    </PageContain>
  );
};

export default AdminDownloads;