"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[5559],{
/***/1162:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */S});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var n=a(6942),r=a.n(n);// ./src/admin/pages/participants/single/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const i="index-module__mxW--Ve0tI";
// EXTERNAL MODULE: ./src/styles/components/tabs.module.scss
var s=a(4178),o=a(1083),l=a(7647),c=a(6645),m=a(6540),d=a(2199),u=a(7767),p=a(9785),h=a(7762),f=a(4493),b=a(4972),y=a(4976),g=a(847),w=a(3975),_=a(9156),x=a(8299),N=a(5680),v=a(6538),j=a(5058),$=a(6827),A=a(4668),k=a(5846),D=a(4355),T=a(4848);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/pages/participants/single/index.js
const C=Array.isArray(h/* conferenceData */.p?.workshops)&&h/* conferenceData */.p.workshops.length>0,S=({isCurOnline:e=!1})=>{const{participantId:t,tab:a}=(0,u/* useParams */.g)(),[n,S]=(0,m.useState)(""),[U,V]=(0,m.useState)(!1),[E,F]=(0,m.useState)(null),[O,Z]=(0,m.useState)(!1),[M,P]=(0,m.useState)(0),[I,Y]=(0,m.useState)(0),[L,B]=(0,m.useState)(!1),z=a||"identity",W=(0,u/* useNavigate */.Zp)();(0,d/* useBlockNavigation */.V)(O);const{workshops:q,paymentMethods:G,registrationTypes:Q,loading:H,sessions:J,error:K}=(0,f/* useApiSpecificData */.Q)(),{participant:R,loading:X,error:ee}=(0,b/* useApiParticipant */.D)(t,e,L,!0),{control:te,register:ae,handleSubmit:ne,getValues:re,setValue:ie,formState:{errors:se},reset:oe,trigger:le,watch:ce}=(0,p/* useForm */.mN)(),me="1"===R?.participant?.is_online,de=H||X||U,ue=[n,ee,K].filter(Boolean);
// Detect form changes
// Detect form changes
(0,m.useEffect)((()=>{const e=ce((()=>{Z(!0)}));return()=>e.unsubscribe()}),[ce]);const pe=`/admin/participants/${e?"online":"onsite"}/edit/${t}`;(0,m.useEffect)((()=>{const e=Number.isInteger(Number(t))&&Number(t)>0;!a&&e&&W(`${pe}/summary`,{replace:!0})}),[a,t,W,pe]),(0,m.useEffect)((()=>{"workshops"===a&&!C&&t&&W(`${pe}/summary`,{replace:!0})}),[a,C,t,W,pe]),(0,m.useEffect)((()=>{if(!R||0===J.length)return;const{accommodation:e,arrival:t,contributions:a,extra_options:n,food_other_text:r,food_restrictions:i,participant:s,workshops:o}=R||{},l={},c=s?.dob;if(c){const[e,t,a]=c.split("-");l.dobDay=String(Number(a)),l.dobMonth=String(Number(t)),l.dobYear=e}
// ----- other participant fields
s&&Object.entries(s).forEach((([e,t])=>{"dob"!==e&&null!=t&&(l[e]=t)})),
// ----- boolean mapping
void 0!==s?.can_be_public&&(l.can_be_public=Boolean(Number(s.can_be_public))),
// ----- workshops
Array.isArray(o)&&(l.workshops=o.map((e=>String(e.id)))),
// ----- arrival
t&&Object.entries(t).forEach((([e,t])=>{null!=t&&(l[e]=e.includes("hour")||e.includes("minute")?String(t).padStart(2,"0"):t)}));
// ----- contributions
const m=(a||[]).filter((e=>"talk"===e.type)).map((e=>({...e}))),d=(a||[]).filter((e=>"poster"===e.type)).map((e=>({...e})));l.talks=m,l.posters=d,l.wantsToContribute=m.length>0||d.length>0?"true":"false",
// ----- accommodation
e?.registration_type_id&&(l.registration_type_id=String(e.registration_type_id)),
// ----- extras
n&&(l.excursion="0"===n.excursion?"false":"true",l.buy_tshirt="0"===n.buy_tshirt?"false":"true",l.tshirt_size=n.tshirt_size||""),l.food_restrictions=Array.isArray(i)?i:[],l.food_restrictions_other=r??"",oe(l,{keepDirty:!1,keepTouched:!1}),Z(!1)}),[R,J,oe]);const he=[{url:"/admin/participants/"+(me?"online":"onsite"),name:me?"Online Participants":"On-site Participants"},{url:`/admin/participants/${me?"online":"onsite"}/${t}/${z}`,name:`${R?.participant?.first_name?R.participant.first_name.charAt(0).toUpperCase()+R.participant.first_name.slice(1):"Participant"} \n        ${R?.participant?.last_name||""} - \n        ${z.charAt(0).toUpperCase()+z.slice(1)}`}],fe=R&&G.length>0&&Q.length>0,be=!!R?.participant?.admin_notes;
return(0/* default */,T.jsxs)(l.A,{breadcrumb:he,isMaxWidth:!0,children:[(0,T.jsxs)("div",{className:"position-relative fw-bolder",children:[de&&(0/* default */,T.jsx)(c.A,{}),ue.length>0&&(0,T.jsx)("div",{className:"alert alert-danger fw-bolder",children:(0,T.jsx)("ul",{className:"mb-0",children:ue.map(((e,t)=>(0,T.jsx)("li",{children:e},t)))})}),E&&!de&&(0,T.jsx)("div",{className:"alert alert-success",children:E})]}),R&&fe&&!de&&(0,T.jsxs)("form",{onSubmit:ne((async e=>{V(!0),S(null),F(null);// Triggers validation on all fields
if(!await le())return V(!1),void S("Please fill in all required fields.");e.talks=re("talks")||[],e.posters=re("posters")||[];const a={...e,total_due:M,paypal_fee:I};try{const e=await o/* default */.A.post(`https://imc2026.imo.net/php/admin/api/update_${me?"online":"onsite"}_participant.php?id=${t}`,a,{headers:{"Content-Type":"application/json"}});if(!e.data.success)throw new Error(e.data.message||"Failed to update participant.");B((e=>!e)),F("Participant updated successfully!")}catch(e){S(e.message)}finally{V(!1)}})),children:[(0,T.jsx)("ul",{className:r()("nav nav-tabs mb-3 mt-2",s/* default */.A.tab,"flex-column flex-sm-row"),children:[{key:"summary",label:"Billing"},{key:"identity",label:"Identity"},...C?[{key:"workshops",label:"Workshops"}]:[],...me?[]:[{key:"arrival",label:"Arrival"}],{key:"contribution",label:"Contribution"},...me?[{key:"accommodation",label:"Pay. Method"}]:[{key:"accommodation",label:"Acc. & Pay. Method"}],...me?[]:[{key:"extras",label:"Extras"}],{key:"comments",label:"Comments"},{key:"admin_notes",label:"Marc's notes"}].map((({key:e,label:t})=>(0,T.jsx)("li",{className:"nav-item",children:(0,T.jsx)("a",{className:r()("nav-link",z===e&&s/* default */.A.active),href:`${pe}/${e}`,onClick:t=>{t.preventDefault(),W(`${pe}/${e}`)},children:be&&"admin_notes"===e?(0,T.jsxs)("span",{className:"position-relative",children:[(0,T.jsx)("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",children:"!"}),t]}):(0,T.jsx)(T.Fragment,{children:t})})},e)))}),(0,T.jsxs)("div",{className:r()("tab-content mx-auto",s/* default */.A.contentMxw),children:["identity"===a&&(0,T.jsxs)(T.Fragment,{children:[(0/* default */,T.jsx)(g.A,{isAdmin:!0,isOnline:me,register:ae,errors:se,setValue:ie,trigger:le}),(0/* default */,T.jsx)(x.A,{isAdmin:!0,register:ae,setValue:ie,errors:se,trigger:le,initialData:R?.participant,watch:ce})]}),C&&"workshops"===a&&(0/* default */,T.jsx)(w.A,{isAdmin:!0,isOnline:me,conferenceData:h/* conferenceData */.p,register:ae,errors:se,setValue:ie,trigger:le,watch:ce,workshops:q}),"arrival"===a&&!me&&(0/* default */,T.jsx)(_.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ae,errors:se,setValue:ie,trigger:le}),"contribution"===a&&(0/* default */,T.jsx)(N.A,{isAdmin:!0,isOnline:me,conferenceData:h/* conferenceData */.p,control:te,register:ae,errors:se,getValues:re,setValue:ie,watch:ce,trigger:le,sessions:J}),"accommodation"===a&&(0/* default */,T.jsx)(v.A,{isAdmin:!0,isOnline:me,isEarlyBird:(0,D/* isParticipantEarlyBird */.O)(R?.participant?.is_early_bird),conferenceData:h/* conferenceData */.p,control:te,register:ae,errors:se,paymentMethods:G,setValue:ie,registrationTypes:Q,trigger:le}),"extras"===a&&!me&&(0/* default */,T.jsx)(j.A,{isAdmin:!0,conferenceData:h/* conferenceData */.p,register:ae,errors:se,getValues:re,setValue:ie,trigger:le,watch:ce,control:te}),"comments"===a&&(0,T.jsx)("div",{className:r()(i,"mx-auto"),children:(0/* default */,T.jsx)($.A,{isAdmin:!0,isOnline:me,register:ae,errors:se,setValue:ie,trigger:le})}),(0,T.jsxs)("div",{className:r()(i,"mx-auto","summary"===a&&fe?"visible":"invisible h-0 w-0 overflow-hidden"),children:[(0,T.jsxs)("div",{className:"d-flex mt-3 align-items-center justify-content-between w-100 mb-3",children:[(0,T.jsxs)("div",{children:[(0,T.jsxs)("strong",{children:[R?.participant?.first_name?R.participant.first_name.charAt(0).toUpperCase()+R.participant.first_name.slice(1):""," ",R?.participant?.last_name||""]})," ","1"===R.participant.confirmation_sent?(0,T.jsxs)(T.Fragment,{children:["has been confirmed on ",(0,T.jsx)("span",{className:"text-success",children:R.participant.confirmation_date&&(0,k/* formatFullDate */.Lu)(R.participant.confirmation_date)})]}):(0,T.jsx)(T.Fragment,{children:"❌  has NOT been confirmed yet."})]}),"1"!==R.participant.confirmation_sent&&(0,T.jsx)("div",{children:(0/* Link */,T.jsx)(y.N_,{className:"btn btn-outline-success fw-bolder",to:`/admin/participants/${me?"online":"onsite"}/payment/${t}`,children:"Go to Payments to confirm"})})]}),(0/* default */,T.jsx)(A.A,{isAdmin:!0,isOnline:me,isEarlyBird:(0,D/* isParticipantEarlyBird */.O)(R?.participant?.is_early_bird),conferenceData:h/* conferenceData */.p,getValues:re,setValue:ie,setTotal:P,setPaypalFee:Y,workshops:q,registrationTypes:Q,paymentMethods:G,watch:ce})]}),"admin_notes"===a&&(0,T.jsxs)("div",{className:r()(i,"mx-auto mb-3"),children:[(0,T.jsx)("label",{htmlFor:"admin_notes",className:"form-label fw-bold",children:"Admin Notes"}),(0,T.jsx)("textarea",{id:"admin_notes",className:"form-control",placeholder:"Enter your admin notes here",rows:6,...ae("admin_notes")}),se.admin_notes&&(0,T.jsx)("div",{className:"text-danger mt-1",children:se.admin_notes.message})]}),(0,T.jsx)("div",{className:"mt-4 d-flex justify-content-end",children:(0,T.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:U,children:U?"Saving...":"Save Changes"})})]})]})]})}}
/***/,
/***/2199:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */V:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=a(6540),r=a(7767);
/* harmony import */const i=e=>{const t=(0,r/* .useNavigate */.Zp)(),a=(0,r/* .useLocation */.zy)();(0,n.useEffect)((()=>{const t=t=>{e&&(t.preventDefault(),t.returnValue="You have unsaved changes. Do you really want to leave?")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e]),(0,n.useEffect)((()=>{const n=n=>{if(e){window.confirm("You have unsaved changes. Do you really want to leave?")||(n.preventDefault(),t(a.pathname,{replace:!0}))}};return window.addEventListener("popstate",n),()=>{window.removeEventListener("popstate",n)}}),[e,t,a.pathname])};
/***/},
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=(e,{interval:t=1e3,retries:a=6}={})=>new Promise(((r,i)=>{e().then(r).catch((s=>{setTimeout((()=>{a?n(e,{interval:1.5*t,retries:a-1}).then(r,i):i(s)}),t)}))}));
/***/},
/***/4178:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>n
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const n={root:"tabs-module__root--Gb7PE","is-admin":"tabs-module__is-admin--ysiPF",tab:"tabs-module__tab--ed4Qs",active:"tabs-module__active--frwOf",contentMxw:"tabs-module__contentMxw--q4nV3"};
/***/},
/***/5846:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Ai:()=>/* binding */m
/* harmony export */,Lu:()=>/* binding */c
/* harmony export */,p6:()=>/* binding */l
/* harmony export */});
// ---- Utilities ----
const n=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},r=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,a,n]=e.split("-").map(Number);return new Date(Date.UTC(t,a-1,n))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const a=new Date(e.replace(" ","T"));if(!Number.isNaN(a.getTime()))return a}return new Date(NaN)},i=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,s=(e,{locale:t="en-US",timeZone:a="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:a}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:a}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:a}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:a}).format(e))}),o=e=>{const[t,a,n]=String(e).split("-").map(Number);return new Date(Date.UTC(t,a-1,n))},l=(e,t,{locale:a="en-US",timeZone:r="UTC"}={})=>{const l=o(e),c=o(t);if(!i(l)||!i(c))return"";const m=s(l,{locale:a,timeZone:r}),d=s(c,{locale:a,timeZone:r});if(m.monthName===d.monthName&&l.getUTCFullYear()===c.getUTCFullYear())return`${m.monthName} ${m.day}${n(m.day)} - ${d.day}${n(d.day)}`;
// Different month and/or year
return`${`${m.monthName} ${m.day}${n(m.day)}${l.getUTCFullYear()!==c.getUTCFullYear()?` ${m.year}`:""}`} - ${`${d.monthName} ${d.day}${n(d.day)} ${d.year}`}`},c=(e,t=!0,a=!1,o={})=>((e,t=!1,a=!0,o=!1,{locale:l="en-US",timeZone:c="UTC"}={})=>{const m=r(e);if(!i(m))return"";// safe fallback
const{day:d,monthName:u,weekday:p,year:h}=s(m,{locale:l,timeZone:c});return`${t?`${p}, `:""}${d}${n(d)}${a?` ${u}`:""}${o?` ${h}`:""}`})(e,!0,t,a,o),m=(e,t,a=!0,n=!0,{locale:s="en-US",timeZone:o="UTC"}={})=>{const l=r(e);if(!i(l))return"";const m=(d=l,u=t,new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()+Number(u))));var d,u;return c(m,a,n,{locale:s,timeZone:o})};
// Robust date parser (handles Date | number | string)
}
/***/}]);