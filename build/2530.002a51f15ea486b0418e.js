"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[2530],{
/***/111:
/***/(e,a,l)=>{
/* harmony export */l.d(a,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={login:"index-module__login--Jr3_l"};
/***/},
/***/914:
/***/(e,a,l)=>{
/* harmony export */l.d(a,{
/* harmony export */Z:()=>/* binding */t
/* harmony export */});
/* harmony import */l(1083);const t=async({subject:e,message:a,to:l,toName:t,fromName:s,replyTo:o,replyName:r,bcc:n=[],token:m=null})=>{}}
/***/,
/***/967:
/***/(e,a,l)=>{
// ESM COMPAT FLAG
l.r(a),
// EXPORTS
l.d(a,{default:()=>/* binding */f});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var t=l(6942),s=l.n(t),o=l(111),r=l(8232),n=l(6645),m=l(6540),i=l(1083),d=l(914),c=l(4848);// ./src/components/oauth/forgot_pwd/index.js
const u=()=>{const[e,a]=(0,m.useState)(!1),[l,t]=(0,m.useState)(null),[u,p]=(0,m.useState)(null),[f,h]=(0,m.useState)("");
return(0,c.jsxs)("div",{className:s()(o/* default */.A.login,"flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative"),children:[e&&(0/* default */,c.jsx)(n.A,{}),(0,c.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),p(null),t(null),a(!0);try{const e=await i/* default */.A.post("https://imc2026.imo.net/php/auth/forgot_password.php",{email:f});if(e.data.success&&e.data.token&&e.data.email){(await(0,d/* sendEmail */.Z)({subject:"IMC 2026 Password Reset",message:`Click the link below to reset your password: <br>\n            <a href="https://imc2026.imo.net/reset-password?token=${e.data.token}">\n            Reset Password</a>`,to:e.data.email,toName:"IMC Participant",fromName:"IMC 2026",replyTo:"no-reply@imc2026.imo.net",replyName:"no-reply"})).success?t("Password reset email sent successfully."):p("Something went wrong. Impossible to send you an email for now. Please try again later.")}else p(e.data.message||"Something went wrong.")}catch(e){p(e.response?.data?.message||"Something went wrong. Please try again later.")}finally{a(!1),h("")}},className:s()(r/* default */.A.xSmallW,"w-100 border p-3 rounded-2"),children:[u&&(0,c.jsx)("div",{className:"alert alert-danger fw-bolder",children:u}),l&&(0,c.jsx)("div",{className:"alert alert-success fw-bolder",children:l}),(0,c.jsxs)("div",{className:"mb-3",children:[(0,c.jsx)("label",{htmlFor:"emailInput",className:"form-label",children:"Enter your email"}),(0,c.jsx)("input",{autoFocus:!0,disabled:e,type:"email",className:"form-control",id:"emailInput","aria-describedby":"emailHelp",value:f,onChange:e=>h(e.target.value),placeholder:"Your email",required:!0})]}),(0,c.jsx)("button",{disabled:e||!f.trim(),type:"submit",className:"btn btn-outline-primary fw-bolder",children:"Send reset link"})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var p=l(4567);// ./src/pages/password/forgot.js
const f=()=>(0/* default */,c.jsx)(p.A,{showRegBtn:!1,children:(0,c.jsx)(u,{})});
/* harmony default export */}
/***/,
/***/8232:
/***/(e,a,l)=>{
/* harmony export */l.d(a,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/}}]);