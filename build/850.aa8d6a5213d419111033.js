"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[850],{
/***/850:
/***/(e,t,n)=>{
// ESM COMPAT FLAG
n.r(t),
// EXPORTS
n.d(t,{default:()=>/* binding */f});// ./src/admin/pages/dashboard/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__col--zaURh";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var i=n(6942),a=n.n(i),r=n(6540),o=n(1083),l=n(3318),d=n(7647),c=n(6645),m=n(5846),h=n(4976),u=n(1299),p=n(4848);// ./src/admin/pages/dashboard/index.js
const x=()=>{const e=["I hope you're doing great today!","rise and shine!","you're awesome, keep it up!","wishing you a fantastic day!","hope you're feeling amazing!","you're doing an incredible job!","très bonne journée à toi :)","the IMO is lucky to have you!","your kindness makes the IMC a better place!","jouw vriendelijkheid maakt de IMC een betere plek!","your kindness makes the IMC a better place!","the IMO is lucky to have you!","de IMO heeft geluk met jou!","you're doing an incredible job!","je doet ongelooflijk goed werk!","thanks for everything you do for the IMC!","your energy makes a real difference!","keep shining — the IMC needs people like you!","so grateful to have you on the team!","you’re making IMC special!","the meteor community appreciates you!","merci pour ton engagement pour l’IMC !","l'IMO te remercie !","IMC wouldn’t be the same without you!","keep up the amazing work — we see you!","sending you good vibes and clear skies!","clear skies and good energy today!","jij maakt het verschil!"];return`Hey Marc, ${e[Math.floor(Math.random()*e.length)]}`},f=()=>{const[e,t]=(0,r.useState)(null),[n,i]=(0,r.useState)(!0),[f,b]=(0,r.useState)("");return(0,r.useEffect)((()=>{(async()=>{try{const e=await(0,l/* retry */.L)((()=>o/* default */.A.get("https://imc2026.imo.net/php/admin/api/get_dashboard_data.php")));if(!e.data.success)throw new Error(e.data.message||"Failed to fetch dashboard data.");t(e.data.data)}catch(e){b(e.message)}finally{i(!1)}})()}),[]),n?(0/* default */,p.jsx)(c.A,{text:"Loading dashboard data..."}):f?(0/* default */,p.jsx)(d.A,{title:"Admin Dashboard",children:(0,p.jsx)("p",{className:"text-danger",children:f})}):(0/* default */,p.jsxs)(d.A,{isMxWidth:!0,children:[(0,p.jsx)("h3",{children:x()}),(0,p.jsx)("p",{className:"mb-4",children:"Here is a quick summary of what's going on here:"}),(0/* default */,p.jsx)(u.A,{className:"mb-4",showLink:!0}),(0,p.jsxs)("div",{className:"d-flex flex-column flex-md-row  gap-3 w-100",children:[(0,p.jsxs)("div",{className:a()("flex-grow-1 flex-shrink-0 border p-3 rounded-2 position-relative",s),children:[(0,p.jsx)("h5",{className:"fw-bold",children:(0/* Link */,p.jsx)(h.N_,{to:"/admin/participants/onsite",children:"On-site Participants"})}),(0,p.jsxs)("div",{className:"position-absolute border rounded-3 border-3 top-0 end-0 m-2 p-2",children:["✅  ",(0,p.jsxs)("b",{className:"text-success",children:[e.confirmed_onsite," "]}),"/ ",parseFloat(e.unconfirmed_onsite)+parseFloat(e.confirmed_onsite)]}),(0,p.jsxs)("div",{className:"mt-4",children:[(0,p.jsx)("h6",{children:"Unconfirmed On-site Participants"}),e.onsite_unconfirmed.length>0?(0,p.jsx)("div",{className:"table-responsive",children:(0,p.jsxs)("table",{className:"table table-striped",children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"ID"}),(0,p.jsx)("th",{children:"Name"}),(0,p.jsx)("th",{children:"Confirmed"}),(0,p.jsx)("th",{children:"Email sent"}),(0,p.jsx)("td",{})]})}),(0,p.jsx)("tbody",{children:e.onsite_unconfirmed.map((e=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:e.id}),(0,p.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,p.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,p.jsx)("td",{className:a()(e?.confirmation_date&&"text-success"),children:e.confirmation_date?(0,m/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),(0,p.jsx)("td",{children:(0,p.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:[(0,p.jsx)("a",{href:`/admin/participants/onsite/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,p.jsx)("a",{href:`/admin/participants/online/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"})]})})]},e.id)))})]})}):(0,p.jsx)("p",{className:"text-success",children:(0,p.jsx)("i",{children:"No unconfirmed on-site participants"})})]})]}),(0,p.jsxs)("div",{className:a()("flex-grow-1 flex-shrink-0 border p-3 rounded-2 position-relative",s),children:[(0,p.jsx)("h5",{className:"fw-bold",children:(0/* Link */,p.jsx)(h.N_,{to:"/admin/participants/online",children:"Online Participants"})}),(0,p.jsxs)("div",{className:"position-absolute border rounded-3 border-3 top-0 end-0 m-2 p-2",children:["✅  ",(0,p.jsxs)("b",{className:"text-success",children:[e.confirmed_online," "]}),"/ ",parseFloat(e.unconfirmed_online)+parseFloat(e.confirmed_online)]}),(0,p.jsxs)("div",{className:"mt-4",children:[(0,p.jsx)("h6",{children:"Unconfirmed Online Participants"}),e.online_unconfirmed.length>0?(0,p.jsx)("div",{className:"table-responsive",children:(0,p.jsxs)("table",{className:"table table-striped",children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"ID"}),(0,p.jsx)("th",{children:"Name"}),(0,p.jsx)("th",{children:"Confirmed"}),(0,p.jsx)("th",{children:"Email sent"}),(0,p.jsx)("th",{})]})}),(0,p.jsx)("tbody",{children:e.online_unconfirmed.map((e=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:e.id}),(0,p.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,p.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,p.jsx)("td",{className:a()(e?.confirmation_date&&"text-success"),children:e.confirmation_date?(0,m/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),(0,p.jsx)("td",{children:(0,p.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:[(0,p.jsx)("a",{href:`/admin/participants/onsite/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,p.jsx)("a",{href:`/admin/participants/online/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"})]})})]},e.id)))})]})}):(0,p.jsx)("p",{className:"text-success",children:(0,p.jsx)("i",{children:"No unconfirmed online participants"})})]})]})]}),(0,p.jsxs)("div",{className:a()("mt-4 border p-3 rounded-2",s),children:[(0,p.jsx)("h5",{children:"Workshop Attendance"}),e.workshop_stats.length>0?(0,p.jsx)("div",{className:"table-responsive",children:(0,p.jsxs)("table",{className:"table table-bordered",children:[(0,p.jsxs)("thead",{children:[(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{rowSpan:"2",children:"Workshop"}),(0,p.jsx)("th",{colSpan:"2",className:"text-center",children:"Online Participants"}),(0,p.jsx)("th",{colSpan:"2",className:"text-center",children:"Onsite Participants"})]}),(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Confirmed"}),(0,p.jsx)("th",{children:"Unconfirmed"}),(0,p.jsx)("th",{children:"Confirmed"}),(0,p.jsx)("th",{children:"Unconfirmed"})]})]}),(0,p.jsx)("tbody",{children:e.workshop_stats.map(((e,t)=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{className:"fw-bolder",children:(0/* Link */,p.jsx)(h.N_,{to:"/admin/participants/workshops/"+(e.workshop_title.toLowerCase().includes("radio")?"radio":"spectro"),children:e.workshop_title})}),(0,p.jsx)("td",{className:"text-success fw-bolder",children:e.confirmed_online_participants}),(0,p.jsx)("td",{className:"text-danger",children:e.unconfirmed_online_participants}),(0,p.jsx)("td",{className:"text-success fw-bolder",children:e.confirmed_onsite_participants}),(0,p.jsx)("td",{className:"text-danger",children:e.unconfirmed_onsite_participants})]},t)))})]})}):(0,p.jsx)("p",{children:(0,p.jsx)("i",{children:"No workshop data available."})})]})]})}}
/***/,
/***/1280:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */_v:()=>/* binding */s
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const s=e=>{e&&e.stopPropagation()}}
/***/,
/***/1299:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */u});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=n(6942),i=n.n(s),a=n(6540),r=n(6645),o=n(4976),l=n(1083),d=n(3318);// ./src/admin/api/accomodations/index.js
const c=()=>{const[e,t]=(0,a.useState)([]),[n,s]=(0,a.useState)(!1),[i,r]=(0,a.useState)(null),o=(0,a.useCallback)((async()=>{s(!0),r(null);try{const e=await(async()=>{const e=await(0,d/* retry */.L)((()=>l/* default */.A.get("https://imc2026.imo.net/php/api/get_left_accommodations.php")));if(!e?.data?.success)throw new Error(e?.data?.message||"Error fetching available rooms.");return e.data.data||[]})();t(e)}catch(e){r(e.message||"Error fetching available rooms.")}finally{s(!1)}}),[]);return(0,a.useEffect)((()=>{o()}),[o]),{availableRooms:e,loading:n,error:i,refetchAvailableRooms:o}};
// EXTERNAL MODULE: ./src/utils/registration-type-display.js
var m=n(5943),h=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/rooms/index.js
const u=({className:e,showLink:t=!1})=>{const{availableRooms:n,loading:s,error:l}=c();if(l)
return(0,h.jsxs)("div",{className:"text-danger",children:["Error: ",l]});const d=(0,a.useMemo)((()=>(Array.isArray(n)?n:[]).filter((e=>"no"!==(e?.type||e?.registration_type))).map((e=>{const t=e?.id??e?.registration_type_id??null,n=(e?.type??e?.registration_type??"").toString(),s=e?.room_left??e?.available_rooms??0,i=e?.total??e?.total_rooms??null,a=e?.used??null;return{id:t,type:n,roomLeft:Number(s)||0,total:null===i?null:Number(i)||0,used:null===a?null:Number(a)||0}}))),[n]);
return(0,h.jsxs)("div",{className:i()(e,"position-relative",t&&" border rounded-2 p-3 "),children:[s&&(0/* default */,h.jsx)(r.A,{}),t&&(0,h.jsx)("h5",{children:(0/* Link */,h.jsx)(o.N_,{to:"/admin/accomodations",children:"Available Rooms by Type"})}),!s&&(0,h.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:d.map((e=>{const t=e.type?(0,m/* formatRegistrationTypeTitle */.t)(e.type):"Unknown",n=e.roomLeft<=0,{main:s,sub:a}=(e=>
// Prefer the new live fields
null!==e.total?{main:`${e.roomLeft} left`,sub:` / ${e.total}`}:{main:`${e.roomLeft} left`,sub:""})(e);
return(0,h.jsxs)("div",{className:i()("p-3 border rounded-2",{"text-danger":n}),children:[t,":",(0,h.jsxs)("strong",{children:[" ",s]}),a&&(0,h.jsx)("small",{className:"text-muted",children:a})]},e.id??e.type)}))})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=(e,{interval:t=1e3,retries:n=6}={})=>new Promise(((i,a)=>{e().then(i).catch((r=>{setTimeout((()=>{n?s(e,{interval:1.5*t,retries:n-1}).then(i,a):a(r)}),t)}))}));
/***/},
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */c
/* harmony export */,Lu:()=>/* binding */d
/* harmony export */,p6:()=>/* binding */l
/* harmony export */});
// ---- Utilities ----
const s=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},i=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,s]=e.split("-").map(Number);return new Date(Date.UTC(t,n-1,s))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const n=new Date(e.replace(" ","T"));if(!Number.isNaN(n.getTime()))return n}return new Date(NaN)},a=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,r=(e,{locale:t="en-US",timeZone:n="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:n}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:n}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:n}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:n}).format(e))}),o=e=>{const[t,n,s]=String(e).split("-").map(Number);return new Date(Date.UTC(t,n-1,s))},l=(e,t,{locale:n="en-US",timeZone:i="UTC"}={})=>{const l=o(e),d=o(t);if(!a(l)||!a(d))return"";const c=r(l,{locale:n,timeZone:i}),m=r(d,{locale:n,timeZone:i});if(c.monthName===m.monthName&&l.getUTCFullYear()===d.getUTCFullYear())return`${c.monthName} ${c.day}${s(c.day)} - ${m.day}${s(m.day)}`;
// Different month and/or year
return`${`${c.monthName} ${c.day}${s(c.day)}${l.getUTCFullYear()!==d.getUTCFullYear()?` ${c.year}`:""}`} - ${`${m.monthName} ${m.day}${s(m.day)} ${m.year}`}`},d=(e,t=!0,n=!1,o={})=>((e,t=!1,n=!0,o=!1,{locale:l="en-US",timeZone:d="UTC"}={})=>{const c=i(e);if(!a(c))return"";// safe fallback
const{day:m,monthName:h,weekday:u,year:p}=r(c,{locale:l,timeZone:d});return`${t?`${u}, `:""}${m}${s(m)}${n?` ${h}`:""}${o?` ${p}`:""}`})(e,!0,t,n,o),c=(e,t,n=!0,s=!0,{locale:r="en-US",timeZone:o="UTC"}={})=>{const l=i(e);if(!a(l))return"";const c=(m=l,h=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(h))));var m,h;return d(c,n,s,{locale:r,timeZone:o})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/5943:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */m:()=>/* binding */s
/* harmony export */,t:()=>/* binding */i
/* harmony export */});
/**
 * Turn DB slug (e.g. single_reduced_mobility) into readable text: underscores → spaces.
 * Does not change semantics for comparisons (still use raw `type` with toLowerCase() === "no", etc.).
 */
const s=e=>null==e||""===e?"":String(e).replace(/_/g," "),i=e=>{const t=s(e);return t?t.charAt(0).toUpperCase()+t.slice(1):""};
/** Same as {@link formatRegistrationTypeForDisplay} with the first character uppercased (list labels, emails). */}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */Y});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__pageContain--r6_E2",i="index-module__titleWrap--hrdlj",a="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var r=n(6942),o=n.n(r),l=n(8075);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const d="index-module__header--RVFFD",c="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const h="300px",u="index-module__menuBtn--iHux0",p="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",f="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",j="index-module__menu--veCcg",g="index-module__active--EYt3Y",N="index-module__footer--O9Npd",w="index-module__menuItem--eqnJw",_="index-module__menuItemTitle--O6gep",y="index-module__active--Hl_ax",v="index-module__caret--U_US2",k="index-module__rotate--pnUGY",C="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var M=n(6540),L=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const $=M.forwardRef((({children:e,className:t,goTo:n=null,isLinkActive:s,title:i,url:a=null},r)=>{const[l,d]=(0,M.useState)(s),[c,m]=(0,M.useState)("0px"),h=(0,M.useRef)(null);(0,M.useEffect)((()=>{e&&m(l?`${h.current.scrollHeight}px`:"0px")}),[e,l,h]);const u=e=>(0,L.jsx)("div",{className:o()(e.className,l&&k),children:(0,L.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,L.jsxs)("div",{className:o()(w,"d-flex flex-column",t),ref:r,children:[(0,L.jsxs)("a",{className:o()(_,"d-flex justify-content-between w-100 align-items-center px-3",s&&y),href:a||void 0,onClick:t=>{t.preventDefault(),e?d(!l):n&&a&&n(a)},children:[(0,L.jsx)("span",{className:"d-flex align-items-center",children:(0,L.jsx)("b",{children:i})}),e&&(0,L.jsx)(u,{className:v})]}),e&&(0,L.jsx)("div",{className:C,ref:h,style:e&&{maxHeight:`${c}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var I=n(8983),A=n(1448),S=n(8321),T=n(7767),D=n(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const U=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var O=n(1280),P=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const F=parseInt(h,10)||250,E=({cd:e})=>{const[t,n]=(0,M.useState)(!1),[s,i]=(0,M.useState)(!0),a=(0,A/* useDispatch */.wA)(),r=(0,T/* useLocation */.zy)(),l=(0,T/* useNavigate */.Zp)(),d=(0/* authSelectors */,A/* useSelector */.d4)(I.Pg.isAdmin),c=(0/* authSelectors */,A/* useSelector */.d4)(I.Pg.isLoc),h=(0/* authSelectors */,A/* useSelector */.d4)(I.Pg.isSoc),[w,_]=(0,S.useSpring)((()=>({right:-F,config:{tension:350,friction:30}})));(0,M.useEffect)((()=>(t?(i(!1),_.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(_.start({right:-F,onRest:()=>i(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,_]),(0,M.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const y=()=>{n((e=>!e))},v=e=>{l(e),y()};
return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{className:u,onClick:y,children:(0/* SlMenu */,L.jsx)(m.RAm,{className:x})}),!s&&(0,L.jsx)("div",{className:o()(b),onClick:y,onMouseDown:O/* onStopPropagation */._v,onTouchStart:O/* onStopPropagation */._v}),(0,L.jsx)(S.animated.div,{className:o()(f),style:w,children:(0,L.jsxs)("div",{className:o()(j,"d-flex flex-column h-100"),children:[(0,L.jsx)("button",{className:p,onClick:y,children:(0/* SlClose */,L.jsx)(m.ipV,{className:x})}),(0,L.jsxs)("div",{className:"mb-3",children:[(0,L.jsxs)("div",{className:"m-3 text-center",children:[(0,L.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,L.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),U.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));return d||c&&e?.allowed?.includes("loc")||h&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,L.jsx)($,{className:"py-2",isLinkActive:t,goTo:v,title:e.title,url:e.link,children:e.subLinks&&(0,L.jsx)(L.Fragment,{children:e.subLinks.filter((e=>d||c&&e?.allowed?.includes("loc")||h&&e?.allowed?.includes("soc"))).map((e=>{const t=r.pathname===e.link;
return(0/* Link */,L.jsx)(D.N_,{"aria-label":e.title,onClick:y,to:e.link,className:o()(t&&g),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,L.jsx)("div",{className:o()(N,"mt-auto"),children:(0,L.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,L.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>v("/"),title:"Public site",children:"Public site"}),(0,L.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await P/* default */.A.get("https://imc2026.imo.net/php/auth/logout.php",{withCredentials:!0}),a(I/* authActions */.I2.logout()),localStorage.removeItem("session"),l("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var z=n(7762);// ./src/admin/components/header/index.js
const R=()=>{const e=`${z/* conferenceData */.p.name} ${z/* conferenceData */.p.year}`,t=(0/* authSelectors */,A/* useSelector */.d4)(I.Pg.isLoc),n=(0/* authSelectors */,A/* useSelector */.d4)(I.Pg.isSoc),s=t?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,L.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,L.jsx)(E,{cd:z/* conferenceData */.p}),(0,L.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,L.jsx)("div",{className:o()(d,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,L.jsxs)(D.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",c),to:s,title:"Admin",children:[(0,L.jsx)("img",{src:l,alt:e,className:"rounded-circle border border-2 p-1"}),(0,L.jsxs)("div",{className:"d-flex flex-column",children:[(0,L.jsxs)("h1",{className:"m-0 fw-bolder",children:[z/* conferenceData */.p.name," ",z/* conferenceData */.p.year]}),(0,L.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var Z=n(5902),W=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const q="breadcrumb-module__nav--atkeN",H=({links:e=[]})=>(0/* authSelectors */,A/* useSelector */.d4)(I.Pg.isAdmin)?(0,L.jsx)("nav",{"aria-label":"breadcrumb",className:q,children:(0,L.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,L.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,L.jsx)(D.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,L.jsx)(W.M14,{className:"me-1"})})}),e.map(((t,n)=>(0,L.jsx)("li",{className:o()("breadcrumb-item",{active:n===e.length-1}),"aria-current":n===e.length-1?"page":void 0,children:n===e.length-1?(0,L.jsx)("b",{children:t.name}):(0/* Link */,L.jsx)(D.N_,{to:t.url,children:t.name})},n)))]})}):null,Y=({breadcrumb:e=[],title:t="",rightContent:n,children:r,isMaxWidth:l=!0})=>{const d=t?`${t} | ${z/* conferenceData */.p.name_display} ${z/* conferenceData */.p.year}`:`${z/* conferenceData */.p.name_display} ${z/* conferenceData */.p.year}`;
return(0,L.jsxs)(L.Fragment,{children:[(0/* Helmet */,L.jsxs)(Z.mg,{children:[(0,L.jsx)("title",{children:d}),(0,L.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,L.jsxs)("div",{className:o()(s,"position-relative"),children:[(0,L.jsx)(R,{}),(0,L.jsxs)("div",{className:"d-flex flex-row",children:[(0,L.jsx)(E,{cd:z/* conferenceData */.p}),(0,L.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:l}),children:[0!==e.length&&(0,L.jsx)(H,{links:e}),(!!t||!!n)&&(0,L.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",i),children:[t&&(0,L.jsx)("h2",{children:t}),n&&(0,L.jsx)("div",{children:n})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */s});// ./src/data/conference-data.json
const s=JSON.parse('{"year":2026,"num":"45th","welcome":"Bienvenue !","thank_you":"Merci !","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2026-09-24","end":"2026-09-27"},"location":"Barcelonette, France","hotel":"Pôle d\'accueil universitaire Séolane","consulate":"French consulate","deadlines":{"reg":"2026-08-10","paper":"2026-10-31","full_reimbursement_before":"2026-07-01","half_reimbursement_before":"2026-08-10","early_birds":"2026-07-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":280,"description":"Triple room in the IMC host","total":15,"sort_order":1,"type":"triple"},{"price":320,"description":"Double room in the IMC host","total":16,"sort_order":2,"type":"double"},{"price":350,"description":"Single room in the IMC host","total":2,"sort_order":3,"type":"single"},{"price":350,"description":"Single room for a person with reduced mobility in the IMC host","total":1,"sort_order":4,"type":"single_accessible"},{"price":200,"description":"No accommodation","sort_order":5,"type":"no"}],"tshirts":{"models":["men","women"],"sizes":["XS","S","M","L","XL","XXL","XXXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International Meteor Organization","website":"https://imo.net"},{"name":"Vigie-Ciel","website":"https://www.vigie-ciel.org/"}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2026@imo.net","name":"IMC 2026 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2026@imo.net","name":"IMC 2026 Team"}],"with_excursion":false}')}// ./src/data/conference-data.js
/***/,
/***/8075:
/***/(e,t,n)=>{e.exports=n.p+"c62d9ccbbed08dff20f3.svg";
/***/}}]);