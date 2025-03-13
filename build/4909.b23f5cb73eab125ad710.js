"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[4909],{
/***/1280:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */_v:()=>/* binding */s
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const s=e=>{e&&e.stopPropagation()}}
/***/,
/***/1299:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */d});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=n(6942),i=n.n(s),a=n(6540),l=n(6645),o=n(1083),r=n(3318);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var c=n(4848);// ./src/admin/components/rooms/index.js
// Import available rooms hook
const d=e=>{let{className:t}=e;
// Fetch available rooms data
const{availableRooms:n,loading:s,error:d}=(()=>{const[e,t]=(0,a.useState)([]),[n,s]=(0,a.useState)(!1),[i,l]=(0,a.useState)(null),c=(0,a.useCallback)((async()=>{s(!0),l(null);try{const e=await(0,r/* retry */.L)((()=>o/* default */.A.get("https://imc2025.imo.net/php/api/get_left_accommodations.php")));e.data.success?t(e.data.data||[]):l(e.data.message||"Error fetching available rooms.")}catch(e){l(e.message||"Error fetching available rooms.")}finally{s(!1)}}),[]);
// Fetch available rooms on mount
// Fetch available rooms on mount
return(0,a.useEffect)((()=>{c()}),[c]),{availableRooms:e,loading:n,error:i,refetchAvailableRooms:c}})();return d?(0,c.jsxs)("div",{className:"text-danger",children:["Error: ",d]}):(0,c.jsxs)("div",{className:i()(t,"p-3 border rounded-2 position-relative"),children:[s&&(0/* default */,c.jsx)(l.A,{}),(0,c.jsx)("h5",{children:"Available Rooms by Type"}),d&&(0,c.jsx)("div",{className:"alert alert-danger fw-bolder",children:d}),!d&&!s&&(0,c.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:n?.filter((e=>"no"!==e.registration_type)).map((e=>{const t=e.registration_type.charAt(0).toUpperCase()+e.registration_type.slice(1),n=0===Math.floor(e.available_rooms);// Capitalize first letter
// Check if rooms are available

return(0,c.jsxs)("div",{className:i()("p-3 border rounded-2",{"text-danger":n}),children:[t,": ",(0,c.jsx)("strong",{children:parseFloat(e.available_rooms).toFixed(2)})," ",(0,c.jsxs)("small",{children:["/ ",e.total_rooms]})]},e.registration_type_id)}))})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=function(e){let{interval:t=100,retries:n=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((i,a)=>{e().then(i).catch((l=>{setTimeout((()=>{n?s(e,{interval:1.5*t,retries:n-1}).then(i,a):a(l)}),t)}))}))};
/***/},
/***/3464:
/***/(e,t,n)=>{e.exports=n.p+"702c5653d2360537e78f.svg";
/***/},
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",i="index-module__titleWrap--hrdlj",a="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=n(6942),o=n.n(l),r=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",h="index-module__menuBtn--iHux0",p="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",v="index-module__menu--veCcg",g="index-module__active--EYt3Y",_="index-module__footer--O9Npd",j="index-module__menuItem--eqnJw",k="index-module__menuItemTitle--O6gep",w="index-module__active--Hl_ax",N="index-module__caret--U_US2",y="index-module__rotate--pnUGY",L="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var M=n(6540),C=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const A=M.forwardRef(((e,t)=>{let{children:n,className:s,goTo:i=null,isLinkActive:a,title:l,url:r=null}=e;const[c,d]=(0,M.useState)(a),[m,u]=(0,M.useState)("0px"),h=(0,M.useRef)(null);(0,M.useEffect)((()=>{n&&u(c?`${h.current.scrollHeight}px`:"0px")}),[n,c,h]);const p=e=>(0,C.jsx)("div",{className:o()(e.className,c&&y),children:(0,C.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,C.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,C.jsxs)("div",{className:o()(j,"d-flex flex-column",s),ref:t,children:[(0,C.jsxs)("a",{className:o()(k,"d-flex justify-content-between w-100 align-items-center px-3",a&&w),href:r||void 0,onClick:e=>{e.preventDefault(),n?d(!c):i&&r&&i(r)},children:[(0,C.jsx)("span",{className:"d-flex align-items-center",children:(0,C.jsx)("b",{children:l})}),n&&(0,C.jsx)(p,{className:N})]}),n&&(0,C.jsx)("div",{className:L,ref:h,style:n&&{maxHeight:`${m}`},children:n})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var S=n(8321),I=n(8983),E=n(1448),R=n(7767),T=n(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const W=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio"},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accommodations",link:"/admin/accomodations"},{title:"Downloads",link:"/admin/downloads"}];
// EXTERNAL MODULE: ./src/utils/event.js
var z=n(1280),O=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const q=parseInt(u,10)||250,D=e=>{let{cd:t}=e;const[n,s]=(0,M.useState)(!1),[i,a]=(0,M.useState)(!0),l=(0,E/* useDispatch */.wA)(),r=(0,R/* useLocation */.zy)(),c=(0,R/* useNavigate */.Zp)(),[d,u]=(0,S.useSpring)((()=>({right:-q,config:{tension:350,friction:30}})));(0,M.useEffect)((()=>(n?(a(!1),u.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(u.start({right:-q,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[n,u]),(0,M.useEffect)((()=>{const e=()=>{s(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const j=()=>{s((e=>!e))},k=e=>{c(e),j()};
return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("button",{className:h,onClick:j,children:(0/* SlMenu */,C.jsx)(m.RAm,{className:x})}),!i&&(0,C.jsx)("div",{className:o()(f),onClick:j,onMouseDown:z/* onStopPropagation */._v,onTouchStart:z/* onStopPropagation */._v}),(0,C.jsx)(S.animated.div,{className:o()(b),style:d,children:(0,C.jsxs)("div",{className:o()(v,"d-flex flex-column h-100"),children:[(0,C.jsx)("button",{className:p,onClick:j,children:(0/* SlClose */,C.jsx)(m.ipV,{className:x})}),(0,C.jsxs)("div",{className:"mb-3",children:[(0,C.jsxs)("div",{className:"m-3 text-center",children:[(0,C.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,C.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),W.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,C.jsx)(A,{className:"py-2",isLinkActive:t,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,C.jsx)(C.Fragment,{children:e.subLinks.map((e=>{const t=r.pathname===e.link;
return(0/* Link */,C.jsx)(T.N_,{"aria-label":e.title,onClick:j,to:e.link,className:o()(t&&g),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,C.jsx)("div",{className:o()(_,"mt-auto"),children:(0,C.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,C.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,C.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await O/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),l(I/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var P=n(7762);// ./src/admin/components/header/index.js
const $=()=>{const e=`${P/* conferenceData */.p.name} ${P/* conferenceData */.p.year}`;
return(0,C.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,C.jsx)(D,{cd:P/* conferenceData */.p}),(0,C.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,C.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,C.jsxs)(T.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:"/admin/dashboard",title:"Admin",children:[(0,C.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,C.jsxs)("div",{className:"d-flex flex-column",children:[(0,C.jsxs)("h1",{className:"m-0 fw-bolder",children:[P/* conferenceData */.p.name," ",P/* conferenceData */.p.year]}),(0,C.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=n(5902),H=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",B=e=>{let{links:t=[]}=e;
return(0,C.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,C.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,C.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,C.jsx)(T.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,C.jsx)(H.M14,{className:"me-1"})})}),t.map(((e,n)=>(0,C.jsx)("li",{className:o()("breadcrumb-item",{active:n===t.length-1}),"aria-current":n===t.length-1?"page":void 0,children:n===t.length-1?(0,C.jsx)("b",{children:e.name}):(0/* Link */,C.jsx)(T.N_,{to:e.url,children:e.name})},n)))]})})},U=e=>{let{breadcrumb:t=[],title:n="",rightContent:l,children:r,isMaxWidth:c=!0}=e;const d=n?`${n} | ${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`:`${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`;
return(0,C.jsxs)(C.Fragment,{children:[(0/* Helmet */,C.jsxs)(F.mg,{children:[(0,C.jsx)("title",{children:d}),(0,C.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,C.jsxs)("div",{className:o()(s,"position-relative"),children:[(0,C.jsx)($,{}),(0,C.jsxs)("div",{className:"d-flex flex-row",children:[(0,C.jsx)(D,{cd:P/* conferenceData */.p}),(0,C.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:c}),children:[0!==t.length&&(0,C.jsx)(B,{links:t}),(0,C.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",i),children:[n&&(0,C.jsx)("h2",{children:n}),l&&(0,C.jsx)("div",{children:l})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);