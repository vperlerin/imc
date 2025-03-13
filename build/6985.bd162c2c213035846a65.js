"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[6985],{
/***/1280:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */_v:()=>/* binding */n
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const n=e=>{e&&e.stopPropagation()}}
/***/,
/***/3464:
/***/(e,t,s)=>{e.exports=s.p+"702c5653d2360537e78f.svg";
/***/},
/***/6985:
/***/(e,t,s)=>{s.r(t),
/* harmony export */s.d(t,{
/* harmony export */default:()=>d
/* harmony export */});
/* harmony import */var n=s(408),i=s(7647),a=s(6645),l=s(6540),o=s(1083),r=s(8057),c=s(4848);
/* harmony import */const d=()=>{const[e,t]=(0,l.useState)(""),[s,d]=(0,l.useState)(null),[m,u]=(0,l.useState)("asc"),[h,x]=(0,l.useState)("all"),[p,b]=(0,l.useState)([]),[f,j]=(0,l.useState)([]),[_,v]=(0,l.useState)(!0),[g,k]=(0,l.useState)("");(0,l.useEffect)((()=>{o/* ["default"] */.A.get("https://imc2025.imo.net/php/api/get_talks.php").then((e=>{if(e.data.success){const t=Object.entries(e.data.data).flatMap((e=>{let[t,s]=e;return s.map((e=>({...e,session_name:t})))}));b(t),j(t)}else k(e.data.data);v(!1)})).catch((e=>{k("Error fetching talks: "+e.message),v(!1)}))}),[]),(0,l.useEffect)((()=>{let t=[...p];if(e){const s=e.toLowerCase();t=t.filter((e=>e.title.toLowerCase().includes(s)))}"all"!==h&&(t=t.filter((e=>"confirmed"===h?"1"===e.confirmation_sent:"0"===e.confirmation_sent))),s&&t.sort(((e,t)=>{let n=e[s]??"",i=t[s]??"";return"onsite"===s?(n="0"===e.is_online?1:0,i="0"===t.is_online?1:0):(n=n.toString().toLowerCase(),i=i.toString().toLowerCase()),"asc"===m?n<i?-1:1:n>i?-1:1})),j(t)}),[e,h,s,m,p]);const N=e=>{s===e?u("asc"===m?"desc":"asc"):(d(e),u("asc"))};
return(0/* ["default"] */,c.jsxs)(i.A,{title:"Talks List",isMaxWidth:!0,children:[g&&(0,c.jsx)("div",{className:"alert alert-danger fw-bolder",children:g}),_?(0/* ["default"] */,c.jsx)(a.A,{}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,c.jsxs)("div",{className:"position-relative w-auto",children:[(0,c.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:"Search talks by title",value:e,onChange:e=>t(e.target.value)}),(0/* .CiSearch */,c.jsx)(n.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,c.jsxs)("select",{className:"form-select w-auto",value:h,onChange:e=>x(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All"}),(0,c.jsx)("option",{value:"confirmed",children:"Only Confirmed"}),(0,c.jsx)("option",{value:"not_confirmed",children:"Only Non-Confirmed"})]}),(0/* ["default"] */,c.jsx)(r.A,{className:"ms-auto",link:"https://imc2025.imo.net/php/doc_talks.php"})]}),(0,c.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,c.jsxs)("table",{className:"table table-striped",children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"sortable",onClick:()=>N("session_name"),children:"Session"}),(0,c.jsx)("th",{className:"sortable",onClick:()=>N("title"),children:"Title"}),(0,c.jsx)("th",{className:"sortable",onClick:()=>N("last_name"),children:"Presenter"}),(0,c.jsx)("th",{className:"sortable",onClick:()=>N("duration"),children:"Dur."}),(0,c.jsx)("th",{className:"sortable",onClick:()=>N("onsite"),children:"Onsite"}),(0,c.jsx)("th",{className:"sortable",onClick:()=>N("confirmation_sent"),children:"Confirmed"})]})}),(0,c.jsx)("tbody",{children:f.length>0?f.map(((e,t)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:e.session_name}),(0,c.jsx)("td",{children:e.title}),(0,c.jsx)("td",{children:`${e.first_name} ${e.last_name}`}),(0,c.jsx)("td",{children:`${e.duration}`}),(0,c.jsx)("td",{children:"0"===e.is_online?"✅":"❌"}),(0,c.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"})]},t))):(0,c.jsx)("tr",{children:(0,c.jsx)("td",{colSpan:"6",className:"text-center",children:"No talks found."})})})]})})]})]})};
/* harmony default export */}
/***/,
/***/7647:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__pageContain--r6_E2",i="index-module__titleWrap--hrdlj",a="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=s(6942),o=s.n(l),r=s(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=s(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",h="index-module__menuBtn--iHux0",x="index-module__menuCloseBtn--jCTip",p="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",j="index-module__menu--veCcg",_="index-module__active--EYt3Y",v="index-module__footer--O9Npd",g="index-module__menuItem--eqnJw",k="index-module__menuItemTitle--O6gep",N="index-module__active--Hl_ax",w="index-module__caret--U_US2",y="index-module__rotate--pnUGY",C="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var L=s(6540),S=s(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const M=L.forwardRef(((e,t)=>{let{children:s,className:n,goTo:i=null,isLinkActive:a,title:l,url:r=null}=e;const[c,d]=(0,L.useState)(a),[m,u]=(0,L.useState)("0px"),h=(0,L.useRef)(null);(0,L.useEffect)((()=>{s&&u(c?`${h.current.scrollHeight}px`:"0px")}),[s,c,h]);const x=e=>(0,S.jsx)("div",{className:o()(e.className,c&&y),children:(0,S.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,S.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,S.jsxs)("div",{className:o()(g,"d-flex flex-column",n),ref:t,children:[(0,S.jsxs)("a",{className:o()(k,"d-flex justify-content-between w-100 align-items-center px-3",a&&N),href:r||void 0,onClick:e=>{e.preventDefault(),s?d(!c):i&&r&&i(r)},children:[(0,S.jsx)("span",{className:"d-flex align-items-center",children:(0,S.jsx)("b",{children:l})}),s&&(0,S.jsx)(x,{className:w})]}),s&&(0,S.jsx)("div",{className:C,ref:h,style:s&&{maxHeight:`${m}`},children:s})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var A=s(8321),I=s(8983),E=s(1448),O=s(7767),$=s(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const W=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio"},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accommodations",link:"/admin/accomodations"},{title:"Downloads",link:"/admin/downloads"}];
// EXTERNAL MODULE: ./src/utils/event.js
var D=s(1280),T=s(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const z=parseInt(u,10)||250,R=e=>{let{cd:t}=e;const[s,n]=(0,L.useState)(!1),[i,a]=(0,L.useState)(!0),l=(0,E/* useDispatch */.wA)(),r=(0,O/* useLocation */.zy)(),c=(0,O/* useNavigate */.Zp)(),[d,u]=(0,A.useSpring)((()=>({right:-z,config:{tension:350,friction:30}})));(0,L.useEffect)((()=>(s?(a(!1),u.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(u.start({right:-z,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[s,u]),(0,L.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const g=()=>{n((e=>!e))},k=e=>{c(e),g()};
return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{className:h,onClick:g,children:(0/* SlMenu */,S.jsx)(m.RAm,{className:p})}),!i&&(0,S.jsx)("div",{className:o()(f),onClick:g,onMouseDown:D/* onStopPropagation */._v,onTouchStart:D/* onStopPropagation */._v}),(0,S.jsx)(A.animated.div,{className:o()(b),style:d,children:(0,S.jsxs)("div",{className:o()(j,"d-flex flex-column h-100"),children:[(0,S.jsx)("button",{className:x,onClick:g,children:(0/* SlClose */,S.jsx)(m.ipV,{className:p})}),(0,S.jsxs)("div",{className:"mb-3",children:[(0,S.jsxs)("div",{className:"m-3 text-center",children:[(0,S.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,S.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),W.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,S.jsx)(M,{className:"py-2",isLinkActive:t,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,S.jsx)(S.Fragment,{children:e.subLinks.map((e=>{const t=r.pathname===e.link;
return(0/* Link */,S.jsx)($.N_,{"aria-label":e.title,onClick:g,to:e.link,className:o()(t&&_),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,S.jsx)("div",{className:o()(v,"mt-auto"),children:(0,S.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,S.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,S.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await T/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),l(I/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var q=s(7762);// ./src/admin/components/header/index.js
const P=()=>{const e=`${q/* conferenceData */.p.name} ${q/* conferenceData */.p.year}`;
return(0,S.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,S.jsx)(R,{cd:q/* conferenceData */.p}),(0,S.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,S.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,S.jsxs)($.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:"/admin/dashboard",title:"Admin",children:[(0,S.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,S.jsxs)("div",{className:"d-flex flex-column",children:[(0,S.jsxs)("h1",{className:"m-0 fw-bolder",children:[q/* conferenceData */.p.name," ",q/* conferenceData */.p.year]}),(0,S.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=s(5902),H=s(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",B=e=>{let{links:t=[]}=e;
return(0,S.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,S.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,S.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,S.jsx)($.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,S.jsx)(H.M14,{className:"me-1"})})}),t.map(((e,s)=>(0,S.jsx)("li",{className:o()("breadcrumb-item",{active:s===t.length-1}),"aria-current":s===t.length-1?"page":void 0,children:s===t.length-1?(0,S.jsx)("b",{children:e.name}):(0/* Link */,S.jsx)($.N_,{to:e.url,children:e.name})},s)))]})})},U=e=>{let{breadcrumb:t=[],title:s="",rightContent:l,children:r,isMaxWidth:c=!0}=e;const d=s?`${s} | ${q/* conferenceData */.p.name_display} ${q/* conferenceData */.p.year}`:`${q/* conferenceData */.p.name_display} ${q/* conferenceData */.p.year}`;
return(0,S.jsxs)(S.Fragment,{children:[(0/* Helmet */,S.jsxs)(F.mg,{children:[(0,S.jsx)("title",{children:d}),(0,S.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,S.jsxs)("div",{className:o()(n,"position-relative"),children:[(0,S.jsx)(P,{}),(0,S.jsxs)("div",{className:"d-flex flex-row",children:[(0,S.jsx)(R,{cd:q/* conferenceData */.p}),(0,S.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:c}),children:[0!==t.length&&(0,S.jsx)(B,{links:t}),(0,S.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",i),children:[s&&(0,S.jsx)("h2",{children:s}),l&&(0,S.jsx)("div",{children:l})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{p:()=>/* reexport */n});// ./src/data/conference-data.json
const n=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/8057:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */A:()=>l
/* harmony export */});
/* harmony import */var n=s(8027),i=(s(6540),s(4976),s(4848));
/* harmony import */const a={xls:(0/* .FaFileExcel */,i.jsx)(n.Ru,{})},l=e=>{let{link:t,className:s,format:n="xls",title:l="Download"}=e;
return(0,i.jsxs)("a",{href:t,className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${s}`,"aria-label":`Download ${l} in ${n.toUpperCase()} format`,children:[a[n]||null," ",l]})}}
/***/}]);