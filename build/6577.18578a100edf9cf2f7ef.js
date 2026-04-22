"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[6577],{
/***/1162:
/***/(e,t,n)=>{
// ESM COMPAT FLAG
n.r(t),
// EXPORTS
n.d(t,{default:()=>/* binding */T});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var i=n(6942),a=n.n(i);// ./src/admin/pages/participants/single/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__mxW--Ve0tI";
// EXTERNAL MODULE: ./src/styles/components/tabs.module.scss
var r=n(4178),o=n(1083),l=n(7647),c=n(6645),d=n(6540),m=n(2199),u=n(7767),p=n(9785),h=n(7762),x=n(4493),b=n(4972),f=n(4976),g=n(847),_=n(3975),w=n(9156),y=n(8299),v=n(5680),j=n(6538),N=n(5058),k=n(6827),A=n(4668),$=n(5846),C=n(4355),D=n(4848);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/pages/participants/single/index.js
const S=Array.isArray(h/* conferenceData */.p?.workshops)&&h/* conferenceData */.p.workshops.length>0,T=({isCurOnline:e=!1})=>{const{participantId:t,tab:n}=(0,u/* useParams */.g)(),[i,T]=(0,d.useState)(""),[M,L]=(0,d.useState)(!1),[E,I]=(0,d.useState)(null),[O,P]=(0,d.useState)(!1),[F,V]=(0,d.useState)(0),[U,z]=(0,d.useState)(0),[Z,q]=(0,d.useState)(!1),W=n||"identity",Y=(0,u/* useNavigate */.Zp)();(0,m/* useBlockNavigation */.V)(O);const{workshops:B,paymentMethods:R,registrationTypes:X,loading:H,sessions:G,error:J}=(0,x/* useApiSpecificData */.Q)(),{participant:Q,loading:K,error:ee}=(0,b/* useApiParticipant */.D)(t,e,Z,!0),{control:te,register:ne,handleSubmit:ie,getValues:ae,setValue:se,formState:{errors:re},reset:oe,trigger:le,watch:ce}=(0,p/* useForm */.mN)(),de="1"===Q?.participant?.is_online,me=H||K||M,ue=[i,ee,J].filter(Boolean);
// Detect form changes
// Detect form changes
(0,d.useEffect)((()=>{const e=ce((()=>{P(!0)}));return()=>e.unsubscribe()}),[ce]);const pe=`/admin/participants/${e?"online":"onsite"}/edit/${t}`;(0,d.useEffect)((()=>{const e=Number.isInteger(Number(t))&&Number(t)>0;!n&&e&&Y(`${pe}/summary`,{replace:!0})}),[n,t,Y,pe]),(0,d.useEffect)((()=>{"workshops"===n&&!S&&t&&Y(`${pe}/summary`,{replace:!0})}),[n,S,t,Y,pe]),(0,d.useEffect)((()=>{if(!Q||0===G.length)return;const{accommodation:e,arrival:t,contributions:n,extra_options:i,food_other_text:a,food_restrictions:s,participant:r,workshops:o}=Q||{},l={},c=r?.dob;if(c){const[e,t,n]=c.split("-");l.dobDay=String(Number(n)),l.dobMonth=String(Number(t)),l.dobYear=e}
// ----- other participant fields
r&&Object.entries(r).forEach((([e,t])=>{"dob"!==e&&null!=t&&(l[e]=t)})),
// ----- boolean mapping
void 0!==r?.can_be_public&&(l.can_be_public=Boolean(Number(r.can_be_public))),
// ----- workshops
Array.isArray(o)&&(l.workshops=o.map((e=>String(e.id)))),
// ----- arrival
t&&Object.entries(t).forEach((([e,t])=>{null!=t&&(l[e]=e.includes("hour")||e.includes("minute")?String(t).padStart(2,"0"):t)}));
// ----- contributions
const d=(n||[]).filter((e=>"talk"===e.type)).map((e=>({...e}))),m=(n||[]).filter((e=>"poster"===e.type)).map((e=>({...e})));l.talks=d,l.posters=m,l.wantsToContribute=d.length>0||m.length>0?"true":"false",
// ----- accommodation
e?.registration_type_id&&(l.registration_type_id=String(e.registration_type_id)),
// ----- extras
i&&(l.excursion="0"===i.excursion?"false":"true",l.buy_tshirt="0"===i.buy_tshirt?"false":"true",l.tshirt_size=i.tshirt_size||""),l.food_restrictions=Array.isArray(s)?s:[],l.food_restrictions_other=a??"",oe(l,{keepDirty:!1,keepTouched:!1}),P(!1)}),[Q,G,oe]);const he=[{url:"/admin/participants/"+(de?"online":"onsite"),name:de?"Online Participants":"On-site Participants"},{url:`/admin/participants/${de?"online":"onsite"}/${t}/${W}`,name:`${Q?.participant?.first_name?Q.participant.first_name.charAt(0).toUpperCase()+Q.participant.first_name.slice(1):"Participant"} \n        ${Q?.participant?.last_name||""} - \n        ${W.charAt(0).toUpperCase()+W.slice(1)}`}],xe=Q&&R.length>0&&X.length>0,be=!!Q?.participant?.admin_notes;
return(0/* default */,D.jsxs)(l.A,{breadcrumb:he,isMaxWidth:!0,children:[(0,D.jsxs)("div",{className:"position-relative fw-bolder",children:[me&&(0/* default */,D.jsx)(c.A,{}),ue.length>0&&(0,D.jsx)("div",{className:"alert alert-danger fw-bolder",children:(0,D.jsx)("ul",{className:"mb-0",children:ue.map(((e,t)=>(0,D.jsx)("li",{children:e},t)))})}),E&&!me&&(0,D.jsx)("div",{className:"alert alert-success",children:E})]}),Q&&xe&&!me&&(0,D.jsxs)("form",{onSubmit:ie((async e=>{L(!0),T(null),I(null);// Triggers validation on all fields
if(!await le())return L(!1),void T("Please fill in all required fields.");e.talks=ae("talks")||[],e.posters=ae("posters")||[];const n={...e,total_due:F,paypal_fee:U};try{const e=await o/* default */.A.post(`https://imc2026.imo.net/php/admin/api/update_${de?"online":"onsite"}_participant.php?id=${t}`,n,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");q((e=>!e)),I("Participant updated successfully!")}catch(e){T(e.message)}finally{L(!1)}})),children:[(0,D.jsx)("ul",{className:a()("nav nav-tabs mb-3 mt-2",r/* default */.A.tab,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},...S?[{key:"workshops",label:"Workshops"}]:[],...de?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...de?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...de?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((({key:e,label:t})=>(0,D.jsx)("li",{className:"nav-item",children:(0,D.jsx)("a",{className:a()("nav-link",W===e&&r/* default */.A.active),href:`${pe}/${e}`,onClick:t=>{t.preventDefault(),Y(`${pe}/${e}`)},children:be&&"admin_notes"===e?(0,D.jsxs)("span",{className:"position-relative",children:[(0,D.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),t]}):(0,D.jsx)(D.Fragment,{children:t})})},e)))}),(0,D.jsxs)("div",{className:a()("tab-content mx-auto",r/* default */.A.contentMxw),children:["identity"===n&&(0,D.jsxs)(D.Fragment,{children:[(0/* default */,D.jsx)(g.A,{isAdmin:!0,isOnline:de,register:ne,errors:re,setValue:se,trigger:le}),(0/* default */,D.jsx)(y.A,{isAdmin:!0,register:ne,setValue:se,errors:re,trigger:le,initialData:Q?.participant,watch:ce})]}),S&&"workshops"===n&&(0/* default */,D.jsx)(_.A,{isAdmin:!0,isOnline:de,conferenceData:h/* conferenceData */.p,register:ne,errors:re,setValue:se,trigger:le,watch:ce,workshops:B}),"arrival"===n&&!de&&(0/* default */,D.jsx)(w.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ne,errors:re,setValue:se,trigger:le}),"contribution"===n&&(0/* default */,D.jsx)(v.A,{isAdmin:!0,isOnline:de,conferenceData:h/* conferenceData */.p,control:te,register:ne,errors:re,getValues:ae,setValue:se,watch:ce,trigger:le,sessions:G}),"accommodation"===n&&(0/* default */,D.jsx)(j.A,{isAdmin:!0,isOnline:de,isEarlyBird:(0,C/* isParticipantEarlyBird */.O)(Q?.participant?.is_early_bird),conferenceData:h/* conferenceData */.p,control:te,register:ne,errors:re,paymentMethods:R,setValue:se,registrationTypes:X,trigger:le}),"extras"===n&&!de&&(0/* default */,D.jsx)(N.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ne,errors:re,getValues:ae,setValue:se,trigger:le,watch:ce,control:te}),"comments"===n&&(0,D.jsx)("div",{className:a()(s,"mx-auto"),children:(0/* default */,D.jsx)(k.A,{isAdmin:!0,isOnline:de,register:ne,errors:re,setValue:se,trigger:le})}),(0,D.jsxs)("div",{className:a()(s,"mx-auto","summary"===n&&xe?"visible":"invisible h-0 w-0 overflow-hidden"),children:[(0,D.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,D.jsxs)("div",{children:[(0,D.jsxs)("strong",{children:[Q?.participant?.first_name?Q.participant.first_name.charAt(0).toUpperCase()+Q.participant.first_name.slice(1):""," ",Q?.participant?.last_name||""]})," ","1"===Q.participant.confirmation_sent?(0,D.jsxs)(D.Fragment,{children:["has been confirmed on ",(0,D.jsx)("span",{className:"text-success",children:Q.participant.confirmation_date&&(0,$/* formatFullDate */.Lu)(Q.participant.confirmation_date)})]}):(0,D.jsx)(D.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==Q.participant.confirmation_sent&&(0,D.jsx)("div",{children:(0/* Link */,D.jsx)(f.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${de?"online":"onsite"}/payment/${t}`,children:"Go to Payments to confirm"})})]}),(0/* default */,D.jsx)(A.A,{isAdmin:!0,isOnline:de,isEarlyBird:(0,C/* isParticipantEarlyBird */.O)(Q?.participant?.is_early_bird),conferenceData:h/* conferenceData */.p,getValues:ae,setValue:se,setTotal:V,setPaypalFee:z,workshops:B,registrationTypes:X,paymentMethods:R,watch:ce})]}),"admin_notes"===n&&(0,D.jsxs)("div",{className:a()(s,"mx-auto mb-3"),children:[(0,D.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,D.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...ne("admin_notes")}),re.admin_notes&&(0,D.jsx)("div",{className:"text-danger mt-1",children:re.admin_notes.message})]}),(0,D.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,D.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:M,children:M?"Saving...":"Save Changes"})})]})]})]})}}
/***/,
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
/* harmony export */V:()=>/* binding */s
/* harmony export */});
/* harmony import */var i=n(6540),a=n(7767);
/* harmony import */const s=e=>{const t=(0,a/* .useNavigate */.Zp)(),n=(0,a/* .useLocation */.zy)();(0,i.useEffect)((()=>{const t=t=>{e&&(t.preventDefault(),t.returnValue="You have unsaved changes. Do you really want to leave?")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e]),(0,i.useEffect)((()=>{const i=i=>{if(e){window.confirm("You have unsaved changes. Do you really want to leave?")||(i.preventDefault(),t(n.pathname,{replace:!0}))}};return window.addEventListener("popstate",i),()=>{window.removeEventListener("popstate",i)}}),[e,t,n.pathname])};
/***/},
/***/3318:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */i
/* harmony export */});const i=(e,{interval:t=1e3,retries:n=6}={})=>new Promise(((a,s)=>{e().then(a).catch((r=>{setTimeout((()=>{n?i(e,{interval:1.5*t,retries:n-1}).then(a,s):s(r)}),t)}))}));
/***/},
/***/4178:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */A:()=>i
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const i={root:"tabs-module__root--Gb7PE","is-admin":"tabs-module__is-admin--ysiPF",tab:"tabs-module__tab--ed4Qs",active:"tabs-module__active--frwOf",contentMxw:"tabs-module__contentMxw--q4nV3"};
/***/},
/***/5846:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Ai:()=>/* binding */d
/* harmony export */,Lu:()=>/* binding */c
/* harmony export */,p6:()=>/* binding */l
/* harmony export */});
// ---- Utilities ----
const i=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},a=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,i]=e.split("-").map(Number);return new Date(Date.UTC(t,n-1,i))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const n=new Date(e.replace(" ","T"));if(!Number.isNaN(n.getTime()))return n}return new Date(NaN)},s=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,r=(e,{locale:t="en-US",timeZone:n="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:n}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:n}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:n}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:n}).format(e))}),o=e=>{const[t,n,i]=String(e).split("-").map(Number);return new Date(Date.UTC(t,n-1,i))},l=(e,t,{locale:n="en-US",timeZone:a="UTC"}={})=>{const l=o(e),c=o(t);if(!s(l)||!s(c))return"";const d=r(l,{locale:n,timeZone:a}),m=r(c,{locale:n,timeZone:a});if(d.monthName===m.monthName&&l.getUTCFullYear()===c.getUTCFullYear())return`${d.monthName} ${d.day}${i(d.day)} - ${m.day}${i(m.day)}`;
// Different month and/or year
return`${`${d.monthName} ${d.day}${i(d.day)}${l.getUTCFullYear()!==c.getUTCFullYear()?` ${d.year}`:""}`} - ${`${m.monthName} ${m.day}${i(m.day)} ${m.year}`}`},c=(e,t=!0,n=!1,o={})=>((e,t=!1,n=!0,o=!1,{locale:l="en-US",timeZone:c="UTC"}={})=>{const d=a(e);if(!s(d))return"";// safe fallback
const{day:m,monthName:u,weekday:p,year:h}=r(d,{locale:l,timeZone:c});return`${t?`${p}, `:""}${m}${i(m)}${n?` ${u}`:""}${o?` ${h}`:""}`})(e,!0,t,n,o),d=(e,t,n=!0,i=!0,{locale:r="en-US",timeZone:o="UTC"}={})=>{const l=a(e);if(!s(l))return"";const d=(m=l,u=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(u))));var m,u;return c(d,n,i,{locale:r,timeZone:o})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/7647:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{A:()=>/* binding */B});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const i="index-module__pageContain--r6_E2",a="index-module__titleWrap--hrdlj",s="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var r=n(6942),o=n.n(r),l=n(8075);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=n(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",f="index-module__menuOpenOverlay--caMms",g="index-module__menu--veCcg",_="index-module__active--EYt3Y",w="index-module__footer--O9Npd",y="index-module__menuItem--eqnJw",v="index-module__menuItemTitle--O6gep",j="index-module__active--Hl_ax",N="index-module__caret--U_US2",k="index-module__rotate--pnUGY",A="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var $=n(6540),C=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const D=$.forwardRef((({children:e,className:t,goTo:n=null,isLinkActive:i,title:a,url:s=null},r)=>{const[l,c]=(0,$.useState)(i),[d,m]=(0,$.useState)("0px"),u=(0,$.useRef)(null);(0,$.useEffect)((()=>{e&&m(l?`${u.current.scrollHeight}px`:"0px")}),[e,l,u]);const p=e=>(0,C.jsx)("div",{className:o()(e.className,l&&k),children:(0,C.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,C.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,C.jsxs)("div",{className:o()(y,"d-flex flex-column",t),ref:r,children:[(0,C.jsxs)("a",{className:o()(v,"d-flex justify-content-between w-100 align-items-center px-3",i&&j),href:s||void 0,onClick:t=>{t.preventDefault(),e?c(!l):n&&s&&n(s)},children:[(0,C.jsx)("span",{className:"d-flex align-items-center",children:(0,C.jsx)("b",{children:a})}),e&&(0,C.jsx)(p,{className:N})]}),e&&(0,C.jsx)("div",{className:A,ref:u,style:e&&{maxHeight:`${d}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var S=n(8983),T=n(1448),M=n(8321),L=n(7767),E=n(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const I=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var O=n(1280),P=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const F=parseInt(u,10)||250,V=({cd:e})=>{const[t,n]=(0,$.useState)(!1),[i,a]=(0,$.useState)(!0),s=(0,T/* useDispatch */.wA)(),r=(0,L/* useLocation */.zy)(),l=(0,L/* useNavigate */.Zp)(),c=(0/* authSelectors */,T/* useSelector */.d4)(S.Pg.isAdmin),d=(0/* authSelectors */,T/* useSelector */.d4)(S.Pg.isLoc),u=(0/* authSelectors */,T/* useSelector */.d4)(S.Pg.isSoc),[y,v]=(0,M.useSpring)((()=>({right:-F,config:{tension:350,friction:30}})));(0,$.useEffect)((()=>(t?(a(!1),v.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(v.start({right:-F,onRest:()=>a(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,v]),(0,$.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const j=()=>{n((e=>!e))},N=e=>{l(e),j()};
return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("button",{className:p,onClick:j,children:(0/* SlMenu */,C.jsx)(m.RAm,{className:x})}),!i&&(0,C.jsx)("div",{className:o()(f),onClick:j,onMouseDown:O/* onStopPropagation */._v,onTouchStart:O/* onStopPropagation */._v}),(0,C.jsx)(M.animated.div,{className:o()(b),style:y,children:(0,C.jsxs)("div",{className:o()(g,"d-flex flex-column h-100"),children:[(0,C.jsx)("button",{className:h,onClick:j,children:(0/* SlClose */,C.jsx)(m.ipV,{className:x})}),(0,C.jsxs)("div",{className:"mb-3",children:[(0,C.jsxs)("div",{className:"m-3 text-center",children:[(0,C.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,C.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),I.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,C.jsx)(D,{className:"py-2",isLinkActive:t,goTo:N,title:e.title,url:e.link,children:e.subLinks&&(0,C.jsx)(C.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc"))).map((e=>{const t=r.pathname===e.link;
return(0/* Link */,C.jsx)(E.N_,{"aria-label":e.title,onClick:j,to:e.link,className:o()(t&&_),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,C.jsx)("div",{className:o()(w,"mt-auto"),children:(0,C.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,C.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>N("/"),title:"Public site",children:"Public site"}),(0,C.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await P/* default */.A.get("https://imc2026.imo.net/php/auth/logout.php",{withCredentials:!0}),s(S/* authActions */.I2.logout()),localStorage.removeItem("session"),l("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var U=n(7762);// ./src/admin/components/header/index.js
const z=()=>{const e=`${U/* conferenceData */.p.name} ${U/* conferenceData */.p.year}`,t=(0/* authSelectors */,T/* useSelector */.d4)(S.Pg.isLoc),n=(0/* authSelectors */,T/* useSelector */.d4)(S.Pg.isSoc),i=t?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,C.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,C.jsx)(V,{cd:U/* conferenceData */.p}),(0,C.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,C.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,C.jsxs)(E.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:i,title:"Admin",children:[(0,C.jsx)("img",{src:l,alt:e,className:"rounded-circle border border-2 p-1"}),(0,C.jsxs)("div",{className:"d-flex flex-column",children:[(0,C.jsxs)("h1",{className:"m-0 fw-bolder",children:[U/* conferenceData */.p.name," ",U/* conferenceData */.p.year]}),(0,C.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var Z=n(5902),q=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const W="breadcrumb-module__nav--atkeN",Y=({links:e=[]})=>(0/* authSelectors */,T/* useSelector */.d4)(S.Pg.isAdmin)?(0,C.jsx)("nav",{"aria-label":"breadcrumb",className:W,children:(0,C.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,C.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,C.jsx)(E.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,C.jsx)(q.M14,{className:"me-1"})})}),e.map(((t,n)=>(0,C.jsx)("li",{className:o()("breadcrumb-item",{active:n===e.length-1}),"aria-current":n===e.length-1?"page":void 0,children:n===e.length-1?(0,C.jsx)("b",{children:t.name}):(0/* Link */,C.jsx)(E.N_,{to:t.url,children:t.name})},n)))]})}):null,B=({breadcrumb:e=[],title:t="",rightContent:n,children:r,isMaxWidth:l=!0})=>{const c=t?`${t} | ${U/* conferenceData */.p.name_display} ${U/* conferenceData */.p.year}`:`${U/* conferenceData */.p.name_display} ${U/* conferenceData */.p.year}`;
return(0,C.jsxs)(C.Fragment,{children:[(0/* Helmet */,C.jsxs)(Z.mg,{children:[(0,C.jsx)("title",{children:c}),(0,C.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,C.jsxs)("div",{className:o()(i,"position-relative"),children:[(0,C.jsx)(z,{}),(0,C.jsxs)("div",{className:"d-flex flex-row",children:[(0,C.jsx)(V,{cd:U/* conferenceData */.p}),(0,C.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${s} mx-md-auto`]:l}),children:[0!==e.length&&(0,C.jsx)(Y,{links:e}),(!!t||!!n)&&(0,C.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",a),children:[t&&(0,C.jsx)("h2",{children:t}),n&&(0,C.jsx)("div",{children:n})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */i});// ./src/data/conference-data.json
const i=JSON.parse('{"year":2026,"num":"45th","welcome":"Bienvenue !","thank_you":"Merci !","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2026-09-24","end":"2026-09-27"},"location":"Barcelonette, France","hotel":"Pôle d\'accueil universitaire Séolane","consulate":"French consulate","deadlines":{"reg":"2026-08-10","paper":"2026-10-31","full_reimbursement_before":"2026-06-30","half_reimbursement_before":"2026-08-10","early_birds":"2026-06-30"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":280,"description":"Triple room in the IMC host","total":15,"sort_order":1,"type":"triple"},{"price":320,"description":"Double room in the IMC host","total":16,"sort_order":2,"type":"double"},{"price":350,"description":"Single room in the IMC host","total":2,"sort_order":3,"type":"single"},{"price":350,"description":"Single room for a person with reduced mobility in the IMC host","total":1,"sort_order":4,"type":"single_accessible"},{"price":200,"description":"No accommodation","sort_order":5,"type":"no"}],"tshirts":{"models":["men","women"],"sizes":["XS","S","M","L","XL","XXL","XXXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International Meteor Organization","website":"https://imo.net"},{"name":"Vigie-Ciel","website":"https://www.vigie-ciel.org/"}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2026@imo.net","name":"IMC 2026 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2026@imo.net","name":"IMC 2026 Team"}],"with_excursion":false}')}// ./src/data/conference-data.js
/***/,
/***/8075:
/***/(e,t,n)=>{e.exports=n.p+"c62d9ccbbed08dff20f3.svg";
/***/}}]);