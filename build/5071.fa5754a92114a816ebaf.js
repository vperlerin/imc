"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[5071],{
/***/1280:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */_v:()=>/* binding */a
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const a=e=>{e&&e.stopPropagation()}}
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
/***/5071:
/***/(e,t,s)=>{
// ESM COMPAT FLAG
s.r(t),
// EXPORTS
s.d(t,{default:()=>/* binding */m});
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
var a=s(408),n=s(7647),i=s(6645),l=s(6540),o=s(3318),r=s(1083);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
var c=s(8057),d=s(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/pages/accomodations/index.js
const m=e=>{let{typeFilter:t=""}=e;const[s,m]=(0,l.useState)(t||"not_no"),[u,p]=(0,l.useState)(""),[h,x]=(0,l.useState)(null),[b,f]=(0,l.useState)("asc"),{participants:j,loading:g,error:v}=(e=>{const[t,s]=(0,l.useState)([]),[a,n]=(0,l.useState)(!0),[i,c]=(0,l.useState)(null);return(0,l.useEffect)((()=>{if(!e)return n(!1),void c("Type filter is required ('no' or 'not_no').");(async()=>{try{const t=await(0,o/* retry */.L)((()=>r/* default */.A.get("https://imc2025.imo.net/php/api/get_accomodations.php",{params:{type:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");s(t.data.data)}catch(e){c(e.message||"Failed to fetch participants. Please refresh the page.")}finally{n(!1)}})()}),[e]),{participants:t,loading:a,error:i,setParticipants:s}})(s),_="last_name",w=e=>{h===e?f("asc"===b?"desc":"asc"):(x(e),f("asc"))};
// Filter participants based on search
let N=j||[];if(u){const e=u.toLowerCase();N=N.filter((t=>(t[_]?String(t[_]).toLowerCase():"").includes(e)))}
// Sort participants based on selected column
return h&&(N=[...N].sort(((e,t)=>{let s=e[h]??"",a=t[h]??"";
// Convert values for proper sorting
return["created_at"].includes(h)?(s=new Date(s).getTime()||0,a=new Date(a).getTime()||0):(s=s.toString().toLowerCase(),a=a.toString().toLowerCase()),s<a?"asc"===b?-1:1:s>a?"asc"===b?1:-1:0}))),(0/* default */,d.jsx)(n.A,{breadcrumb:[{url:"/admin/accommodations/",name:"Participants' Accommodations"}],isMaxWidth:!0,title:"Participants' Accommodations",children:g?(0/* default */,d.jsx)(i.A,{}):v?(0,d.jsxs)("p",{className:"text-danger",children:["Error: ",v]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,d.jsxs)("div",{className:"position-relative w-auto",children:[(0,d.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${_.replace("_"," ")}`,value:u,onChange:e=>p(e.target.value)}),(0/* CiSearch */,d.jsx)(a.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,d.jsxs)("select",{className:"form-select w-auto",value:s,onChange:e=>m(e.target.value),children:[(0,d.jsx)("option",{value:"not_no",children:"Staying at the hostel"}),(0,d.jsx)("option",{value:"no",children:"No Accommodation"})]}),(0/* default */,d.jsx)(c.A,{className:"ms-auto",link:`https://imc2025.imo.net/php/doc_accommodations.php?type=${s}`})]}),(0,d.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,d.jsxs)("table",{className:"table table-striped",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsxs)("th",{className:"sortable",onClick:()=>w("created_at"),children:["Reg. Date ","created_at"===h&&("asc"===b?"🔼":"🔽")]}),(0,d.jsxs)("th",{className:"sortable",onClick:()=>w("last_name"),children:["Name ","last_name"===h&&("asc"===b?"🔼":"🔽")]}),(0,d.jsxs)("th",{className:"sortable",onClick:()=>w("description"),children:["Accommodation ","description"===h&&("asc"===b?"🔼":"🔽")]})]})}),(0,d.jsx)("tbody",{children:N.length>0?N.map((e=>(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:e.created_at?.split(" ")[0]||"n/a"}),(0,d.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,d.jsx)("td",{children:e.description||"n/a"})]},e.id))):(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:"5",className:"text-center",children:"No participants found."})})})]})})]})})};
/* harmony default export */}
/***/,
/***/7647:
/***/(e,t,s)=>{
// EXPORTS
s.d(t,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const a="index-module__pageContain--r6_E2",n="index-module__titleWrap--hrdlj",i="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=s(6942),o=s.n(l),r=s(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=s(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",j="index-module__menu--veCcg",g="index-module__active--EYt3Y",v="index-module__footer--O9Npd",_="index-module__menuItem--eqnJw",w="index-module__menuItemTitle--O6gep",N="index-module__active--Hl_ax",k="index-module__caret--U_US2",y="index-module__rotate--pnUGY",C="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var L=s(6540),S=s(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const A=L.forwardRef(((e,t)=>{let{children:s,className:a,goTo:n=null,isLinkActive:i,title:l,url:r=null}=e;const[c,d]=(0,L.useState)(i),[m,u]=(0,L.useState)("0px"),p=(0,L.useRef)(null);(0,L.useEffect)((()=>{s&&u(c?`${p.current.scrollHeight}px`:"0px")}),[s,c,p]);const h=e=>(0,S.jsx)("div",{className:o()(e.className,c&&y),children:(0,S.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,S.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,S.jsxs)("div",{className:o()(_,"d-flex flex-column",a),ref:t,children:[(0,S.jsxs)("a",{className:o()(w,"d-flex justify-content-between w-100 align-items-center px-3",i&&N),href:r||void 0,onClick:e=>{e.preventDefault(),s?d(!c):n&&r&&n(r)},children:[(0,S.jsx)("span",{className:"d-flex align-items-center",children:(0,S.jsx)("b",{children:l})}),s&&(0,S.jsx)(h,{className:k})]}),s&&(0,S.jsx)("div",{className:C,ref:p,style:s&&{maxHeight:`${m}`},children:s})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var M=s(8321),I=s(8983),E=s(1448),D=s(7767),T=s(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const W=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio"},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accommodations",link:"/admin/accomodations"},{title:"Downloads",link:"/admin/downloads"}];
// EXTERNAL MODULE: ./src/utils/event.js
var $=s(1280),P=s(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const z=parseInt(u,10)||250,O=e=>{let{cd:t}=e;const[s,a]=(0,L.useState)(!1),[n,i]=(0,L.useState)(!0),l=(0,E/* useDispatch */.wA)(),r=(0,D/* useLocation */.zy)(),c=(0,D/* useNavigate */.Zp)(),[d,u]=(0,M.useSpring)((()=>({right:-z,config:{tension:350,friction:30}})));(0,L.useEffect)((()=>(s?(i(!1),u.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(u.start({right:-z,onRest:()=>i(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[s,u]),(0,L.useEffect)((()=>{const e=()=>{a(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const _=()=>{a((e=>!e))},w=e=>{c(e),_()};
return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{className:p,onClick:_,children:(0/* SlMenu */,S.jsx)(m.RAm,{className:x})}),!n&&(0,S.jsx)("div",{className:o()(f),onClick:_,onMouseDown:$/* onStopPropagation */._v,onTouchStart:$/* onStopPropagation */._v}),(0,S.jsx)(M.animated.div,{className:o()(b),style:d,children:(0,S.jsxs)("div",{className:o()(j,"d-flex flex-column h-100"),children:[(0,S.jsx)("button",{className:h,onClick:_,children:(0/* SlClose */,S.jsx)(m.ipV,{className:x})}),(0,S.jsxs)("div",{className:"mb-3",children:[(0,S.jsxs)("div",{className:"m-3 text-center",children:[(0,S.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,S.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),W.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,S.jsx)(A,{className:"py-2",isLinkActive:t,goTo:w,title:e.title,url:e.link,children:e.subLinks&&(0,S.jsx)(S.Fragment,{children:e.subLinks.map((e=>{const t=r.pathname===e.link;
return(0/* Link */,S.jsx)(T.N_,{"aria-label":e.title,onClick:_,to:e.link,className:o()(t&&g),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,S.jsx)("div",{className:o()(v,"mt-auto"),children:(0,S.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,S.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>w("/"),title:"Public site",children:"Public site"}),(0,S.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await P/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),l(I/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var R=s(7762);// ./src/admin/components/header/index.js
const q=()=>{const e=`${R/* conferenceData */.p.name} ${R/* conferenceData */.p.year}`;
return(0,S.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,S.jsx)(O,{cd:R/* conferenceData */.p}),(0,S.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,S.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,S.jsxs)(T.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:"/admin/dashboard",title:"Admin",children:[(0,S.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,S.jsxs)("div",{className:"d-flex flex-column",children:[(0,S.jsxs)("h1",{className:"m-0 fw-bolder",children:[R/* conferenceData */.p.name," ",R/* conferenceData */.p.year]}),(0,S.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=s(5902),H=s(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",B=e=>{let{links:t=[]}=e;
return(0,S.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,S.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,S.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,S.jsx)(T.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,S.jsx)(H.M14,{className:"me-1"})})}),t.map(((e,s)=>(0,S.jsx)("li",{className:o()("breadcrumb-item",{active:s===t.length-1}),"aria-current":s===t.length-1?"page":void 0,children:s===t.length-1?(0,S.jsx)("b",{children:e.name}):(0/* Link */,S.jsx)(T.N_,{to:e.url,children:e.name})},s)))]})})},U=e=>{let{breadcrumb:t=[],title:s="",rightContent:l,children:r,isMaxWidth:c=!0}=e;const d=s?`${s} | ${R/* conferenceData */.p.name_display} ${R/* conferenceData */.p.year}`:`${R/* conferenceData */.p.name_display} ${R/* conferenceData */.p.year}`;
return(0,S.jsxs)(S.Fragment,{children:[(0/* Helmet */,S.jsxs)(F.mg,{children:[(0,S.jsx)("title",{children:d}),(0,S.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,S.jsxs)("div",{className:o()(a,"position-relative"),children:[(0,S.jsx)(q,{}),(0,S.jsxs)("div",{className:"d-flex flex-row",children:[(0,S.jsx)(O,{cd:R/* conferenceData */.p}),(0,S.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${i} mx-md-auto`]:c}),children:[0!==t.length&&(0,S.jsx)(B,{links:t}),(0,S.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",n),children:[s&&(0,S.jsx)("h2",{children:s}),l&&(0,S.jsx)("div",{children:l})]}),r]})]})]})]})}}
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
/* harmony export */A:()=>o
/* harmony export */});
/* harmony import */var a=s(8027),n=(s(6540),s(4976)),i=s(4848);
/* harmony import */const l={xls:(0/* .FaFileExcel */,i.jsx)(a.Ru,{})},o=e=>{let{link:t,className:s,format:a="xls",title:o="Download"}=e;
return(0/* .Link */,i.jsxs)(n.N_,{className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${s}`,to:t,"aria-label":`Download ${o} in ${a.toUpperCase()} format`,children:[l[a]||null," ",o]})}}
/***/}]);