"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[3927],{
/***/1280:
/***/(e,i,n)=>{
/* harmony export */n.d(i,{
/* harmony export */_v:()=>/* binding */s
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const s=e=>{e&&e.stopPropagation()}}
/***/,
/***/7647:
/***/(e,i,n)=>{
// EXPORTS
n.d(i,{A:()=>/* binding */U});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",t="index-module__titleWrap--hrdlj",l="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=n(6942),o=n.n(a),r=n(8075);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",x="index-module__menuCloseBtn--jCTip",h="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",g="index-module__menu--veCcg",w="index-module__active--EYt3Y",v="index-module__footer--O9Npd",_="index-module__menuItem--eqnJw",j="index-module__menuItemTitle--O6gep",k="index-module__active--Hl_ax",N="index-module__caret--U_US2",y="index-module__rotate--pnUGY",C="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var L=n(6540),M=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const A=L.forwardRef((({children:e,className:i,goTo:n=null,isLinkActive:s,title:t,url:l=null},a)=>{const[r,c]=(0,L.useState)(s),[d,m]=(0,L.useState)("0px"),u=(0,L.useRef)(null);(0,L.useEffect)((()=>{e&&m(r?`${u.current.scrollHeight}px`:"0px")}),[e,r,u]);const p=e=>(0,M.jsx)("div",{className:o()(e.className,r&&y),children:(0,M.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,M.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,M.jsxs)("div",{className:o()(_,"d-flex flex-column",i),ref:a,children:[(0,M.jsxs)("a",{className:o()(j,"d-flex justify-content-between w-100 align-items-center px-3",s&&k),href:l||void 0,onClick:i=>{i.preventDefault(),e?c(!r):n&&l&&n(l)},children:[(0,M.jsx)("span",{className:"d-flex align-items-center",children:(0,M.jsx)("b",{children:t})}),e&&(0,M.jsx)(p,{className:N})]}),e&&(0,M.jsx)("div",{className:C,ref:u,style:e&&{maxHeight:`${d}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var I=n(8983),S=n(1448),E=n(8321),O=n(7767),P=n(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const z=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var T=n(1280),$=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const D=parseInt(u,10)||250,R=({cd:e})=>{const[i,n]=(0,L.useState)(!1),[s,t]=(0,L.useState)(!0),l=(0,S/* useDispatch */.wA)(),a=(0,O/* useLocation */.zy)(),r=(0,O/* useNavigate */.Zp)(),c=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isAdmin),d=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isLoc),u=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isSoc),[_,j]=(0,E.useSpring)((()=>({right:-D,config:{tension:350,friction:30}})));(0,L.useEffect)((()=>(i?(t(!1),j.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(j.start({right:-D,onRest:()=>t(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[i,j]),(0,L.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const k=()=>{n((e=>!e))},N=e=>{r(e),k()};
return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("button",{className:p,onClick:k,children:(0/* SlMenu */,M.jsx)(m.RAm,{className:h})}),!s&&(0,M.jsx)("div",{className:o()(f),onClick:k,onMouseDown:T/* onStopPropagation */._v,onTouchStart:T/* onStopPropagation */._v}),(0,M.jsx)(E.animated.div,{className:o()(b),style:_,children:(0,M.jsxs)("div",{className:o()(g,"d-flex flex-column h-100"),children:[(0,M.jsx)("button",{className:x,onClick:k,children:(0/* SlClose */,M.jsx)(m.ipV,{className:h})}),(0,M.jsxs)("div",{className:"mb-3",children:[(0,M.jsxs)("div",{className:"m-3 text-center",children:[(0,M.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,M.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),z.map((e=>{const i=a.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>a.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,M.jsx)(A,{className:"py-2",isLinkActive:i,goTo:N,title:e.title,url:e.link,children:e.subLinks&&(0,M.jsx)(M.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc"))).map((e=>{const i=a.pathname===e.link;
return(0/* Link */,M.jsx)(P.N_,{"aria-label":e.title,onClick:k,to:e.link,className:o()(i&&w),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,M.jsx)("div",{className:o()(v,"mt-auto"),children:(0,M.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,M.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>N("/"),title:"Public site",children:"Public site"}),(0,M.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await $/* default */.A.get("https://imc2026.imo.net/php/auth/logout.php",{withCredentials:!0}),l(I/* authActions */.I2.logout()),localStorage.removeItem("session"),r("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var q=n(7762);// ./src/admin/components/header/index.js
const W=()=>{const e=`${q/* conferenceData */.p.name} ${q/* conferenceData */.p.year}`,i=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isLoc),n=(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isSoc),s=i?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,M.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,M.jsx)(R,{cd:q/* conferenceData */.p}),(0,M.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,M.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,M.jsxs)(P.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:s,title:"Admin",children:[(0,M.jsx)("img",{src:r,alt:e,className:"rounded-circle border border-2 p-1"}),(0,M.jsxs)("div",{className:"d-flex flex-column",children:[(0,M.jsxs)("h1",{className:"m-0 fw-bolder",children:[q/* conferenceData */.p.name," ",q/* conferenceData */.p.year]}),(0,M.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",i&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var F=n(5902),H=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const V="breadcrumb-module__nav--atkeN",B=({links:e=[]})=>(0/* authSelectors */,S/* useSelector */.d4)(I.Pg.isAdmin)?(0,M.jsx)("nav",{"aria-label":"breadcrumb",className:V,children:(0,M.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,M.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,M.jsx)(P.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,M.jsx)(H.M14,{className:"me-1"})})}),e.map(((i,n)=>(0,M.jsx)("li",{className:o()("breadcrumb-item",{active:n===e.length-1}),"aria-current":n===e.length-1?"page":void 0,children:n===e.length-1?(0,M.jsx)("b",{children:i.name}):(0/* Link */,M.jsx)(P.N_,{to:i.url,children:i.name})},n)))]})}):null,U=({breadcrumb:e=[],title:i="",rightContent:n,children:a,isMaxWidth:r=!0})=>{const c=i?`${i} | ${q/* conferenceData */.p.name_display} ${q/* conferenceData */.p.year}`:`${q/* conferenceData */.p.name_display} ${q/* conferenceData */.p.year}`;
return(0,M.jsxs)(M.Fragment,{children:[(0/* Helmet */,M.jsxs)(F.mg,{children:[(0,M.jsx)("title",{children:c}),(0,M.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,M.jsxs)("div",{className:o()(s,"position-relative"),children:[(0,M.jsx)(W,{}),(0,M.jsxs)("div",{className:"d-flex flex-row",children:[(0,M.jsx)(R,{cd:q/* conferenceData */.p}),(0,M.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${l} mx-md-auto`]:r}),children:[0!==e.length&&(0,M.jsx)(B,{links:e}),(!!i||!!n)&&(0,M.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",t),children:[i&&(0,M.jsx)("h2",{children:i}),n&&(0,M.jsx)("div",{children:n})]}),a]})]})]})]})}}
/***/,
/***/7762:
/***/(e,i,n)=>{
// EXPORTS
n.d(i,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2026,"num":"45th","welcome":"Bienvenue !","thank_you":"Merci !","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2026-09-24","end":"2026-09-27"},"location":"Barcelonette, France","hotel":"TBD","consulat":"French consulate","deadlines":{"reg":"2026-08-10","paper":"2026-10-31","full_reimbursement_before":"2026-07-01","half_reimbursement_before":"2026-08-10","early_birds":"2026-07-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International Meteor Organization","website":"https://imo.net"},{"name":"Vigie-Ciel","website":"https://www.vigie-ciel.org/"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2026-09-23?","period":"14:00 to 18:00 CEST and 09:30 - 12:30 CEST?","cost":22.5,"description":"including coffee break and lunch?","email_to":{"name":"Joe Zender","email":"vperlerin@gmail.com"}},{"title":"Radio Workshop","date":"NONE?","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"vperlerin@gmail.com"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2026@imo.net","name":"IMC 2026 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2026@imo.net","name":"IMC 2026 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/8057:
/***/(e,i,n)=>{
/* harmony export */n.d(i,{
/* harmony export */A:()=>a
/* harmony export */});
/* harmony import */var s=n(8027),t=(n(6540),n(4976),n(4848));
/* harmony import */const l={xls:(0/* .FaFileExcel */,t.jsx)(s.Ru,{})},a=({link:e,className:i,format:n="xls",title:s="Download"})=>(0,t.jsxs)("a",{href:e,className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${i}`,"aria-label":`Download ${s} in ${n.toUpperCase()} format`,children:[l[n]||null," ",s]})}
/***/,
/***/8075:
/***/(e,i,n)=>{e.exports=n.p+"702c5653d2360537e78f.svg";
/***/}}]);