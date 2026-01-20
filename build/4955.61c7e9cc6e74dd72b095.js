"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[4955],{
/***/111:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={login:"index-module__login--Jr3_l"};
/***/},
/***/1684:
/***/(e,s,a)=>{
// ESM COMPAT FLAG
a.r(s),
// EXPORTS
a.d(s,{default:()=>/* binding */b});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var t=a(6942),l=a.n(t),r=a(111),n=a(8232),o=a(6645),d=a(6540),c=a(1083),i=a(2262),m=a(4976),u=a(4848);// ./src/components/oauth/reset_pwd/index.js
const p=()=>{const[e,s]=(0,d.useState)(!1),[a,t]=(0,d.useState)(""),[p,h]=(0,d.useState)(null),[b,w]=(0,d.useState)(null),[f]=(0,m/* useSearchParams */.ok)(),g=f.get("token"),x=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
return(0,u.jsxs)("div",{className:l()(r/* default */.A.login,"flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative"),children:[e&&(0/* default */,u.jsx)(o.A,{}),(0,u.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),w(null),h(null),x.test(a)){s(!0);try{const e=await c/* default */.A.post("https://imc2026.imo.net/php/auth/reset_password.php",{token:g,password:a});e.data.success?h(e.data.message||"Your password has been reset successfully."):w(e.data.message||"Something went wrong. Please try again.")}catch(e){w(e.response?.data?.message||"Something went wrong. Please try again.")}finally{s(!1)}}else w("Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.")},className:l()(n/* default */.A.xSmallW,"w-100 border p-3 rounded-2"),children:[b&&(0,u.jsx)("div",{className:"alert alert-danger fw-bolder",children:b}),p&&(0,u.jsxs)("div",{className:"alert alert-success fw-bolder",children:[p,(0,u.jsx)("div",{className:"mt-3",children:(0/* Link */,u.jsx)(m.N_,{to:"/login",className:"btn btn-outline-primary fw-bolder",children:"Log in now"})})]}),(0,u.jsxs)("div",{className:"mb-3",children:[(0/* default */,u.jsx)(i.A,{autoFocus:!0,disabled:e,placeholder:"Enter new password",value:a,onChange:e=>t(e.target.value),required:!0}),(0,u.jsx)("p",{className:"form-text",children:"Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number."})]}),(0,u.jsx)("button",{disabled:e||!x.test(a),type:"submit",className:"btn btn-outline-primary fw-bolder",children:"Reset Password"})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var h=a(4567);// ./src/pages/password/reset.js
const b=()=>(0/* default */,u.jsx)(h.A,{showRegBtn:!1,children:(0,u.jsx)(p,{})});
/* harmony default export */}
/***/,
/***/2262:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>d
/* harmony export */});
/* harmony import */var t=a(6540),l=a(3),r=a(6942),n=a.n(r),o=a(4848);
/* harmony import */const d=({value:e,onChange:s,placeholder:a="Enter password",disabled:r=!1,className:d="",props:c})=>{const[i,m]=(0,t.useState)(!1);
return(0,o.jsxs)("div",{className:n()("position-relative",d),children:[(0,o.jsx)("input",{type:i?"text":"password",className:"form-control pe-5",placeholder:a,value:e,onChange:s,disabled:r,...c}),(0,o.jsx)("button",{type:"button",className:"btn position-absolute end-0 top-50 translate-middle-y p-2 border-0 bg-transparent",onClick:()=>m(!i),"aria-label":i?"Hide password":"Show password",children:i?(0/* .FiEyeOff */,o.jsx)(l._NO,{}):(0/* .FiEye */,o.jsx)(l.Vap,{})})]})};
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