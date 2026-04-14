"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[2530],{
/***/111:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={login:"index-module__login--Jr3_l"};
/***/},
/***/914:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */Z:()=>/* binding */o
/* harmony export */});
/* harmony import */var t=a(1083);const l="MISSING_ENV_VAR".REACT_APP_MAILER_API_URL||"https://www.imo.net/members/api/imc_mailer_api/send_email",o=async({subject:e,message:s,to:a,toName:o,fromName:r,replyTo:n,replyName:m,bcc:i=[],token:d=null})=>{try{return"success"===(await t/* ["default"] */.A.post(l,{subject:e,message:s,to:a,to_name:o,from_name:r,reply_to:n,reply_name:m,bcc:i,token:d},{headers:{"Content-Type":"application/json"}})).data.status?{success:!0,message:"Email sent successfully."}:{success:!1,message:"Failed to send email."}}catch(e){return{success:!1,message:"An error occurred while sending the email."}}}}
/***/,
/***/967:
/***/(e,s,a)=>{
// ESM COMPAT FLAG
a.r(s),
// EXPORTS
a.d(s,{default:()=>/* binding */f});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var t=a(6942),l=a.n(t),o=a(111),r=a(8232),n=a(6645),m=a(6540),i=a(1083),d=a(7762),c=a(914),u=a(4848);// ./src/components/oauth/forgot_pwd/index.js
const p=()=>{const[e,s]=(0,m.useState)(!1),[a,t]=(0,m.useState)(null),[p,_]=(0,m.useState)(null),[f,h]=(0,m.useState)("");
return(0,u.jsxs)("div",{className:l()(o/* default */.A.login,"flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative"),children:[e&&(0/* default */,u.jsx)(n.A,{}),(0,u.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),_(null),t(null),s(!0);try{const e=await i/* default */.A.post("https://imc2026.imo.net/php/auth/forgot_password.php",{email:f});if(e.data.success&&e.data.token&&e.data.email){(await(0,c/* sendEmail */.Z)({subject:"IMC 2026 Password Reset",message:`Click the link below to reset your password: <br>\n            <a href="https://imc2026.imo.net/reset-password?token=${e.data.token}">\n            Reset Password</a>`,to:e.data.email,toName:"IMC Participant",fromName:`IMC ${d/* conferenceData */.p.year}`,replyTo:`no-reply@${d/* conferenceData */.p.year}.imo.net`,replyName:"no-reply"})).success?t("Password reset email sent successfully."):_("Something went wrong. Impossible to send you an email for now. Please try again later.")}else _(e.data.message||"Something went wrong.")}catch(e){_(e.response?.data?.message||"Something went wrong. Please try again later.")}finally{s(!1),h("")}},className:l()(r/* default */.A.xSmallW,"w-100 border p-3 rounded-2"),children:[p&&(0,u.jsx)("div",{className:"alert alert-danger fw-bolder",children:p}),a&&(0,u.jsx)("div",{className:"alert alert-success fw-bolder",children:a}),(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)("label",{htmlFor:"emailInput",className:"form-label",children:"Enter your email"}),(0,u.jsx)("input",{autoFocus:!0,disabled:e,type:"email",className:"form-control",id:"emailInput","aria-describedby":"emailHelp",value:f,onChange:e=>h(e.target.value),placeholder:"Your email",required:!0})]}),(0,u.jsx)("button",{disabled:e||!f.trim(),type:"submit",className:"btn btn-outline-primary fw-bolder",children:"Send reset link"})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var _=a(4567);// ./src/pages/password/forgot.js
const f=()=>(0/* default */,u.jsx)(_.A,{showRegBtn:!1,children:(0,u.jsx)(p,{})});
/* harmony default export */}
/***/,
/***/8232:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/}}]);