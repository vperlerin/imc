"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[8540],{
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
/* harmony import */var t=s(6540),r=s(3),l=s(6942),o=s.n(l),n=s(4848);
/* harmony import */const d=({value:e,onChange:a,placeholder:s="Enter password",disabled:l=!1,className:d="",props:i})=>{const[m,c]=(0,t.useState)(!1);
return(0,n.jsxs)("div",{className:o()("position-relative",d),children:[(0,n.jsx)("input",{type:m?"text":"password",className:"form-control pe-5",placeholder:s,value:e,onChange:a,disabled:l,...i}),(0,n.jsx)("button",{type:"button",className:"btn position-absolute end-0 top-50 translate-middle-y p-2 border-0 bg-transparent",onClick:()=>c(!m),"aria-label":m?"Hide password":"Show password",children:m?(0/* .FiEyeOff */,n.jsx)(r._NO,{}):(0/* .FiEye */,n.jsx)(r.Vap,{})})]})};
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
s.d(a,{default:()=>/* binding */g});
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var t=s(1083),r=s(6540),l=s(6645),o=s(2262),n=s(1448),d=s(7767),i=s(4976),m=s(8983),c=s(6942),u=s.n(c),p=s(111),h=s(8232),f=s(4848);
// EXTERNAL MODULE: ./node_modules/react/index.js
// ./src/components/oauth/form.js
const b=()=>{const[e,a]=(0,r.useState)(""),[s,c]=(0,r.useState)(""),[b,x]=(0,r.useState)(!1),[g,w]=(0,r.useState)(null),j=(0,n/* useDispatch */.wA)(),v=(0,d/* useNavigate */.Zp)(),_=(0,d/* useLocation */.zy)(),N=_.state?.message,y=_.state?.from,A=y?`${y.pathname||""}${y.search||""}${y.hash||""}`:null;
return(0,f.jsxs)("div",{className:u()(p/* default */.A.login,"flex-grow-1 d-flex flex-column h-100 align-items-center justify-content-center position-relative"),children:[N&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:"alert alert-info fw-bolder",children:N}),(0,f.jsx)("p",{className:"fw-bolder text-start w-100",children:"Our Carpooling ride-sharing board allows you to either offer a ride or contact a driver offering a ride to the conference venue."})]}),b&&(0/* default */,f.jsx)(l.A,{}),(0,f.jsxs)("form",{onSubmit:async a=>{a.preventDefault(),w(null),x(!0);try{const a=await t/* default */.A.post("https://imc2026.imo.net/php/auth/login.php",{email:e,password:s},{headers:{"Content-Type":"application/json"},withCredentials:!0});if(!a.data?.success)throw new Error(a.data?.message||"Invalid response from server");if(j(m/* authActions */.I2.setSession("authenticated")),await j(m/* authActions */.I2.fetchUser()),A)return void v(A,{replace:!0});
// Redirect user based on role
switch(a.data.user.role){case"admin":v("/admin/dashboard");break;case"soc":v("/admin/contributions/talks");break;case"loc":v("/admin/accomodations");break;default:v("/update-registration")}}catch(e){w(e.response?.data?.message||e.message||"Something went wrong.")}finally{x(!1)}},className:u()(h/* default */.A.xSmallW,"w-100 border p-3 rounded-2"),children:[g&&(0,f.jsx)("div",{className:"alert alert-danger fw-bolder",children:g}),(0,f.jsxs)("div",{className:"mb-3",children:[(0,f.jsx)("label",{htmlFor:"emailInput",className:"form-label",children:"Email address"}),(0,f.jsx)("input",{autoFocus:!0,disabled:b,type:"email",className:"form-control",id:"emailInput",value:e,onChange:e=>a(e.target.value),placeholder:"Your email",required:!0})]}),(0,f.jsxs)("div",{className:"mb-3",children:[(0,f.jsx)("label",{htmlFor:"passwordInput",className:"form-label",children:"Password"}),(0/* default */,f.jsx)(o.A,{disabled:b,value:s,onChange:e=>c(e.target.value),className:"w-100",required:!0})]}),(0,f.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0/* Link */,f.jsx)(i.N_,{to:"/forgot-password",className:"text-decoration-none",children:"Forgot your password?"}),(0,f.jsx)("button",{disabled:b||!e.trim()||!s.trim(),type:"submit",className:"btn btn-outline-primary fw-bolder",children:"Login"})]})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var x=s(4567);// ./src/pages/login/index.js
const g=()=>(0/* default */,f.jsx)(x.A,{showRegBtn:!1,children:(0,f.jsx)(b,{})});
/* harmony default export */}
/***/}]);