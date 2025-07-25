"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[6577],{
/***/1162:
/***/(e,t,n)=>{
// ESM COMPAT FLAG
n.r(t),
// EXPORTS
n.d(t,{default:()=>/* binding */M});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var i=n(6942),s=n.n(i);// ./src/admin/pages/participants/single/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const a="index-module__mxW--Ve0tI";
// EXTERNAL MODULE: ./src/styles/components/tabs.module.scss
var r=n(4178),o=n(1083),l=n(7647),c=n(6645),d=n(6540),m=n(2199),u=n(7767),p=n(9785),h=n(7762),x=n(4493),b=n(4972),g=n(4976),f=n(847),_=n(3975),w=n(9156),v=n(8299),j=n(5680),y=n(6538),k=n(5058),N=n(6827),A=n(4668),S=n(5846),L=n(4848);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/pages/participants/single/index.js
const M=({isCurOnline:e=!1})=>{const{participantId:t,tab:n}=(0,u/* useParams */.g)(),[i,M]=(0,d.useState)(""),[C,$]=(0,d.useState)(!1),[D,E]=(0,d.useState)(null),[O,P]=(0,d.useState)(!1),[I,V]=(0,d.useState)(0),[T,z]=(0,d.useState)(0),[F,W]=(0,d.useState)(!1),q=n||"identity",R=(0,u/* useNavigate */.Zp)();(0,m/* useBlockNavigation */.V)(O);const{workshops:B,paymentMethods:U,registrationTypes:H,loading:Y,sessions:G,error:Z}=(0,x/* useApiSpecificData */.Q)(),{participant:J,loading:Q,error:X}=(0,b/* useApiParticipant */.D)(t,e,F,!0),{control:K,register:ee,handleSubmit:te,getValues:ne,setValue:ie,formState:{errors:se},trigger:ae,watch:re}=(0,p/* useForm */.mN)(),oe="1"===J?.participant?.is_online,le=Y||Q||C,ce=[i,X,Z].filter(Boolean);
// Paypal fess
// Paypal fess
(0,d.useEffect)((()=>{z(T)}),[T]),
// Detect form changes
// Detect form changes
(0,d.useEffect)((()=>{const e=re((()=>{P(!0)}));return()=>e.unsubscribe()}),[re]),(0,d.useEffect)((()=>{const e=Number.isInteger(Number(t))&&Number(t)>0;!n&&e&&R(`/admin/participants/onsite/edit/${t}/summary`,{replace:!0})}),[n,t,R]),(0,d.useEffect)((()=>{if(!J||0===G.length)return;
// Extract participant data safely
const{participant:e,workshops:t,arrival:n,contributions:i,accommodation:s,extra_options:a}=J||{},{dob:r,...o}=e||{};
// Handle Date of Birth
if(r){const[e,t,n]=r.split("-");ie("dobDay",String(Number(n))),ie("dobMonth",String(Number(t))),ie("dobYear",e)}
// Set other participant details safely
// Handle Workshops
if(o&&Object.entries(o).forEach((([e,t])=>{null!=t&&ie(e,t)})),
// On the "participants" list
void 0!==e.can_be_public&&ie("can_be_public",Boolean(Number(e.can_be_public))),t&&Array.isArray(t)){const e=t.map((e=>String(e.id)));ie("workshops",e)}
// Handle Arrival Details safely
// Handle Contributions (Talks & Posters)
if(n&&Object.entries(n).forEach((([e,t])=>{null!=t&&ie(e,e.includes("hour")||e.includes("minute")?String(t).padStart(2,"0"):t)})),i&&Array.isArray(i)&&G.length>0){const e=i.filter((e=>"talk"===e.type)).map((e=>({...e}))),t=i.filter((e=>"poster"===e.type)).map((e=>({...e})));
// Set values in form so they persist on submit
ie("talks",e),ie("posters",t),
// Set wantsToContribute if at least one talk or poster exists
(e.length>0||t.length>0)&&ie("wantsToContribute","yes")}
// Handle Accommodation
s?.registration_type_id&&ie("registration_type_id",String(s.registration_type_id)),
// Handle Extra Options safely
a&&(ie("excursion","0"===a.excursion?"false":"true"),ie("buy_tshirt","0"===a.buy_tshirt?"false":"true"),ie("tshirt_size",a.tshirt_size||""))}),[J,G,ie]);const de=[{url:"/admin/participants/"+(oe?"online":"onsite"),name:oe?"Online Participants":"On-site Participants"},{url:`/admin/participants/${oe?"online":"onsite"}/${t}/${q}`,name:`${J?.participant?.first_name?J.participant.first_name.charAt(0).toUpperCase()+J.participant.first_name.slice(1):"Participant"} \n        ${J?.participant?.last_name||""} - \n        ${q.charAt(0).toUpperCase()+q.slice(1)}`}],me=J&&U.length>0&&B.length>0&&H.length>0,ue=!!J?.participant?.admin_notes;
return(0/* default */,L.jsxs)(l.A,{breadcrumb:de,isMaxWidth:!0,children:[(0,L.jsxs)("div",{className:"position-relative fw-bolder",children:[le&&(0/* default */,L.jsx)(c.A,{}),ce.length>0&&(0,L.jsx)("div",{className:"alert alert-danger fw-bolder",children:(0,L.jsx)("ul",{className:"mb-0",children:ce.map(((e,t)=>(0,L.jsx)("li",{children:e},t)))})}),D&&!le&&(0,L.jsx)("div",{className:"alert alert-success",children:D})]}),J&&me&&!le&&(0,L.jsxs)("form",{onSubmit:te((async e=>{$(!0),M(null),E(null);// Triggers validation on all fields
if(!await ae())return $(!1),void M("Please fill in all required fields.");e.talks=ne("talks")||[],e.posters=ne("posters")||[];const n={...e,total_due:I,paypal_fee:T};try{const e=await o/* default */.A.post(`https://imc2025.imo.net/php/admin/api/update_${oe?"online":"onsite"}_participant.php?id=${t}`,n,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");W((e=>!e)),E("Participant updated successfully!")}catch(e){M(e.message)}finally{$(!1)}})),children:[(0,L.jsx)("ul",{className:s()("nav nav-tabs mb-3 mt-2",r/* default */.A.tab,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},{key:"workshops",label:"Workshops"},...oe?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...oe?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...oe?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((({key:e,label:n})=>(0,L.jsx)("li",{className:"nav-item",children:(0,L.jsx)("a",{className:s()("nav-link",q===e&&r/* default */.A.active),href:`/admin/participants/onsite/edit/${t}/${e}`,onClick:n=>{n.preventDefault(),R(`/admin/participants/onsite/edit/${t}/${e}`)},children:ue&&"admin_notes"===e?(0,L.jsxs)("span",{className:"position-relative",children:[(0,L.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),n]}):(0,L.jsx)(L.Fragment,{children:n})})},e)))}),(0,L.jsxs)("div",{className:s()("tab-content mx-auto",r/* default */.A.contentMxw),children:["identity"===n&&(0,L.jsxs)(L.Fragment,{children:[(0/* default */,L.jsx)(f.A,{isAdmin:!0,isOnline:oe,register:ee,errors:se,setValue:ie,trigger:ae}),(0/* default */,L.jsx)(v.A,{isAdmin:!0,register:ee,setValue:ie,errors:se,trigger:ae,initialData:J?.participant,watch:re})]}),"workshops"===n&&(0/* default */,L.jsx)(_.A,{isAdmin:!0,isOnline:oe,conferenceData:h/* conferenceData */.p,register:ee,errors:se,setValue:ie,trigger:ae,watch:re,workshops:B}),"arrival"===n&&!oe&&(0/* default */,L.jsx)(w.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ee,errors:se,setValue:ie,trigger:ae}),"contribution"===n&&(0/* default */,L.jsx)(j.A,{isAdmin:!0,isOnline:oe,conferenceData:h/* conferenceData */.p,control:K,register:ee,errors:se,getValues:ne,setValue:ie,watch:re,trigger:ae,sessions:G}),"accommodation"===n&&(0/* default */,L.jsx)(y.A,{isAdmin:!0,isOnline:oe,isEarlyBird:1===J?.participant.is_early_bird||"1"===J?.participant.is_early_bird,conferenceData:h/* conferenceData */.p,control:K,register:ee,errors:se,paymentMethods:U,setValue:ie,registrationTypes:H,trigger:ae}),"extras"===n&&!oe&&(0/* default */,L.jsx)(k.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ee,errors:se,getValues:ne,setValue:ie,trigger:ae,watch:re,control:K}),"comments"===n&&(0,L.jsx)("div",{className:s()(a,"mx-auto"),children:(0/* default */,L.jsx)(N.A,{isAdmin:!0,isOnline:oe,register:ee,errors:se,setValue:ie,trigger:ae})}),(0,L.jsxs)("div",{className:s()(a,"mx-auto","summary"===n&&me?"visible":"invisible h-0 w-0 overflow-hidden"),children:[(0,L.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,L.jsxs)("div",{children:[(0,L.jsxs)("strong",{children:[J?.participant?.first_name?J.participant.first_name.charAt(0).toUpperCase()+J.participant.first_name.slice(1):""," ",J?.participant?.last_name||""]})," ","1"===J.participant.confirmation_sent?(0,L.jsxs)(L.Fragment,{children:["has been confirmed on ",(0,L.jsx)("span",{className:"text-success",children:J.participant.confirmation_date&&(0,S/* formatFullDate */.Lu)(J.participant.confirmation_date)})]}):(0,L.jsx)(L.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==J.participant.confirmation_sent&&(0,L.jsx)("div",{children:(0/* Link */,L.jsx)(g.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${oe?"online":"onsite"}/payment/${t}`,children:"Go to Payments to confirm"})})]}),(0/* default */,L.jsx)(A.A,{isAdmin:!0,isOnline:oe,isEarlyBird:1===J?.participant.is_early_bird||"1"===J?.participant.is_early_bird,conferenceData:h/* conferenceData */.p,getValues:ne,setValue:ie,setTotal:V,setPaypalFee:z,workshops:B,registrationTypes:H,paymentMethods:U,watch:re})]}),"admin_notes"===n&&(0,L.jsxs)("div",{className:s()(a,"mx-auto mb-3"),children:[(0,L.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,L.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...ee("admin_notes")}),se.admin_notes&&(0,L.jsx)("div",{className:"text-danger mt-1",children:se.admin_notes.message})]}),(0,L.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,L.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:C,children:C?"Saving...":"Save Changes"})})]})]})]})};
/* harmony default export */}
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
/* harmony default export */const u="300px",p="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",b="index-module__swipeWrap--a2OL4",g="index-module__menuOpenOverlay--caMms",f="index-module__menu--veCcg",_="index-module__active--EYt3Y",w="index-module__footer--O9Npd",v="index-module__menuItem--eqnJw",j="index-module__menuItemTitle--O6gep",y="index-module__active--Hl_ax",k="index-module__caret--U_US2",N="index-module__rotate--pnUGY",A="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var S=n(6540),L=n(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const M=S.forwardRef((({children:e,className:t,goTo:n=null,isLinkActive:i,title:s,url:a=null},r)=>{const[l,c]=(0,S.useState)(i),[d,m]=(0,S.useState)("0px"),u=(0,S.useRef)(null);(0,S.useEffect)((()=>{e&&m(l?`${u.current.scrollHeight}px`:"0px")}),[e,l,u]);const p=e=>(0,L.jsx)("div",{className:o()(e.className,l&&N),children:(0,L.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,L.jsxs)("div",{className:o()(v,"d-flex flex-column",t),ref:r,children:[(0,L.jsxs)("a",{className:o()(j,"d-flex justify-content-between w-100 align-items-center px-3",i&&y),href:a||void 0,onClick:t=>{t.preventDefault(),e?c(!l):n&&a&&n(a)},children:[(0,L.jsx)("span",{className:"d-flex align-items-center",children:(0,L.jsx)("b",{children:s})}),e&&(0,L.jsx)(p,{className:k})]}),e&&(0,L.jsx)("div",{className:A,ref:u,style:e&&{maxHeight:`${d}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var C=n(8983),$=n(1448),D=n(8321),E=n(7767),O=n(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const P=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var I=n(1280),V=n(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const T=parseInt(u,10)||250,z=({cd:e})=>{const[t,n]=(0,S.useState)(!1),[i,s]=(0,S.useState)(!0),a=(0,$/* useDispatch */.wA)(),r=(0,E/* useLocation */.zy)(),l=(0,E/* useNavigate */.Zp)(),c=(0/* authSelectors */,$/* useSelector */.d4)(C.Pg.isAdmin),d=(0/* authSelectors */,$/* useSelector */.d4)(C.Pg.isLoc),u=(0/* authSelectors */,$/* useSelector */.d4)(C.Pg.isSoc),[v,j]=(0,D.useSpring)((()=>({right:-T,config:{tension:350,friction:30}})));(0,S.useEffect)((()=>(t?(s(!1),j.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(j.start({right:-T,onRest:()=>s(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,j]),(0,S.useEffect)((()=>{const e=()=>{n(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const y=()=>{n((e=>!e))},k=e=>{l(e),y()};
return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{className:p,onClick:y,children:(0/* SlMenu */,L.jsx)(m.RAm,{className:x})}),!i&&(0,L.jsx)("div",{className:o()(g),onClick:y,onMouseDown:I/* onStopPropagation */._v,onTouchStart:I/* onStopPropagation */._v}),(0,L.jsx)(D.animated.div,{className:o()(b),style:v,children:(0,L.jsxs)("div",{className:o()(f,"d-flex flex-column h-100"),children:[(0,L.jsx)("button",{className:h,onClick:y,children:(0/* SlClose */,L.jsx)(m.ipV,{className:x})}),(0,L.jsxs)("div",{className:"mb-3",children:[(0,L.jsxs)("div",{className:"m-3 text-center",children:[(0,L.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,L.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),P.map((e=>{const t=r.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>r.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,L.jsx)(M,{className:"py-2",isLinkActive:t,goTo:k,title:e.title,url:e.link,children:e.subLinks&&(0,L.jsx)(L.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||u&&e?.allowed?.includes("soc"))).map((e=>{const t=r.pathname===e.link;
return(0/* Link */,L.jsx)(O.N_,{"aria-label":e.title,onClick:y,to:e.link,className:o()(t&&_),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,L.jsx)("div",{className:o()(w,"mt-auto"),children:(0,L.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,L.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>k("/"),title:"Public site",children:"Public site"}),(0,L.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await V/* default */.A.get("https://imc2025.imo.net/php/auth/logout.php",{withCredentials:!0}),a(C/* authActions */.I2.logout()),localStorage.removeItem("session"),l("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var F=n(7762);// ./src/admin/components/header/index.js
const W=()=>{const e=`${F/* conferenceData */.p.name} ${F/* conferenceData */.p.year}`,t=(0/* authSelectors */,$/* useSelector */.d4)(C.Pg.isLoc),n=(0/* authSelectors */,$/* useSelector */.d4)(C.Pg.isSoc),i=t?"/admin/accommodations":n?"/admin/contributions/talks":"/admin/dashboard";
return(0,L.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,L.jsx)(z,{cd:F/* conferenceData */.p}),(0,L.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,L.jsx)("div",{className:o()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,L.jsxs)(O.N_,{"aria-label":"Admin",className:o()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:i,title:"Admin",children:[(0,L.jsx)("img",{src:l,alt:e,className:"rounded-circle border border-2 p-1"}),(0,L.jsxs)("div",{className:"d-flex flex-column",children:[(0,L.jsxs)("h1",{className:"m-0 fw-bolder",children:[F/* conferenceData */.p.name," ",F/* conferenceData */.p.year]}),(0,L.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",n&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var q=n(5902),R=n(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const B="breadcrumb-module__nav--atkeN",U=({links:e=[]})=>(0/* authSelectors */,$/* useSelector */.d4)(C.Pg.isAdmin)?(0,L.jsx)("nav",{"aria-label":"breadcrumb",className:B,children:(0,L.jsxs)("ol",{className:o()("breadcrumb"),children:[(0,L.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,L.jsx)(O.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,L.jsx)(R.M14,{className:"me-1"})})}),e.map(((t,n)=>(0,L.jsx)("li",{className:o()("breadcrumb-item",{active:n===e.length-1}),"aria-current":n===e.length-1?"page":void 0,children:n===e.length-1?(0,L.jsx)("b",{children:t.name}):(0/* Link */,L.jsx)(O.N_,{to:t.url,children:t.name})},n)))]})}):null,H=({breadcrumb:e=[],title:t="",rightContent:n,children:r,isMaxWidth:l=!0})=>{const c=t?`${t} | ${F/* conferenceData */.p.name_display} ${F/* conferenceData */.p.year}`:`${F/* conferenceData */.p.name_display} ${F/* conferenceData */.p.year}`;
return(0,L.jsxs)(L.Fragment,{children:[(0/* Helmet */,L.jsxs)(q.mg,{children:[(0,L.jsx)("title",{children:c}),(0,L.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,L.jsxs)("div",{className:o()(i,"position-relative"),children:[(0,L.jsx)(W,{}),(0,L.jsxs)("div",{className:"d-flex flex-row",children:[(0,L.jsx)(z,{cd:F/* conferenceData */.p}),(0,L.jsxs)("div",{className:o()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${a} mx-md-auto`]:l}),children:[0!==e.length&&(0,L.jsx)(U,{links:e}),(!!t||!!n)&&(0,L.jsxs)("div",{className:o()("d-flex justify-content-between align-items-center",s),children:[t&&(0,L.jsx)("h2",{children:t}),n&&(0,L.jsx)("div",{children:n})]}),r]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{p:()=>/* reexport */i});// ./src/data/conference-data.json
const i=JSON.parse('{"year":2025,"num":"44th","welcome":"Welkom!","thank_you":"Bedankt!","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2025-09-18","end":"2025-09-21"},"location":"Soest, the Netherlands","hotel":"Stayokay hostel","consulat":"Dutch consulate","deadlines":{"reg":"2025-08-09","paper":"2025-10-31","full_reimbursement_before":"2025-05-01","half_reimbursement_before":"2025-07-15","early_birds":"2025-05-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"abbr":"WGM","name":"KNVWS Meteor Section","website":"https://werkgroepmeteoren.nl/english"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2025-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2025-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2025@imo.net","name":"IMC 2025 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2025@imo.net","name":"IMC 2025 Team"}]}')}// ./src/data/conference-data.js
/***/}]);