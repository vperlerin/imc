"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[1299],{
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
// ESM COMPAT FLAG
s.r(t),
// EXPORTS
s.d(t,{default:()=>/* binding */h});
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
var n=s(408),i=s(7647),a=s(6942),l=s.n(a),r=s(6645),o=s(6540),c=s(3318),d=s(1083);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var m=s(4848);// ./src/admin/pages/participants/workshops/index.js
const h=()=>{const[e,t]=(0,o.useState)("1"),[s,a]=(0,o.useState)([]),[h,u]=(0,o.useState)(""),[p,x]=(0,o.useState)("last_name"),[b,j]=(0,o.useState)([]),[f,v]=(0,o.useState)("all"),{participants:g,loading:_}=(e=>{const[t,s]=(0,o.useState)([]),[n,i]=(0,o.useState)(!0),[a,l]=(0,o.useState)(null);// Re-fetch when workshopId changes
return(0,o.useEffect)((()=>{if(!e)return i(!1),void l("Workshop ID is required.");(async()=>{try{const t=await(0,c/* retry */.L)((()=>d/* default */.A.get("https://imc2025.imo.net/php/api/get_workshops_participants.php",{params:{workshop_id:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");s(t.data.data)}catch(e){l(e.message||"Failed to fetch participants. Please refresh the page.")}finally{i(!1)}})()}),[e]),{participants:t,loading:n,error:a,setParticipants:s}})(e);(0,o.useEffect)((()=>{let e=g;
// Apply search filter
if(h){const t=h.toLowerCase();e=e.filter((e=>(e[p]?String(e[p]).toLowerCase():"").includes(t)))}
// Apply type sorting
"all"!==f&&(e=e.filter((e=>"online"===f?"1"===e.is_online:"0"===e.is_online))),j(e)}),[h,p,f,g]);
return(0/* default */,m.jsx)(i.A,{breadcrumb:[{url:"/admin/participants/workshops",name:"Workshop Participants"}],isMaxWidth:!0,title:"Workshop Participants",rightContent:(0,m.jsx)("select",{className:"form-select",value:e,onChange:e=>t(e.target.value),children:s.map((e=>(0,m.jsxs)("option",{value:e.id,children:[e.title," (",e.date,")"]},e.id)))}),children:_?(0/* default */,m.jsx)(r.A,{}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"d-flex gap-2 mb-3",children:[(0,m.jsxs)("select",{className:"form-select w-auto",value:p,onChange:e=>x(e.target.value),children:[(0,m.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,m.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${p.replace("_"," ")}`,value:h,onChange:e=>u(e.target.value)}),(0/* CiSearch */,m.jsx)(n.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,m.jsxs)("select",{className:"form-select w-auto",value:f,onChange:e=>v(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All"}),(0,m.jsx)("option",{value:"online",children:"Online"}),(0,m.jsx)("option",{value:"onsite",children:"On-Site"})]})]}),(0,m.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{children:"Reg. Date"}),(0,m.jsx)("th",{children:"Type"}),(0,m.jsx)("th",{children:"Name"}),(0,m.jsx)("th",{children:"Reg. Type"}),(0,m.jsx)("th",{children:"Total"}),(0,m.jsx)("th",{children:"Paid"}),(0,m.jsx)("th",{children:"Due"}),(0,m.jsx)("th",{children:"Confirmed"})]})}),(0,m.jsx)("tbody",{children:b.length>0?b.map((e=>(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,m.jsx)("td",{children:"0"===e.is_online?"ON-SITE":"ONLINE"}),(0,m.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,m.jsx)("td",{children:e.registration_type_id||"N/A"}),(0,m.jsxs)("td",{children:[e.total_due,"€"]}),(0,m.jsxs)("td",{children:[e.total_paid,"€"]}),(0,m.jsxs)("td",{className:l()({"text-success":Number(e.total_due)-Number(e.total_paid)==0}),children:[(Number(e.total_due)-Number(e.total_paid)).toFixed(2),"€"]}),(0,m.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"})]},e.id))):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"8",className:"text-center",children:"No participants found for this workshop."})})})]})})]})})};
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
s.d(t,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__pageContain--r6_E2",i="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=s(6942),l=s.n(a),r=s(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const o="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var d=s(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const m="300px",h="index-module__menuBtn--iHux0",u="index-module__menuCloseBtn--jCTip",p="index-module__menuIcon--i9Mwv",x="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",j="index-module__menu--veCcg",f="index-module__active--EYt3Y",v="index-module__footer--O9Npd",g="index-module__menuItem--eqnJw",_="index-module__menuItemTitle--O6gep",N="index-module__active--Hl_ax",w="index-module__caret--U_US2",k="index-module__rotate--pnUGY",y="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var C=s(6540),L=s(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const S=C.forwardRef(((e,t)=>{let{children:s,className:n,goTo:i=null,isLinkActive:a,title:r,url:o=null}=e;const[c,d]=(0,C.useState)(a),[m,h]=(0,C.useState)("0px"),u=(0,C.useRef)(null);(0,C.useEffect)((()=>{s&&h(c?`${u.current.scrollHeight}px`:"0px")}),[s,c,u]);const p=e=>(0,L.jsx)("div",{className:l()(e.className,c&&k),children:(0,L.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,L.jsxs)("div",{className:l()(g,"d-flex flex-column",n),ref:t,children:[(0,L.jsxs)("a",{className:l()(_,"d-flex justify-content-between w-100 align-items-center px-3",a&&N),href:o||void 0,onClick:e=>{e.preventDefault(),s?d(!c):i&&o&&i(o)},children:[(0,L.jsx)("span",{className:"d-flex align-items-center",children:(0,L.jsx)("b",{children:r})}),s&&(0,L.jsx)(p,{className:w})]}),s&&(0,L.jsx)("div",{className:y,ref:u,style:s&&{maxHeight:`${m}`},children:s})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var M=s(8321),A=s(8983),I=s(1448),E=s(7767),O=s(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const T=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Workshops",link:"/admin/participants/workshops"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accomodations",link:"/admin/accomodations"},{title:"Export",link:"/admin/export"}];
// EXTERNAL MODULE: ./src/utils/event.js
var W=s(1280),P=s(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const D=parseInt(m,10)||250,z=e=>{let{cd:t}=e;const[s,n]=(0,C.useState)(!1),[i,a]=(0,C.useState)(!0),r=(0,I/* useDispatch */.wA)(),o=(0,E/* useLocation */.zy)(),c=(0,E/* useNavigate */.Zp)(),[m,g]=(0,M.useSpring)((()=>({right:-D,config:{tension:350,friction:30}})));(0,C.useEffect)((()=>(s?(a(!1),g.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(g.start({right:-D,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[s,g]),(0,C.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const _=()=>{n((e=>!e))},N=e=>{c(e),_()};
return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{className:h,onClick:_,children:(0/* SlMenu */,L.jsx)(d.RAm,{className:p})}),!i&&(0,L.jsx)("div",{className:l()(b),onClick:_,onMouseDown:W/* onStopPropagation */._v,onTouchStart:W/* onStopPropagation */._v}),(0,L.jsx)(M.animated.div,{className:l()(x),style:m,children:(0,L.jsxs)("div",{className:l()(j,"d-flex flex-column h-100"),children:[(0,L.jsx)("button",{className:u,onClick:_,children:(0/* SlClose */,L.jsx)(d.ipV,{className:p})}),(0,L.jsxs)("div",{className:"mb-3",children:[(0,L.jsxs)("div",{className:"m-3 text-center",children:[(0,L.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,L.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),T.map((e=>{const t=o.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>o.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,L.jsx)(S,{className:"py-2",isLinkActive:t,goTo:N,title:e.title,url:e.link,children:e.subLinks&&(0,L.jsx)(L.Fragment,{children:e.subLinks.map((e=>{const t=o.pathname===e.link;
return(0/* Link */,L.jsx)(O.N_,{"aria-label":e.title,onClick:_,to:e.link,className:l()(t&&f),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,L.jsx)("div",{className:l()(v,"mt-auto"),children:(0,L.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,L.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>N("/"),title:"Public site",children:"Public site"}),(0,L.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await P/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),r(A/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var q=s(7762);// ./src/admin/components/header/index.js
const R=()=>{const e=`${q/* conferenceData */.p.name} ${q/* conferenceData */.p.year}`;
return(0,L.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,L.jsx)(z,{cd:q/* conferenceData */.p}),(0,L.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,L.jsx)("div",{className:l()(o,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,L.jsxs)(O.N_,{"aria-label":"Admin",className:l()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:"/admin/dashboard",title:"Admin",children:[(0,L.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,L.jsxs)("div",{className:"d-flex flex-column",children:[(0,L.jsxs)("h1",{className:"m-0 fw-bolder",children:[q/* conferenceData */.p.name," ",q/* conferenceData */.p.year]}),(0,L.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=s(5902),$=s(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const H="breadcrumb-module__nav--atkeN",V=e=>{let{links:t=[]}=e;
return(0,L.jsx)("nav",{"aria-label":"breadcrumb",className:H,children:(0,L.jsxs)("ol",{className:l()("breadcrumb"),children:[(0,L.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,L.jsx)(O.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,L.jsx)($.M14,{className:"me-1"})})}),t.map(((e,s)=>(0,L.jsx)("li",{className:l()("breadcrumb-item",{active:s===t.length-1}),"aria-current":s===t.length-1?"page":void 0,children:s===t.length-1?(0,L.jsx)("b",{children:e.name}):(0/* Link */,L.jsx)(O.N_,{to:e.url,children:e.name})},s)))]})})},B=e=>{let{breadcrumb:t=[],title:s="",rightContent:a,children:r,isMaxWidth:o=!1}=e;const c=s?`${s} | ${q/* conferenceData */.p.name_display} ${q/* conferenceData */.p.year}`:`${q/* conferenceData */.p.name_display} ${q/* conferenceData */.p.year}`;
return(0,L.jsxs)(L.Fragment,{children:[(0/* Helmet */,L.jsxs)(F.mg,{children:[(0,L.jsx)("title",{children:c}),(0,L.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,L.jsxs)("div",{className:l()(n,"position-relative"),children:[(0,L.jsx)(R,{}),(0,L.jsxs)("div",{className:"d-flex flex-row",children:[(0,L.jsx)(z,{cd:q/* conferenceData */.p}),(0,L.jsxs)("div",{className:"mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",children:[0!==t.length&&(0,L.jsx)(V,{links:t}),(0,L.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[s&&(0,L.jsx)("h2",{children:s}),a&&(0,L.jsx)("div",{children:a})]}),(0,L.jsx)("div",{className:l()(o&&i),children:r})]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{p:()=>/* reexport */n});// ./src/data/conference-data.json
const n=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasuer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);