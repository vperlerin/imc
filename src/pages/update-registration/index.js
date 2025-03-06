import PageContain from "components/page-contain";
import React from "react";
import { authSelectors } from 'store/auth';
import { useSelector } from 'react-redux';

const UpdateRegistration = () => {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const user = useSelector(authSelectors.getUser);
  console.log("USER? ", user);
  console.log("isLoggedIn? ", isLoggedIn);

  return (
    <PageContain title="Update your data">



    </PageContain>
  )
};

export default UpdateRegistration;
