"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[389],{
/***/1280:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */_v:()=>/* binding */i
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const i=e=>{e&&e.stopPropagation()}}
/***/,
/***/2199:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */V:()=>/* binding */a
/* harmony export */});
/* harmony import */var i=n(6540),s=n(7767);
/* harmony import */const a=e=>{const t=(0,s/* .useNavigate */.Zp)(),n=(0,s/* .useLocation */.zy)();(0,i.useEffect)((()=>{const t=t=>{e&&(t.preventDefault(),t.returnValue="You have unsaved changes. Do you really want to leave?")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e]),(0,i.useEffect)((()=>{const i=i=>{if(e){window.confirm("You have unsaved changes. Do you really want to leave?")||(i.preventDefault(),t(n.pathname,{replace:!0}))}};return window.addEventListener("popstate",i),()=>{window.removeEventListener("popstate",i)}}),[e,t,n.pathname])};
/***/},
/***/3318:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */i
/* harmony export */});const i=function(e){let{interval:t=100,retries:n=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((s,a)=>{e().then(s).catch((r=>{setTimeout((()=>{n?i(e,{interval:1.5*t,retries:n-1}).then(s,a):a(r)}),t)}))}))};
/***/},
/***/3464:
/***/(e,t,n)=>{e.exports=n.p+"702c5653d2360537e78f.svg";
/***/},
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */r
/* harmony export */,Lu:()=>/* binding */a
/* harmony export */,p6:()=>/* binding */s
/* harmony export */});const i=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=(e,t)=>{const n=new Date(e),s=new Date(t),a=n.toLocaleString("en-US",{month:"long"}),r=n.getDate(),l=s.getDate();return`${a} ${r}${i(r)} - ${l}${i(l)}`},a=function(e){return function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const a=new Date(e),r=a.getDate(),l=a.toLocaleString("en-US",{month:"long"}),o=a.toLocaleString("en-US",{weekday:"long"}),c=a.getFullYear();return`${t?o+", ":""}${r}${i(r)}${n?" "+l:""}${s?" "+c:""}`}(e,!0,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],arguments.length>2&&void 0!==arguments[2]&&arguments[2])},r=function(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const s=new Date(e);return s.setDate(s.getDate()+t),a(s.toISOString(),n,i)}}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */H});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const i="index-module__pageContain--r6_E2",s="index-module__titleWrap--hrdlj",a="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var r=n(6942),l=n.n(r),o=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",g="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",v="index-module__active--EYt3Y",w="index-module__footer--O9Npd",_="index-module__menuItem--eqnJw",j="index-module__menuItemTitle--O6gep",y="index-module__active--Hl_ax",k="index-module__caret--U_US2",N="index-module__rotate--pnUGY",A="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var S=n(6540),L=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const C=S.forwardRef(((e,t)=>{let{children:n,className:i,goTo:s=null,isLinkActive:a,title:r,url:o=null}=e;const[c,d]=(0,S.useState)(a),[m,u]=(0,S.useState)("0px"),p=(0,S.useRef)(null);(0,S.useEffect)((()=>{n&&u(c?`${p.current.scrollHeight}px`:"0px")}),[n,c,p]);const h=e=>(0,L.jsx)("div",{className:l()(e.className,c&&N),children:(0,L.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,L.jsxs)("div",{className:l()(_,"d-flex flex-column",i),ref:t,children:[(0,L.jsxs)("a",{className:l()(j,"d-flex justify-content-between w-100 align-items-center px-3",a&&y),href:o||void 0,onClick:e=>{e.preventDefault(),n?d(!c):s&&o&&s(o)},children:[(0,L.jsx)("span",{className:"d-flex align-items-center",children:(0,L.jsx)("b",{children:r})}),n&&(0,L.jsx)(h,{className:k})]}),n&&(0,L.jsx)("div",{className:A,ref:p,style:n&&{maxHeight:`${m}`},children:n})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var M=n(8983),$=n(1448),D=n(8321),E=n(7767),O=n(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const I=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var P=n(1280),V=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const T=parseInt(u,10)||250,z=e=>{let{cd:t}=e;const[n,i]=(0,S.useState)(!1),[s,a]=(0,S.useState)(!0),r=(0,$/* useDispatch */.wA)(),o=(0,E/* useLocation */.zy)(),c=(0,E/* useNavigate */.Zp)(),d=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isAdmin),u=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isLoc),_=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isSoc),[j,y]=(0,D.useSpring)((()=>({right:-T,config:{tension:350,friction:30}})));(0,S.useEffect)((()=>(n?(a(!1),y.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(y.start({right:-T,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[n,y]),(0,S.useEffect)((()=>{const e=()=>{i(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const k=()=>{i((e=>!e))},N=e=>{c(e),k()};
return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{className:p,onClick:k,children:(0/* SlMenu */,L.jsx)(m.RAm,{className:x})}),!s&&(0,L.jsx)("div",{className:l()(g),onClick:k,onMouseDown:P/* onStopPropagation */._v,onTouchStart:P/* onStopPropagation */._v}),(0,L.jsx)(D.animated.div,{className:l()(b),style:j,children:(0,L.jsxs)("div",{className:l()(f,"d-flex flex-column h-100"),children:[(0,L.jsx)("button",{className:h,onClick:k,children:(0/* SlClose */,L.jsx)(m.ipV,{className:x})}),(0,L.jsxs)("div",{className:"mb-3",children:[(0,L.jsxs)("div",{className:"m-3 text-center",children:[(0,L.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,L.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),I.map((e=>{const t=o.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>o.pathname.startsWith(e.link)));return d||u&&e?.allowed?.includes("loc")||_&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,L.jsx)(C,{className:"py-2",isLinkActive:t,goTo:N,title:e.title,url:e.link,children:e.subLinks&&(0,L.jsx)(L.Fragment,{children:e.subLinks.filter((e=>d||u&&e?.allowed?.includes("loc")||_&&e?.allowed?.includes("soc"))).map((e=>{const t=o.pathname===e.link;
return(0/* Link */,L.jsx)(O.N_,{"aria-label":e.title,onClick:k,to:e.link,className:l()(t&&v),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,L.jsx)("div",{className:l()(w,"mt-auto"),children:(0,L.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,L.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>N("/"),title:"Public site",children:"Public site"}),(0,L.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await V/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),r(M/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var W=n(7762);// ./src/admin/components/header/index.js
const F=()=>{const e=`${W/* conferenceData */.p.name} ${W/* conferenceData */.p.year}`,t=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isLoc),n=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isSoc),i=t?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,L.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,L.jsx)(z,{cd:W/* conferenceData */.p}),(0,L.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,L.jsx)("div",{className:l()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,L.jsxs)(O.N_,{"aria-label":"Admin",className:l()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:i,title:"Admin",children:[(0,L.jsx)("img",{src:o,alt:e,className:"rounded-circle border border-2 p-1"}),(0,L.jsxs)("div",{className:"d-flex flex-column",children:[(0,L.jsxs)("h1",{className:"m-0 fw-bolder",children:[W/* conferenceData */.p.name," ",W/* conferenceData */.p.year]}),(0,L.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var q=n(5902),R=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const U="breadcrumb-module__nav--atkeN",B=e=>{let{links:t=[]}=e;return(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isAdmin)?(0,L.jsx)("nav",{"aria-label":"breadcrumb",className:U,children:(0,L.jsxs)("ol",{className:l()("breadcrumb"),children:[(0,L.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,L.jsx)(O.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,L.jsx)(R.M14,{className:"me-1"})})}),t.map(((e,n)=>(0,L.jsx)("li",{className:l()("breadcrumb-item",{active:n===t.length-1}),"aria-current":n===t.length-1?"page":void 0,children:n===t.length-1?(0,L.jsx)("b",{children:e.name}):(0/* Link */,L.jsx)(O.N_,{to:e.url,children:e.name})},n)))]})}):null},H=e=>{let{breadcrumb:t=[],title:n="",rightContent:r,children:o,isMaxWidth:c=!0}=e;const d=n?`${n} | ${W/* conferenceData */.p.name_display} ${W/* conferenceData */.p.year}`:`${W/* conferenceData */.p.name_display} ${W/* conferenceData */.p.year}`;
return(0,L.jsxs)(L.Fragment,{children:[(0/* Helmet */,L.jsxs)(q.mg,{children:[(0,L.jsx)("title",{children:d}),(0,L.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,L.jsxs)("div",{className:l()(i,"position-relative"),children:[(0,L.jsx)(F,{}),(0,L.jsxs)("div",{className:"d-flex flex-row",children:[(0,L.jsx)(z,{cd:W/* conferenceData */.p}),(0,L.jsxs)("div",{className:l()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:c}),children:[0!==t.length&&(0,L.jsx)(B,{links:t}),(!!n||!!r)&&(0,L.jsxs)("div",{className:l()("d-flex justify-content-between align-items-center",s),children:[n&&(0,L.jsx)("h2",{children:n}),r&&(0,L.jsx)("div",{children:r})]}),o]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */i});// ./src/data/conference-data.json
const i=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/9582:
/***/(e,t,n)=>{
// ESM COMPAT FLAG
n.r(t),
// EXPORTS
n.d(t,{default:()=>/* binding */M});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var i=n(6942),s=n.n(i);// ./src/admin/pages/participants/single/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const a="index-module__mxW--Ve0tI",r="tabs-module__tab--ed4Qs",l="tabs-module__active--frwOf",o="tabs-module__contentMxw--q4nV3";
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var c=n(1083),d=n(7647),m=n(6645),u=n(6540),p=n(2199),h=n(7767),x=n(9785),b=n(7762),g=n(4493),f=n(4972),v=n(4976),w=n(847),_=n(3975),j=n(9156),y=n(5680),k=n(6538),N=n(5058),A=n(6827),S=n(4668),L=n(5846),C=n(4848);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// ./src/admin/pages/participants/single/index.js
const M=e=>{let{isCurOnline:t=!1}=e;const{participantId:n,tab:i}=(0,h/* useParams */.g)(),[M,$]=(0,u.useState)(""),[D,E]=(0,u.useState)(!1),[O,I]=(0,u.useState)(null),[P,V]=(0,u.useState)(!1),[T,z]=(0,u.useState)(0),[W,F]=(0,u.useState)(0),[q,R]=(0,u.useState)(!1),U=i||"identity",B=(0,h/* useNavigate */.Zp)();(0,p/* useBlockNavigation */.V)(P);const{workshops:H,paymentMethods:Y,registrationTypes:Z,loading:G,sessions:J,error:Q}=(0,g/* useApiSpecificData */.Q)(),{participant:X,loading:K,error:ee}=(0,f/* useApiParticipant */.D)(n,t,q,!0),{control:te,register:ne,handleSubmit:ie,getValues:se,setValue:ae,formState:{errors:re},trigger:le,watch:oe}=(0,x/* useForm */.mN)(),ce="1"===X?.participant?.is_online,de=G||K||D,me=[M,ee,Q].filter(Boolean);
// Paypal fess
// Paypal fess
(0,u.useEffect)((()=>{F(W)}),[W]),
// Detect form changes
// Detect form changes
(0,u.useEffect)((()=>{const e=oe((()=>{V(!0)}));return()=>e.unsubscribe()}),[oe]),(0,u.useEffect)((()=>{i||B(`/admin/participants/onsite/${n}/summary`,{replace:!0})}),[i,n,B]),(0,u.useEffect)((()=>{if(!X||0===J.length)return;
// Extract participant data safely
const{participant:e,workshops:t,arrival:n,contributions:i,accommodation:s,extra_options:a}=X||{},{dob:r,...l}=e||{};
// Handle Date of Birth
if(r){const[e,t,n]=r.split("-");ae("dobDay",String(Number(n))),ae("dobMonth",String(Number(t))),ae("dobYear",e)}
// Set other participant details safely
// Handle Workshops
if(l&&Object.entries(l).forEach((e=>{let[t,n]=e;null!=n&&ae(t,n)})),t&&Array.isArray(t)){const e=t.map((e=>String(e.id)));ae("workshops",e)}
// Handle Arrival Details safely
// Handle Contributions (Talks & Posters)
if(n&&Object.entries(n).forEach((e=>{let[t,n]=e;null!=n&&ae(t,t.includes("hour")||t.includes("minute")?String(n).padStart(2,"0"):n)})),i&&Array.isArray(i)&&J.length>0){const e=i.filter((e=>"talk"===e.type)).map((e=>({...e}))),t=i.filter((e=>"poster"===e.type)).map((e=>({...e})));
// Set values in form so they persist on submit
ae("talks",e),ae("posters",t),
// Set wantsToContribute if at least one talk or poster exists
(e.length>0||t.length>0)&&ae("wantsToContribute","yes")}
// Handle Accommodation
s?.registration_type_id&&ae("registration_type_id",String(s.registration_type_id)),
// Handle Extra Options safely
a&&(ae("excursion","0"===a.excursion?"false":"true"),ae("buy_tshirt","0"===a.buy_tshirt?"false":"true"),ae("tshirt_size",a.tshirt_size||""))}),[X,J,ae]);const ue=[{url:"/admin/participants/"+(ce?"online":"onsite"),name:ce?"Online Participants":"On-site Participants"},{url:`/admin/participants/${ce?"online":"onsite"}/${n}/${U}`,name:`${X?.participant?.first_name?X.participant.first_name.charAt(0).toUpperCase()+X.participant.first_name.slice(1):"Participant"} \n        ${X?.participant?.last_name||""} - \n        ${U.charAt(0).toUpperCase()+U.slice(1)}`}],pe=X&&Y.length>0&&H.length>0&&Z.length>0,he=!!X?.participant?.admin_notes;
return(0/* default */,C.jsxs)(d.A,{breadcrumb:ue,isMaxWidth:!0,children:[(0,C.jsxs)("div",{className:"position-relative fw-bolder",children:[de&&(0/* default */,C.jsx)(m.A,{}),me.length>0&&(0,C.jsx)("div",{className:"alert alert-danger fw-bolder",children:(0,C.jsx)("ul",{className:"mb-0",children:me.map(((e,t)=>(0,C.jsx)("li",{children:e},t)))})}),O&&!de&&(0,C.jsx)("div",{className:"alert alert-success",children:O})]}),X&&pe&&!de&&(0,C.jsxs)("form",{onSubmit:ie((async e=>{E(!0),$(null),I(null);// Triggers validation on all fields
if(!await le())return E(!1),void $("Please fill in all required fields.");e.talks=se("talks")||[],e.posters=se("posters")||[];const t={...e,total_due:T,paypal_fee:W};try{const e=await c/* default */.A.post(`https://imc2025.imo.net/php/admin/api/update_${ce?"online":"onsite"}_participant.php?id=${n}`,t,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");R((e=>!e)),I("Participant updated successfully!")}catch(e){$(e.message)}finally{E(!1)}})),children:[(0,C.jsx)("ul",{className:s()("nav nav-tabs mb-3 mt-2",r,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},{key:"workshops",label:"Workshops"},...ce?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...ce?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...ce?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((e=>{let{key:t,label:i}=e;
return(0,C.jsx)("li",{className:"nav-item",children:(0,C.jsx)("a",{className:s()("nav-link",U===t&&l),href:`/admin/participants/onsite/${n}/${t}`,onClick:e=>{e.preventDefault(),B(`/admin/participants/onsite/${n}/${t}`)},children:he&&"admin_notes"===t?(0,C.jsxs)("span",{className:"position-relative",children:[(0,C.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),i]}):(0,C.jsx)(C.Fragment,{children:i})})},t)}))}),(0,C.jsxs)("div",{className:s()("tab-content mx-auto",o),children:["identity"===i&&(0/* default */,C.jsx)(w.A,{isAdmin:!0,isOnline:ce,register:ne,errors:re,setValue:ae,trigger:le}),"workshops"===i&&(0/* default */,C.jsx)(_.A,{isAdmin:!0,isOnline:ce,conferenceData:b/* conferenceData */.p,register:ne,errors:re,setValue:ae,trigger:le,watch:oe,workshops:H}),"arrival"===i&&!ce&&(0/* default */,C.jsx)(j.A,{isAdmin:!0,conferenceData:b/* conferenceData */.p,register:ne,errors:re,setValue:ae,trigger:le}),"contribution"===i&&(0/* default */,C.jsx)(y.A,{isAdmin:!0,isOnline:ce,conferenceData:b/* conferenceData */.p,control:te,register:ne,errors:re,getValues:se,setValue:ae,watch:oe,trigger:le,sessions:J}),"accommodation"===i&&(0/* default */,C.jsx)(k.A,{isAdmin:!0,isOnline:ce,isEarlyBird:X?.participant.is_early_bird,conferenceData:b/* conferenceData */.p,control:te,register:ne,errors:re,paymentMethods:Y,setValue:ae,registrationTypes:Z,trigger:le}),"extras"===i&&!ce&&(0/* default */,C.jsx)(N.A,{isAdmin:!0,conferenceData:b/* conferenceData */.p,register:ne,errors:re,getValues:se,setValue:ae,trigger:le,watch:oe,control:te}),"comments"===i&&(0,C.jsx)("div",{className:s()(a,"mx-auto"),children:(0/* default */,C.jsx)(A.A,{isAdmin:!0,isOnline:ce,register:ne,errors:re,setValue:ae,trigger:le})}),(0,C.jsxs)("div",{className:s()(a,"mx-auto","summary"===i&&pe?"visible":"invisible h-0 w-0 overflow-hidden"),children:[(0,C.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,C.jsxs)("div",{children:[(0,C.jsxs)("strong",{children:[X?.participant?.first_name?X.participant.first_name.charAt(0).toUpperCase()+X.participant.first_name.slice(1):""," ",X?.participant?.last_name||""]})," ","1"===X.participant.confirmation_sent?(0,C.jsxs)(C.Fragment,{children:["has been confirmed on ",(0,C.jsx)("span",{className:"text-success",children:X.participant.confirmation_date&&(0,L/* formatFullDate */.Lu)(X.participant.confirmation_date)})]}):(0,C.jsx)(C.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==X.participant.confirmation_sent&&(0,C.jsx)("div",{children:(0/* Link */,C.jsx)(v.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${ce?"online":"onsite"}/payment/${n}`,children:"Go to Payments to confirm"})})]}),(0/* default */,C.jsx)(S.A,{isAdmin:!0,isOnline:ce,isEarlyBird:X?.participant.is_early_bird,conferenceData:b/* conferenceData */.p,getValues:se,setValue:ae,setTotal:z,setPaypalFee:F,workshops:H,registrationTypes:Z,paymentMethods:Y,watch:oe})]}),"admin_notes"===i&&(0,C.jsxs)("div",{className:s()(a,"mx-auto mb-3"),children:[(0,C.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,C.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...ne("admin_notes")}),re.admin_notes&&(0,C.jsx)("div",{className:"text-danger mt-1",children:re.admin_notes.message})]}),(0,C.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,C.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:D,children:D?"Saving...":"Save Changes"})})]})]})]})};
/* harmony default export */}
/***/}]);