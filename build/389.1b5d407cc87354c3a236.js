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
/* harmony export */});const i=(e,{interval:t=100,retries:n=14}={})=>new Promise(((s,a)=>{e().then(s).catch((r=>{setTimeout((()=>{n?i(e,{interval:1.5*t,retries:n-1}).then(s,a):a(r)}),t)}))}));
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
/* harmony export */});const i=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=(e,t)=>{const n=new Date(e),s=new Date(t),a=n.toLocaleString("en-US",{month:"long"}),r=n.getDate(),o=s.getDate();return`${a} ${r}${i(r)} - ${o}${i(o)}`},a=(e,t=!0,n=!1)=>((e,t=!1,n=!0,s=!1)=>{const a=new Date(e),r=a.getDate(),o=a.toLocaleString("en-US",{month:"long"}),l=a.toLocaleString("en-US",{weekday:"long"}),c=a.getFullYear();return`${t?l+", ":""}${r}${i(r)}${n?" "+o:""}${s?" "+c:""}`})(e,!0,t,n),r=(e,t,n=!0,i=!0)=>{const s=new Date(e);return s.setDate(s.getDate()+t),a(s.toISOString(),n,i)}}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */H});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const i="index-module__pageContain--r6_E2",s="index-module__titleWrap--hrdlj",a="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var r=n(6942),o=n.n(r),l=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",g="index-module__menu--veCcg",_="index-module__active--EYt3Y",w="index-module__footer--O9Npd",v="index-module__menuItem--eqnJw",j="index-module__menuItemTitle--O6gep",y="index-module__active--Hl_ax",k="index-module__caret--U_US2",N="index-module__rotate--pnUGY",A="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var S=n(6540),L=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const C=S.forwardRef((({children:e,className:t,goTo:n=null,isLinkActive:i,title:s,url:a=null},r)=>{const[l,c]=(0,S.useState)(i),[d,m]=(0,S.useState)("0px"),u=(0,S.useRef)(null);(0,S.useEffect)((()=>{e&&m(l?`${u.current.scrollHeight}px`:"0px")}),[e,l,u]);const p=e=>(0,L.jsx)("div",{className:o()(e.className,l&&N),children:(0,L.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,L.jsxs)("div",{className:o()(v,"d-flex flex-column",t),ref:r,children:[(0,L.jsxs)("a",{className:o()(j,"d-flex justify-content-between w-100 align-items-center px-3",i&&y),href:a||void 0,onClick:t=>{t.preventDefault(),e?c(!l):n&&a&&n(a)},children:[(0,L.jsx)("span",{className:"d-flex align-items-center",children:(0,L.jsx)("b",{children:s})}),e&&(0,L.jsx)(p,{className:k})]}),e&&(0,L.jsx)("div",{className:A,ref:u,style:e&&{maxHeight:`${d}`},children:e})]})}));
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
const T=parseInt(u,10)||250,z=({cd:e})=>{const[t,n]=(0,S.useState)(!1),[i,s]=(0,S.useState)(!0),a=(0,$/* useDispatch */.wA)(),r=(0,E/* useLocation */.zy)(),l=(0,E/* useNavigate */.Zp)(),c=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isAdmin),d=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isLoc),u=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isSoc),[v,j]=(0,D.useSpring)((()=>({right:-T,config:{tension:350,friction:30}})));(0,S.useEffect)((()=>(t?(s(!1),j.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(j.start({right:-T,onRest:()=>s(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,j]),(0,S.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const y=()=>{n((e=>!e))},k=e=>{l(e),y()};
return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{className:p,onClick:y,children:(0/* SlMenu */,L.jsx)(m.RAm,{className:x})}),!i&&(0,L.jsx)("div",{className:o()(f),onClick:y,onMouseDown:P/* onStopPropagation */._v,onTouchStart:P/* onStopPropagation */._v}),(0,L.jsx)(D.animated.div,{className:o()(b),style:v,children:(0,L.jsxs)("div",{className:o()(g,"d-flex flex-column h-100"),children:[(0,L.jsx)("button",{className:h,onClick:y,children:(0/* SlClose */,L.jsx)(m.ipV,{className:x})}),(0,L.jsxs)("div",{className:"mb-3",children:[(0,L.jsxs)("div",{className:"m-3 text-center",children:[(0,L.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,L.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),I.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,L.jsx)(C,{className:"py-2",isLinkActive:t,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,L.jsx)(L.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc"))).map((e=>{const t=r.pathname===e.link;
return(0/* Link */,L.jsx)(O.N_,{"aria-label":e.title,onClick:y,to:e.link,className:o()(t&&_),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,L.jsx)("div",{className:o()(w,"mt-auto"),children:(0,L.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,L.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,L.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await V/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),a(M/* authActions */.I2.logout()),localStorage.removeItem("session"),l("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var W=n(7762);// ./src/admin/components/header/index.js
const F=()=>{const e=`${W/* conferenceData */.p.name} ${W/* conferenceData */.p.year}`,t=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isLoc),n=(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isSoc),i=t?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,L.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,L.jsx)(z,{cd:W/* conferenceData */.p}),(0,L.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,L.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,L.jsxs)(O.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:i,title:"Admin",children:[(0,L.jsx)("img",{src:l,alt:e,className:"rounded-circle border border-2 p-1"}),(0,L.jsxs)("div",{className:"d-flex flex-column",children:[(0,L.jsxs)("h1",{className:"m-0 fw-bolder",children:[W/* conferenceData */.p.name," ",W/* conferenceData */.p.year]}),(0,L.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var q=n(5902),R=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const U="breadcrumb-module__nav--atkeN",B=({links:e=[]})=>(0/* authSelectors */,$/* useSelector */.d4)(M.Pg.isAdmin)?(0,L.jsx)("nav",{"aria-label":"breadcrumb",className:U,children:(0,L.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,L.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,L.jsx)(O.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,L.jsx)(R.M14,{className:"me-1"})})}),e.map(((t,n)=>(0,L.jsx)("li",{className:o()("breadcrumb-item",{active:n===e.length-1}),"aria-current":n===e.length-1?"page":void 0,children:n===e.length-1?(0,L.jsx)("b",{children:t.name}):(0/* Link */,L.jsx)(O.N_,{to:t.url,children:t.name})},n)))]})}):null,H=({breadcrumb:e=[],title:t="",rightContent:n,children:r,isMaxWidth:l=!0})=>{const c=t?`${t} | ${W/* conferenceData */.p.name_display} ${W/* conferenceData */.p.year}`:`${W/* conferenceData */.p.name_display} ${W/* conferenceData */.p.year}`;
return(0,L.jsxs)(L.Fragment,{children:[(0/* Helmet */,L.jsxs)(q.mg,{children:[(0,L.jsx)("title",{children:c}),(0,L.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,L.jsxs)("div",{className:o()(i,"position-relative"),children:[(0,L.jsx)(F,{}),(0,L.jsxs)("div",{className:"d-flex flex-row",children:[(0,L.jsx)(z,{cd:W/* conferenceData */.p}),(0,L.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:l}),children:[0!==e.length&&(0,L.jsx)(B,{links:e}),(!!t||!!n)&&(0,L.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",s),children:[t&&(0,L.jsx)("h2",{children:t}),n&&(0,L.jsx)("div",{children:n})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */i});// ./src/data/conference-data.json
const i=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-07-15","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
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
/* harmony default export */const a="index-module__mxW--Ve0tI",r="tabs-module__tab--ed4Qs",o="tabs-module__active--frwOf",l="tabs-module__contentMxw--q4nV3";
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var c=n(1083),d=n(7647),m=n(6645),u=n(6540),p=n(2199),h=n(7767),x=n(9785),b=n(7762),f=n(4493),g=n(4972),_=n(4976),w=n(847),v=n(3975),j=n(9156),y=n(5680),k=n(6538),N=n(5058),A=n(6827),S=n(4668),L=n(5846),C=n(4848);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// ./src/admin/pages/participants/single/index.js
const M=({isCurOnline:e=!1})=>{const{participantId:t,tab:n}=(0,h/* useParams */.g)(),[i,M]=(0,u.useState)(""),[$,D]=(0,u.useState)(!1),[E,O]=(0,u.useState)(null),[I,P]=(0,u.useState)(!1),[V,T]=(0,u.useState)(0),[z,W]=(0,u.useState)(0),[F,q]=(0,u.useState)(!1),R=n||"identity",U=(0,h/* useNavigate */.Zp)();(0,p/* useBlockNavigation */.V)(I);const{workshops:B,paymentMethods:H,registrationTypes:Y,loading:Z,sessions:G,error:J}=(0,f/* useApiSpecificData */.Q)(),{participant:Q,loading:X,error:K}=(0,g/* useApiParticipant */.D)(t,e,F,!0),{control:ee,register:te,handleSubmit:ne,getValues:ie,setValue:se,formState:{errors:ae},trigger:re,watch:oe}=(0,x/* useForm */.mN)(),le="1"===Q?.participant?.is_online,ce=Z||X||$,de=[i,K,J].filter(Boolean);
// Paypal fess
// Paypal fess
(0,u.useEffect)((()=>{W(z)}),[z]),
// Detect form changes
// Detect form changes
(0,u.useEffect)((()=>{const e=oe((()=>{P(!0)}));return()=>e.unsubscribe()}),[oe]),(0,u.useEffect)((()=>{n||U(`/admin/participants/onsite/${t}/summary`,{replace:!0})}),[n,t,U]),(0,u.useEffect)((()=>{if(!Q||0===G.length)return;
// Extract participant data safely
const{participant:e,workshops:t,arrival:n,contributions:i,accommodation:s,extra_options:a}=Q||{},{dob:r,...o}=e||{};
// Handle Date of Birth
if(r){const[e,t,n]=r.split("-");se("dobDay",String(Number(n))),se("dobMonth",String(Number(t))),se("dobYear",e)}
// Set other participant details safely
// Handle Workshops
if(o&&Object.entries(o).forEach((([e,t])=>{null!=t&&se(e,t)})),t&&Array.isArray(t)){const e=t.map((e=>String(e.id)));se("workshops",e)}
// Handle Arrival Details safely
// Handle Contributions (Talks & Posters)
if(n&&Object.entries(n).forEach((([e,t])=>{null!=t&&se(e,e.includes("hour")||e.includes("minute")?String(t).padStart(2,"0"):t)})),i&&Array.isArray(i)&&G.length>0){const e=i.filter((e=>"talk"===e.type)).map((e=>({...e}))),t=i.filter((e=>"poster"===e.type)).map((e=>({...e})));
// Set values in form so they persist on submit
se("talks",e),se("posters",t),
// Set wantsToContribute if at least one talk or poster exists
(e.length>0||t.length>0)&&se("wantsToContribute","yes")}
// Handle Accommodation
s?.registration_type_id&&se("registration_type_id",String(s.registration_type_id)),
// Handle Extra Options safely
a&&(se("excursion","0"===a.excursion?"false":"true"),se("buy_tshirt","0"===a.buy_tshirt?"false":"true"),se("tshirt_size",a.tshirt_size||""))}),[Q,G,se]);const me=[{url:"/admin/participants/"+(le?"online":"onsite"),name:le?"Online Participants":"On-site Participants"},{url:`/admin/participants/${le?"online":"onsite"}/${t}/${R}`,name:`${Q?.participant?.first_name?Q.participant.first_name.charAt(0).toUpperCase()+Q.participant.first_name.slice(1):"Participant"} \n        ${Q?.participant?.last_name||""} - \n        ${R.charAt(0).toUpperCase()+R.slice(1)}`}],ue=Q&&H.length>0&&B.length>0&&Y.length>0,pe=!!Q?.participant?.admin_notes;
return(0/* default */,C.jsxs)(d.A,{breadcrumb:me,isMaxWidth:!0,children:[(0,C.jsxs)("div",{className:"position-relative fw-bolder",children:[ce&&(0/* default */,C.jsx)(m.A,{}),de.length>0&&(0,C.jsx)("div",{className:"alert alert-danger fw-bolder",children:(0,C.jsx)("ul",{className:"mb-0",children:de.map(((e,t)=>(0,C.jsx)("li",{children:e},t)))})}),E&&!ce&&(0,C.jsx)("div",{className:"alert alert-success",children:E})]}),Q&&ue&&!ce&&(0,C.jsxs)("form",{onSubmit:ne((async e=>{D(!0),M(null),O(null);// Triggers validation on all fields
if(!await re())return D(!1),void M("Please fill in all required fields.");e.talks=ie("talks")||[],e.posters=ie("posters")||[];const n={...e,total_due:V,paypal_fee:z};try{const e=await c/* default */.A.post(`https://imc2025.imo.net/php/admin/api/update_${le?"online":"onsite"}_participant.php?id=${t}`,n,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");q((e=>!e)),O("Participant updated successfully!")}catch(e){M(e.message)}finally{D(!1)}})),children:[(0,C.jsx)("ul",{className:s()("nav nav-tabs mb-3 mt-2",r,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},{key:"workshops",label:"Workshops"},...le?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...le?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...le?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((({key:e,label:n})=>(0,C.jsx)("li",{className:"nav-item",children:(0,C.jsx)("a",{className:s()("nav-link",R===e&&o),href:`/admin/participants/onsite/${t}/${e}`,onClick:n=>{n.preventDefault(),U(`/admin/participants/onsite/${t}/${e}`)},children:pe&&"admin_notes"===e?(0,C.jsxs)("span",{className:"position-relative",children:[(0,C.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),n]}):(0,C.jsx)(C.Fragment,{children:n})})},e)))}),(0,C.jsxs)("div",{className:s()("tab-content mx-auto",l),children:["identity"===n&&(0/* default */,C.jsx)(w.A,{isAdmin:!0,isOnline:le,register:te,errors:ae,setValue:se,trigger:re}),"workshops"===n&&(0/* default */,C.jsx)(v.A,{isAdmin:!0,isOnline:le,conferenceData:b/* conferenceData */.p,register:te,errors:ae,setValue:se,trigger:re,watch:oe,workshops:B}),"arrival"===n&&!le&&(0/* default */,C.jsx)(j.A,{isAdmin:!0,conferenceData:b/* conferenceData */.p,register:te,errors:ae,setValue:se,trigger:re}),"contribution"===n&&(0/* default */,C.jsx)(y.A,{isAdmin:!0,isOnline:le,conferenceData:b/* conferenceData */.p,control:ee,register:te,errors:ae,getValues:ie,setValue:se,watch:oe,trigger:re,sessions:G}),"accommodation"===n&&(0/* default */,C.jsx)(k.A,{isAdmin:!0,isOnline:le,isEarlyBird:1===Q?.participant.is_early_bird||"1"===Q?.participant.is_early_bird,conferenceData:b/* conferenceData */.p,control:ee,register:te,errors:ae,paymentMethods:H,setValue:se,registrationTypes:Y,trigger:re}),"extras"===n&&!le&&(0/* default */,C.jsx)(N.A,{isAdmin:!0,conferenceData:b/* conferenceData */.p,register:te,errors:ae,getValues:ie,setValue:se,trigger:re,watch:oe,control:ee}),"comments"===n&&(0,C.jsx)("div",{className:s()(a,"mx-auto"),children:(0/* default */,C.jsx)(A.A,{isAdmin:!0,isOnline:le,register:te,errors:ae,setValue:se,trigger:re})}),(0,C.jsxs)("div",{className:s()(a,"mx-auto","summary"===n&&ue?"visible":"invisible h-0 w-0 overflow-hidden"),children:[(0,C.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,C.jsxs)("div",{children:[(0,C.jsxs)("strong",{children:[Q?.participant?.first_name?Q.participant.first_name.charAt(0).toUpperCase()+Q.participant.first_name.slice(1):""," ",Q?.participant?.last_name||""]})," ","1"===Q.participant.confirmation_sent?(0,C.jsxs)(C.Fragment,{children:["has been confirmed on ",(0,C.jsx)("span",{className:"text-success",children:Q.participant.confirmation_date&&(0,L/* formatFullDate */.Lu)(Q.participant.confirmation_date)})]}):(0,C.jsx)(C.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==Q.participant.confirmation_sent&&(0,C.jsx)("div",{children:(0/* Link */,C.jsx)(_.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${le?"online":"onsite"}/payment/${t}`,children:"Go to Payments to confirm"})})]}),(0/* default */,C.jsx)(S.A,{isAdmin:!0,isOnline:le,isEarlyBird:1===Q?.participant.is_early_bird||"1"===Q?.participant.is_early_bird,conferenceData:b/* conferenceData */.p,getValues:ie,setValue:se,setTotal:T,setPaypalFee:W,workshops:B,registrationTypes:Y,paymentMethods:H,watch:oe})]}),"admin_notes"===n&&(0,C.jsxs)("div",{className:s()(a,"mx-auto mb-3"),children:[(0,C.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,C.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...te("admin_notes")}),ae.admin_notes&&(0,C.jsx)("div",{className:"text-danger mt-1",children:ae.admin_notes.message})]}),(0,C.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,C.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:$,children:$?"Saving...":"Save Changes"})})]})]})]})};
/* harmony default export */}
/***/}]);