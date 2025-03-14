"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[4909],{
/***/1280:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */_v:()=>/* binding */n
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const n=e=>{e&&e.stopPropagation()}}
/***/,
/***/1299:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{A:()=>/* binding */m});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var n=s(6942),i=s.n(n),a=s(6540),l=s(6645),o=s(4976),r=s(1083),d=s(3318);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var c=s(4848);// ./src/admin/components/rooms/index.js
const m=e=>{let{className:t,showLink:s=!1}=e;const{availableRooms:n,loading:m,error:u}=(()=>{const[e,t]=(0,a.useState)([]),[s,n]=(0,a.useState)(!1),[i,l]=(0,a.useState)(null),o=(0,a.useCallback)((async()=>{n(!0),l(null);try{const e=await(0,d/* retry */.L)((()=>r/* default */.A.get("https://imc2025.imo.net/php/api/get_left_accommodations.php")));e.data.success?t(e.data.data||[]):l(e.data.message||"Error fetching available rooms.")}catch(e){l(e.message||"Error fetching available rooms.")}finally{n(!1)}}),[]);
// Fetch available rooms on mount
// Fetch available rooms on mount
return(0,a.useEffect)((()=>{o()}),[o]),{availableRooms:e,loading:s,error:i,refetchAvailableRooms:o}})();if(u)
return(0,c.jsxs)("div",{className:"text-danger",children:["Error: ",u]});
// Function to format room availability
const h=(e,t)=>{const s={single:1,double:2,quadruple:4}[e]||1,n=Math.floor(t),i=Math.round((t-n)*s);// Default to 1 if type is unknown
let a=`${n} rooms left`;return i>0&&(a+=` + ${i} bed${i>1?"s":""}`),a};
return(0,c.jsxs)("div",{className:i()(t,"p-3 border rounded-2 position-relative"),children:[m&&(0/* default */,c.jsx)(l.A,{}),s?(0,c.jsx)("h5",{children:(0/* Link */,c.jsx)(o.N_,{to:"/admin/accomodations",children:"Available Rooms by Type"})}):(0,c.jsx)("h5",{children:"Available Rooms by Type"}),u&&(0,c.jsx)("div",{className:"alert alert-danger fw-bolder",children:u}),!u&&!m&&(0,c.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:n?.filter((e=>"no"!==e.registration_type)).map((e=>{const t=e.registration_type.toLowerCase(),s=0===Math.floor(e.available_rooms);
return(0,c.jsxs)("div",{className:i()("p-3 border rounded-2",{"text-danger":s}),children:[t.charAt(0).toUpperCase()+t.slice(1),":",(0,c.jsxs)("strong",{children:[" ",h(t,parseFloat(e.available_rooms))]}),(0,c.jsxs)("small",{className:"text-muted",children:[" / ",e.total_rooms]})]},e.registration_type_id)}))})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=function(e){let{interval:t=100,retries:s=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((i,a)=>{e().then(i).catch((l=>{setTimeout((()=>{s?n(e,{interval:1.5*t,retries:s-1}).then(i,a):a(l)}),t)}))}))};
/***/},
/***/3464:
/***/(e,t,s)=>{e.exports=s.p+"702c5653d2360537e78f.svg";
/***/},
/***/7647:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__pageContain--r6_E2",i="index-module__titleWrap--hrdlj",a="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=s(6942),o=s.n(l),r=s(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const d="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=s(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",h="index-module__menuBtn--iHux0",p="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",v="index-module__menu--veCcg",g="index-module__active--EYt3Y",_="index-module__footer--O9Npd",j="index-module__menuItem--eqnJw",k="index-module__menuItemTitle--O6gep",w="index-module__active--Hl_ax",N="index-module__caret--U_US2",y="index-module__rotate--pnUGY",L="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var M=s(6540),C=s(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const A=M.forwardRef(((e,t)=>{let{children:s,className:n,goTo:i=null,isLinkActive:a,title:l,url:r=null}=e;const[d,c]=(0,M.useState)(a),[m,u]=(0,M.useState)("0px"),h=(0,M.useRef)(null);(0,M.useEffect)((()=>{s&&u(d?`${h.current.scrollHeight}px`:"0px")}),[s,d,h]);const p=e=>(0,C.jsx)("div",{className:o()(e.className,d&&y),children:(0,C.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,C.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,C.jsxs)("div",{className:o()(j,"d-flex flex-column",n),ref:t,children:[(0,C.jsxs)("a",{className:o()(k,"d-flex justify-content-between w-100 align-items-center px-3",a&&w),href:r||void 0,onClick:e=>{e.preventDefault(),s?c(!d):i&&r&&i(r)},children:[(0,C.jsx)("span",{className:"d-flex align-items-center",children:(0,C.jsx)("b",{children:l})}),s&&(0,C.jsx)(p,{className:N})]}),s&&(0,C.jsx)("div",{className:L,ref:h,style:s&&{maxHeight:`${m}`},children:s})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var S=s(8321),I=s(8983),E=s(1448),R=s(7767),T=s(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const W=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio"},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accommodations",link:"/admin/accomodations"},{title:"Downloads",link:"/admin/downloads"}];
// EXTERNAL MODULE: ./src/utils/event.js
var $=s(1280),z=s(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const O=parseInt(u,10)||250,q=e=>{let{cd:t}=e;const[s,n]=(0,M.useState)(!1),[i,a]=(0,M.useState)(!0),l=(0,E/* useDispatch */.wA)(),r=(0,R/* useLocation */.zy)(),d=(0,R/* useNavigate */.Zp)(),[c,u]=(0,S.useSpring)((()=>({right:-O,config:{tension:350,friction:30}})));(0,M.useEffect)((()=>(s?(a(!1),u.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(u.start({right:-O,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[s,u]),(0,M.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const j=()=>{n((e=>!e))},k=e=>{d(e),j()};
return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("button",{className:h,onClick:j,children:(0/* SlMenu */,C.jsx)(m.RAm,{className:x})}),!i&&(0,C.jsx)("div",{className:o()(f),onClick:j,onMouseDown:$/* onStopPropagation */._v,onTouchStart:$/* onStopPropagation */._v}),(0,C.jsx)(S.animated.div,{className:o()(b),style:c,children:(0,C.jsxs)("div",{className:o()(v,"d-flex flex-column h-100"),children:[(0,C.jsx)("button",{className:p,onClick:j,children:(0/* SlClose */,C.jsx)(m.ipV,{className:x})}),(0,C.jsxs)("div",{className:"mb-3",children:[(0,C.jsxs)("div",{className:"m-3 text-center",children:[(0,C.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,C.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),W.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,C.jsx)(A,{className:"py-2",isLinkActive:t,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,C.jsx)(C.Fragment,{children:e.subLinks.map((e=>{const t=r.pathname===e.link;
return(0/* Link */,C.jsx)(T.N_,{"aria-label":e.title,onClick:j,to:e.link,className:o()(t&&g),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,C.jsx)("div",{className:o()(_,"mt-auto"),children:(0,C.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,C.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,C.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await z/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),l(I/* authActions */.I2.logout()),localStorage.removeItem("session"),d("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var D=s(7762);// ./src/admin/components/header/index.js
const P=()=>{const e=`${D/* conferenceData */.p.name} ${D/* conferenceData */.p.year}`;
return(0,C.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,C.jsx)(q,{cd:D/* conferenceData */.p}),(0,C.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,C.jsx)("div",{className:o()(d,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,C.jsxs)(T.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:"/admin/dashboard",title:"Admin",children:[(0,C.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,C.jsxs)("div",{className:"d-flex flex-column",children:[(0,C.jsxs)("h1",{className:"m-0 fw-bolder",children:[D/* conferenceData */.p.name," ",D/* conferenceData */.p.year]}),(0,C.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=s(5902),H=s(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",B=e=>{let{links:t=[]}=e;
return(0,C.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,C.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,C.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,C.jsx)(T.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,C.jsx)(H.M14,{className:"me-1"})})}),t.map(((e,s)=>(0,C.jsx)("li",{className:o()("breadcrumb-item",{active:s===t.length-1}),"aria-current":s===t.length-1?"page":void 0,children:s===t.length-1?(0,C.jsx)("b",{children:e.name}):(0/* Link */,C.jsx)(T.N_,{to:e.url,children:e.name})},s)))]})})},U=e=>{let{breadcrumb:t=[],title:s="",rightContent:l,children:r,isMaxWidth:d=!0}=e;const c=s?`${s} | ${D/* conferenceData */.p.name_display} ${D/* conferenceData */.p.year}`:`${D/* conferenceData */.p.name_display} ${D/* conferenceData */.p.year}`;
return(0,C.jsxs)(C.Fragment,{children:[(0/* Helmet */,C.jsxs)(F.mg,{children:[(0,C.jsx)("title",{children:c}),(0,C.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,C.jsxs)("div",{className:o()(n,"position-relative"),children:[(0,C.jsx)(P,{}),(0,C.jsxs)("div",{className:"d-flex flex-row",children:[(0,C.jsx)(q,{cd:D/* conferenceData */.p}),(0,C.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:d}),children:[0!==t.length&&(0,C.jsx)(B,{links:t}),(0,C.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",i),children:[s&&(0,C.jsx)("h2",{children:s}),l&&(0,C.jsx)("div",{children:l})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{p:()=>/* reexport */n});// ./src/data/conference-data.json
const n=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);