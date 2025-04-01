"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[3927],{
/***/1280:
/***/(e,n,i)=>{
/* harmony export */i.d(n,{
/* harmony export */_v:()=>/* binding */s
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const s=e=>{e&&e.stopPropagation()}}
/***/,
/***/3464:
/***/(e,n,i)=>{e.exports=i.p+"702c5653d2360537e78f.svg";
/***/},
/***/7647:
/***/(e,n,i)=>{
// EXPORTS
i.d(n,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",t="index-module__titleWrap--hrdlj",l="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=i(6942),o=i.n(a),r=i(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=i(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",x="index-module__menuBtn--iHux0",p="index-module__menuCloseBtn--jCTip",h="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",g="index-module__menu--veCcg",w="index-module__active--EYt3Y",j="index-module__footer--O9Npd",_="index-module__menuItem--eqnJw",v="index-module__menuItemTitle--O6gep",k="index-module__active--Hl_ax",N="index-module__caret--U_US2",y="index-module__rotate--pnUGY",L="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var C=i(6540),M=i(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const S=C.forwardRef(((e,n)=>{let{children:i,className:s,goTo:t=null,isLinkActive:l,title:a,url:r=null}=e;const[c,d]=(0,C.useState)(l),[m,u]=(0,C.useState)("0px"),x=(0,C.useRef)(null);(0,C.useEffect)((()=>{i&&u(c?`${x.current.scrollHeight}px`:"0px")}),[i,c,x]);const p=e=>(0,M.jsx)("div",{className:o()(e.className,c&&y),children:(0,M.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,M.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,M.jsxs)("div",{className:o()(_,"d-flex flex-column",s),ref:n,children:[(0,M.jsxs)("a",{className:o()(v,"d-flex justify-content-between w-100 align-items-center px-3",l&&k),href:r||void 0,onClick:e=>{e.preventDefault(),i?d(!c):t&&r&&t(r)},children:[(0,M.jsx)("span",{className:"d-flex align-items-center",children:(0,M.jsx)("b",{children:a})}),i&&(0,M.jsx)(p,{className:N})]}),i&&(0,M.jsx)("div",{className:L,ref:x,style:i&&{maxHeight:`${m}`},children:i})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var A=i(8983),I=i(1448),P=i(8321),z=i(7767),E=i(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const O=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var W=i(1280),$=i(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const D=parseInt(u,10)||250,R=e=>{let{cd:n}=e;const[i,s]=(0,C.useState)(!1),[t,l]=(0,C.useState)(!0),a=(0,I/* useDispatch */.wA)(),r=(0,z/* useLocation */.zy)(),c=(0,z/* useNavigate */.Zp)(),d=(0/* authSelectors */,I/* useSelector */.d4)(A.Pg.isAdmin),u=(0/* authSelectors */,I/* useSelector */.d4)(A.Pg.isLoc),_=(0/* authSelectors */,I/* useSelector */.d4)(A.Pg.isSoc),[v,k]=(0,P.useSpring)((()=>({right:-D,config:{tension:350,friction:30}})));(0,C.useEffect)((()=>(i?(l(!1),k.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(k.start({right:-D,onRest:()=>l(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[i,k]),(0,C.useEffect)((()=>{const e=()=>{s(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const N=()=>{s((e=>!e))},y=e=>{c(e),N()};
return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("button",{className:x,onClick:N,children:(0/* SlMenu */,M.jsx)(m.RAm,{className:h})}),!t&&(0,M.jsx)("div",{className:o()(f),onClick:N,onMouseDown:W/* onStopPropagation */._v,onTouchStart:W/* onStopPropagation */._v}),(0,M.jsx)(P.animated.div,{className:o()(b),style:v,children:(0,M.jsxs)("div",{className:o()(g,"d-flex flex-column h-100"),children:[(0,M.jsx)("button",{className:p,onClick:N,children:(0/* SlClose */,M.jsx)(m.ipV,{className:h})}),(0,M.jsxs)("div",{className:"mb-3",children:[(0,M.jsxs)("div",{className:"m-3 text-center",children:[(0,M.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",n.year]}),(0,M.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),O.map((e=>{const n=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));return d||u&&e?.allowed?.includes("loc")||_&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,M.jsx)(S,{className:"py-2",isLinkActive:n,goTo:y,title:e.title,url:e.link,children:e.subLinks&&(0,M.jsx)(M.Fragment,{children:e.subLinks.filter((e=>d||u&&e?.allowed?.includes("loc")||_&&e?.allowed?.includes("soc"))).map((e=>{const n=r.pathname===e.link;
return(0/* Link */,M.jsx)(E.N_,{"aria-label":e.title,onClick:N,to:e.link,className:o()(n&&w),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,M.jsx)("div",{className:o()(j,"mt-auto"),children:(0,M.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,M.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>y("/"),title:"Public site",children:"Public site"}),(0,M.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await $/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),a(A/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var T=i(7762);// ./src/admin/components/header/index.js
const q=()=>{const e=`${T/* conferenceData */.p.name} ${T/* conferenceData */.p.year}`,n=(0/* authSelectors */,I/* useSelector */.d4)(A.Pg.isLoc),i=(0/* authSelectors */,I/* useSelector */.d4)(A.Pg.isSoc),s=n?"/admin/accommodations":i?"/admin/contributions/talks":"/admin/dashboard";
return(0,M.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,M.jsx)(R,{cd:T/* conferenceData */.p}),(0,M.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,M.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,M.jsxs)(E.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:s,title:"Admin",children:[(0,M.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,M.jsxs)("div",{className:"d-flex flex-column",children:[(0,M.jsxs)("h1",{className:"m-0 fw-bolder",children:[T/* conferenceData */.p.name," ",T/* conferenceData */.p.year]}),(0,M.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",n&&" - Local Organizing Committee",i&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=i(5902),H=i(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",B=e=>{let{links:n=[]}=e;return(0/* authSelectors */,I/* useSelector */.d4)(A.Pg.isAdmin)?(0,M.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,M.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,M.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,M.jsx)(E.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,M.jsx)(H.M14,{className:"me-1"})})}),n.map(((e,i)=>(0,M.jsx)("li",{className:o()("breadcrumb-item",{active:i===n.length-1}),"aria-current":i===n.length-1?"page":void 0,children:i===n.length-1?(0,M.jsx)("b",{children:e.name}):(0/* Link */,M.jsx)(E.N_,{to:e.url,children:e.name})},i)))]})}):null},U=e=>{let{breadcrumb:n=[],title:i="",rightContent:a,children:r,isMaxWidth:c=!0}=e;const d=i?`${i} | ${T/* conferenceData */.p.name_display} ${T/* conferenceData */.p.year}`:`${T/* conferenceData */.p.name_display} ${T/* conferenceData */.p.year}`;
return(0,M.jsxs)(M.Fragment,{children:[(0/* Helmet */,M.jsxs)(F.mg,{children:[(0,M.jsx)("title",{children:d}),(0,M.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,M.jsxs)("div",{className:o()(s,"position-relative"),children:[(0,M.jsx)(q,{}),(0,M.jsxs)("div",{className:"d-flex flex-row",children:[(0,M.jsx)(R,{cd:T/* conferenceData */.p}),(0,M.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${l} mx-md-auto`]:c}),children:[0!==n.length&&(0,M.jsx)(B,{links:n}),(!!i||!!a)&&(0,M.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",t),children:[i&&(0,M.jsx)("h2",{children:i}),a&&(0,M.jsx)("div",{children:a})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,n,i)=>{
// EXPORTS
i.d(n,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/8057:
/***/(e,n,i)=>{
/* harmony export */i.d(n,{
/* harmony export */A:()=>a
/* harmony export */});
/* harmony import */var s=i(8027),t=(i(6540),i(4976),i(4848));
/* harmony import */const l={xls:(0/* .FaFileExcel */,t.jsx)(s.Ru,{})},a=e=>{let{link:n,className:i,format:s="xls",title:a="Download"}=e;
return(0,t.jsxs)("a",{href:n,className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${i}`,"aria-label":`Download ${a} in ${s.toUpperCase()} format`,children:[l[s]||null," ",a]})}}
/***/}]);