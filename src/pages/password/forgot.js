import ForgotPwdForm from "components/oauth/forgot_pwd";
import PageContain from "components/page-contain";
import React from "react";

const ForgotPasword = () => {
  return (
   <PageContain showRegBtn={false}>
        <ForgotPwdForm/>
    </PageContain>
  );
};

export default ForgotPasword;
