"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[3354],{
/***/1280:
/***/(e,n,t)=>{
/* harmony export */t.d(n,{
/* harmony export */_v:()=>/* binding */i
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const i=e=>{e&&e.stopPropagation()}}
/***/,
/***/3354:
/***/(e,n,t)=>{t.r(n),
/* harmony export */t.d(n,{
/* harmony export */default:()=>a
/* harmony export */});
/* harmony import */var i=t(7647),s=t(4848);
/* harmony import */const a=()=>(0/* ["default"] */,s.jsx)(i.A,{title:"Admin Dashboard",children:"dashboard TBD"});
/* harmony default export */}
/***/,
/***/3464:
/***/(e,n,t)=>{e.exports=t.p+"702c5653d2360537e78f.svg";
/***/},
/***/7647:
/***/(e,n,t)=>{
// EXPORTS
t.d(n,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const i="index-module__pageContain--r6_E2",s="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=t(6942),l=t.n(a),o=t(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const r="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var d=t(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const m="300px",u="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",p="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",j="index-module__active--EYt3Y",v="index-module__footer--O9Npd",_="index-module__menuItem--eqnJw",g="index-module__menuItemTitle--O6gep",k="index-module__active--Hl_ax",N="index-module__caret--U_US2",w="index-module__rotate--pnUGY",y="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var L=t(6540),M=t(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const C=L.forwardRef(((e,n)=>{let{children:t,className:i,goTo:s=null,isLinkActive:a,title:o,url:r=null}=e;const[c,d]=(0,L.useState)(a),[m,u]=(0,L.useState)("0px"),h=(0,L.useRef)(null);(0,L.useEffect)((()=>{t&&u(c?`${h.current.scrollHeight}px`:"0px")}),[t,c,h]);const x=e=>(0,M.jsx)("div",{className:l()(e.className,c&&w),children:(0,M.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,M.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,M.jsxs)("div",{className:l()(_,"d-flex flex-column",i),ref:n,children:[(0,M.jsxs)("a",{className:l()(g,"d-flex justify-content-between w-100 align-items-center px-3",a&&k),href:r||void 0,onClick:e=>{e.preventDefault(),t?d(!c):s&&r&&s(r)},children:[(0,M.jsx)("span",{className:"d-flex align-items-center",children:(0,M.jsx)("b",{children:o})}),t&&(0,M.jsx)(x,{className:N})]}),t&&(0,M.jsx)("div",{className:y,ref:h,style:t&&{maxHeight:`${m}`},children:t})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var I=t(8321),A=t(8983),S=t(1448),E=t(7767),z=t(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const O=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Workshops",link:"/admin/participants/workshops"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accomodations",link:"/admin/accomodations"},{title:"Export",link:"/admin/export"}];
// EXTERNAL MODULE: ./src/utils/event.js
var T=t(1280),D=t(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const W=parseInt(m,10)||250,q=e=>{let{cd:n}=e;const[t,i]=(0,L.useState)(!1),[s,a]=(0,L.useState)(!0),o=(0,S/* useDispatch */.wA)(),r=(0,E/* useLocation */.zy)(),c=(0,E/* useNavigate */.Zp)(),[m,_]=(0,I.useSpring)((()=>({right:-W,config:{tension:350,friction:30}})));(0,L.useEffect)((()=>(t?(a(!1),_.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(_.start({right:-W,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,_]),(0,L.useEffect)((()=>{const e=()=>{i(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const g=()=>{i((e=>!e))},k=e=>{c(e),g()};
return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("button",{className:u,onClick:g,children:(0/* SlMenu */,M.jsx)(d.RAm,{className:x})}),!s&&(0,M.jsx)("div",{className:l()(b),onClick:g,onMouseDown:T/* onStopPropagation */._v,onTouchStart:T/* onStopPropagation */._v}),(0,M.jsx)(I.animated.div,{className:l()(p),style:m,children:(0,M.jsxs)("div",{className:l()(f,"d-flex flex-column h-100"),children:[(0,M.jsx)("button",{className:h,onClick:g,children:(0/* SlClose */,M.jsx)(d.ipV,{className:x})}),(0,M.jsxs)("div",{className:"mb-3",children:[(0,M.jsxs)("div",{className:"m-3 text-center",children:[(0,M.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",n.year]}),(0,M.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),O.map((e=>{const n=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,M.jsx)(C,{className:"py-2",isLinkActive:n,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,M.jsx)(M.Fragment,{children:e.subLinks.map((e=>{const n=r.pathname===e.link;
return(0/* Link */,M.jsx)(z.N_,{"aria-label":e.title,onClick:g,to:e.link,className:l()(n&&j),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,M.jsx)("div",{className:l()(v,"mt-auto"),children:(0,M.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,M.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,M.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await D/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),o(A/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var P=t(7762);// ./src/admin/components/header/index.js
const R=()=>{const e=`${P/* conferenceData */.p.name} ${P/* conferenceData */.p.year}`;
return(0,M.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,M.jsx)(q,{cd:P/* conferenceData */.p}),(0,M.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,M.jsx)("div",{className:l()(r,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,M.jsxs)(z.N_,{"aria-label":"Admin",className:l()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:"/admin/dashboard",title:"Admin",children:[(0,M.jsx)("img",{src:o,alt:e,className:"rounded-circle border border-2 p-1"}),(0,M.jsxs)("div",{className:"d-flex flex-column",children:[(0,M.jsxs)("h1",{className:"m-0 fw-bolder",children:[P/* conferenceData */.p.name," ",P/* conferenceData */.p.year]}),(0,M.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var $=t(5902),F=t(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const H="breadcrumb-module__nav--atkeN",V=e=>{let{links:n=[]}=e;
return(0,M.jsx)("nav",{"aria-label":"breadcrumb",className:H,children:(0,M.jsxs)("ol",{className:l()("breadcrumb"),children:[(0,M.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,M.jsx)(z.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,M.jsx)(F.M14,{className:"me-1"})})}),n.map(((e,t)=>(0,M.jsx)("li",{className:l()("breadcrumb-item",{active:t===n.length-1}),"aria-current":t===n.length-1?"page":void 0,children:t===n.length-1?(0,M.jsx)("b",{children:e.name}):(0/* Link */,M.jsx)(z.N_,{to:e.url,children:e.name})},t)))]})})},B=e=>{let{breadcrumb:n=[],title:t="",rightContent:a,children:o,isMaxWidth:r=!1}=e;const c=t?`${t} | ${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`:`${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`;
return(0,M.jsxs)(M.Fragment,{children:[(0/* Helmet */,M.jsxs)($.mg,{children:[(0,M.jsx)("title",{children:c}),(0,M.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,M.jsxs)("div",{className:l()(i,"position-relative"),children:[(0,M.jsx)(R,{}),(0,M.jsxs)("div",{className:"d-flex flex-row",children:[(0,M.jsx)(q,{cd:P/* conferenceData */.p}),(0,M.jsxs)("div",{className:"mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",children:[0!==n.length&&(0,M.jsx)(V,{links:n}),(0,M.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[t&&(0,M.jsx)("h2",{children:t}),a&&(0,M.jsx)("div",{children:a})]}),(0,M.jsx)("div",{className:l()(r&&s),children:o})]})]})]})]})}}
/***/,
/***/7762:
/***/(e,n,t)=>{
// EXPORTS
t.d(n,{p:()=>/* reexport */i});// ./src/data/conference-data.json
const i=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasuer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);