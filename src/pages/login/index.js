import LoginForm from "components/oauth/form.js";
import PageContain from "components/page-contain";
import React from "react";

const Login = () => {
  return (
   <PageContain showRegBtn={false}>
        <LoginForm/>
    </PageContain>
  );
};

export default Login;
