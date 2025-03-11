"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[1299],{
/***/1280:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */_v:()=>/* binding */a
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const a=e=>{e&&e.stopPropagation()}}
/***/,
/***/1299:
/***/(e,t,s)=>{
// ESM COMPAT FLAG
s.r(t),
// EXPORTS
s.d(t,{default:()=>/* binding */p});
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
var a=s(408),n=s(7647),i=s(6645),l=s(6540),r=s(3318),o=s(1083);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// EXTERNAL MODULE: ./src/api/specific-data/index.js
var c=s(4493),d=s(8057),m=s(4848);
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
// ./src/admin/pages/participants/workshops/index.js
const p=e=>{let{workshopId:t}=e;const[s,p]=(0,l.useState)(""),[h,u]=(0,l.useState)("all"),[x,b]=(0,l.useState)(null),[f,g]=(0,l.useState)("asc"),{participants:_,loading:j}=(e=>{const[t,s]=(0,l.useState)([]),[a,n]=(0,l.useState)(!0),[i,c]=(0,l.useState)(null);// Re-fetch when workshopId changes
return(0,l.useEffect)((()=>{if(!e)return n(!1),void c("Workshop ID is required.");(async()=>{try{const t=await(0,r/* retry */.L)((()=>o/* default */.A.get("https://imc2025.imo.net/php/api/get_workshops_participants.php",{params:{workshop_id:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");s(t.data.data)}catch(e){c(e.message||"Failed to fetch participants. Please refresh the page.")}finally{n(!1)}})()}),[e]),{participants:t,loading:a,error:i,setParticipants:s}})(t),{workshops:v,loading:w}=(0,c/* useApiSpecificData */.Q)(),k="last_name",N=v?.find((e=>e.id===String(t))),y=[{url:"/admin/participants/workshops/",name:`${N?N.title:"Workshop"} Participants`}],C=e=>{x===e?g("asc"===f?"desc":"asc"):(b(e),g("asc"))};
// Filter participants based on search and type
let S=_||[];if("all"!==h&&(S=S.filter((e=>"online"===h?"1"===e.is_online:"0"===e.is_online))),s){const e=s.toLowerCase();S=S.filter((t=>(t[k]?String(t[k]).toLowerCase():"").includes(e)))}
// Sort participants based on selected column
return x&&(S=[...S].sort(((e,t)=>{let s=e[x]??"",a=t[x]??"";
// Convert values for proper sorting
return["created_at"].includes(x)?(s=new Date(s).getTime()||0,a=new Date(a).getTime()||0):(s=s.toString().toLowerCase(),a=a.toString().toLowerCase()),s<a?"asc"===f?-1:1:s>a?"asc"===f?1:-1:0}))),(0/* default */,m.jsx)(n.A,{breadcrumb:y,isMaxWidth:!0,title:N?N.title:"Workshop Participants",children:j||w?(0/* default */,m.jsx)(i.A,{}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"d-flex gap-2 mb-3",children:[(0,m.jsxs)("select",{className:"form-select w-auto",value:h,onChange:e=>u(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All"}),(0,m.jsx)("option",{value:"online",children:"Online"}),(0,m.jsx)("option",{value:"onsite",children:"On-Site"})]}),(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${k.replace("_"," ")}`,value:s,onChange:e=>p(e.target.value)}),(0/* CiSearch */,m.jsx)(a.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* default */,m.jsx)(d.A,{className:"ms-auto",link:`https://imc2025.imo.net/php/doc_workshops.php?workshop_id=${t}`})]}),(0,m.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsxs)("th",{className:"sortable",onClick:()=>C("created_at"),children:["Reg. Date ","created_at"===x&&("asc"===f?"🔼":"🔽")]}),(0,m.jsxs)("th",{className:"sortable",onClick:()=>C("is_online"),children:["Type ","is_online"===x&&("asc"===f?"🔼":"🔽")]}),(0,m.jsxs)("th",{className:"sortable",onClick:()=>C("last_name"),children:["Name ","last_name"===x&&("asc"===f?"🔼":"🔽")]}),(0,m.jsxs)("th",{className:"sortable",onClick:()=>C("registration_type_description"),children:["Reg. Type ","registration_type_description"===x&&("asc"===f?"🔼":"🔽")]}),(0,m.jsxs)("th",{className:"sortable",onClick:()=>C("confirmation_sent"),children:["Confirmed ","confirmation_sent"===x&&("asc"===f?"🔼":"🔽")]})]})}),(0,m.jsx)("tbody",{children:S.length>0?S.map((e=>(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,m.jsx)("td",{children:"0"===e.is_online?"ON-SITE":"ONLINE"}),(0,m.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,m.jsx)("td",{children:e.registration_type_description||"n/a"}),(0,m.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"})]},e.id))):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"8",className:"text-center",children:"No participants found for this workshop."})})})]})})]})})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */L:()=>/* binding */a
/* harmony export */});const a=function(e){let{interval:t=100,retries:s=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((n,i)=>{e().then(n).catch((l=>{setTimeout((()=>{s?a(e,{interval:1.5*t,retries:s-1}).then(n,i):i(l)}),t)}))}))};
/***/},
/***/3464:
/***/(e,t,s)=>{e.exports=s.p+"702c5653d2360537e78f.svg";
/***/},
/***/4493:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */Q:()=>/* binding */l
/* harmony export */});
/* harmony import */var a=s(3318),n=s(6540),i=s(1083);
/* harmony import */const l=()=>{const[e,t]=(0,n.useState)([]),[s,l]=(0,n.useState)([]),[r,o]=(0,n.useState)([]),[c,d]=(0,n.useState)([]),[m,p]=(0,n.useState)(!0),[h,u]=(0,n.useState)(null);// Runs only once when the component mounts
return(0,n.useEffect)((()=>{(async()=>{try{const e=await(0,a/* .retry */.L)((()=>i/* ["default"] */.A.get("https://imc2025.imo.net/php/get_specific_data.php")));if(!e.data.success)throw new Error(e.data.message||"Failed to fetch specific IMC data. Please, refresh the page.");t(e.data.data.workshops||[]),l(e.data.data.payment_methods||[]),o(e.data.data.registration_types||[]),d(e.data.data.sessions||[])}catch(e){u(e.message||"Failed to fetch specific IMC data. Please, refresh the page.")}finally{p(!1)}})()}),[]),{workshops:e,paymentMethods:s,registrationTypes:r,sessions:c,loading:m,error:h}};
/***/},
/***/7647:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const a="index-module__pageContain--r6_E2",n="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var i=s(6942),l=s.n(i),r=s(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const o="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var d=s(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const m="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",u="index-module__menuIcon--i9Mwv",x="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",g="index-module__active--EYt3Y",_="index-module__footer--O9Npd",j="index-module__menuItem--eqnJw",v="index-module__menuItemTitle--O6gep",w="index-module__active--Hl_ax",k="index-module__caret--U_US2",N="index-module__rotate--pnUGY",y="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var C=s(6540),S=s(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const L=C.forwardRef(((e,t)=>{let{children:s,className:a,goTo:n=null,isLinkActive:i,title:r,url:o=null}=e;const[c,d]=(0,C.useState)(i),[m,p]=(0,C.useState)("0px"),h=(0,C.useRef)(null);(0,C.useEffect)((()=>{s&&p(c?`${h.current.scrollHeight}px`:"0px")}),[s,c,h]);const u=e=>(0,S.jsx)("div",{className:l()(e.className,c&&N),children:(0,S.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,S.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,S.jsxs)("div",{className:l()(j,"d-flex flex-column",a),ref:t,children:[(0,S.jsxs)("a",{className:l()(v,"d-flex justify-content-between w-100 align-items-center px-3",i&&w),href:o||void 0,onClick:e=>{e.preventDefault(),s?d(!c):n&&o&&n(o)},children:[(0,S.jsx)("span",{className:"d-flex align-items-center",children:(0,S.jsx)("b",{children:r})}),s&&(0,S.jsx)(u,{className:k})]}),s&&(0,S.jsx)("div",{className:y,ref:h,style:s&&{maxHeight:`${m}`},children:s})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var M=s(8321),A=s(8983),I=s(1448),E=s(7767),T=s(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const W=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio"},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accomodations",link:"/admin/accomodations"},{title:"Export",link:"/admin/export"}];
// EXTERNAL MODULE: ./src/utils/event.js
var D=s(1280),O=s(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const P=parseInt(m,10)||250,$=e=>{let{cd:t}=e;const[s,a]=(0,C.useState)(!1),[n,i]=(0,C.useState)(!0),r=(0,I/* useDispatch */.wA)(),o=(0,E/* useLocation */.zy)(),c=(0,E/* useNavigate */.Zp)(),[m,j]=(0,M.useSpring)((()=>({right:-P,config:{tension:350,friction:30}})));(0,C.useEffect)((()=>(s?(i(!1),j.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(j.start({right:-P,onRest:()=>i(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[s,j]),(0,C.useEffect)((()=>{const e=()=>{a(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const v=()=>{a((e=>!e))},w=e=>{c(e),v()};
return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{className:p,onClick:v,children:(0/* SlMenu */,S.jsx)(d.RAm,{className:u})}),!n&&(0,S.jsx)("div",{className:l()(b),onClick:v,onMouseDown:D/* onStopPropagation */._v,onTouchStart:D/* onStopPropagation */._v}),(0,S.jsx)(M.animated.div,{className:l()(x),style:m,children:(0,S.jsxs)("div",{className:l()(f,"d-flex flex-column h-100"),children:[(0,S.jsx)("button",{className:h,onClick:v,children:(0/* SlClose */,S.jsx)(d.ipV,{className:u})}),(0,S.jsxs)("div",{className:"mb-3",children:[(0,S.jsxs)("div",{className:"m-3 text-center",children:[(0,S.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,S.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),W.map((e=>{const t=o.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>o.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,S.jsx)(L,{className:"py-2",isLinkActive:t,goTo:w,title:e.title,url:e.link,children:e.subLinks&&(0,S.jsx)(S.Fragment,{children:e.subLinks.map((e=>{const t=o.pathname===e.link;
return(0/* Link */,S.jsx)(T.N_,{"aria-label":e.title,onClick:v,to:e.link,className:l()(t&&g),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,S.jsx)("div",{className:l()(_,"mt-auto"),children:(0,S.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,S.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>w("/"),title:"Public site",children:"Public site"}),(0,S.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await O/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),r(A/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var R=s(7762);// ./src/admin/components/header/index.js
const z=()=>{const e=`${R/* conferenceData */.p.name} ${R/* conferenceData */.p.year}`;
return(0,S.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,S.jsx)($,{cd:R/* conferenceData */.p}),(0,S.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,S.jsx)("div",{className:l()(o,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,S.jsxs)(T.N_,{"aria-label":"Admin",className:l()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:"/admin/dashboard",title:"Admin",children:[(0,S.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,S.jsxs)("div",{className:"d-flex flex-column",children:[(0,S.jsxs)("h1",{className:"m-0 fw-bolder",children:[R/* conferenceData */.p.name," ",R/* conferenceData */.p.year]}),(0,S.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var q=s(5902),F=s(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const H="breadcrumb-module__nav--atkeN",V=e=>{let{links:t=[]}=e;
return(0,S.jsx)("nav",{"aria-label":"breadcrumb",className:H,children:(0,S.jsxs)("ol",{className:l()("breadcrumb"),children:[(0,S.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,S.jsx)(T.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,S.jsx)(F.M14,{className:"me-1"})})}),t.map(((e,s)=>(0,S.jsx)("li",{className:l()("breadcrumb-item",{active:s===t.length-1}),"aria-current":s===t.length-1?"page":void 0,children:s===t.length-1?(0,S.jsx)("b",{children:e.name}):(0/* Link */,S.jsx)(T.N_,{to:e.url,children:e.name})},s)))]})})},B=e=>{let{breadcrumb:t=[],title:s="",rightContent:i,children:r,isMaxWidth:o=!1}=e;const c=s?`${s} | ${R/* conferenceData */.p.name_display} ${R/* conferenceData */.p.year}`:`${R/* conferenceData */.p.name_display} ${R/* conferenceData */.p.year}`;
return(0,S.jsxs)(S.Fragment,{children:[(0/* Helmet */,S.jsxs)(q.mg,{children:[(0,S.jsx)("title",{children:c}),(0,S.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,S.jsxs)("div",{className:l()(a,"position-relative"),children:[(0,S.jsx)(z,{}),(0,S.jsxs)("div",{className:"d-flex flex-row",children:[(0,S.jsx)($,{cd:R/* conferenceData */.p}),(0,S.jsxs)("div",{className:"mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",children:[0!==t.length&&(0,S.jsx)(V,{links:t}),(0,S.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[s&&(0,S.jsx)("h2",{children:s}),i&&(0,S.jsx)("div",{children:i})]}),(0,S.jsx)("div",{className:l()(o&&n),children:r})]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{p:()=>/* reexport */a});// ./src/data/conference-data.json
const a=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasuer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/8057:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */A:()=>r
/* harmony export */});
/* harmony import */var a=s(8027),n=(s(6540),s(4976)),i=s(4848);
/* harmony import */const l={xls:(0/* .FaFileExcel */,i.jsx)(a.Ru,{})},r=e=>{let{link:t,className:s,format:a="xls",title:r="Download"}=e;
return(0/* .Link */,i.jsxs)(n.N_,{className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${s}`,to:t,"aria-label":`Download ${r} in ${a.toUpperCase()} format`,children:[l[a]||null," ",r]})}}
/***/}]);