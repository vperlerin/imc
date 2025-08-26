"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[3342],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */d});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),l=a.n(s),i=a(8027),r=a(6540),c=a(5846),o=a(4848);// ./src/admin/components/admin-table/index.js
const d=({participants:e,withActions:t=!0,customActions:a=null,onDelete:s=null})=>{const[d,m]=(0,r.useState)(null),[h,u]=(0,r.useState)("asc"),p=e=>{d===e?u("asc"===h?"desc":"asc"):(m(e),u("asc"))},x=[...e].sort(((e,t)=>{if(!d)return 0;let a=e[d],n=t[d];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(d)&&(a=parseFloat(a)||0,n=parseFloat(n)||0),"due_amount"===d){const s=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,n=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+n-a:t-a};a=s(e),n=s(t)}
// Handle dates
return["created_at","confirmation_date"].includes(d)&&(a=a?new Date(a).getTime():0,n=n?new Date(n).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===d&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",n=t.payment_method_name?t.payment_method_name.toLowerCase():""),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===d&&(a="1"===a?1:0,n="1"===n?1:0),a<n?"asc"===h?-1:1:a>n?"asc"===h?1:-1:0}));
return(0,o.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,o.jsxs)("table",{className:"table table-striped",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{className:n,onClick:()=>p("id"),children:"#"}),(0,o.jsx)("th",{className:n,onClick:()=>p("created_at"),children:"Reg. Date"}),(0,o.jsx)("th",{className:n,onClick:()=>p("last_name"),children:"Name"}),(0,o.jsx)("th",{className:n,onClick:()=>p("total_due"),children:"Total"}),(0,o.jsx)("th",{className:n,onClick:()=>p("total_paid"),children:"Paid"}),(0,o.jsx)("th",{className:n,onClick:()=>p("due_amount"),children:"Due"}),(0,o.jsx)("th",{className:n,onClick:()=>p("payment_method"),children:"Method"}),(0,o.jsx)("th",{className:n,onClick:()=>p("confirmation_sent"),children:"Confirmed"}),(0,o.jsx)("th",{className:n,onClick:()=>p("confirmation_date"),children:"Conf. Email"}),(t||a)&&(0,o.jsx)("th",{})]})}),(0,o.jsx)("tbody",{children:x.length>0?x.map((e=>{const n=parseFloat(e.total_due)||0,r=parseFloat(e.total_paid)||0,d=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),h=m?n+d-r:n-r;
return(0,o.jsxs)("tr",{className:"cancelled"===e.status?"text-warning ":"",children:[(0,o.jsx)("td",{children:e.id}),(0,o.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,o.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,o.jsxs)("td",{children:[m?(n+d).toFixed(2):n.toFixed(2),"€"]}),(0,o.jsxs)("td",{children:[r.toFixed(2),"€"]}),(0,o.jsxs)("td",{className:l()({"text-success":0===h}),children:[h.toFixed(2),"€"]}),(0,o.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,o.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,o.jsx)("td",{className:l()("cancelled"===e.status?"text-warning":e?.confirmation_date&&"text-success"),children:"cancelled"===e.status?"CANCELLED":e.confirmation_date?(0,c/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),t&&s&&(0,o.jsx)("td",{children:(0,o.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:["cancelled"===e.status?(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Reimbursements"}):(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,o.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{s?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,o.jsx)(i.H8h,{})})]})}),a&&"cancelled"!==e.status&&(0,o.jsx)(o.Fragment,{children:a})]},e.id)})):(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:t?10:9,className:"text-center",children:"No participants found."})})})]})})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=(e,{interval:t=100,retries:a=14}={})=>new Promise(((s,l)=>{e().then(s).catch((i=>{setTimeout((()=>{a?n(e,{interval:1.5*t,retries:a-1}).then(s,l):l(i)}),t)}))}));
/***/},
/***/4265:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */$:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),l=a(1083);
/* harmony import */
/**
 * Fetch online participants.
 * @param {boolean} confirmedOnly - If true, only confirmed participants are returned.
 * @param {boolean} includeCancelled - If true, includes cancelled participants.
 */
const i=(e=!1,t=!1)=>{const[a,i]=(0,s.useState)([]),[r,c]=(0,s.useState)(!0),[o,d]=(0,s.useState)(null);// Re-fetch on changes
return(0,s.useEffect)((()=>{(async()=>{try{const a=new URLSearchParams;e&&a.append("confirmed_only","1"),t&&a.append("include_cancelled","1");const s=await(0,n/* .retry */.L)((()=>l/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/online_participants.php?${a.toString()}`)));if(!s.data.success||!Array.isArray(s.data.data))throw new Error(s.data.message||"Database access error, please try again.");i(s.data.data)}catch(e){d(e.message||"Failed to fetch participants. Please refresh the page.")}finally{c(!1)}})()}),[e,t]),{participants:a,loading:r,error:o,setParticipants:i}};
/***/},
/***/5846:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Ai:()=>/* binding */o
/* harmony export */,Lu:()=>/* binding */c
/* harmony export */,p6:()=>/* binding */r
/* harmony export */});
// ---- Utilities ----
const n=e=>{const t=Number(e);if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,a,n]=e.split("-").map(Number);return new Date(Date.UTC(t,a-1,n))}
// Try ISO; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t))return t;const a=new Date(e.replace(" ","T"));if(!Number.isNaN(a))return a}return new Date(NaN)},l=e=>e instanceof Date&&!Number.isNaN(e)
// Get parts safely, defaulting to UTC for consistency with pure dates
,i=(e,{locale:t="en-US",timeZone:a="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:a}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:a}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:a}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:a}).format(e))}),r=(e,t,{locale:a="en-US",timeZone:r="UTC"}={})=>{const c=s(e),o=s(t);if(!l(c)||!l(o))return"";const d=i(c,{locale:a,timeZone:r}),m=i(o,{locale:a,timeZone:r});return d.monthName===m.monthName&&c.getUTCFullYear()===o.getUTCFullYear()?`${d.monthName} ${d.day}${n(d.day)} - ${m.day}${n(m.day)}`:`${d.monthName} ${d.day}${n(d.day)} - ${m.monthName} ${m.day}${n(m.day)}`;
// Different months (or years)
},c=(e,t=!0,a=!1,r={})=>((e,t=!1,a=!0,r=!1,{locale:c="en-US",timeZone:o="UTC"}={})=>{const d=s(e);if(!l(d))return"";// or return a fallback like "—"
const{day:m,monthName:h,weekday:u,year:p}=i(d,{locale:c,timeZone:o});return`${t?`${u}, `:""}${m}${n(m)}${a?` ${h}`:""}${r?` ${p}`:""}`})(e,!0,t,a,r),o=(e,t,a=!0,n=!0,{locale:i="en-US",timeZone:r="UTC"}={})=>{const o=s(e);if(!l(o))return"";const d=(m=o,h=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(h))));var m,h;return c(d,a,n,{locale:i,timeZone:r})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/7382:
/***/(e,t,a)=>{a.r(t),
/* harmony export */a.d(t,{
/* harmony export */default:()=>h
/* harmony export */});
/* harmony import */var n=a(408),s=a(7647),l=a(6645),i=a(8057),r=a(6540),c=a(4265),o=a(7806),d=a(578),m=a(4848);
/* harmony import */const h=()=>{const[e,t]=(0,r.useState)([]),[a,h]=(0,r.useState)(""),[u,p]=(0,r.useState)("last_name"),[x,f]=(0,r.useState)(null),[j,N]=(0,r.useState)(!1),[b,y]=(0,r.useState)(!1),[g,w]=(0,r.useState)(""),[_,C]=(0,r.useState)(""),{participants:v,loading:D,error:k,setParticipants:$}=(0,c/* .useApiOnlineParticipants */.$)(!1,!0),{deleteParticipant:S,errorDelete:F,isDeleting:T}=(0,o/* .useApiDeleteParticipant */.A)($,t);(0,r.useEffect)((()=>{if(a){const e=a.toLowerCase();t(v.filter((t=>(t[u]?String(t[u]).toLowerCase():"").includes(e))))}else t(v)}),[a,u,v]);
// Calculate totals
const A=v.length,U=v.filter((e=>"1"===e.confirmation_sent)).length,L=async e=>{if(x)try{const t=await S(x,e);t?.data?.success?(w(t.data.message||"Participant deleted successfully!"),C("")):C(t?.data?.message||"Impossible to delete the participant for now, please try again later.")}catch(e){C("An unexpected error occurred while deleting the participant.")}finally{
// Close the correct modal depending on type
"soft"===e?N(!1):y(!1),f(null)}};
return(0/* ["default"] */,m.jsxs)(s.A,{breadcrumb:[{url:"/admin/participants/online",name:"Online Participants"}],isMaxWidth:!0,title:"ONLINE Participants",rightContent:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("strong",{children:"Confirmed:"})," ",(0,m.jsx)("strong",{className:"text-success",children:U})," / ",A]}),children:[_&&(0,m.jsx)("div",{className:"alert alert-danger fw-bolder",children:_}),g&&(0,m.jsx)("div",{className:"alert alert-success fw-bolder",children:g}),k&&(0,m.jsx)("p",{className:"alert alert-danger fw-bolder",children:k}),D||T?(0/* ["default"] */,m.jsx)(l.A,{}):(0,m.jsxs)(m.Fragment,{children:[F&&(0,m.jsx)("p",{className:"alert alert-danger",children:F}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("select",{className:"form-select w-auto",value:u,onChange:e=>p(e.target.value),children:[(0,m.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,m.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${u.replace("_"," ")}`,value:a,onChange:e=>h(e.target.value)}),(0/* .CiSearch */,m.jsx)(n.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* ["default"] */,m.jsx)(i.A,{className:"ms-auto",link:"https://imc2025.imo.net/php/doc_participants.php"})]}),(0/* ["default"] */,m.jsx)(d.A,{participants:e,onDelete:e=>{f(e),N(!0)}})]}),(j||b)&&(0,m.jsx)("div",{className:"modal-backdrop fade show"}),j&&x&&(0,m.jsx)("div",{className:"modal show d-block",children:(0,m.jsx)("div",{className:"modal-dialog",children:(0,m.jsxs)("div",{className:"modal-content",children:[(0,m.jsxs)("div",{className:"modal-header",children:[(0,m.jsx)("h5",{className:"modal-title",children:"Cancel Registration"}),(0,m.jsx)("button",{type:"button",className:"btn-close",onClick:()=>N(!1)})]}),(0,m.jsxs)("div",{className:"modal-body",children:[(0,m.jsxs)("p",{children:["Are you sure you want to cancel ",(0,m.jsxs)("b",{children:[x.first_name," ",x.last_name]}),"'s registration?"]}),(0,m.jsx)("p",{children:(0,m.jsx)("strong",{children:"Choose:"})}),(0,m.jsxs)("ul",{children:[(0,m.jsxs)("li",{children:[(0,m.jsx)("strong",{className:"text-warning",children:"Soft Delete:"})," Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement."]}),(0,m.jsxs)("li",{children:[(0,m.jsx)("strong",{className:"text-danger",children:"Hard Delete:"})," Permanently removes data."]})]})]}),(0,m.jsxs)("div",{className:"modal-footer",children:[(0,m.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>N(!1),children:"Cancel"}),(0,m.jsx)("button",{className:"btn btn-outline-warning fw-bolder",onClick:()=>L("soft"),children:"Soft Delete"}),(0,m.jsx)("button",{className:"btn btn-outline-danger fw-bolder ms-auto",onClick:()=>{N(!1),y(!0)},children:"Hard Delete"})]})]})})}),b&&(0,m.jsx)("div",{className:"modal show d-block",children:(0,m.jsx)("div",{className:"modal-dialog",children:(0,m.jsxs)("div",{className:"modal-content",children:[(0,m.jsxs)("div",{className:"modal-header",children:[(0,m.jsx)("h5",{className:"modal-title",children:"Confirm Permanent Deletion"}),(0,m.jsx)("button",{type:"button",className:"btn-close",onClick:()=>y(!1)})]}),(0,m.jsx)("div",{className:"modal-body",children:(0,m.jsxs)("p",{children:[(0,m.jsx)("strong",{children:"Are you absolutely sure?"})," This action cannot be undone."]})}),(0,m.jsxs)("div",{className:"modal-footer",children:[(0,m.jsx)("button",{className:"btn btn-outline-danger  fw-bolder",onClick:()=>{L("hard"),y(!1)},children:"Yes, Delete"}),(0,m.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>y(!1),children:"No"})]})]})})})]})};
/* harmony default export */}
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