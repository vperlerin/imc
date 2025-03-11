"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[389],{
/***/1280:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */_v:()=>/* binding */s
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const s=e=>{e&&e.stopPropagation()}}
/***/,
/***/2199:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */V:()=>/* binding */a
/* harmony export */});
/* harmony import */var s=n(6540),i=n(7767);
/* harmony import */const a=e=>{const t=(0,i/* .useNavigate */.Zp)(),n=(0,i/* .useLocation */.zy)();(0,s.useEffect)((()=>{const t=t=>{e&&(t.preventDefault(),t.returnValue="You have unsaved changes. Do you really want to leave?")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e]),(0,s.useEffect)((()=>{const s=s=>{if(e){window.confirm("You have unsaved changes. Do you really want to leave?")||(s.preventDefault(),t(n.pathname,{replace:!0}))}};return window.addEventListener("popstate",s),()=>{window.removeEventListener("popstate",s)}}),[e,t,n.pathname])};
/***/},
/***/3318:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=function(e){let{interval:t=100,retries:n=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((i,a)=>{e().then(i).catch((r=>{setTimeout((()=>{n?s(e,{interval:1.5*t,retries:n-1}).then(i,a):a(r)}),t)}))}))};
/***/},
/***/3464:
/***/(e,t,n)=>{e.exports=n.p+"702c5653d2360537e78f.svg";
/***/},
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */r
/* harmony export */,Lu:()=>/* binding */a
/* harmony export */,p6:()=>/* binding */i
/* harmony export */});const s=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},i=(e,t)=>{const n=new Date(e),i=new Date(t),a=n.toLocaleString("en-US",{month:"long"}),r=n.getDate(),l=i.getDate();return`${a} ${r}${s(r)} - ${l}${s(l)}`},a=function(e){return function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const a=new Date(e),r=a.getDate(),l=a.toLocaleString("en-US",{month:"long"}),o=a.toLocaleString("en-US",{weekday:"long"}),c=a.getFullYear();return`${t?o+", ":""}${r}${s(r)}${n?" "+l:""}${i?" "+c:""}`}(e,!0,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],arguments.length>2&&void 0!==arguments[2]&&arguments[2])},r=function(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const i=new Date(e);return i.setDate(i.getDate()+t),a(i.toISOString(),n,s)}}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",i="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=n(6942),r=n.n(a),l=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const o="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var d=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const m="300px",u="index-module__menuBtn--iHux0",p="index-module__menuCloseBtn--jCTip",h="index-module__menuIcon--i9Mwv",x="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",g="index-module__active--EYt3Y",v="index-module__footer--O9Npd",_="index-module__menuItem--eqnJw",j="index-module__menuItemTitle--O6gep",y="index-module__active--Hl_ax",w="index-module__caret--U_US2",k="index-module__rotate--pnUGY",N="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var A=n(6540),S=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const C=A.forwardRef(((e,t)=>{let{children:n,className:s,goTo:i=null,isLinkActive:a,title:l,url:o=null}=e;const[c,d]=(0,A.useState)(a),[m,u]=(0,A.useState)("0px"),p=(0,A.useRef)(null);(0,A.useEffect)((()=>{n&&u(c?`${p.current.scrollHeight}px`:"0px")}),[n,c,p]);const h=e=>(0,S.jsx)("div",{className:r()(e.className,c&&k),children:(0,S.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,S.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,S.jsxs)("div",{className:r()(_,"d-flex flex-column",s),ref:t,children:[(0,S.jsxs)("a",{className:r()(j,"d-flex justify-content-between w-100 align-items-center px-3",a&&y),href:o||void 0,onClick:e=>{e.preventDefault(),n?d(!c):i&&o&&i(o)},children:[(0,S.jsx)("span",{className:"d-flex align-items-center",children:(0,S.jsx)("b",{children:l})}),n&&(0,S.jsx)(h,{className:w})]}),n&&(0,S.jsx)("div",{className:N,ref:p,style:n&&{maxHeight:`${m}`},children:n})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js
var L=n(8321),M=n(8983),$=n(1448),E=n(7767),D=n(4976);
// EXTERNAL MODULE: ./src/store/auth/index.js
// ./src/data/admin-menu.js
const I=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Workshops",link:"/admin/participants/workshops"}]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks"},{title:"Posters",link:"/admin/contributions/posters"}]},{title:"Accomodations",link:"/admin/accomodations"},{title:"Export",link:"/admin/export"}];
// EXTERNAL MODULE: ./src/utils/event.js
var O=n(1280),V=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const P=parseInt(m,10)||250,T=e=>{let{cd:t}=e;const[n,s]=(0,A.useState)(!1),[i,a]=(0,A.useState)(!0),l=(0,$/* useDispatch */.wA)(),o=(0,E/* useLocation */.zy)(),c=(0,E/* useNavigate */.Zp)(),[m,_]=(0,L.useSpring)((()=>({right:-P,config:{tension:350,friction:30}})));(0,A.useEffect)((()=>(n?(a(!1),_.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(_.start({right:-P,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[n,_]),(0,A.useEffect)((()=>{const e=()=>{s(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const j=()=>{s((e=>!e))},y=e=>{c(e),j()};
return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{className:u,onClick:j,children:(0/* SlMenu */,S.jsx)(d.RAm,{className:h})}),!i&&(0,S.jsx)("div",{className:r()(b),onClick:j,onMouseDown:O/* onStopPropagation */._v,onTouchStart:O/* onStopPropagation */._v}),(0,S.jsx)(L.animated.div,{className:r()(x),style:m,children:(0,S.jsxs)("div",{className:r()(f,"d-flex flex-column h-100"),children:[(0,S.jsx)("button",{className:p,onClick:j,children:(0/* SlClose */,S.jsx)(d.ipV,{className:h})}),(0,S.jsxs)("div",{className:"mb-3",children:[(0,S.jsxs)("div",{className:"m-3 text-center",children:[(0,S.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",t.year]}),(0,S.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),I.map((e=>{const t=o.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>o.pathname.startsWith(e.link)));if(!e.hideFromMenu)
return(0,S.jsx)(C,{className:"py-2",isLinkActive:t,goTo:y,title:e.title,url:e.link,children:e.subLinks&&(0,S.jsx)(S.Fragment,{children:e.subLinks.map((e=>{const t=o.pathname===e.link;
return(0/* Link */,S.jsx)(D.N_,{"aria-label":e.title,onClick:j,to:e.link,className:r()(t&&g),title:e.title,children:e.title},e.link)}))})},e.link)}))]}),(0,S.jsx)("div",{className:r()(v,"mt-auto"),children:(0,S.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,S.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>y("/"),title:"Public site",children:"Public site"}),(0,S.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await V/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),l(M/* authActions */.I2.logout()),localStorage.removeItem("session"),c("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var z=n(7762);// ./src/admin/components/header/index.js
const F=()=>{const e=`${z/* conferenceData */.p.name} ${z/* conferenceData */.p.year}`;
return(0,S.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,S.jsx)(T,{cd:z/* conferenceData */.p}),(0,S.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,S.jsx)("div",{className:r()(o,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,S.jsxs)(D.N_,{"aria-label":"Admin",className:r()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:"/admin/dashboard",title:"Admin",children:[(0,S.jsx)("img",{src:l,alt:e,className:"rounded-circle border border-2 p-1"}),(0,S.jsxs)("div",{className:"d-flex flex-column",children:[(0,S.jsxs)("h1",{className:"m-0 fw-bolder",children:[z/* conferenceData */.p.name," ",z/* conferenceData */.p.year]}),(0,S.jsx)("h2",{className:"m-0 d-none d-md-block",children:"ADMIN AREA"})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var W=n(5902),q=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const R="breadcrumb-module__nav--atkeN",U=e=>{let{links:t=[]}=e;
return(0,S.jsx)("nav",{"aria-label":"breadcrumb",className:R,children:(0,S.jsxs)("ol",{className:r()("breadcrumb"),children:[(0,S.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,S.jsx)(D.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,S.jsx)(q.M14,{className:"me-1"})})}),t.map(((e,n)=>(0,S.jsx)("li",{className:r()("breadcrumb-item",{active:n===t.length-1}),"aria-current":n===t.length-1?"page":void 0,children:n===t.length-1?(0,S.jsx)("b",{children:e.name}):(0/* Link */,S.jsx)(D.N_,{to:e.url,children:e.name})},n)))]})})},B=e=>{let{breadcrumb:t=[],title:n="",rightContent:a,children:l,isMaxWidth:o=!1}=e;const c=n?`${n} | ${z/* conferenceData */.p.name_display} ${z/* conferenceData */.p.year}`:`${z/* conferenceData */.p.name_display} ${z/* conferenceData */.p.year}`;
return(0,S.jsxs)(S.Fragment,{children:[(0/* Helmet */,S.jsxs)(W.mg,{children:[(0,S.jsx)("title",{children:c}),(0,S.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,S.jsxs)("div",{className:r()(s,"position-relative"),children:[(0,S.jsx)(F,{}),(0,S.jsxs)("div",{className:"d-flex flex-row",children:[(0,S.jsx)(T,{cd:z/* conferenceData */.p}),(0,S.jsxs)("div",{className:"mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",children:[0!==t.length&&(0,S.jsx)(U,{links:t}),(0,S.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[n&&(0,S.jsx)("h2",{children:n}),a&&(0,S.jsx)("div",{children:a})]}),(0,S.jsx)("div",{className:r()(o&&i),children:l})]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)","poster_print":{"desc":"Maximum size A1 (59.4cm x 84.1cm / 23.4″ x 33.1″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A1 size (59.4cm x 84.1cm / 23.4″ x 33.1″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasuer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/9582:
/***/(e,t,n)=>{
// ESM COMPAT FLAG
n.r(t),
// EXPORTS
n.d(t,{default:()=>/* binding */M});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=n(6942),i=n.n(s);// ./src/admin/pages/participants/single/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const a="index-module__mxW--Ve0tI",r="tabs-module__tab--ed4Qs",l="tabs-module__active--frwOf",o="tabs-module__contentMxw--q4nV3";
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var c=n(1083),d=n(7647),m=n(6645),u=n(6540),p=n(2199),h=n(7767),x=n(9785),b=n(7762),f=n(4493),g=n(4972),v=n(4976),_=n(476),j=n(3975),y=n(9156),w=n(5680),k=n(6538),N=n(5058),A=n(6827),S=n(4668),C=n(5846),L=n(4848);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// ./src/admin/pages/participants/single/index.js
const M=e=>{let{isCurOnline:t=!1}=e;const{participantId:n,tab:s}=(0,h/* useParams */.g)(),[M,$]=(0,u.useState)(""),[E,D]=(0,u.useState)(!1),[I,O]=(0,u.useState)(null),[V,P]=(0,u.useState)(!1),[T,z]=(0,u.useState)(0),[F,W]=(0,u.useState)(0),[q,R]=(0,u.useState)([]),[U,B]=(0,u.useState)(!1),[H,Y]=(0,u.useState)([]),Z=s||"identity",G=(0,h/* useNavigate */.Zp)();(0,p/* useBlockNavigation */.V)(V);const{workshops:J,paymentMethods:Q,registrationTypes:X,loading:K,sessions:ee,error:te}=(0,f/* useApiSpecificData */.Q)(),{participant:ne,loading:se,error:ie}=(0,g/* useApiParticipant */.D)(n,t,U,!0),{control:ae,register:re,handleSubmit:le,getValues:oe,setValue:ce,formState:{errors:de},trigger:me,watch:ue}=(0,x/* useForm */.mN)(),pe="1"===ne?.participant?.is_online,he=K||se||E,xe=[M,ie,te].filter(Boolean);
// Paypal fess
// Paypal fess
(0,u.useEffect)((()=>{W(F)}),[F]),
// Detect form changes
// Detect form changes
(0,u.useEffect)((()=>{const e=ue((()=>{P(!0)}));return()=>e.unsubscribe()}),[ue]),(0,u.useEffect)((()=>{s||G(`/admin/participants/onsite/${n}/summary`,{replace:!0})}),[s,n,G]),(0,u.useEffect)((()=>{if(!ne||0===ee.length)return;
// Extract participant data safely
const{participant:e,workshops:t,arrival:n,contributions:s,accommodation:i,extra_options:a}=ne||{},{dob:r,...l}=e||{};
// Handle Date of Birth
if(r){const[e,t,n]=r.split("-");ce("dobDay",String(Number(n))),ce("dobMonth",String(Number(t))),ce("dobYear",e)}
// Set other participant details safely
// Handle Workshops
if(l&&Object.entries(l).forEach((e=>{let[t,n]=e;null!=n&&ce(t,n)})),t&&Array.isArray(t)){const e=t.map((e=>String(e.id)));ce("workshops",e)}
// Handle Arrival Details safely
// Handle Contributions (Talks & Posters)
if(n&&Object.entries(n).forEach((e=>{let[t,n]=e;null!=n&&ce(t,t.includes("hour")||t.includes("minute")?String(n).padStart(2,"0"):n)})),s&&Array.isArray(s)&&ee.length>0){const e=s.filter((e=>"talk"===e.type)).map((e=>({...e}))),t=s.filter((e=>"poster"===e.type)).map((e=>({...e})));
// Store in state
R(e),Y(t),
// Set values in form so they persist on submit
ce("talks",e),ce("posters",t),
// Set wantsToContribute if at least one talk or poster exists
(e.length>0||t.length>0)&&ce("wantsToContribute","yes")}
// Handle Accommodation
i?.registration_type_id&&ce("registration_type_id",String(i.registration_type_id)),
// Handle Extra Options safely
a&&(ce("excursion","0"===a.excursion?"false":"true"),ce("buy_tshirt","0"===a.buy_tshirt?"false":"true"),ce("tshirt_size",a.tshirt_size||""))}),[ne,ee,ce,R,Y]);const be=[{url:"/admin/participants/"+(pe?"online":"onsite"),name:pe?"Online Participants":"Onsite Participants"},{url:`/admin/participants/${pe?"online":"onsite"}/${n}/${Z}`,name:`${ne?.participant?.first_name?ne.participant.first_name.charAt(0).toUpperCase()+ne.participant.first_name.slice(1):"Participant"} \n        ${ne?.participant?.last_name||""} - \n        ${Z.charAt(0).toUpperCase()+Z.slice(1)}`}],fe=ne&&Q.length>0&&J.length>0&&X.length>0,ge=!!ne?.participant?.admin_notes;
return(0/* default */,L.jsxs)(d.A,{breadcrumb:be,isMaxWidth:!0,children:[(0,L.jsxs)("div",{className:"position-relative fw-bolder",children:[he&&(0/* default */,L.jsx)(m.A,{}),xe.length>0&&(0,L.jsxs)("div",{className:"alert alert-danger fw-bolder",children:[(0,L.jsx)("ul",{className:"mb-0",children:xe.map(((e,t)=>(0,L.jsx)("li",{children:e},t)))}),(0,L.jsxs)("div",{className:"mt-2",children:["If you think this is a mistake please try again or "," "," ",(0/* Link */,L.jsx)(v.N_,{"aria-label":"Contact",to:"/contact",title:"Contact",children:"contact us"}),"."]})]}),I&&!he&&(0,L.jsx)("div",{className:"alert alert-success",children:I})]}),ne&&fe&&!he&&(0,L.jsxs)("form",{onSubmit:le((async e=>{D(!0),$(null),O(null);// Triggers validation on all fields
if(!await me())return D(!1),void $("Please fill in all required fields.");e.talks=oe("talks")||[],e.posters=oe("posters")||[];const t={...e,total_due:T,paypal_fee:F};try{const e=await c/* default */.A.post(`https://imc2025.imo.net/php/admin/api/update_${pe?"online":"onsite"}_participant.php?id=${n}`,t,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");B((e=>!e)),O("Participant updated successfully!")}catch(e){$(e.message)}finally{D(!1)}})),children:[(0,L.jsx)("ul",{className:i()("nav nav-tabs mb-3 mt-2",r,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},{key:"workshops",label:"Workshops"},...pe?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...pe?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...pe?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((e=>{let{key:t,label:s}=e;
return(0,L.jsx)("li",{className:"nav-item",children:(0,L.jsx)("a",{className:i()("nav-link",Z===t&&l),href:`/admin/participants/onsite/${n}/${t}`,onClick:e=>{e.preventDefault(),G(`/admin/participants/onsite/${n}/${t}`)},children:ge&&"admin_notes"===t?(0,L.jsxs)("span",{className:"position-relative",children:[(0,L.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),s]}):(0,L.jsx)(L.Fragment,{children:s})})},t)}))}),(0,L.jsxs)("div",{className:i()("tab-content mx-auto",o),children:["identity"===s&&(0/* default */,L.jsx)(_.A,{isAdmin:!0,isOnline:pe,register:re,errors:de,setValue:ce,trigger:me}),"workshops"===s&&(0/* default */,L.jsx)(j.A,{isAdmin:!0,isOnline:pe,conferenceData:b/* conferenceData */.p,register:re,errors:de,setValue:ce,trigger:me,watch:ue,workshops:J}),"arrival"===s&&!pe&&(0/* default */,L.jsx)(y.A,{isAdmin:!0,conferenceData:b/* conferenceData */.p,register:re,errors:de,setValue:ce,trigger:me}),"contribution"===s&&(0/* default */,L.jsx)(w.A,{isAdmin:!0,isOnline:pe,conferenceData:b/* conferenceData */.p,control:ae,register:re,errors:de,getValues:oe,setValue:ce,watch:ue,trigger:me,sessions:ee}),"accommodation"===s&&(0/* default */,L.jsx)(k.A,{isAdmin:!0,isOnline:pe,isEarlyBird:ne?.participant.is_early_bird,conferenceData:b/* conferenceData */.p,control:ae,register:re,errors:de,paymentMethods:Q,setValue:ce,registrationTypes:X,trigger:me}),"extras"===s&&!pe&&(0/* default */,L.jsx)(N.A,{isAdmin:!0,conferenceData:b/* conferenceData */.p,register:re,errors:de,getValues:oe,setValue:ce,trigger:me,watch:ue,control:ae}),"comments"===s&&(0,L.jsx)("div",{className:i()(a,"mx-auto"),children:(0/* default */,L.jsx)(A.A,{isAdmin:!0,isOnline:pe,register:re,errors:de,setValue:ce,trigger:me})}),(0,L.jsxs)("div",{className:i()(a,"mx-auto","summary"===s&&fe?"visible":"invisible"),children:[(0,L.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,L.jsxs)("div",{children:[ne?.participant?.first_name?ne.participant.first_name.charAt(0).toUpperCase()+ne.participant.first_name.slice(1):""," ",ne?.participant?.last_name||"","1"===ne.confirmation_sent?(0,L.jsxs)(L.Fragment,{children:["✅ ","has been confirmed on "," ",ne.confirmation_date&&(0,C/* formatFullDate */.Lu)(ne.confirmation_date)]}):(0,L.jsx)(L.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==ne.confirmation_sent&&(0,L.jsx)("div",{children:(0/* Link */,L.jsx)(v.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${pe?"online":"onsite"}/payment/${n}`,children:"Go to Payments to confirm"})})]}),(0/* default */,L.jsx)(S.A,{isAdmin:!0,isOnline:pe,isEarlyBird:ne?.participant.is_early_bird,conferenceData:b/* conferenceData */.p,getValues:oe,setValue:ce,setTotal:z,setPaypalFee:W,workshops:J,registrationTypes:X,paymentMethods:Q,watch:ue})]}),"admin_notes"===s&&(0,L.jsxs)("div",{className:i()(a,"mx-auto mb-3"),children:[(0,L.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,L.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...re("admin_notes")}),de.admin_notes&&(0,L.jsx)("div",{className:"text-danger mt-1",children:de.admin_notes.message})]}),(0,L.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,L.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:E,children:E?"Saving...":"Save Changes"})})]})]})]})};
/* harmony default export */}
/***/}]);