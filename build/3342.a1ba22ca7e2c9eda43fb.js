"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[3342],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */o});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var n=a(6942),l=a.n(n),i=a(8027),r=a(6540),c=a(5846),d=a(4848);// ./src/admin/components/admin-table/index.js
const o=({participants:e,withActions:t=!0,customActions:a=null,onDelete:n=null})=>{const[o,m]=(0,r.useState)(null),[h,u]=(0,r.useState)("asc"),p=e=>{o===e?u("asc"===h?"desc":"asc"):(m(e),u("asc"))},x=[...e].sort(((e,t)=>{if(!o)return 0;let a=e[o],s=t[o];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(o)&&(a=parseFloat(a)||0,s=parseFloat(s)||0),"due_amount"===o){const n=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,s=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+s-a:t-a};a=n(e),s=n(t)}
// Handle dates
return["created_at","confirmation_date"].includes(o)&&(a=a?new Date(a).getTime():0,s=s?new Date(s).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===o&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",s=t.payment_method_name?t.payment_method_name.toLowerCase():""),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===o&&(a="1"===a?1:0,s="1"===s?1:0),a<s?"asc"===h?-1:1:a>s?"asc"===h?1:-1:0}));
return(0,d.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,d.jsxs)("table",{className:"table table-striped",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{className:s,onClick:()=>p("id"),children:"#"}),(0,d.jsx)("th",{className:s,onClick:()=>p("created_at"),children:"Reg. Date"}),(0,d.jsx)("th",{className:s,onClick:()=>p("last_name"),children:"Name"}),(0,d.jsx)("th",{className:s,onClick:()=>p("total_due"),children:"Total"}),(0,d.jsx)("th",{className:s,onClick:()=>p("total_paid"),children:"Paid"}),(0,d.jsx)("th",{className:s,onClick:()=>p("due_amount"),children:"Due"}),(0,d.jsx)("th",{className:s,onClick:()=>p("payment_method"),children:"Method"}),(0,d.jsx)("th",{className:s,onClick:()=>p("confirmation_sent"),children:"Confirmed"}),(0,d.jsx)("th",{className:s,onClick:()=>p("confirmation_date"),children:"Conf. Email"}),(t||a)&&(0,d.jsx)("th",{})]})}),(0,d.jsx)("tbody",{children:x.length>0?x.map((e=>{const s=parseFloat(e.total_due)||0,r=parseFloat(e.total_paid)||0,o=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),h=m?s+o-r:s-r;
return(0,d.jsxs)("tr",{className:"cancelled"===e.status?"text-warning ":"",children:[(0,d.jsx)("td",{children:e.id}),(0,d.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,d.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,d.jsxs)("td",{children:[m?(s+o).toFixed(2):s.toFixed(2),"€"]}),(0,d.jsxs)("td",{children:[r.toFixed(2),"€"]}),(0,d.jsxs)("td",{className:l()({"text-success":0===h}),children:[h.toFixed(2),"€"]}),(0,d.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,d.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,d.jsx)("td",{className:l()("cancelled"===e.status?"text-warning":e?.confirmation_date&&"text-success"),children:"cancelled"===e.status?"CANCELLED":e.confirmation_date?(0,c/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),t&&n&&(0,d.jsx)("td",{children:(0,d.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:["cancelled"===e.status?(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Reimbursements"}):(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,d.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{n?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,d.jsx)(i.H8h,{})})]})}),a&&"cancelled"!==e.status&&(0,d.jsx)(d.Fragment,{children:a})]},e.id)})):(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:t?10:9,className:"text-center",children:"No participants found."})})})]})})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=(e,{interval:t=100,retries:a=14}={})=>new Promise(((n,l)=>{e().then(n).catch((i=>{setTimeout((()=>{a?s(e,{interval:1.5*t,retries:a-1}).then(n,l):l(i)}),t)}))}));
/***/},
/***/4265:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */$:()=>/* binding */i
/* harmony export */});
/* harmony import */var s=a(3318),n=a(6540),l=a(1083);
/* harmony import */
/**
 * Fetch online participants.
 * @param {boolean} confirmedOnly - If true, only confirmed participants are returned.
 * @param {boolean} includeCancelled - If true, includes cancelled participants.
 */
const i=(e=!1,t=!1)=>{const[a,i]=(0,n.useState)([]),[r,c]=(0,n.useState)(!0),[d,o]=(0,n.useState)(null);// Re-fetch on changes
return(0,n.useEffect)((()=>{(async()=>{try{const a=new URLSearchParams;e&&a.append("confirmed_only","1"),t&&a.append("include_cancelled","1");const n=await(0,s/* .retry */.L)((()=>l/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/online_participants.php?${a.toString()}`)));if(!n.data.success||!Array.isArray(n.data.data))throw new Error(n.data.message||"Database access error, please try again.");i(n.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{c(!1)}})()}),[e,t]),{participants:a,loading:r,error:d,setParticipants:i}};
/***/},
/***/5846:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Ai:()=>/* binding */i
/* harmony export */,Lu:()=>/* binding */l
/* harmony export */,p6:()=>/* binding */n
/* harmony export */});const s=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},n=(e,t)=>{const a=new Date(e),n=new Date(t),l=a.toLocaleString("en-US",{month:"long"}),i=a.getDate(),r=n.getDate();return`${l} ${i}${s(i)} - ${r}${s(r)}`},l=(e,t=!0,a=!1)=>((e,t=!1,a=!0,n=!1)=>{const l=new Date(e),i=l.getDate(),r=l.toLocaleString("en-US",{month:"long"}),c=l.toLocaleString("en-US",{weekday:"long"}),d=l.getFullYear();return`${t?c+", ":""}${i}${s(i)}${a?" "+r:""}${n?" "+d:""}`})(e,!0,t,a),i=(e,t,a=!0,s=!0)=>{const n=new Date(e);return n.setDate(n.getDate()+t),l(n.toISOString(),a,s)}}
/***/,
/***/7382:
/***/(e,t,a)=>{a.r(t),
/* harmony export */a.d(t,{
/* harmony export */default:()=>m
/* harmony export */});
/* harmony import */var s=a(408),n=a(7647),l=a(6645),i=a(8057),r=a(6540),c=(a(4265),a(7806)),d=a(578),o=a(4848);
/* harmony import */const m=()=>{const[e,t]=(0,r.useState)([]),[a,m]=(0,r.useState)(""),[h,u]=(0,r.useState)("last_name"),[p,x]=(0,r.useState)(null),[j,f]=(0,r.useState)(!1),[b,g]=(0,r.useState)(!1),[N,_]=(0,r.useState)(""),[y,w]=(0,r.useState)(""),{participants:C,loading:v,error:S,setParticipants:k}=useApiOnsiteParticipants(!1,!0),{deleteParticipant:D,errorDelete:A,isDeleting:$}=(0,c/* .useApiDeleteParticipant */.A)(k,t);(0,r.useEffect)((()=>{if(a){const e=a.toLowerCase();t(C.filter((t=>(t[h]?String(t[h]).toLowerCase():"").includes(e))))}else t(C)}),[a,h,C]);
// Calculate totals
const L=C.length,F=C.filter((e=>"1"===e.confirmation_sent)).length,P=async e=>{if(p)try{const t=await D(p,e);t?.data?.success?(_(t.data.message||"Participant deleted successfully!"),w("")):w(t?.data?.message||"Impossible to delete the participant for now, please try again later.")}catch(e){w("An unexpected error occurred while deleting the participant.")}finally{
// Close the correct modal depending on type
"soft"===e?f(!1):g(!1),x(null)}};
return(0/* ["default"] */,o.jsxs)(n.A,{breadcrumb:[{url:"/admin/participants/online",name:"Online Participants"}],isMaxWidth:!0,title:"ONLINE Participants",rightContent:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("strong",{children:"Confirmed:"})," ",(0,o.jsx)("strong",{className:"text-success",children:F})," / ",L]}),children:[y&&(0,o.jsx)("div",{className:"alert alert-danger fw-bolder",children:y}),N&&(0,o.jsx)("div",{className:"alert alert-success fw-bolder",children:N}),S&&(0,o.jsx)("p",{className:"alert alert-danger fw-bolder",children:S}),v||$?(0/* ["default"] */,o.jsx)(l.A,{}):(0,o.jsxs)(o.Fragment,{children:[A&&(0,o.jsx)("p",{className:"alert alert-danger",children:A}),(0,o.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,o.jsxs)("select",{className:"form-select w-auto",value:h,onChange:e=>u(e.target.value),children:[(0,o.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,o.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,o.jsxs)("div",{className:"position-relative w-auto",children:[(0,o.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${h.replace("_"," ")}`,value:a,onChange:e=>m(e.target.value)}),(0/* .CiSearch */,o.jsx)(s.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* ["default"] */,o.jsx)(i.A,{className:"ms-auto",link:"https://imc2025.imo.net/php/doc_participants.php"})]}),(0/* ["default"] */,o.jsx)(d.A,{participants:e,onDelete:e=>{x(e),f(!0)}})]}),(j||b)&&(0,o.jsx)("div",{className:"modal-backdrop fade show"}),j&&p&&(0,o.jsx)("div",{className:"modal show d-block",children:(0,o.jsx)("div",{className:"modal-dialog",children:(0,o.jsxs)("div",{className:"modal-content",children:[(0,o.jsxs)("div",{className:"modal-header",children:[(0,o.jsx)("h5",{className:"modal-title",children:"Cancel Registration"}),(0,o.jsx)("button",{type:"button",className:"btn-close",onClick:()=>f(!1)})]}),(0,o.jsxs)("div",{className:"modal-body",children:[(0,o.jsxs)("p",{children:["Are you sure you want to cancel ",(0,o.jsxs)("b",{children:[p.first_name," ",p.last_name]}),"'s registration?"]}),(0,o.jsx)("p",{children:(0,o.jsx)("strong",{children:"Choose:"})}),(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{children:[(0,o.jsx)("strong",{className:"text-warning",children:"Soft Delete:"})," Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement."]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("strong",{className:"text-danger",children:"Hard Delete:"})," Permanently removes data."]})]})]}),(0,o.jsxs)("div",{className:"modal-footer",children:[(0,o.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>f(!1),children:"Cancel"}),(0,o.jsx)("button",{className:"btn btn-outline-warning fw-bolder",onClick:()=>P("soft"),children:"Soft Delete"}),(0,o.jsx)("button",{className:"btn btn-outline-danger fw-bolder ms-auto",onClick:()=>{f(!1),g(!0)},children:"Hard Delete"})]})]})})}),b&&(0,o.jsx)("div",{className:"modal show d-block",children:(0,o.jsx)("div",{className:"modal-dialog",children:(0,o.jsxs)("div",{className:"modal-content",children:[(0,o.jsxs)("div",{className:"modal-header",children:[(0,o.jsx)("h5",{className:"modal-title",children:"Confirm Permanent Deletion"}),(0,o.jsx)("button",{type:"button",className:"btn-close",onClick:()=>g(!1)})]}),(0,o.jsx)("div",{className:"modal-body",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Are you absolutely sure?"})," This action cannot be undone."]})}),(0,o.jsxs)("div",{className:"modal-footer",children:[(0,o.jsx)("button",{className:"btn btn-outline-danger  fw-bolder",onClick:()=>{P("hard"),g(!1)},children:"Yes, Delete"}),(0,o.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>g(!1),children:"No"})]})]})})})]})};
/* harmony default export */}
/***/,
/***/7806:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>/* binding */l
/* harmony export */});
/* harmony import */var s=a(6540),n=a(1083);
/* harmony import */const l=(e,t)=>{const[a,l]=(0,s.useState)(null),[i,r]=(0,s.useState)(!1);return{deleteParticipant:async(a,s)=>{if(!a)return null;r(!0),l(null);try{const l=await n/* ["default"] */.A.post("https://imc2025.imo.net/php/admin/api/delete_participant.php",{id:a.id,delete_type:s});return l.data.success&&("hard"===s?(e((e=>e.filter((e=>e.id!==a.id)))),t((e=>e.filter((e=>e.id!==a.id))))):(
// Soft delete: update participant's status to 'cancelled'
e((e=>e.map((e=>e.id===a.id?{...e,status:"cancelled"}:e)))),t((e=>e.map((e=>e.id===a.id?{...e,status:"cancelled"}:e)))))),l}catch(e){const t=e.response?.data?.message||"An unexpected error occurred.";return l(t),{data:{success:!1,message:t}}}finally{r(!1)}},errorDelete:a,isDeleting:i}};
/***/}}]);