"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[6577],{
/***/1162:
/***/(e,t,n)=>{
// ESM COMPAT FLAG
n.r(t),
// EXPORTS
n.d(t,{default:()=>/* binding */$});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=n(6942),i=n.n(a);// ./src/admin/pages/participants/single/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__mxW--Ve0tI";
// EXTERNAL MODULE: ./src/styles/components/tabs.module.scss
var r=n(4178),o=n(1083),l=n(7647),c=n(6645),d=n(6540),m=n(2199),u=n(7767),p=n(9785),h=n(7762),x=n(4493),b=n(4972),f=n(4976),g=n(847),_=n(3975),w=n(9156),y=n(8299),v=n(5680),j=n(6538),N=n(5058),k=n(6827),A=n(4668),C=n(5846),S=n(4848);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/pages/participants/single/index.js
const $=({isCurOnline:e=!1})=>{const{participantId:t,tab:n}=(0,u/* useParams */.g)(),[a,$]=(0,d.useState)(""),[D,M]=(0,d.useState)(!1),[L,T]=(0,d.useState)(null),[E,I]=(0,d.useState)(!1),[O,P]=(0,d.useState)(0),[V,F]=(0,d.useState)(0),[U,z]=(0,d.useState)(!1),W=n||"identity",Z=(0,u/* useNavigate */.Zp)();(0,m/* useBlockNavigation */.V)(E);const{workshops:q,paymentMethods:R,registrationTypes:B,loading:Y,sessions:H,error:G}=(0,x/* useApiSpecificData */.Q)(),{participant:J,loading:Q,error:X}=(0,b/* useApiParticipant */.D)(t,e,U,!0),{control:K,register:ee,handleSubmit:te,getValues:ne,setValue:ae,formState:{errors:ie},trigger:se,watch:re}=(0,p/* useForm */.mN)(),oe="1"===J?.participant?.is_online,le=Y||Q||D,ce=[a,X,G].filter(Boolean);
// Paypal fess
// Paypal fess
(0,d.useEffect)((()=>{F(V)}),[V]),
// Detect form changes
// Detect form changes
(0,d.useEffect)((()=>{const e=re((()=>{I(!0)}));return()=>e.unsubscribe()}),[re]),(0,d.useEffect)((()=>{const e=Number.isInteger(Number(t))&&Number(t)>0;!n&&e&&Z(`/admin/participants/onsite/edit/${t}/summary`,{replace:!0})}),[n,t,Z]),(0,d.useEffect)((()=>{if(!J||0===H.length)return;
// Extract participant data safely
const{participant:e,workshops:t,arrival:n,contributions:a,accommodation:i,extra_options:s}=J||{},{dob:r,...o}=e||{};
// Handle Date of Birth
if(r){const[e,t,n]=r.split("-");ae("dobDay",String(Number(n))),ae("dobMonth",String(Number(t))),ae("dobYear",e)}
// Set other participant details safely
// Handle Workshops
if(o&&Object.entries(o).forEach((([e,t])=>{null!=t&&ae(e,t)})),
// On the "participants" list
void 0!==e.can_be_public&&ae("can_be_public",Boolean(Number(e.can_be_public))),t&&Array.isArray(t)){const e=t.map((e=>String(e.id)));ae("workshops",e)}
// Handle Arrival Details safely
// Handle Contributions (Talks & Posters)
if(n&&Object.entries(n).forEach((([e,t])=>{null!=t&&ae(e,e.includes("hour")||e.includes("minute")?String(t).padStart(2,"0"):t)})),a&&Array.isArray(a)&&H.length>0){const e=a.filter((e=>"talk"===e.type)).map((e=>({...e}))),t=a.filter((e=>"poster"===e.type)).map((e=>({...e})));
// Set values in form so they persist on submit
ae("talks",e),ae("posters",t),
// Set wantsToContribute if at least one talk or poster exists
(e.length>0||t.length>0)&&ae("wantsToContribute","yes")}
// Handle Accommodation
i?.registration_type_id&&ae("registration_type_id",String(i.registration_type_id)),
// Handle Extra Options safely
s&&(ae("excursion","0"===s.excursion?"false":"true"),ae("buy_tshirt","0"===s.buy_tshirt?"false":"true"),ae("tshirt_size",s.tshirt_size||""))}),[J,H,ae]);const de=[{url:"/admin/participants/"+(oe?"online":"onsite"),name:oe?"Online Participants":"On-site Participants"},{url:`/admin/participants/${oe?"online":"onsite"}/${t}/${W}`,name:`${J?.participant?.first_name?J.participant.first_name.charAt(0).toUpperCase()+J.participant.first_name.slice(1):"Participant"} \n        ${J?.participant?.last_name||""} - \n        ${W.charAt(0).toUpperCase()+W.slice(1)}`}],me=J&&R.length>0&&q.length>0&&B.length>0,ue=!!J?.participant?.admin_notes;
return(0/* default */,S.jsxs)(l.A,{breadcrumb:de,isMaxWidth:!0,children:[(0,S.jsxs)("div",{className:"position-relative fw-bolder",children:[le&&(0/* default */,S.jsx)(c.A,{}),ce.length>0&&(0,S.jsx)("div",{className:"alert alert-danger fw-bolder",children:(0,S.jsx)("ul",{className:"mb-0",children:ce.map(((e,t)=>(0,S.jsx)("li",{children:e},t)))})}),L&&!le&&(0,S.jsx)("div",{className:"alert alert-success",children:L})]}),J&&me&&!le&&(0,S.jsxs)("form",{onSubmit:te((async e=>{M(!0),$(null),T(null);// Triggers validation on all fields
if(!await se())return M(!1),void $("Please fill in all required fields.");e.talks=ne("talks")||[],e.posters=ne("posters")||[];const n={...e,total_due:O,paypal_fee:V};try{const e=await o/* default */.A.post(`https://imc2025.imo.net/php/admin/api/update_${oe?"online":"onsite"}_participant.php?id=${t}`,n,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");z((e=>!e)),T("Participant updated successfully!")}catch(e){$(e.message)}finally{M(!1)}})),children:[(0,S.jsx)("ul",{className:i()("nav nav-tabs mb-3 mt-2",r/* default */.A.tab,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},{key:"workshops",label:"Workshops"},...oe?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...oe?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...oe?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((({key:e,label:n})=>(0,S.jsx)("li",{className:"nav-item",children:(0,S.jsx)("a",{className:i()("nav-link",W===e&&r/* default */.A.active),href:`/admin/participants/onsite/edit/${t}/${e}`,onClick:n=>{n.preventDefault(),Z(`/admin/participants/onsite/edit/${t}/${e}`)},children:ue&&"admin_notes"===e?(0,S.jsxs)("span",{className:"position-relative",children:[(0,S.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),n]}):(0,S.jsx)(S.Fragment,{children:n})})},e)))}),(0,S.jsxs)("div",{className:i()("tab-content mx-auto",r/* default */.A.contentMxw),children:["identity"===n&&(0,S.jsxs)(S.Fragment,{children:[(0/* default */,S.jsx)(g.A,{isAdmin:!0,isOnline:oe,register:ee,errors:ie,setValue:ae,trigger:se}),(0/* default */,S.jsx)(y.A,{isAdmin:!0,register:ee,setValue:ae,errors:ie,trigger:se,initialData:J?.participant,watch:re})]}),"workshops"===n&&(0/* default */,S.jsx)(_.A,{isAdmin:!0,isOnline:oe,conferenceData:h/* conferenceData */.p,register:ee,errors:ie,setValue:ae,trigger:se,watch:re,workshops:q}),"arrival"===n&&!oe&&(0/* default */,S.jsx)(w.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ee,errors:ie,setValue:ae,trigger:se}),"contribution"===n&&(0/* default */,S.jsx)(v.A,{isAdmin:!0,isOnline:oe,conferenceData:h/* conferenceData */.p,control:K,register:ee,errors:ie,getValues:ne,setValue:ae,watch:re,trigger:se,sessions:H}),"accommodation"===n&&(0/* default */,S.jsx)(j.A,{isAdmin:!0,isOnline:oe,isEarlyBird:1===J?.participant.is_early_bird||"1"===J?.participant.is_early_bird,conferenceData:h/* conferenceData */.p,control:K,register:ee,errors:ie,paymentMethods:R,setValue:ae,registrationTypes:B,trigger:se}),"extras"===n&&!oe&&(0/* default */,S.jsx)(N.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ee,errors:ie,getValues:ne,setValue:ae,trigger:se,watch:re,control:K}),"comments"===n&&(0,S.jsx)("div",{className:i()(s,"mx-auto"),children:(0/* default */,S.jsx)(k.A,{isAdmin:!0,isOnline:oe,register:ee,errors:ie,setValue:ae,trigger:se})}),(0,S.jsxs)("div",{className:i()(s,"mx-auto","summary"===n&&me?"visible":"invisible h-0 w-0 overflow-hidden"),children:[(0,S.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,S.jsxs)("div",{children:[(0,S.jsxs)("strong",{children:[J?.participant?.first_name?J.participant.first_name.charAt(0).toUpperCase()+J.participant.first_name.slice(1):""," ",J?.participant?.last_name||""]})," ","1"===J.participant.confirmation_sent?(0,S.jsxs)(S.Fragment,{children:["has been confirmed on ",(0,S.jsx)("span",{className:"text-success",children:J.participant.confirmation_date&&(0,C/* formatFullDate */.Lu)(J.participant.confirmation_date)})]}):(0,S.jsx)(S.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==J.participant.confirmation_sent&&(0,S.jsx)("div",{children:(0/* Link */,S.jsx)(f.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${oe?"online":"onsite"}/payment/${t}`,children:"Go to Payments to confirm"})})]}),(0/* default */,S.jsx)(A.A,{isAdmin:!0,isOnline:oe,isEarlyBird:1===J?.participant.is_early_bird||"1"===J?.participant.is_early_bird,conferenceData:h/* conferenceData */.p,getValues:ne,setValue:ae,setTotal:P,setPaypalFee:F,workshops:q,registrationTypes:B,paymentMethods:R,watch:re})]}),"admin_notes"===n&&(0,S.jsxs)("div",{className:i()(s,"mx-auto mb-3"),children:[(0,S.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,S.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...ee("admin_notes")}),ie.admin_notes&&(0,S.jsx)("div",{className:"text-danger mt-1",children:ie.admin_notes.message})]}),(0,S.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,S.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:D,children:D?"Saving...":"Save Changes"})})]})]})]})};
/* harmony default export */}
/***/,
/***/1280:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */_v:()=>/* binding */a
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const a=e=>{e&&e.stopPropagation()}}
/***/,
/***/2199:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */V:()=>/* binding */s
/* harmony export */});
/* harmony import */var a=n(6540),i=n(7767);
/* harmony import */const s=e=>{const t=(0,i/* .useNavigate */.Zp)(),n=(0,i/* .useLocation */.zy)();(0,a.useEffect)((()=>{const t=t=>{e&&(t.preventDefault(),t.returnValue="You have unsaved changes. Do you really want to leave?")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e]),(0,a.useEffect)((()=>{const a=a=>{if(e){window.confirm("You have unsaved changes. Do you really want to leave?")||(a.preventDefault(),t(n.pathname,{replace:!0}))}};return window.addEventListener("popstate",a),()=>{window.removeEventListener("popstate",a)}}),[e,t,n.pathname])};
/***/},
/***/3318:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */a
/* harmony export */});const a=(e,{interval:t=100,retries:n=14}={})=>new Promise(((i,s)=>{e().then(i).catch((r=>{setTimeout((()=>{n?a(e,{interval:1.5*t,retries:n-1}).then(i,s):s(r)}),t)}))}));
/***/},
/***/3464:
/***/(e,t,n)=>{e.exports=n.p+"702c5653d2360537e78f.svg";
/***/},
/***/4178:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */A:()=>a
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const a={root:"tabs-module__root--Gb7PE","is-admin":"tabs-module__is-admin--ysiPF",tab:"tabs-module__tab--ed4Qs",active:"tabs-module__active--frwOf",contentMxw:"tabs-module__contentMxw--q4nV3"};
/***/},
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */c
/* harmony export */,Lu:()=>/* binding */l
/* harmony export */,p6:()=>/* binding */o
/* harmony export */});
// ---- Utilities ----
const a=e=>{const t=Number(e);if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},i=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,a]=e.split("-").map(Number);return new Date(Date.UTC(t,n-1,a))}
// Try ISO; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t))return t;const n=new Date(e.replace(" ","T"));if(!Number.isNaN(n))return n}return new Date(NaN)},s=e=>e instanceof Date&&!Number.isNaN(e)
// Get parts safely, defaulting to UTC for consistency with pure dates
,r=(e,{locale:t="en-US",timeZone:n="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:n}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:n}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:n}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:n}).format(e))}),o=(e,t,{locale:n="en-US",timeZone:o="UTC"}={})=>{const l=i(e),c=i(t);if(!s(l)||!s(c))return"";const d=r(l,{locale:n,timeZone:o}),m=r(c,{locale:n,timeZone:o});return d.monthName===m.monthName&&l.getUTCFullYear()===c.getUTCFullYear()?`${d.monthName} ${d.day}${a(d.day)} - ${m.day}${a(m.day)}`:`${d.monthName} ${d.day}${a(d.day)} - ${m.monthName} ${m.day}${a(m.day)}`;
// Different months (or years)
},l=(e,t=!0,n=!1,o={})=>((e,t=!1,n=!0,o=!1,{locale:l="en-US",timeZone:c="UTC"}={})=>{const d=i(e);if(!s(d))return"";// or return a fallback like "—"
const{day:m,monthName:u,weekday:p,year:h}=r(d,{locale:l,timeZone:c});return`${t?`${p}, `:""}${m}${a(m)}${n?` ${u}`:""}${o?` ${h}`:""}`})(e,!0,t,n,o),c=(e,t,n=!0,a=!0,{locale:r="en-US",timeZone:o="UTC"}={})=>{const c=i(e);if(!s(c))return"";const d=(m=c,u=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(u))));var m,u;return l(d,n,a,{locale:r,timeZone:o})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const a="index-module__pageContain--r6_E2",i="index-module__titleWrap--hrdlj",s="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var r=n(6942),o=n.n(r),l=n(3464);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",g="index-module__menu--veCcg",_="index-module__active--EYt3Y",w="index-module__footer--O9Npd",y="index-module__menuItem--eqnJw",v="index-module__menuItemTitle--O6gep",j="index-module__active--Hl_ax",N="index-module__caret--U_US2",k="index-module__rotate--pnUGY",A="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var C=n(6540),S=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const $=C.forwardRef((({children:e,className:t,goTo:n=null,isLinkActive:a,title:i,url:s=null},r)=>{const[l,c]=(0,C.useState)(a),[d,m]=(0,C.useState)("0px"),u=(0,C.useRef)(null);(0,C.useEffect)((()=>{e&&m(l?`${u.current.scrollHeight}px`:"0px")}),[e,l,u]);const p=e=>(0,S.jsx)("div",{className:o()(e.className,l&&k),children:(0,S.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,S.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,S.jsxs)("div",{className:o()(y,"d-flex flex-column",t),ref:r,children:[(0,S.jsxs)("a",{className:o()(v,"d-flex justify-content-between w-100 align-items-center px-3",a&&j),href:s||void 0,onClick:t=>{t.preventDefault(),e?c(!l):n&&s&&n(s)},children:[(0,S.jsx)("span",{className:"d-flex align-items-center",children:(0,S.jsx)("b",{children:i})}),e&&(0,S.jsx)(p,{className:N})]}),e&&(0,S.jsx)("div",{className:A,ref:u,style:e&&{maxHeight:`${d}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var D=n(8983),M=n(1448),L=n(8321),T=n(7767),E=n(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const I=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var O=n(1280),P=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const V=parseInt(u,10)||250,F=({cd:e})=>{const[t,n]=(0,C.useState)(!1),[a,i]=(0,C.useState)(!0),s=(0,M/* useDispatch */.wA)(),r=(0,T/* useLocation */.zy)(),l=(0,T/* useNavigate */.Zp)(),c=(0/* authSelectors */,M/* useSelector */.d4)(D.Pg.isAdmin),d=(0/* authSelectors */,M/* useSelector */.d4)(D.Pg.isLoc),u=(0/* authSelectors */,M/* useSelector */.d4)(D.Pg.isSoc),[y,v]=(0,L.useSpring)((()=>({right:-V,config:{tension:350,friction:30}})));(0,C.useEffect)((()=>(t?(i(!1),v.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(v.start({right:-V,onRest:()=>i(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,v]),(0,C.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const j=()=>{n((e=>!e))},N=e=>{l(e),j()};
return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{className:p,onClick:j,children:(0/* SlMenu */,S.jsx)(m.RAm,{className:x})}),!a&&(0,S.jsx)("div",{className:o()(f),onClick:j,onMouseDown:O/* onStopPropagation */._v,onTouchStart:O/* onStopPropagation */._v}),(0,S.jsx)(L.animated.div,{className:o()(b),style:y,children:(0,S.jsxs)("div",{className:o()(g,"d-flex flex-column h-100"),children:[(0,S.jsx)("button",{className:h,onClick:j,children:(0/* SlClose */,S.jsx)(m.ipV,{className:x})}),(0,S.jsxs)("div",{className:"mb-3",children:[(0,S.jsxs)("div",{className:"m-3 text-center",children:[(0,S.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,S.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),I.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,S.jsx)($,{className:"py-2",isLinkActive:t,goTo:N,title:e.title,url:e.link,children:e.subLinks&&(0,S.jsx)(S.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc"))).map((e=>{const t=r.pathname===e.link;
return(0/* Link */,S.jsx)(E.N_,{"aria-label":e.title,onClick:j,to:e.link,className:o()(t&&_),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,S.jsx)("div",{className:o()(w,"mt-auto"),children:(0,S.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,S.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>N("/"),title:"Public site",children:"Public site"}),(0,S.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await P/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),s(D/* authActions */.I2.logout()),localStorage.removeItem("session"),l("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var U=n(7762);// ./src/admin/components/header/index.js
const z=()=>{const e=`${U/* conferenceData */.p.name} ${U/* conferenceData */.p.year}`,t=(0/* authSelectors */,M/* useSelector */.d4)(D.Pg.isLoc),n=(0/* authSelectors */,M/* useSelector */.d4)(D.Pg.isSoc),a=t?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,S.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,S.jsx)(F,{cd:U/* conferenceData */.p}),(0,S.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,S.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,S.jsxs)(E.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:a,title:"Admin",children:[(0,S.jsx)("img",{src:l,alt:e,className:"rounded-circle border border-2 p-1"}),(0,S.jsxs)("div",{className:"d-flex flex-column",children:[(0,S.jsxs)("h1",{className:"m-0 fw-bolder",children:[U/* conferenceData */.p.name," ",U/* conferenceData */.p.year]}),(0,S.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var W=n(5902),Z=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const q="breadcrumb-module__nav--atkeN",R=({links:e=[]})=>(0/* authSelectors */,M/* useSelector */.d4)(D.Pg.isAdmin)?(0,S.jsx)("nav",{"aria-label":"breadcrumb",className:q,children:(0,S.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,S.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,S.jsx)(E.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,S.jsx)(Z.M14,{className:"me-1"})})}),e.map(((t,n)=>(0,S.jsx)("li",{className:o()("breadcrumb-item",{active:n===e.length-1}),"aria-current":n===e.length-1?"page":void 0,children:n===e.length-1?(0,S.jsx)("b",{children:t.name}):(0/* Link */,S.jsx)(E.N_,{to:t.url,children:t.name})},n)))]})}):null,B=({breadcrumb:e=[],title:t="",rightContent:n,children:r,isMaxWidth:l=!0})=>{const c=t?`${t} | ${U/* conferenceData */.p.name_display} ${U/* conferenceData */.p.year}`:`${U/* conferenceData */.p.name_display} ${U/* conferenceData */.p.year}`;
return(0,S.jsxs)(S.Fragment,{children:[(0/* Helmet */,S.jsxs)(W.mg,{children:[(0,S.jsx)("title",{children:c}),(0,S.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,S.jsxs)("div",{className:o()(a,"position-relative"),children:[(0,S.jsx)(z,{}),(0,S.jsxs)("div",{className:"d-flex flex-row",children:[(0,S.jsx)(F,{cd:U/* conferenceData */.p}),(0,S.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${s} mx-md-auto`]:l}),children:[0!==e.length&&(0,S.jsx)(R,{links:e}),(!!t||!!n)&&(0,S.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",i),children:[t&&(0,S.jsx)("h2",{children:t}),n&&(0,S.jsx)("div",{children:n})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */a});// ./src/data/conference-data.json
const a=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-17","end":"2025-09-20"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-08-09","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);