"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[8540],{
/***/111:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={login:"index-module__login--Jr3_l"};
/***/},
/***/2262:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>d
/* harmony export */});
/* harmony import */var t=a(6540),l=a(3),o=a(6942),n=a.n(o),r=a(4848);
/* harmony import */const d=e=>{let{value:s,onChange:a,placeholder:o="Enter password",disabled:d=!1,className:i="",props:m}=e;const[c,u]=(0,t.useState)(!1);
return(0,r.jsxs)("div",{className:n()("position-relative",i),children:[(0,r.jsx)("input",{type:c?"text":"password",className:"form-control pe-5",placeholder:o,value:s,onChange:a,disabled:d,...m}),(0,r.jsx)("button",{type:"button",className:"btn position-absolute end-0 top-50 translate-middle-y p-2 border-0 bg-transparent",onClick:()=>u(!c),"aria-label":c?"Hide password":"Show password",children:c?(0/* .FiEyeOff */,r.jsx)(l._NO,{}):(0/* .FiEye */,r.jsx)(l.Vap,{})})]})};
/* harmony default export */}
/***/,
/***/8232:
/***/(e,s,a)=>{
/* harmony export */a.d(s,{
/* harmony export */A:()=>t
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const t={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/},
/***/8393:
/***/(e,s,a)=>{
// ESM COMPAT FLAG
a.r(s),
// EXPORTS
a.d(s,{default:()=>/* binding */g});
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var t=a(1083),l=a(6540),o=a(6645),n=a(2262),r=a(1448),d=a(7767),i=a(4976),m=a(8983),c=a(6942),u=a.n(c),p=a(111),h=a(8232),b=a(4848);
// EXTERNAL MODULE: ./node_modules/react/index.js
// ./src/components/oauth/form.js
const f=()=>{const[e,s]=(0,l.useState)(""),[a,c]=(0,l.useState)(""),[f,x]=(0,l.useState)(!1),[g,w]=(0,l.useState)(null),_=(0,r/* useDispatch */.wA)(),j=(0,d/* useNavigate */.Zp)();(0/* authSelectors */,r/* useSelector */.d4)(m.Pg.isAdmin);
return(0,b.jsxs)("div",{className:u()(p/* default */.A.login,"flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative"),children:[f&&(0/* default */,b.jsx)(o.A,{}),(0,b.jsxs)("form",{onSubmit:async s=>{s.preventDefault(),w(null),x(!0);try{const s=await t/* default */.A.post("https://imc2025.imo.net/php/auth/login.php",{email:e,password:a},{headers:{"Content-Type":"application/json"},withCredentials:!0});if(!s.data?.success)throw new Error(s.data?.message||"Invalid response from server");
// Store session token
_(m/* authActions */.I2.setSession("authenticated")),
// Fetch user details securely from backend
await _(m/* authActions */.I2.fetchUser());const l=s.data.user;j(l?.is_admin?"/admin/dashboard":"/update-registration")}catch(e){w(e.response?.data?.message||e.message||"Something went wrong.")}finally{x(!1)}},className:u()(h/* default */.A.xSmallW,"w-100 border p-3 rounded-2"),children:[g&&(0,b.jsx)("div",{className:"alert alert-danger fw-bolder",children:g}),(0,b.jsxs)("div",{className:"mb-3",children:[(0,b.jsx)("label",{htmlFor:"emailInput",className:"form-label",children:"Email address"}),(0,b.jsx)("input",{autoFocus:!0,disabled:f,type:"email",className:"form-control",id:"emailInput",value:e,onChange:e=>s(e.target.value),placeholder:"Your email",required:!0})]}),(0,b.jsxs)("div",{className:"mb-3",children:[(0,b.jsx)("label",{htmlFor:"passwordInput",className:"form-label",children:"Password"}),(0/* default */,b.jsx)(n.A,{disabled:f,value:a,onChange:e=>c(e.target.value),className:"w-100",required:!0})]}),(0,b.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0/* Link */,b.jsx)(i.N_,{to:"/forgot-password",className:"text-decoration-none",children:"Forgot your password?"}),(0,b.jsx)("button",{disabled:f||!e.trim()||!a.trim(),type:"submit",className:"btn btn-outline-primary fw-bolder",children:"Login"})]})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var x=a(4567);// ./src/pages/login/index.js
const g=()=>(0/* default */,b.jsx)(x.A,{showRegBtn:!1,children:(0,b.jsx)(f,{})});
/* harmony default export */}
/***/}]);