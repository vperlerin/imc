import ResetPwdForm from "components/oauth/reset_pwd";
import PageContain from "components/page-contain";
import React from "react";

const ResetPasword = () => {
  return (
   <PageContain showRegBtn={false}>
        <ResetPwdForm/>
    </PageContain>
  );
};

export default ResetPasword;
