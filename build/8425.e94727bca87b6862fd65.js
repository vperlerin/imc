"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[8425],{
/***/578:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */d});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=n(6942),i=n.n(a),l=n(8027),o=n(6540),r=n(5846),c=n(4848);// ./src/admin/components/admin-table/index.js
const d=e=>{let{participants:t,withActions:n=!0,customActions:a=null,onDelete:d=null}=e;const[m,h]=(0,o.useState)(null),[u,p]=(0,o.useState)("asc"),x=e=>{m===e?p("asc"===u?"desc":"asc"):(h(e),p("asc"))},_=[...t].sort(((e,t)=>{if(!m)return 0;let n=e[m],s=t[m];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(m)&&(n=parseFloat(n)||0,s=parseFloat(s)||0),"due_amount"===m){const a=e=>{const t=parseFloat(e.total_due)||0,n=parseFloat(e.total_paid)||0,s=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+s-n:t-n};n=a(e),s=a(t)}
// Handle dates
return["created_at","confirmation_date"].includes(m)&&(n=n?new Date(n).getTime():0,s=s?new Date(s).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===m&&(n=e.payment_method_name?e.payment_method_name.toLowerCase():"",s=t.payment_method_name?t.payment_method_name.toLowerCase():""),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===m&&(n="1"===n?1:0,s="1"===s?1:0),n<s?"asc"===u?-1:1:n>s?"asc"===u?1:-1:0}));
return(0,c.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,c.jsxs)("table",{className:"table table-striped",children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:s,onClick:()=>x("id"),children:"#"}),(0,c.jsx)("th",{className:s,onClick:()=>x("created_at"),children:"Reg. Date"}),(0,c.jsx)("th",{className:s,onClick:()=>x("last_name"),children:"Name"}),(0,c.jsx)("th",{className:s,onClick:()=>x("total_due"),children:"Total"}),(0,c.jsx)("th",{className:s,onClick:()=>x("total_paid"),children:"Paid"}),(0,c.jsx)("th",{className:s,onClick:()=>x("due_amount"),children:"Due"}),(0,c.jsx)("th",{className:s,onClick:()=>x("payment_method"),children:"Method"}),(0,c.jsx)("th",{className:s,onClick:()=>x("confirmation_sent"),children:"Confirmed"}),(0,c.jsx)("th",{className:s,onClick:()=>x("confirmation_date"),children:"Conf. Email"}),(n||a)&&(0,c.jsx)("th",{})]})}),(0,c.jsx)("tbody",{children:_.length>0?_.map((e=>{const t=parseFloat(e.total_due)||0,s=parseFloat(e.total_paid)||0,o=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),h=m?t+o-s:t-s;
return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:e.id}),(0,c.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,c.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,c.jsxs)("td",{children:[m?(t+o).toFixed(2):t.toFixed(2),"€"]}),(0,c.jsxs)("td",{children:[s.toFixed(2),"€"]}),(0,c.jsxs)("td",{className:i()({"text-success":0===h}),children:[h.toFixed(2),"€"]}),(0,c.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,c.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,c.jsx)("td",{className:i()(e?.confirmation_date&&"text-success"),children:e.confirmation_date?(0,r/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),n&&d&&(0,c.jsx)("td",{children:(0,c.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:[(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,c.jsx)("button",{className:"btn btn-sm btn-outline-danger fw-bolder",onClick:()=>(e=>{d?.(e)})(e),children:(0/* FaRegTrashAlt */,c.jsx)(l.H8h,{})})]})}),a&&(0,c.jsx)(c.Fragment,{children:a})]},e.id)})):(0,c.jsx)("tr",{children:(0,c.jsx)("td",{colSpan:n?10:9,className:"text-center",children:"No participants found."})})})]})})};
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
/* harmony export */});const s=function(e){let{interval:t=100,retries:n=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((a,i)=>{e().then(a).catch((l=>{setTimeout((()=>{n?s(e,{interval:1.5*t,retries:n-1}).then(a,i):i(l)}),t)}))}))};
/***/},
/***/3464:
/***/(e,t,n)=>{e.exports=n.p+"702c5653d2360537e78f.svg";
/***/},
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */l
/* harmony export */,Lu:()=>/* binding */i
/* harmony export */,p6:()=>/* binding */a
/* harmony export */});const s=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},a=(e,t)=>{const n=new Date(e),a=new Date(t),i=n.toLocaleString("en-US",{month:"long"}),l=n.getDate(),o=a.getDate();return`${i} ${l}${s(l)} - ${o}${s(o)}`},i=function(e){return function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=new Date(e),l=i.getDate(),o=i.toLocaleString("en-US",{month:"long"}),r=i.toLocaleString("en-US",{weekday:"long"}),c=i.getFullYear();return`${t?r+", ":""}${l}${s(l)}${n?" "+o:""}${a?" "+c:""}`}(e,!0,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],arguments.length>2&&void 0!==arguments[2]&&arguments[2])},l=function(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const a=new Date(e);return a.setDate(a.getDate()+t),i(a.toISOString(),n,s)}}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",a="index-module__titleWrap--hrdlj",i="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=n(6942),o=n.n(l),r=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const h="300px",u="index-module__menuBtn--iHux0",p="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",_="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",j="index-module__active--EYt3Y",g="index-module__footer--O9Npd",v="index-module__menuItem--eqnJw",w="index-module__menuItemTitle--O6gep",N="index-module__active--Hl_ax",k="index-module__caret--U_US2",y="index-module__rotate--pnUGY",C="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var L=n(6540),S=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const M=L.forwardRef(((e,t)=>{let{children:n,className:s,goTo:a=null,isLinkActive:i,title:l,url:r=null}=e;const[c,d]=(0,L.useState)(i),[m,h]=(0,L.useState)("0px"),u=(0,L.useRef)(null);(0,L.useEffect)((()=>{n&&h(c?`${u.current.scrollHeight}px`:"0px")}),[n,c,u]);const p=e=>(0,S.jsx)("div",{className:o()(e.className,c&&y),children:(0,S.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,S.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,S.jsxs)("div",{className:o()(v,"d-flex flex-column",s),ref:t,children:[(0,S.jsxs)("a",{className:o()(w,"d-flex justify-content-between w-100 align-items-center px-3",i&&N),href:r||void 0,onClick:e=>{e.preventDefault(),n?d(!c):a&&r&&a(r)},children:[(0,S.jsx)("span",{className:"d-flex align-items-center",children:(0,S.jsx)("b",{children:l})}),n&&(0,S.jsx)(p,{className:k})]}),n&&(0,S.jsx)("div",{className:C,ref:u,style:n&&{maxHeight:`${m}`},children:n})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var D=n(8321),$=n(8983),A=n(1448),I=n(7767),F=n(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const E=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio"},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accommodations",link:"/admin/accomodations"},{title:"Downloads",link:"/admin/downloads"}];
// EXTERNAL MODULE: ./src/utils/event.js
var T=n(1280),W=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const O=parseInt(h,10)||250,z=e=>{let{cd:t}=e;const[n,s]=(0,L.useState)(!1),[a,i]=(0,L.useState)(!0),l=(0,A/* useDispatch */.wA)(),r=(0,I/* useLocation */.zy)(),c=(0,I/* useNavigate */.Zp)(),[d,h]=(0,D.useSpring)((()=>({right:-O,config:{tension:350,friction:30}})));(0,L.useEffect)((()=>(n?(i(!1),h.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(h.start({right:-O,onRest:()=>i(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[n,h]),(0,L.useEffect)((()=>{const e=()=>{s(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const v=()=>{s((e=>!e))},w=e=>{c(e),v()};
return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{className:u,onClick:v,children:(0/* SlMenu */,S.jsx)(m.RAm,{className:x})}),!a&&(0,S.jsx)("div",{className:o()(b),onClick:v,onMouseDown:T/* onStopPropagation */._v,onTouchStart:T/* onStopPropagation */._v}),(0,S.jsx)(D.animated.div,{className:o()(_),style:d,children:(0,S.jsxs)("div",{className:o()(f,"d-flex flex-column h-100"),children:[(0,S.jsx)("button",{className:p,onClick:v,children:(0/* SlClose */,S.jsx)(m.ipV,{className:x})}),(0,S.jsxs)("div",{className:"mb-3",children:[(0,S.jsxs)("div",{className:"m-3 text-center",children:[(0,S.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,S.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),E.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,S.jsx)(M,{className:"py-2",isLinkActive:t,goTo:w,title:e.title,url:e.link,children:e.subLinks&&(0,S.jsx)(S.Fragment,{children:e.subLinks.map((e=>{const t=r.pathname===e.link;
return(0/* Link */,S.jsx)(F.N_,{"aria-label":e.title,onClick:v,to:e.link,className:o()(t&&j),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,S.jsx)("div",{className:o()(g,"mt-auto"),children:(0,S.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,S.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>w("/"),title:"Public site",children:"Public site"}),(0,S.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await W/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),l($/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var P=n(7762);// ./src/admin/components/header/index.js
const R=()=>{const e=`${P/* conferenceData */.p.name} ${P/* conferenceData */.p.year}`;
return(0,S.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,S.jsx)(z,{cd:P/* conferenceData */.p}),(0,S.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,S.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,S.jsxs)(F.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:"/admin/dashboard",title:"Admin",children:[(0,S.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,S.jsxs)("div",{className:"d-flex flex-column",children:[(0,S.jsxs)("h1",{className:"m-0 fw-bolder",children:[P/* conferenceData */.p.name," ",P/* conferenceData */.p.year]}),(0,S.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var q=n(5902),H=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",U=e=>{let{links:t=[]}=e;
return(0,S.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,S.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,S.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,S.jsx)(F.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,S.jsx)(H.M14,{className:"me-1"})})}),t.map(((e,n)=>(0,S.jsx)("li",{className:o()("breadcrumb-item",{active:n===t.length-1}),"aria-current":n===t.length-1?"page":void 0,children:n===t.length-1?(0,S.jsx)("b",{children:e.name}):(0/* Link */,S.jsx)(F.N_,{to:e.url,children:e.name})},n)))]})})},B=e=>{let{breadcrumb:t=[],title:n="",rightContent:l,children:r,isMaxWidth:c=!0}=e;const d=n?`${n} | ${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`:`${P/* conferenceData */.p.name_display} ${P/* conferenceData */.p.year}`;
return(0,S.jsxs)(S.Fragment,{children:[(0/* Helmet */,S.jsxs)(q.mg,{children:[(0,S.jsx)("title",{children:d}),(0,S.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,S.jsxs)("div",{className:o()(s,"position-relative"),children:[(0,S.jsx)(R,{}),(0,S.jsxs)("div",{className:"d-flex flex-row",children:[(0,S.jsx)(z,{cd:P/* conferenceData */.p}),(0,S.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${i} mx-md-auto`]:c}),children:[0!==t.length&&(0,S.jsx)(U,{links:t}),(0,S.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",a),children:[n&&(0,S.jsx)("h2",{children:n}),l&&(0,S.jsx)("div",{children:l})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasuer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);