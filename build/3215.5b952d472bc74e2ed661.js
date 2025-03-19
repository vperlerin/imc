"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[3215],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */d});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const s="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var n=a(6942),l=a.n(n),i=a(8027),r=a(6540),c=a(5846),o=a(4848);// ./src/admin/components/admin-table/index.js
const d=e=>{let{participants:t,withActions:a=!0,customActions:n=null,onDelete:d=null}=e;const[m,h]=(0,r.useState)(null),[u,p]=(0,r.useState)("asc"),x=e=>{m===e?p("asc"===u?"desc":"asc"):(h(e),p("asc"))},j=[...t].sort(((e,t)=>{if(!m)return 0;let a=e[m],s=t[m];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(m)&&(a=parseFloat(a)||0,s=parseFloat(s)||0),"due_amount"===m){const n=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,s=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+s-a:t-a};a=n(e),s=n(t)}
// Handle dates
return["created_at","confirmation_date"].includes(m)&&(a=a?new Date(a).getTime():0,s=s?new Date(s).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===m&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",s=t.payment_method_name?t.payment_method_name.toLowerCase():""),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===m&&(a="1"===a?1:0,s="1"===s?1:0),a<s?"asc"===u?-1:1:a>s?"asc"===u?1:-1:0}));
return(0,o.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,o.jsxs)("table",{className:"table table-striped",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{className:s,onClick:()=>x("id"),children:"#"}),(0,o.jsx)("th",{className:s,onClick:()=>x("created_at"),children:"Reg. Date"}),(0,o.jsx)("th",{className:s,onClick:()=>x("last_name"),children:"Name"}),(0,o.jsx)("th",{className:s,onClick:()=>x("total_due"),children:"Total"}),(0,o.jsx)("th",{className:s,onClick:()=>x("total_paid"),children:"Paid"}),(0,o.jsx)("th",{className:s,onClick:()=>x("due_amount"),children:"Due"}),(0,o.jsx)("th",{className:s,onClick:()=>x("payment_method"),children:"Method"}),(0,o.jsx)("th",{className:s,onClick:()=>x("confirmation_sent"),children:"Confirmed"}),(0,o.jsx)("th",{className:s,onClick:()=>x("confirmation_date"),children:"Conf. Email"}),(a||n)&&(0,o.jsx)("th",{})]})}),(0,o.jsx)("tbody",{children:j.length>0?j.map((e=>{const t=parseFloat(e.total_due)||0,s=parseFloat(e.total_paid)||0,r=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),h=m?t+r-s:t-s;
return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:e.id}),(0,o.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,o.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,o.jsxs)("td",{children:[m?(t+r).toFixed(2):t.toFixed(2),"€"]}),(0,o.jsxs)("td",{children:[s.toFixed(2),"€"]}),(0,o.jsxs)("td",{className:l()({"text-success":0===h}),children:[h.toFixed(2),"€"]}),(0,o.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,o.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,o.jsx)("td",{className:l()(e?.confirmation_date&&"text-success"),children:e.confirmation_date?(0,c/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),a&&d&&(0,o.jsx)("td",{children:(0,o.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:[(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,o.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,o.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{d?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,o.jsx)(i.H8h,{})})]})}),n&&(0,o.jsx)(o.Fragment,{children:n})]},e.id)})):(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:a?10:9,className:"text-center",children:"No participants found."})})})]})})};
/* harmony default export */}
/***/,
/***/1503:
/***/(e,t,a)=>{a.r(t),
/* harmony export */a.d(t,{
/* harmony export */default:()=>h
/* harmony export */});
/* harmony import */var s=a(408),n=a(578),l=a(7647),i=a(6645),r=a(6540),c=a(3388),o=a(7806),d=a(8057),m=a(4848);
/* harmony import */const h=()=>{const[e,t]=(0,r.useState)([]),[a,h]=(0,r.useState)(""),[u,p]=(0,r.useState)("last_name"),[x,j]=(0,r.useState)(null),[f,g]=(0,r.useState)(!1),[b,N]=(0,r.useState)(!1),[_,y]=(0,r.useState)(""),[v,w]=(0,r.useState)(""),{participants:C,loading:S,error:k,setParticipants:D}=(0,c/* .useApiOnsiteParticipants */.E)(),{deleteParticipant:A,errorDelete:F,isDeleting:$}=(0,o/* .useApiDeleteParticipant */.A)(D,t);(0,r.useEffect)((()=>{if(a){const e=a.toLowerCase();t(C.filter((t=>(t[u]?String(t[u]).toLowerCase():"").includes(e))))}else t(C)}),[a,u,C]);
// Calculate totals
const L=C.length,P=C.filter((e=>"1"===e.confirmation_sent)).length;
return(0/* ["default"] */,m.jsxs)(l.A,{breadcrumb:[{url:"/admin/participants/onsite",name:"On-site Participants"}],isMaxWidth:!0,title:"ON-SITE Participants",rightContent:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("strong",{children:"Confirmed:"})," ",(0,m.jsx)("strong",{className:"text-success",children:P})," / ",L]}),children:[v&&(0,m.jsx)("div",{className:"alert alert-danger fw-bolder",children:v}),_&&(0,m.jsx)("div",{className:"alert alert-success fw-bolder",children:_}),k&&(0,m.jsx)("p",{className:"alert alert-danger fw-bolder",children:k}),S||$?(0/* ["default"] */,m.jsx)(i.A,{}):(0,m.jsxs)(m.Fragment,{children:[F&&(0,m.jsx)("p",{className:"alert alert-danger",children:F}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("select",{className:"form-select w-auto",value:u,onChange:e=>p(e.target.value),children:[(0,m.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,m.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${u.replace("_"," ")}`,value:a,onChange:e=>h(e.target.value)}),(0/* .CiSearch */,m.jsx)(s.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* ["default"] */,m.jsx)(d.A,{className:"ms-auto",link:"https://imc2025.imo.net/php/doc_participants.php"})]}),(0/* ["default"] */,m.jsx)(n.A,{participants:e,onDelete:e=>{j(e),g(!0)}})]}),(f||b)&&(0,m.jsx)("div",{className:"modal-backdrop fade show"}),f&&x&&(0,m.jsx)("div",{className:"modal show d-block",children:(0,m.jsx)("div",{className:"modal-dialog",children:(0,m.jsxs)("div",{className:"modal-content",children:[(0,m.jsxs)("div",{className:"modal-header",children:[(0,m.jsx)("h5",{className:"modal-title",children:"Cancel Registration"}),(0,m.jsx)("button",{type:"button",className:"btn-close",onClick:()=>g(!1)})]}),(0,m.jsxs)("div",{className:"modal-body",children:[!1,"Are you sure you want to permanently delete all data related to this participant?"]}),(0,m.jsxs)("div",{className:"modal-footer",children:[(0,m.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>g(!1),children:"Cancel"}),!1,(0,m.jsx)("button",{className:"btn btn-outline-danger fw-bolder ms-auto",onClick:()=>{g(!1),N(!0)},children:"Hard Delete"})]})]})})}),b&&(0,m.jsx)("div",{className:"modal show d-block",children:(0,m.jsx)("div",{className:"modal-dialog",children:(0,m.jsxs)("div",{className:"modal-content",children:[(0,m.jsxs)("div",{className:"modal-header",children:[(0,m.jsx)("h5",{className:"modal-title",children:"Confirm Permanent Deletion"}),(0,m.jsx)("button",{type:"button",className:"btn-close",onClick:()=>N(!1)})]}),(0,m.jsx)("div",{className:"modal-body",children:(0,m.jsxs)("p",{children:[(0,m.jsx)("strong",{children:"Are you absolutely sure?"})," This action cannot be undone."]})}),(0,m.jsxs)("div",{className:"modal-footer",children:[(0,m.jsx)("button",{className:"btn btn-outline-danger  fw-bolder",onClick:()=>{(async e=>{if(x)try{const t=await A(x,e);t?.data?.success?y(t.data.message||"Participant deleted successfully!"):w(t?.data?.message||"Impossible to delete the participant for now, please try again later.")}catch(e){w("An unexpected error occurred while deleting the participant.")}})("hard"),N(!1)},children:"Yes, Delete"}),(0,m.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>N(!1),children:"No"})]})]})})})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=function(e){let{interval:t=100,retries:a=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((n,l)=>{e().then(n).catch((i=>{setTimeout((()=>{a?s(e,{interval:1.5*t,retries:a-1}).then(n,l):l(i)}),t)}))}))};
/***/},
/***/3388:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */E:()=>/* binding */i
/* harmony export */});
/* harmony import */var s=a(3318),n=a(6540),l=a(1083);
/* harmony import */const i=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[t,a]=(0,n.useState)([]),[i,r]=(0,n.useState)(!0),[c,o]=(0,n.useState)(null);// Runs only once when the component mounts
return(0,n.useEffect)((()=>{(async()=>{try{const t=e?"?confirmed_only=1":"",n=await(0,s/* .retry */.L)((()=>l/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/onsite_participants.php${t}`)));if(!n.data.success||!Array.isArray(n.data.data))throw new Error(n.data.message||"Database access error, please try again.");a(n.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{r(!1)}})()}),[]),{participants:t,loading:i,error:c,setParticipants:a}};
/***/},
/***/5846:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Ai:()=>/* binding */i
/* harmony export */,Lu:()=>/* binding */l
/* harmony export */,p6:()=>/* binding */n
/* harmony export */});const s=e=>{if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},n=(e,t)=>{const a=new Date(e),n=new Date(t),l=a.toLocaleString("en-US",{month:"long"}),i=a.getDate(),r=n.getDate();return`${l} ${i}${s(i)} - ${r}${s(r)}`},l=function(e){return function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const l=new Date(e),i=l.getDate(),r=l.toLocaleString("en-US",{month:"long"}),c=l.toLocaleString("en-US",{weekday:"long"}),o=l.getFullYear();return`${t?c+", ":""}${i}${s(i)}${a?" "+r:""}${n?" "+o:""}`}(e,!0,!(arguments.length>1&&void 0!==arguments[1])||arguments[1],arguments.length>2&&void 0!==arguments[2]&&arguments[2])},i=function(e,t){let a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const n=new Date(e);return n.setDate(n.getDate()+t),l(n.toISOString(),a,s)}}
/***/,
/***/7806:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>/* binding */l
/* harmony export */});
/* harmony import */var s=a(6540),n=a(1083);
/* harmony import */const l=(e,t)=>{const[a,l]=(0,s.useState)(null),[i,r]=(0,s.useState)(!1);return{deleteParticipant:async(a,s)=>{if(!a)return null;r(!0),l(null);try{const i=await n/* ["default"] */.A.post("https://imc2025.imo.net/php/admin/api/delete_participant.php",{id:a.id,delete_type:s});return i.data.success?(e((e=>e.filter((e=>e.id!==a.id)))),t((e=>e.filter((e=>e.id!==a.id))))):l(i.data.message||"Failed to delete participant."),i}catch(e){const t=e.response?.data?.message||"An unexpected error occurred.";return l(t),{data:{success:!1,message:t}}}finally{r(!1)}},errorDelete:a,isDeleting:i}};
/***/}}]);