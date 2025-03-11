
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

      <p>
        <strong className="d-block">For the treasurer:</strong>
        <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_participants.php`} title="All participants" />
      </p>

      <p>
        <strong className="d-block">For the SOC:</strong>
        <DocButton className="d-block fw-bolder"  link={`${process.env.REACT_APP_API_URL}/doc_posters.php`} title="All posters" />
        <DocButton className="d-block fw-bolder"  link={`${process.env.REACT_APP_API_URL}/doc_talks.php`} title="All talks" />
      </p>

      <p>
        <strong className="d-block">For the people in charge of the Workshops:</strong>
        <DocButton className="d-block fw-bolder"  link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=1`} title="All Spectrography Workshop Participants" />
        <DocButton className="d-block fw-bolder"  link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=2`} title="All Radio Workshop Participants" />
      </p>

    </PageContain>
  );
};

export default AdminDownloads;