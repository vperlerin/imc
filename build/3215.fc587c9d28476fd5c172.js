"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[3215],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */x});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),i=a.n(s),l=a(8027),c=a(6540),r=a(5846),o=a(7762),d=a(4848);// ./src/admin/components/admin-table/index.js
const m=o/* conferenceData */.p?.costs?.rooms??[],u=new Set(m.map((e=>String(e?.type??"").toLowerCase().trim())).filter(Boolean)),h=String(m.find((e=>"no"===String(e?.type??"").toLowerCase().trim()))?.type??"no").toLowerCase(),p=e=>{const t=String(e??"").toLowerCase().trim();return u.has(t)?t:h},x=({participants:e,withActions:t=!0,customActions:a=null,onDelete:s=null,onCanBePublicChange:o=null,canBePublicSavingId:m=null,isOnsite:u=!1})=>{const[h,x]=(0,c.useState)(null),[f,b]=(0,c.useState)("asc"),j=e=>{h===e?b("asc"===f?"desc":"asc"):(x(e),b("asc"))},g=[...e].sort(((e,t)=>{if(!h)return 0;let a=e[h],n=t[h];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(h)&&(a=parseFloat(a)||0,n=parseFloat(n)||0),"due_amount"===h){const s=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,n=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+n-a:t-a};a=s(e),n=s(t)}
// Handle dates
return["created_at","confirmation_date"].includes(h)&&(a=a?new Date(a).getTime():0,n=n?new Date(n).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===h&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",n=t.payment_method_name?t.payment_method_name.toLowerCase():""),"accommodation_type"===h&&(a=p(e.accommodation_type),n=p(t.accommodation_type)),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===h&&(a="1"===a?1:0,n="1"===n?1:0),"can_be_public"===h&&(a="1"===a||1===a?1:0,n="1"===n||1===n?1:0),a<n?"asc"===f?-1:1:a>n?"asc"===f?1:-1:0})),N=9+(o?1:0)+(u?1:0)+(t||a?1:0);
return(0,d.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,d.jsxs)("table",{className:"table table-striped",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{className:n,onClick:()=>j("id"),children:"#"}),(0,d.jsx)("th",{className:n,onClick:()=>j("created_at"),children:"Reg. Date"}),(0,d.jsx)("th",{className:n,onClick:()=>j("last_name"),children:"Name"}),o&&(0,d.jsx)("th",{className:n,title:"Show name on /community/participants",onClick:()=>j("can_be_public"),children:"Public list"}),(0,d.jsx)("th",{className:n,onClick:()=>j("total_due"),children:"Total"}),(0,d.jsx)("th",{className:n,onClick:()=>j("total_paid"),children:"Paid"}),(0,d.jsx)("th",{className:n,onClick:()=>j("due_amount"),children:"Due"}),(0,d.jsx)("th",{className:n,onClick:()=>j("payment_method"),children:"Method"}),u&&(0,d.jsx)("th",{className:n,title:"Accommodation",onClick:()=>j("accommodation_type"),children:"Acc."}),(0,d.jsx)("th",{className:n,onClick:()=>j("confirmation_sent"),children:"Confirmed"}),(0,d.jsx)("th",{className:n,onClick:()=>j("confirmation_date"),children:"Conf. Email"}),(t||a)&&(0,d.jsx)("th",{})]})}),(0,d.jsx)("tbody",{children:g.length>0?g.map((e=>{const n=parseFloat(e.total_due)||0,c=parseFloat(e.total_paid)||0,h=parseFloat(e.paypal_fee||0),x="paypal"===e.payment_method_name?.toLowerCase(),f=x?n+h-c:n-c;
return(0,d.jsxs)("tr",{className:"cancelled"===e.status?"text-warning ":"",children:[(0,d.jsx)("td",{children:e.id}),(0,d.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,d.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),o&&(0,d.jsx)("td",{children:(0,d.jsx)("input",{type:"checkbox",className:"form-check-input",title:"Show name on public participants page",checked:"1"===e.can_be_public||1===e.can_be_public,disabled:m===e.id,onChange:t=>o(e,t.target.checked)})}),(0,d.jsxs)("td",{children:[x?(n+h).toFixed(2):n.toFixed(2),"€"]}),(0,d.jsxs)("td",{children:[c.toFixed(2),"€"]}),(0,d.jsxs)("td",{className:i()({"text-success":0===f}),children:[f.toFixed(2),"€"]}),(0,d.jsx)("td",{children:e.payment_method_name||"n/a"}),u&&(0,d.jsx)("td",{children:p(e.accommodation_type)}),(0,d.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,d.jsx)("td",{className:i()("cancelled"===e.status?"text-warning":e?.confirmation_date&&"text-success"),children:"cancelled"===e.status?"CANCELLED":e.confirmation_date?(0,r/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),t&&s&&(0,d.jsx)("td",{children:(0,d.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:["cancelled"===e.status?(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Reimbursements"}):(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,d.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{s?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,d.jsx)(l.H8h,{})})]})}),a&&"cancelled"!==e.status&&(0,d.jsx)(d.Fragment,{children:a})]},e.id)})):(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:N,className:"text-center",children:"No participants found."})})})]})})}}
/***/,
/***/1503:
/***/(e,t,a)=>{a.r(t),
/* harmony export */a.d(t,{
/* harmony export */default:()=>b
/* harmony export */});
/* harmony import */var n=a(578),s=a(6942),i=a.n(s),l=a(4178),c=a(7647),r=a(6645),o=a(1083),d=a(6540),m=a(408),u=a(3388),h=a(7806),p=a(7767),x=a(8057),f=a(4848);
/* harmony import */const b=()=>{const{tab:e}=(0,p/* .useParams */.g)(),[t,a]=(0,d.useState)(e||"unconfirmed"),[s,b]=(0,d.useState)([]),[j,g]=(0,d.useState)(""),[N,_]=(0,d.useState)("last_name"),[y,w]=(0,d.useState)(null),[C,v]=(0,d.useState)(!1),[k,S]=(0,d.useState)(!1),[D,$]=(0,d.useState)(""),[T,F]=(0,d.useState)(""),[A,P]=(0,d.useState)(""),[U,L]=(0,d.useState)(null),E=(0,p/* .useNavigate */.Zp)(),{participants:Z,loading:I,error:Y,setParticipants:B}=(0,u/* .useApiOnsiteParticipants */.E)(!1,!0),{deleteParticipant:M,errorDelete:O,isDeleting:R}=(0,h/* .useApiDeleteParticipant */.A)(B,b);

(0,d.useEffect)((()=>{a(e||"unconfirmed")}),[e]),(0,d.useEffect)((()=>{const e=Z.filter((e=>"confirmed"===t?"1"===e.confirmation_sent&&"cancelled"!==e.status:"cancelled"===t?"cancelled"===e.status:"1"!==e.confirmation_sent&&"cancelled"!==e.status));if(j){const t=j.toLowerCase();b(e.filter((e=>(e[N]?String(e[N]).toLowerCase():"").includes(t))))}else b(e)}),[j,N,Z,t]);
// Calculate totals
const H=Z.filter((e=>"cancelled"===e.status)).length,V=Z.filter((e=>"1"===e.confirmation_sent&&"cancelled"!==e.status)).length,W=Z.filter((e=>"1"!==e.confirmation_sent&&"cancelled"!==e.status)).length,q=async e=>{if(y)try{const t=await M(y,e);t?.data?.success?($(t.data.message||"Participant deleted successfully!"),F("")):F(t?.data?.message||"Impossible to delete the participant for now, please try again later.")}catch(e){F("An unexpected error occurred while deleting the participant.")}finally{
// Close the correct modal depending on type
"soft"===e?v(!1):S(!1),w(null)}};
return(0/* ["default"] */,f.jsxs)(c.A,{breadcrumb:[{url:"/admin/participants/onsite",name:"On-site Participants"}],isMaxWidth:!0,title:"ON-SITE Participants",rightContent:(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("strong",{children:"Confirmed:"})," ",(0,f.jsx)("strong",{className:"text-success",children:V})," ","| ",(0,f.jsx)("strong",{children:"Unconfirmed:"})," ",(0,f.jsx)("strong",{className:"text-warning",children:W})," ","| ",(0,f.jsx)("strong",{children:"Cancelled:"})," ",(0,f.jsx)("strong",{className:"text-danger",children:H})," ","| ",(0,f.jsx)("strong",{children:"Total:"})," ",(0,f.jsx)("strong",{children:Z.length})]})}),children:[T&&(0,f.jsx)("div",{className:"alert alert-danger fw-bolder",children:T}),D&&(0,f.jsx)("div",{className:"alert alert-success fw-bolder",children:D}),Y&&(0,f.jsx)("p",{className:"alert alert-danger fw-bolder",children:Y}),A&&(0,f.jsx)("div",{className:"alert alert-danger fw-bolder",children:A}),I||R?(0/* ["default"] */,f.jsx)(r.A,{}):(0,f.jsxs)(f.Fragment,{children:[O&&(0,f.jsx)("p",{className:"alert alert-danger",children:O}),(0,f.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,f.jsxs)("select",{className:"form-select w-auto",value:N,onChange:e=>_(e.target.value),children:[(0,f.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,f.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,f.jsxs)("div",{className:"position-relative w-auto",children:[(0,f.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${N.replace("_"," ")}`,value:j,onChange:e=>g(e.target.value)}),(0/* .CiSearch */,f.jsx)(m.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* ["default"] */,f.jsx)(x.A,{className:"ms-auto",link:"https://imc2026.imo.net/php/doc_participants.php"})]}),(0,f.jsxs)("ul",{className:i()("nav nav-tabs mb-3 mt-2",l/* ["default"] */.A.tab,"flex-column flex-sm-row w-100"),children:[(0,f.jsx)("li",{className:"nav-item",children:(0,f.jsxs)("a",{className:`nav-link ${"unconfirmed"===t?l/* ["default"] */.A.active:""}`,href:"/admin/participants/onsite",onClick:e=>{e.preventDefault(),E("/admin/participants/onsite")},children:["Unconfirmed",W>0&&(0,f.jsx)("span",{className:"badge text-bg-warning ms-2",children:W})]})}),(0,f.jsx)("li",{className:"nav-item",children:(0,f.jsxs)("a",{className:`nav-link ${"confirmed"===t?l/* ["default"] */.A.active:""}`,href:"/admin/participants/onsite/confirmed",onClick:e=>{e.preventDefault(),E("/admin/participants/onsite/confirmed")},children:["Confirmed",V>0&&(0,f.jsx)("span",{className:"badge text-bg-success ms-2",children:V})]})}),(0,f.jsx)("li",{className:"nav-item",children:(0,f.jsxs)("a",{className:`nav-link ${"cancelled"===t?l/* ["default"] */.A.active:""}`,href:"/admin/participants/onsite/cancelled",onClick:e=>{e.preventDefault(),E("/admin/participants/onsite/cancelled")},children:["Cancelled",H>0&&(0,f.jsx)("span",{className:"badge text-bg-danger ms-2",children:H})]})})]}),(0/* ["default"] */,f.jsx)(n.A,{participants:s,onDelete:e=>{w(e),v(!0)},onCanBePublicChange:async(e,t)=>{P(""),L(e.id);try{const{data:a}=await o/* ["default"] */.A.post(`https://imc2026.imo.net/php/admin/api/set_participant_can_be_public.php?id=${e.id}`,{can_be_public:t});if(a?.success){const a=t?1:0;B((t=>t.map((t=>t.id===e.id?{...t,can_be_public:a}:t))))}else P(a?.message||"Could not update public listing preference.")}catch(e){P(e.response?.data?.message||"Could not update public listing preference.")}finally{L(null)}},canBePublicSavingId:U,isOnsite:!0})]}),(C||k)&&(0,f.jsx)("div",{className:"modal-backdrop fade show"}),C&&y&&(0,f.jsx)("div",{className:"modal show d-block",children:(0,f.jsx)("div",{className:"modal-dialog",children:(0,f.jsxs)("div",{className:"modal-content",children:[(0,f.jsxs)("div",{className:"modal-header",children:[(0,f.jsx)("h5",{className:"modal-title",children:"Cancel Registration"}),(0,f.jsx)("button",{type:"button",className:"btn-close",onClick:()=>v(!1)})]}),(0,f.jsx)("div",{className:"modal-body",children:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("p",{children:["Are you sure you want to cancel ",(0,f.jsxs)("b",{children:[y.first_name," ",y.last_name]}),"'s registration?"]}),(0,f.jsx)("p",{children:(0,f.jsx)("strong",{children:"Choose:"})}),(0,f.jsxs)("ul",{children:[(0,f.jsxs)("li",{children:[(0,f.jsx)("strong",{className:"text-warning",children:"Soft Delete:"})," Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement."]}),(0,f.jsxs)("li",{children:[(0,f.jsx)("strong",{className:"text-danger",children:"Hard Delete:"})," Permanently removes data."]})]})]})}),(0,f.jsxs)("div",{className:"modal-footer",children:[(0,f.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>v(!1),children:"Cancel"}),(0,f.jsx)("button",{className:"btn btn-outline-warning fw-bolder",onClick:()=>q("soft"),children:"Soft Delete"}),(0,f.jsx)("button",{className:"btn btn-outline-danger fw-bolder ms-auto",onClick:()=>{v(!1),S(!0)},children:"Hard Delete"})]})]})})}),k&&(0,f.jsx)("div",{className:"modal show d-block",children:(0,f.jsx)("div",{className:"modal-dialog",children:(0,f.jsxs)("div",{className:"modal-content",children:[(0,f.jsxs)("div",{className:"modal-header",children:[(0,f.jsx)("h5",{className:"modal-title",children:"Confirm Permanent Deletion"}),(0,f.jsx)("button",{type:"button",className:"btn-close",onClick:()=>S(!1)})]}),(0,f.jsx)("div",{className:"modal-body",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("strong",{children:"Are you absolutely sure?"})," This action cannot be undone."]})}),(0,f.jsxs)("div",{className:"modal-footer",children:[(0,f.jsx)("button",{className:"btn btn-outline-danger  fw-bolder",onClick:()=>{q("hard"),S(!1)},children:"Yes, Delete"}),(0,f.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>S(!1),children:"No"})]})]})})})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=(e,{interval:t=1e3,retries:a=6}={})=>new Promise(((s,i)=>{e().then(s).catch((l=>{setTimeout((()=>{a?n(e,{interval:1.5*t,retries:a-1}).then(s,i):i(l)}),t)}))}));
/***/},
/***/3388:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */E:()=>/* binding */l
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */
/**
 * Fetch on-site participants.
 * @param {boolean} confirmedOnly - If true, only confirmed participants are returned.
 * @param {boolean} includeCancelled - If true, includes cancelled participants.
 */
const l=(e=!1,t=!1)=>{const[a,l]=(0,s.useState)([]),[c,r]=(0,s.useState)(!0),[o,d]=(0,s.useState)(null);return(0,s.useEffect)((()=>{(async()=>{try{const a=new URLSearchParams;e&&a.append("confirmed_only","1"),t&&a.append("include_cancelled","1");const s=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get(`https://imc2026.imo.net/php/admin/api/onsite_participants.php?${a.toString()}`)));if(!s.data.success||!Array.isArray(s.data.data))throw new Error(s.data.message||"Database access error, please try again.");l(s.data.data)}catch(e){d(e.message||"Failed to fetch participants. Please refresh the page.")}finally{r(!1)}})()}),[e,t]),{participants:a,loading:c,error:o,setParticipants:l}};
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
/* harmony export */,p6:()=>/* binding */r
/* harmony export */});
// ---- Utilities ----
const n=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,a,n]=e.split("-").map(Number);return new Date(Date.UTC(t,a-1,n))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const a=new Date(e.replace(" ","T"));if(!Number.isNaN(a.getTime()))return a}return new Date(NaN)},i=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,l=(e,{locale:t="en-US",timeZone:a="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:a}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:a}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:a}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:a}).format(e))}),c=e=>{const[t,a,n]=String(e).split("-").map(Number);return new Date(Date.UTC(t,a-1,n))},r=(e,t,{locale:a="en-US",timeZone:s="UTC"}={})=>{const r=c(e),o=c(t);if(!i(r)||!i(o))return"";const d=l(r,{locale:a,timeZone:s}),m=l(o,{locale:a,timeZone:s});if(d.monthName===m.monthName&&r.getUTCFullYear()===o.getUTCFullYear())return`${d.monthName} ${d.day}${n(d.day)} - ${m.day}${n(m.day)}`;
// Different month and/or year
return`${`${d.monthName} ${d.day}${n(d.day)}${r.getUTCFullYear()!==o.getUTCFullYear()?` ${d.year}`:""}`} - ${`${m.monthName} ${m.day}${n(m.day)} ${m.year}`}`},o=(e,t=!0,a=!1,c={})=>((e,t=!1,a=!0,c=!1,{locale:r="en-US",timeZone:o="UTC"}={})=>{const d=s(e);if(!i(d))return"";// safe fallback
const{day:m,monthName:u,weekday:h,year:p}=l(d,{locale:r,timeZone:o});return`${t?`${h}, `:""}${m}${n(m)}${a?` ${u}`:""}${c?` ${p}`:""}`})(e,!0,t,a,c),d=(e,t,a=!0,n=!0,{locale:l="en-US",timeZone:c="UTC"}={})=>{const r=s(e);if(!i(r))return"";const d=(m=r,u=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(u))));var m,u;return o(d,a,n,{locale:l,timeZone:c})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/7806:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=a(6540),s=a(1083);
/* harmony import */const i=(e,t)=>{const[a,i]=(0,n.useState)(null),[l,c]=(0,n.useState)(!1);return{deleteParticipant:async(a,n)=>{if(!a)return null;c(!0),i(null);try{const i=await s/* ["default"] */.A.post("https://imc2026.imo.net/php/admin/api/delete_participant.php",{id:a.id,delete_type:n});return i.data.success&&("hard"===n?(e((e=>e.filter((e=>e.id!==a.id)))),t((e=>e.filter((e=>e.id!==a.id))))):(
// Soft delete: update participant's status to 'cancelled'
e((e=>e.map((e=>e.id===a.id?{...e,status:"cancelled"}:e)))),t((e=>e.map((e=>e.id===a.id?{...e,status:"cancelled"}:e)))))),i}catch(e){const t=e.response?.data?.message||"An unexpected error occurred.";return i(t),{data:{success:!1,message:t}}}finally{c(!1)}},errorDelete:a,isDeleting:l}};
/***/}}]);