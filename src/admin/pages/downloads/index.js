import { authSelectors } from 'store/auth';
import { useSelector } from 'react-redux';
import PageContain from "@/admin/components/page-contain";
import DocButton from "@/admin/components/doc-button";
import React from "react";

const AdminDownloads = () => {
  const isLoc = useSelector(authSelectors.isLoc);
  const isSoc = useSelector(authSelectors.isSoc);

  const breadcrumb = [
    { url: "/admin/downloads", name: "Downloads" },
  ];

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title="Downloads"
    >

      {!isLoc && !isSoc && (
        <div className="mb-4">
          <h5 className="mb-3">Finance</h5>
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_participants.php`} title="Financial details" />
        </div>
      )}

      {!isSoc && (
        <div className="mb-4">
          <h5 className="mb-3">Accommodations & Arrivals</h5>
          <div className="d-flex flex-column flex-md-row gap-2">
            <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_accommodations.php`} title="Accomodations" /> 
            <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_arrival.php`} title="Arrivals" />
          </div>
        </div>
      )}

      {!isSoc && (
        <div className="mb-4">
          <h5 className="mb-3">Workshops</h5>
          <div className="d-flex flex-column flex-md-row gap-2">
            <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=1`} title="Spectrography Workshop Participants" />
            <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=2`} title="Radio Workshop Participants" />
          </div>
        </div>
      )}

      <div className="mb-4">
        <h5 className="mb-3">Contributions</h5>
        <div className="d-flex gap-2">
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_posters.php`} title="Posters" />
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_talks.php`} title="Talks" />
        </div>
      </div>

       <div className="mb-4">
        <h5 className="mb-3">T-shirts</h5>
        <div className="d-flex gap-2">
          <DocButton className="d-block fw-bolder" link={`${process.env.REACT_APP_API_URL}/doc_tshirts.php`} title="T-shirts" /> 
        </div>
      </div>

    </PageContain>
  );
};

export default AdminDownloads;