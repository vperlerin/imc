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
          <DocButton 
            className="d-block fw-bolder" 
            link={`${process.env.REACT_APP_API_URL}/doc_participants.php`} 
               subTitle="(total cost, total paid, remaining dues…)"
            title="Financial details" 
          />
        </div>
      )}

      {!isSoc && (
        <div className="mb-4">
          <h5 className="mb-3">Accommodations & Arrivals</h5>
          <div className="d-flex flex-column flex-md-row gap-2">
            <DocButton 
              className="d-block fw-bolder" 
              link={`${process.env.REACT_APP_API_URL}/doc_accommodations.php`} 
              subTitle="(registration type, food restrictions, roomates…)"
              title="Accomodations" 
            /> 
            <DocButton 
              className="d-block fw-bolder" 
              link={`${process.env.REACT_APP_API_URL}/doc_arrival.php`} 
              subTitle="(arrival, departure…)" 
              title="Arrivals" 
              />
          </div>
        </div>
      )}

      {!isSoc && (
        <div className="mb-4">
          <h5 className="mb-3">Workshops</h5>
          <div className="d-flex flex-column flex-md-row gap-2">
            <DocButton 
              className="d-block fw-bolder" 
              link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=1`} 
              subTitle="(participants info)"  
              title="Spectrography Workshop Participants" 
            /> 
            <DocButton 
              className="d-block fw-bolder" 
              link={`${process.env.REACT_APP_API_URL}/doc_workshops.php?workshop_id=2`} 
              subTitle="(participants info)"   
              title="Radio Workshop Participants" 
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <h5 className="mb-3">Contributions</h5>
        <div className="d-flex gap-2">
          <DocButton 
            className="d-block fw-bolder" 
            link={`${process.env.REACT_APP_API_URL}/doc_posters.php`} 
            subTitle="(full list of posters)" 
            title="Posters" 
          />
          <DocButton 
            className="d-block fw-bolder" 
            link={`${process.env.REACT_APP_API_URL}/doc_talks.php`} 
            subTitle="(full list of talks)"  
            title="Talks" 
          />
        </div>
      </div>

       <div className="mb-4">
        <h5 className="mb-3">T-shirts</h5>
        <div className="d-flex gap-2">
          <DocButton 
            className="d-block fw-bolder" 
            link={`${process.env.REACT_APP_API_URL}/doc_tshirts.php`} 
            subTitle="(participants who wants a t-shirt with size)"   
            title="T-shirts" 
          /> 
        </div>
      </div>

    </PageContain>
  );
};

export default AdminDownloads;