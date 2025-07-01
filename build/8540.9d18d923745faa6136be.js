"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[8540],{
/***/111:
/***/(e,a,s)=>{
/* harmony export */s.d(a,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={login:"index-module__login--Jr3_l"};
/***/},
/***/2262:
/***/(e,a,s)=>{
/* harmony export */s.d(a,{
/* harmony export */A:()=>d
/* harmony export */});
/* harmony import */var t=s(6540),l=s(3),o=s(6942),r=s.n(o),n=s(4848);
/* harmony import */const d=({value:e,onChange:a,placeholder:s="Enter password",disabled:o=!1,className:d="",props:i})=>{const[m,c]=(0,t.useState)(!1);
return(0,n.jsxs)("div",{className:r()("position-relative",d),children:[(0,n.jsx)("input",{type:m?"text":"password",className:"form-control pe-5",placeholder:s,value:e,onChange:a,disabled:o,...i}),(0,n.jsx)("button",{type:"button",className:"btn position-absolute end-0 top-50 translate-middle-y p-2 border-0 bg-transparent",onClick:()=>c(!m),"aria-label":m?"Hide password":"Show password",children:m?(0/* .FiEyeOff */,n.jsx)(l._NO,{}):(0/* .FiEye */,n.jsx)(l.Vap,{})})]})};
/* harmony default export */}
/***/,
/***/8232:
/***/(e,a,s)=>{
/* harmony export */s.d(a,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/},
/***/8393:
/***/(e,a,s)=>{
// ESM COMPAT FLAG
s.r(a),
// EXPORTS
s.d(a,{default:()=>/* binding */w});
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var t=s(1083),l=s(6540),o=s(6645),r=s(2262),n=s(1448),d=s(7767),i=s(4976),m=s(8983),c=s(6942),u=s.n(c),p=s(111),h=s(8232),b=s(4848);
// EXTERNAL MODULE: ./node_modules/react/index.js
// ./src/components/oauth/form.js
const f=()=>{const[e,a]=(0,l.useState)(""),[s,c]=(0,l.useState)(""),[f,x]=(0,l.useState)(!1),[w,g]=(0,l.useState)(null),_=(0,n/* useDispatch */.wA)(),j=(0,d/* useNavigate */.Zp)();(0,n/* useSelector */.d4)((e=>e.auth.role));
return(0,b.jsxs)("div",{className:u()(p/* default */.A.login,"flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative"),children:[f&&(0/* default */,b.jsx)(o.A,{}),(0,b.jsxs)("form",{onSubmit:async a=>{a.preventDefault(),g(null),x(!0);try{const a=await t/* default */.A.post("https://imc2025.imo.net/php/auth/login.php",{email:e,password:s},{headers:{"Content-Type":"application/json"},withCredentials:!0});if(!a.data?.success)throw new Error(a.data?.message||"Invalid response from server");
// Redirect user based on role
switch(_(m/* authActions */.I2.setSession("authenticated")),await _(m/* authActions */.I2.fetchUser()),a.data.user.role){case"admin":j("/admin/dashboard");break;case"soc":j("/admin/contributions/talks");break;case"loc":j("/admin/accomodations");break;default:j("/update-registration")}}catch(e){g(e.response?.data?.message||e.message||"Something went wrong.")}finally{x(!1)}},className:u()(h/* default */.A.xSmallW,"w-100 border p-3 rounded-2"),children:[w&&(0,b.jsx)("div",{className:"alert alert-danger fw-bolder",children:w}),(0,b.jsxs)("div",{className:"mb-3",children:[(0,b.jsx)("label",{htmlFor:"emailInput",className:"form-label",children:"Email address"}),(0,b.jsx)("input",{autoFocus:!0,disabled:f,type:"email",className:"form-control",id:"emailInput",value:e,onChange:e=>a(e.target.value),placeholder:"Your email",required:!0})]}),(0,b.jsxs)("div",{className:"mb-3",children:[(0,b.jsx)("label",{htmlFor:"passwordInput",className:"form-label",children:"Password"}),(0/* default */,b.jsx)(r.A,{disabled:f,value:s,onChange:e=>c(e.target.value),className:"w-100",required:!0})]}),(0,b.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0/* Link */,b.jsx)(i.N_,{to:"/forgot-password",className:"text-decoration-none",children:"Forgot your password?"}),(0,b.jsx)("button",{disabled:f||!e.trim()||!s.trim(),type:"submit",className:"btn btn-outline-primary fw-bolder",children:"Login"})]})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var x=s(4567);// ./src/pages/login/index.js
const w=()=>(0/* default */,b.jsx)(x.A,{showRegBtn:!1,children:(0,b.jsx)(f,{})});
/* harmony default export */}
/***/}]);