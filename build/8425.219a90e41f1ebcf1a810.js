"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[8425],{
/***/578:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */d});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var i=n(6942),a=n.n(i),l=n(8027),o=n(6540),r=n(5846),c=n(4848);// ./src/admin/components/admin-table/index.js
const d=e=>{let{participants:t,withActions:n=!0,customActions:i=null,onDelete:d=null}=e;const[m,u]=(0,o.useState)(null),[h,x]=(0,o.useState)("asc"),p=e=>{m===e?x("asc"===h?"desc":"asc"):(u(e),x("asc"))},b=[...t].sort(((e,t)=>{if(!m)return 0;let n=e[m],s=t[m];
// Handle numeric fields
return["total_due","total_paid","paypal_fee"].includes(m)&&(n=parseFloat(n)||0,s=parseFloat(s)||0),
// Handle dates
"created_at"!==m&&"confirmation_date"!==m||(n=new Date(n).getTime()||0,s=new Date(s).getTime()||0),n<s?"asc"===h?-1:1:n>s?"asc"===h?1:-1:0}));
return(0,c.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,c.jsxs)("table",{className:"table table-striped",children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:s,onClick:()=>p("id"),children:"#"}),(0,c.jsx)("th",{className:s,onClick:()=>p("created_at"),children:"Reg. Date"}),(0,c.jsx)("th",{className:s,onClick:()=>p("last_name"),children:"Name"}),(0,c.jsx)("th",{className:s,onClick:()=>p("total_due"),children:"Total"}),(0,c.jsx)("th",{className:s,onClick:()=>p("total_paid"),children:"Paid"}),(0,c.jsx)("th",{className:s,onClick:()=>p("due_amount"),children:"Due"}),(0,c.jsx)("th",{className:s,onClick:()=>p("payment_method"),children:"Method"}),(0,c.jsx)("th",{className:s,onClick:()=>p("confirmation_sent"),children:"Confirmed"}),(0,c.jsx)("th",{className:s,onClick:()=>p("confirmation_date"),children:"Conf. Email"}),(n||i)&&(0,c.jsx)("th",{})]})}),(0,c.jsx)("tbody",{children:b.length>0?b.map((e=>{const t=parseFloat(e.total_due)||0,s=parseFloat(e.total_paid)||0,o=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),u=m?t+o-s:t-s;
return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:e.id}),(0,c.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,c.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,c.jsxs)("td",{children:[m?(t+o).toFixed(2):t.toFixed(2),"€"]}),(0,c.jsxs)("td",{children:[s.toFixed(2),"€"]}),(0,c.jsxs)("td",{className:a()({"text-success":0===u}),children:[u.toFixed(2),"€"]}),(0,c.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,c.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,c.jsx)("td",{className:a()(e?.confirmation_date&&"text-success"),children:e.confirmation_date?(0,r/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),n&&d&&(0,c.jsx)("td",{children:(0,c.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:[(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,c.jsx)("button",{className:"btn btn-sm btn-outline-danger fw-bolder",onClick:()=>(e=>{d?.(e)})(e),children:(0/* FaRegTrashAlt */,c.jsx)(l.H8h,{})})]})}),i&&(0,c.jsx)(c.Fragment,{children:i})]},e.id)})):(0,c.jsx)("tr",{children:(0,c.jsx)("td",{colSpan:n?10:9,className:"text-center",children:"No participants found."})})})]})})};
/* harmony default export */}
/***/,
/***/1280:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */_v:()=>/* binding */s
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const s=e=>{e&&e.stopPropagation()}}
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
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */l
/* harmony export */,Lu:()=>/* binding */a
/* harmony export */,p6:()=>/* binding */i
/* harmony export */});const s=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},i=(e,t)=>{const n=new Date(e),i=new Date(t),a=n.toLocaleString("en-US",{month:"long"}),l=n.getDate(),o=i.getDate();return`${a} ${l}${s(l)} - ${o}${s(o)}`},a=function(e){return function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const a=new Date(e),l=a.getDate(),o=a.toLocaleString("en-US",{month:"long"}),r=a.toLocaleString("en-US",{weekday:"long"}),c=a.getFullYear();return`${t?r+", ":""}${l}${s(l)}${n?" "+o:""}${i?" "+c:""}`}(e,!0,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],arguments.length>2&&void 0!==arguments[2]&&arguments[2])},l=function(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const i=new Date(e);return i.setDate(i.getDate()+t),a(i.toISOString(),n,s)}}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",i="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=n(6942),l=n.n(a),o=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const r="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var d=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const m="300px",u="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",p="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",j="index-module__active--EYt3Y",_="index-module__footer--O9Npd",g="index-module__menuItem--eqnJw",v="index-module__menuItemTitle--O6gep",N="index-module__active--Hl_ax",w="index-module__caret--U_US2",k="index-module__rotate--pnUGY",y="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var C=n(6540),L=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const M=C.forwardRef(((e,t)=>{let{children:n,className:s,goTo:i=null,isLinkActive:a,title:o,url:r=null}=e;const[c,d]=(0,C.useState)(a),[m,u]=(0,C.useState)("0px"),h=(0,C.useRef)(null);(0,C.useEffect)((()=>{n&&u(c?`${h.current.scrollHeight}px`:"0px")}),[n,c,h]);const x=e=>(0,L.jsx)("div",{className:l()(e.className,c&&k),children:(0,L.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,L.jsxs)("div",{className:l()(g,"d-flex flex-column",s),ref:t,children:[(0,L.jsxs)("a",{className:l()(v,"d-flex justify-content-between w-100 align-items-center px-3",a&&N),href:r||void 0,onClick:e=>{e.preventDefault(),n?d(!c):i&&r&&i(r)},children:[(0,L.jsx)("span",{className:"d-flex align-items-center",children:(0,L.jsx)("b",{children:o})}),n&&(0,L.jsx)(x,{className:w})]}),n&&(0,L.jsx)("div",{className:y,ref:h,style:n&&{maxHeight:`${m}`},children:n})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var S=n(8321),D=n(8983),$=n(1448),A=n(7767),I=n(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const F=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Workshops",link:"/admin/participants/workshops"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accomodations",link:"/admin/accomodations"},{title:"Export",link:"/admin/export"}];
// EXTERNAL MODULE: ./src/utils/event.js
var E=n(1280),T=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const O=parseInt(m,10)||250,z=e=>{let{cd:t}=e;const[n,s]=(0,C.useState)(!1),[i,a]=(0,C.useState)(!0),o=(0,$/* useDispatch */.wA)(),r=(0,A/* useLocation */.zy)(),c=(0,A/* useNavigate */.Zp)(),[m,g]=(0,S.useSpring)((()=>({right:-O,config:{tension:350,friction:30}})));(0,C.useEffect)((()=>(n?(a(!1),g.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(g.start({right:-O,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[n,g]),(0,C.useEffect)((()=>{const e=()=>{s(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const v=()=>{s((e=>!e))},N=e=>{c(e),v()};
return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{className:u,onClick:v,children:(0/* SlMenu */,L.jsx)(d.RAm,{className:x})}),!i&&(0,L.jsx)("div",{className:l()(b),onClick:v,onMouseDown:E/* onStopPropagation */._v,onTouchStart:E/* onStopPropagation */._v}),(0,L.jsx)(S.animated.div,{className:l()(p),style:m,children:(0,L.jsxs)("div",{className:l()(f,"d-flex flex-column h-100"),children:[(0,L.jsx)("button",{className:h,onClick:v,children:(0/* SlClose */,L.jsx)(d.ipV,{className:x})}),(0,L.jsxs)("div",{className:"mb-3",children:[(0,L.jsxs)("div",{className:"m-3 text-center",children:[(0,L.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,L.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),F.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,L.jsx)(M,{className:"py-2",isLinkActive:t,goTo:N,title:e.title,url:e.link,children:e.subLinks&&(0,L.jsx)(L.Fragment,{children:e.subLinks.map((e=>{const t=r.pathname===e.link;
return(0/* Link */,L.jsx)(I.N_,{"aria-label":e.title,onClick:v,to:e.link,className:l()(t&&j),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,L.jsx)("div",{className:l()(_,"mt-auto"),children:(0,L.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,L.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>N("/"),title:"Public site",children:"Public site"}),(0,L.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await T/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),o(D/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var P=n(7762);// ./src/admin/components/header/index.js
const W=()=>{const e=`${P/* conferenceData */.p.name} ${P/* conferenceData */.p.year}`;
return(0,L.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,L.jsx)(z,{cd:P/* conferenceData */.p}),(0,L.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,L.jsx)("div",{className:l()(r,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,L.jsxs)(I.N_,{"aria-label":"Admin",className:l()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:"/admin/dashboard",title:"Admin",children:[(0,L.jsx)("img",{src:o,alt:e,className:"rounded-circle border border-2 p-1"}),(0,L.jsxs)("div",{className:"d-flex flex-column",children:[(0,L.jsxs)("h1",{className:"m-0 fw-bolder",children:[P/* conferenceData */.p.name," ",P/* conferenceData */.p.year]}),(0,L.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var q=n(5902),R=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const H="breadcrumb-module__nav--atkeN",V=e=>{let{links:t=[]}=e;
return(0,L.jsx)("nav",{"aria-label":"breadcrumb",className:H,children:(0,L.jsxs)("ol",{className:l()("breadcrumb"),children:[(0,L.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,L.jsx)(I.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,L.jsx)(R.M14,{className:"me-1"})})}),t.map(((e,n)=>(0,L.jsx)("li",{className:l()("breadcrumb-item",{active:n===t.length-1}),"aria-current":n===t.length-1?"page":void 0,children:n===t.length-1?(0,L.jsx)("b",{children:e.name}):(0/* Link */,L.jsx)(I.N_,{to:e.url,children:e.name})},n)))]})})},U=e=>{let{breadcrumb:t=[],title:n="",rightContent:a,children:o,isMaxWidth:r=!1}=e;const c=n?`${n} | ${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`:`${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`;
return(0,L.jsxs)(L.Fragment,{children:[(0/* Helmet */,L.jsxs)(q.mg,{children:[(0,L.jsx)("title",{children:c}),(0,L.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,L.jsxs)("div",{className:l()(s,"position-relative"),children:[(0,L.jsx)(W,{}),(0,L.jsxs)("div",{className:"d-flex flex-row",children:[(0,L.jsx)(z,{cd:P/* conferenceData */.p}),(0,L.jsxs)("div",{className:"mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",children:[0!==t.length&&(0,L.jsx)(V,{links:t}),(0,L.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[n&&(0,L.jsx)("h2",{children:n}),a&&(0,L.jsx)("div",{children:a})]}),(0,L.jsx)("div",{className:l()(r&&i),children:o})]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasuer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);