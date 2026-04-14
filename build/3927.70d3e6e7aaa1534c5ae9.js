"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[3927],{
/***/1280:
/***/(e,s,i)=>{
/* harmony export */i.d(s,{
/* harmony export */_v:()=>/* binding */n
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const n=e=>{e&&e.stopPropagation()}}
/***/,
/***/7647:
/***/(e,s,i)=>{
// EXPORTS
i.d(s,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__pageContain--r6_E2",t="index-module__titleWrap--hrdlj",l="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=i(6942),o=i.n(a),r=i(8075);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=i(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",x="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",p="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",g="index-module__menu--veCcg",w="index-module__active--EYt3Y",j="index-module__footer--O9Npd",v="index-module__menuItem--eqnJw",_="index-module__menuItemTitle--O6gep",N="index-module__active--Hl_ax",k="index-module__caret--U_US2",y="index-module__rotate--pnUGY",L="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var C=i(6540),M=i(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const A=C.forwardRef((({children:e,className:s,goTo:i=null,isLinkActive:n,title:t,url:l=null},a)=>{const[r,c]=(0,C.useState)(n),[d,m]=(0,C.useState)("0px"),u=(0,C.useRef)(null);(0,C.useEffect)((()=>{e&&m(r?`${u.current.scrollHeight}px`:"0px")}),[e,r,u]);const x=e=>(0,M.jsx)("div",{className:o()(e.className,r&&y),children:(0,M.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,M.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,M.jsxs)("div",{className:o()(v,"d-flex flex-column",s),ref:a,children:[(0,M.jsxs)("a",{className:o()(_,"d-flex justify-content-between w-100 align-items-center px-3",n&&N),href:l||void 0,onClick:s=>{s.preventDefault(),e?c(!r):i&&l&&i(l)},children:[(0,M.jsx)("span",{className:"d-flex align-items-center",children:(0,M.jsx)("b",{children:t})}),e&&(0,M.jsx)(x,{className:k})]}),e&&(0,M.jsx)("div",{className:L,ref:u,style:e&&{maxHeight:`${d}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var I=i(8983),S=i(1448),P=i(8321),O=i(7767),z=i(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const $=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var E=i(1280),D=i(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const q=parseInt(u,10)||250,R=({cd:e})=>{const[s,i]=(0,C.useState)(!1),[n,t]=(0,C.useState)(!0),l=(0,S/* useDispatch */.wA)(),a=(0,O/* useLocation */.zy)(),r=(0,O/* useNavigate */.Zp)(),c=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isAdmin),d=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isLoc),u=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isSoc),[v,_]=(0,P.useSpring)((()=>({right:-q,config:{tension:350,friction:30}})));(0,C.useEffect)((()=>(s?(t(!1),_.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(_.start({right:-q,onRest:()=>t(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[s,_]),(0,C.useEffect)((()=>{const e=()=>{i(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const N=()=>{i((e=>!e))},k=e=>{r(e),N()};
return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("button",{className:x,onClick:N,children:(0/* SlMenu */,M.jsx)(m.RAm,{className:p})}),!n&&(0,M.jsx)("div",{className:o()(f),onClick:N,onMouseDown:E/* onStopPropagation */._v,onTouchStart:E/* onStopPropagation */._v}),(0,M.jsx)(P.animated.div,{className:o()(b),style:v,children:(0,M.jsxs)("div",{className:o()(g,"d-flex flex-column h-100"),children:[(0,M.jsx)("button",{className:h,onClick:N,children:(0/* SlClose */,M.jsx)(m.ipV,{className:p})}),(0,M.jsxs)("div",{className:"mb-3",children:[(0,M.jsxs)("div",{className:"m-3 text-center",children:[(0,M.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,M.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),$.map((e=>{const s=a.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>a.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,M.jsx)(A,{className:"py-2",isLinkActive:s,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,M.jsx)(M.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc"))).map((e=>{const s=a.pathname===e.link;
return(0/* Link */,M.jsx)(z.N_,{"aria-label":e.title,onClick:N,to:e.link,className:o()(s&&w),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,M.jsx)("div",{className:o()(j,"mt-auto"),children:(0,M.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,M.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,M.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await D/* default */.A.get("https://imc2026.imo.net/php/auth/logout.php",{withCredentials:!0}),l(I/* authActions */.I2.logout()),localStorage.removeItem("session"),r("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var T=i(7762);// ./src/admin/components/header/index.js
const F=()=>{const e=`${T/* conferenceData */.p.name} ${T/* conferenceData */.p.year}`,s=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isLoc),i=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isSoc),n=s?"/admin/accommodations":i?"/admin/contributions/talks":"/admin/dashboard";
return(0,M.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,M.jsx)(R,{cd:T/* conferenceData */.p}),(0,M.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,M.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,M.jsxs)(z.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:n,title:"Admin",children:[(0,M.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,M.jsxs)("div",{className:"d-flex flex-column",children:[(0,M.jsxs)("h1",{className:"m-0 fw-bolder",children:[T/* conferenceData */.p.name," ",T/* conferenceData */.p.year]}),(0,M.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",s&&" - Local Organizing Committee",i&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var W=i(5902),V=i(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const H="breadcrumb-module__nav--atkeN",B=({links:e=[]})=>(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isAdmin)?(0,M.jsx)("nav",{"aria-label":"breadcrumb",className:H,children:(0,M.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,M.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,M.jsx)(z.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,M.jsx)(V.M14,{className:"me-1"})})}),e.map(((s,i)=>(0,M.jsx)("li",{className:o()("breadcrumb-item",{active:i===e.length-1}),"aria-current":i===e.length-1?"page":void 0,children:i===e.length-1?(0,M.jsx)("b",{children:s.name}):(0/* Link */,M.jsx)(z.N_,{to:s.url,children:s.name})},i)))]})}):null,U=({breadcrumb:e=[],title:s="",rightContent:i,children:a,isMaxWidth:r=!0})=>{const c=s?`${s} | ${T/* conferenceData */.p.name_display} ${T/* conferenceData */.p.year}`:`${T/* conferenceData */.p.name_display} ${T/* conferenceData */.p.year}`;
return(0,M.jsxs)(M.Fragment,{children:[(0/* Helmet */,M.jsxs)(W.mg,{children:[(0,M.jsx)("title",{children:c}),(0,M.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,M.jsxs)("div",{className:o()(n,"position-relative"),children:[(0,M.jsx)(F,{}),(0,M.jsxs)("div",{className:"d-flex flex-row",children:[(0,M.jsx)(R,{cd:T/* conferenceData */.p}),(0,M.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${l} mx-md-auto`]:r}),children:[0!==e.length&&(0,M.jsx)(B,{links:e}),(!!s||!!i)&&(0,M.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",t),children:[s&&(0,M.jsx)("h2",{children:s}),i&&(0,M.jsx)("div",{children:i})]}),a]})]})]})]})}}
/***/,
/***/7762:
/***/(e,s,i)=>{
// EXPORTS
i.d(s,{p:()=>/* reexport */n});// ./src/data/conference-data.json
const n=JSON.parse('{"year":2026,"num":"45th","welcome":"Bienvenue !","thank_you":"Merci !","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2026-09-24","end":"2026-09-27"},"location":"Barcelonette, France","hotel":"Pôle d\'accueil universitaire Séolane","consulate":"French consulate","deadlines":{"reg":"2026-08-10","paper":"2026-10-31","full_reimbursement_before":"2026-07-01","half_reimbursement_before":"2026-08-10","early_birds":"2026-07-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","total":68,"sort_order":1,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","total":12,"sort_order":2,"type":"double"},{"price":500,"description":"Single room in the IMC host","total":8,"sort_order":3,"type":"single"},{"price":200,"description":"No accommodation","sort_order":4,"type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International Meteor Organization","website":"https://imo.net"},{"name":"Vigie-Ciel","website":"https://www.vigie-ciel.org/"}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2026@imo.net","name":"IMC 2026 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2026@imo.net","name":"IMC 2026 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/8057:
/***/(e,s,i)=>{
/* harmony export */i.d(s,{
/* harmony export */A:()=>a
/* harmony export */});
/* harmony import */var n=i(8027),t=(i(6540),i(4976),i(4848));
/* harmony import */const l={xls:(0/* .FaFileExcel */,t.jsx)(n.Ru,{className:"mt-1"})},a=({className:e,format:s="xls",link:i,subTitle:n="",title:a="Download"})=>(0,t.jsxs)("a",{href:i,className:`btn btn-outline-success d-inline-flex align-items-start gap-2 ${e}`,"aria-label":`Download ${a} in ${s.toUpperCase()} format`,children:[l[s]||null,(0,t.jsxs)("div",{className:"d-flex flex-column align-items-start",children:[a,n&&(0,t.jsx)("span",{className:"text-muted fw-normal",children:n})]})]})}
/***/,
/***/8075:
/***/(e,s,i)=>{e.exports=i.p+"702c5653d2360537e78f.svg";
/***/}}]);