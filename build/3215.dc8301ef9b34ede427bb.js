"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[3215],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */d});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),l=a.n(s),i=a(8027),r=a(6540),c=a(5846),o=a(4848);// ./src/admin/components/admin-table/index.js
const d=({participants:e,withActions:t=!0,customActions:a=null,onDelete:s=null})=>{const[d,m]=(0,r.useState)(null),[u,h]=(0,r.useState)("asc"),p=e=>{d===e?h("asc"===u?"desc":"asc"):(m(e),h("asc"))},x=[...e].sort(((e,t)=>{if(!d)return 0;let a=e[d],n=t[d];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(d)&&(a=parseFloat(a)||0,n=parseFloat(n)||0),"due_amount"===d){const s=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,n=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+n-a:t-a};a=s(e),n=s(t)}
// Handle dates
return["created_at","confirmation_date"].includes(d)&&(a=a?new Date(a).getTime():0,n=n?new Date(n).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===d&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",n=t.payment_method_name?t.payment_method_name.toLowerCase():""),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===d&&(a="1"===a?1:0,n="1"===n?1:0),a<n?"asc"===u?-1:1:a>n?"asc"===u?1:-1:0}));
return(0,o.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,o.jsxs)("table",{className:"table table-striped",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{className:n,onClick:()=>p("id"),children:"#"}),(0,o.jsx)("th",{className:n,onClick:()=>p("created_at"),children:"Reg. Date"}),(0,o.jsx)("th",{className:n,onClick:()=>p("last_name"),children:"Name"}),(0,o.jsx)("th",{className:n,onClick:()=>p("total_due"),children:"Total"}),(0,o.jsx)("th",{className:n,onClick:()=>p("total_paid"),children:"Paid"}),(0,o.jsx)("th",{className:n,onClick:()=>p("due_amount"),children:"Due"}),(0,o.jsx)("th",{className:n,onClick:()=>p("payment_method"),children:"Method"}),(0,o.jsx)("th",{className:n,onClick:()=>p("confirmation_sent"),children:"Confirmed"}),(0,o.jsx)("th",{className:n,onClick:()=>p("confirmation_date"),children:"Conf. Email"}),(t||a)&&(0,o.jsx)("th",{})]})}),(0,o.jsx)("tbody",{children:x.length>0?x.map((e=>{const n=parseFloat(e.total_due)||0,r=parseFloat(e.total_paid)||0,d=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),u=m?n+d-r:n-r;
return(0,o.jsxs)("tr",{className:"cancelled"===e.status?"text-warning ":"",children:[(0,o.jsx)("td",{children:e.id}),(0,o.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,o.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,o.jsxs)("td",{children:[m?(n+d).toFixed(2):n.toFixed(2),"€"]}),(0,o.jsxs)("td",{children:[r.toFixed(2),"€"]}),(0,o.jsxs)("td",{className:l()({"text-success":0===u}),children:[u.toFixed(2),"€"]}),(0,o.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,o.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,o.jsx)("td",{className:l()("cancelled"===e.status?"text-warning":e?.confirmation_date&&"text-success"),children:"cancelled"===e.status?"CANCELLED":e.confirmation_date?(0,c/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),t&&s&&(0,o.jsx)("td",{children:(0,o.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:["cancelled"===e.status?(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Reimbursements"}):(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,o.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{s?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,o.jsx)(i.H8h,{})})]})}),a&&"cancelled"!==e.status&&(0,o.jsx)(o.Fragment,{children:a})]},e.id)})):(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:t?10:9,className:"text-center",children:"No participants found."})})})]})})};
/* harmony default export */}
/***/,
/***/1503:
/***/(e,t,a)=>{a.r(t),
/* harmony export */a.d(t,{
/* harmony export */default:()=>f
/* harmony export */});
/* harmony import */var n=a(578),s=a(6942),l=a.n(s),i=a(4178),r=a(7647),c=a(6645),o=a(6540),d=a(408),m=a(3388),u=a(7806),h=a(7767),p=a(8057),x=a(4848);
/* harmony import */const f=()=>{const{tab:e}=(0,h/* .useParams */.g)(),[t,a]=(0,o.useState)(e||"unconfirmed"),[s,f]=(0,o.useState)([]),[j,b]=(0,o.useState)(""),[N,g]=(0,o.useState)("last_name"),[y,_]=(0,o.useState)(null),[w,C]=(0,o.useState)(!1),[v,D]=(0,o.useState)(!1),[k,$]=(0,o.useState)(""),[S,T]=(0,o.useState)(""),F=(0,h/* .useNavigate */.Zp)(),{participants:A,loading:U,error:P,setParticipants:E}=(0,m/* .useApiOnsiteParticipants */.E)(!1,!0),{deleteParticipant:L,errorDelete:Z,isDeleting:I}=(0,u/* .useApiDeleteParticipant */.A)(E,f);

(0,o.useEffect)((()=>{a(e||"unconfirmed")}),[e]),(0,o.useEffect)((()=>{const e=A.filter((e=>"confirmed"===t?"1"===e.confirmation_sent&&"cancelled"!==e.status:"cancelled"===t?"cancelled"===e.status:"1"!==e.confirmation_sent&&"cancelled"!==e.status));if(j){const t=j.toLowerCase();f(e.filter((e=>(e[N]?String(e[N]).toLowerCase():"").includes(t))))}else f(e)}),[j,N,A,t]);
// Calculate totals
const Y=A.filter((e=>"cancelled"===e.status)).length,M=A.filter((e=>"1"===e.confirmation_sent&&"cancelled"!==e.status)).length,R=A.filter((e=>"1"!==e.confirmation_sent&&"cancelled"!==e.status)).length,H=async e=>{if(y)try{const t=await L(y,e);t?.data?.success?($(t.data.message||"Participant deleted successfully!"),T("")):T(t?.data?.message||"Impossible to delete the participant for now, please try again later.")}catch(e){T("An unexpected error occurred while deleting the participant.")}finally{
// Close the correct modal depending on type
"soft"===e?C(!1):D(!1),_(null)}};
return(0/* ["default"] */,x.jsxs)(r.A,{breadcrumb:[{url:"/admin/participants/onsite",name:"On-site Participants"}],isMaxWidth:!0,title:"ON-SITE Participants",rightContent:(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("strong",{children:"Confirmed:"})," ",(0,x.jsx)("strong",{className:"text-success",children:M})," ","| ",(0,x.jsx)("strong",{children:"Unconfirmed:"})," ",(0,x.jsx)("strong",{className:"text-warning",children:R})," ","| ",(0,x.jsx)("strong",{children:"Cancelled:"})," ",(0,x.jsx)("strong",{className:"text-danger",children:Y})," ","| ",(0,x.jsx)("strong",{children:"Total:"})," ",(0,x.jsx)("strong",{children:A.length})]})}),children:[S&&(0,x.jsx)("div",{className:"alert alert-danger fw-bolder",children:S}),k&&(0,x.jsx)("div",{className:"alert alert-success fw-bolder",children:k}),P&&(0,x.jsx)("p",{className:"alert alert-danger fw-bolder",children:P}),U||I?(0/* ["default"] */,x.jsx)(c.A,{}):(0,x.jsxs)(x.Fragment,{children:[Z&&(0,x.jsx)("p",{className:"alert alert-danger",children:Z}),(0,x.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,x.jsxs)("select",{className:"form-select w-auto",value:N,onChange:e=>g(e.target.value),children:[(0,x.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,x.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,x.jsxs)("div",{className:"position-relative w-auto",children:[(0,x.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${N.replace("_"," ")}`,value:j,onChange:e=>b(e.target.value)}),(0/* .CiSearch */,x.jsx)(d.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* ["default"] */,x.jsx)(p.A,{className:"ms-auto",link:"https://imc2025.imo.net/php/doc_participants.php"})]}),(0,x.jsxs)("ul",{className:l()("nav nav-tabs mb-3 mt-2",i/* ["default"] */.A.tab,"flex-column flex-sm-row w-100"),children:[(0,x.jsx)("li",{className:"nav-item",children:(0,x.jsxs)("a",{className:`nav-link ${"unconfirmed"===t?i/* ["default"] */.A.active:""}`,href:"/admin/participants/onsite",onClick:e=>{e.preventDefault(),F("/admin/participants/onsite")},children:["Unconfirmed",(0,x.jsx)("span",{className:"badge text-bg-warning ms-2",children:R})]})}),(0,x.jsx)("li",{className:"nav-item",children:(0,x.jsxs)("a",{className:`nav-link ${"confirmed"===t?i/* ["default"] */.A.active:""}`,href:"/admin/participants/onsite/confirmed",onClick:e=>{e.preventDefault(),F("/admin/participants/onsite/confirmed")},children:["Confirmed",(0,x.jsx)("span",{className:"badge text-bg-success ms-2",children:M})]})}),(0,x.jsx)("li",{className:"nav-item",children:(0,x.jsxs)("a",{className:`nav-link ${"cancelled"===t?i/* ["default"] */.A.active:""}`,href:"/admin/participants/onsite/cancelled",onClick:e=>{e.preventDefault(),F("/admin/participants/onsite/cancelled")},children:["Cancelled",(0,x.jsx)("span",{className:"badge text-bg-danger ms-2",children:Y})]})})]}),(0/* ["default"] */,x.jsx)(n.A,{participants:s,onDelete:e=>{_(e),C(!0)}})]}),(w||v)&&(0,x.jsx)("div",{className:"modal-backdrop fade show"}),w&&y&&(0,x.jsx)("div",{className:"modal show d-block",children:(0,x.jsx)("div",{className:"modal-dialog",children:(0,x.jsxs)("div",{className:"modal-content",children:[(0,x.jsxs)("div",{className:"modal-header",children:[(0,x.jsx)("h5",{className:"modal-title",children:"Cancel Registration"}),(0,x.jsx)("button",{type:"button",className:"btn-close",onClick:()=>C(!1)})]}),(0,x.jsx)("div",{className:"modal-body",children:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("p",{children:["Are you sure you want to cancel ",(0,x.jsxs)("b",{children:[y.first_name," ",y.last_name]}),"'s registration?"]}),(0,x.jsx)("p",{children:(0,x.jsx)("strong",{children:"Choose:"})}),(0,x.jsxs)("ul",{children:[(0,x.jsxs)("li",{children:[(0,x.jsx)("strong",{className:"text-warning",children:"Soft Delete:"})," Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement."]}),(0,x.jsxs)("li",{children:[(0,x.jsx)("strong",{className:"text-danger",children:"Hard Delete:"})," Permanently removes data."]})]})]})}),(0,x.jsxs)("div",{className:"modal-footer",children:[(0,x.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>C(!1),children:"Cancel"}),(0,x.jsx)("button",{className:"btn btn-outline-warning fw-bolder",onClick:()=>H("soft"),children:"Soft Delete"}),(0,x.jsx)("button",{className:"btn btn-outline-danger fw-bolder ms-auto",onClick:()=>{C(!1),D(!0)},children:"Hard Delete"})]})]})})}),v&&(0,x.jsx)("div",{className:"modal show d-block",children:(0,x.jsx)("div",{className:"modal-dialog",children:(0,x.jsxs)("div",{className:"modal-content",children:[(0,x.jsxs)("div",{className:"modal-header",children:[(0,x.jsx)("h5",{className:"modal-title",children:"Confirm Permanent Deletion"}),(0,x.jsx)("button",{type:"button",className:"btn-close",onClick:()=>D(!1)})]}),(0,x.jsx)("div",{className:"modal-body",children:(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Are you absolutely sure?"})," This action cannot be undone."]})}),(0,x.jsxs)("div",{className:"modal-footer",children:[(0,x.jsx)("button",{className:"btn btn-outline-danger  fw-bolder",onClick:()=>{H("hard"),D(!1)},children:"Yes, Delete"}),(0,x.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>D(!1),children:"No"})]})]})})})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=(e,{interval:t=100,retries:a=14}={})=>new Promise(((s,l)=>{e().then(s).catch((i=>{setTimeout((()=>{a?n(e,{interval:1.5*t,retries:a-1}).then(s,l):l(i)}),t)}))}));
/***/},
/***/3388:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */E:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),l=a(1083);
/* harmony import */
/**
 * Fetch on-site participants.
 * @param {boolean} confirmedOnly - If true, only confirmed participants are returned.
 * @param {boolean} includeCancelled - If true, includes cancelled participants.
 */
const i=(e=!1,t=!1)=>{const[a,i]=(0,s.useState)([]),[r,c]=(0,s.useState)(!0),[o,d]=(0,s.useState)(null);return(0,s.useEffect)((()=>{(async()=>{try{const a=new URLSearchParams;e&&a.append("confirmed_only","1"),t&&a.append("include_cancelled","1");const s=await(0,n/* .retry */.L)((()=>l/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/onsite_participants.php?${a.toString()}`)));if(!s.data.success||!Array.isArray(s.data.data))throw new Error(s.data.message||"Database access error, please try again.");i(s.data.data)}catch(e){d(e.message||"Failed to fetch participants. Please refresh the page.")}finally{c(!1)}})()}),[e,t]),{participants:a,loading:r,error:o,setParticipants:i}};
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
/* harmony export */Ai:()=>/* binding */d
/* harmony export */,Lu:()=>/* binding */o
/* harmony export */,p6:()=>/* binding */c
/* harmony export */});
// ---- Utilities ----
const n=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,a,n]=e.split("-").map(Number);return new Date(Date.UTC(t,a-1,n))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const a=new Date(e.replace(" ","T"));if(!Number.isNaN(a.getTime()))return a}return new Date(NaN)},l=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,i=(e,{locale:t="en-US",timeZone:a="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:a}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:a}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:a}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:a}).format(e))}),r=e=>{const[t,a,n]=String(e).split("-").map(Number);return new Date(Date.UTC(t,a-1,n))},c=(e,t,{locale:a="en-US",timeZone:s="UTC"}={})=>{const c=r(e),o=r(t);if(!l(c)||!l(o))return"";const d=i(c,{locale:a,timeZone:s}),m=i(o,{locale:a,timeZone:s});if(d.monthName===m.monthName&&c.getUTCFullYear()===o.getUTCFullYear())return`${d.monthName} ${d.day}${n(d.day)} - ${m.day}${n(m.day)}`;
// Different month and/or year
return`${`${d.monthName} ${d.day}${n(d.day)}${c.getUTCFullYear()!==o.getUTCFullYear()?` ${d.year}`:""}`} - ${`${m.monthName} ${m.day}${n(m.day)} ${m.year}`}`},o=(e,t=!0,a=!1,r={})=>((e,t=!1,a=!0,r=!1,{locale:c="en-US",timeZone:o="UTC"}={})=>{const d=s(e);if(!l(d))return"";// safe fallback
const{day:m,monthName:u,weekday:h,year:p}=i(d,{locale:c,timeZone:o});return`${t?`${h}, `:""}${m}${n(m)}${a?` ${u}`:""}${r?` ${p}`:""}`})(e,!0,t,a,r),d=(e,t,a=!0,n=!0,{locale:i="en-US",timeZone:r="UTC"}={})=>{const c=s(e);if(!l(c))return"";const d=(m=c,u=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(u))));var m,u;return o(d,a,n,{locale:i,timeZone:r})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/7806:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>/* binding */l
/* harmony export */});
/* harmony import */var n=a(6540),s=a(1083);
/* harmony import */const l=(e,t)=>{const[a,l]=(0,n.useState)(null),[i,r]=(0,n.useState)(!1);return{deleteParticipant:async(a,n)=>{if(!a)return null;r(!0),l(null);try{const l=await s/* ["default"] */.A.post("https://imc2025.imo.net/php/admin/api/delete_participant.php",{id:a.id,delete_type:n});return l.data.success&&("hard"===n?(e((e=>e.filter((e=>e.id!==a.id)))),t((e=>e.filter((e=>e.id!==a.id))))):(
// Soft delete: update participant's status to 'cancelled'
e((e=>e.map((e=>e.id===a.id?{...e,status:"cancelled"}:e)))),t((e=>e.map((e=>e.id===a.id?{...e,status:"cancelled"}:e)))))),l}catch(e){const t=e.response?.data?.message||"An unexpected error occurred.";return l(t),{data:{success:!1,message:t}}}finally{r(!1)}},errorDelete:a,isDeleting:i}};
/***/}}]);