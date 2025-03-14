"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[4715],{
/***/1503:
/***/(e,a,t)=>{t.r(a),
/* harmony export */t.d(a,{
/* harmony export */default:()=>u
/* harmony export */});
/* harmony import */var s=t(408),l=t(578),n=t(7647),i=t(6645),r=t(6540),c=t(3388),o=t(7806),d=t(8057),m=t(4848);
/* harmony import */const u=()=>{const[e,a]=(0,r.useState)([]),[t,u]=(0,r.useState)(""),[p,h]=(0,r.useState)("last_name"),[x,b]=(0,r.useState)(null),[f,j]=(0,r.useState)(!1),[g,N]=(0,r.useState)(!1),[y,v]=(0,r.useState)(""),[w,C]=(0,r.useState)(""),{participants:S,loading:k,error:A,setParticipants:D}=(0,c/* .useApiOnsiteParticipants */.E)(),{deleteParticipant:P,errorDelete:_,isDeleting:E}=(0,o/* .useApiDeleteParticipant */.A)(D,a);(0,r.useEffect)((()=>{if(t){const e=t.toLowerCase();a(S.filter((a=>(a[p]?String(a[p]).toLowerCase():"").includes(e))))}else a(S)}),[t,p,S]);
// Calculate totals
const $=S.length,F=S.filter((e=>"1"===e.confirmation_sent)).length;
return(0/* ["default"] */,m.jsxs)(n.A,{breadcrumb:[{url:"/admin/participants/onsite",name:"On-site Participants"}],isMaxWidth:!0,title:"ON-SITE Participants",rightContent:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("strong",{children:"Confirmed:"})," ",(0,m.jsx)("strong",{className:"text-success",children:F})," / ",$]}),children:[w&&(0,m.jsx)("div",{className:"alert alert-danger fw-bolder",children:w}),y&&(0,m.jsx)("div",{className:"alert alert-success fw-bolder",children:y}),A&&(0,m.jsx)("p",{className:"alert alert-danger fw-bolder",children:A}),k||E?(0/* ["default"] */,m.jsx)(i.A,{}):(0,m.jsxs)(m.Fragment,{children:[_&&(0,m.jsx)("p",{className:"alert alert-danger",children:_}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("select",{className:"form-select w-auto",value:p,onChange:e=>h(e.target.value),children:[(0,m.jsx)("option",{value:"last_name",children:"Search by Last Name"}),(0,m.jsx)("option",{value:"email",children:"Search by Email"})]}),(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${p.replace("_"," ")}`,value:t,onChange:e=>u(e.target.value)}),(0/* .CiSearch */,m.jsx)(s.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* ["default"] */,m.jsx)(d.A,{className:"ms-auto",link:"https://imc2025.imo.net/php/doc_participants.php"})]}),(0/* ["default"] */,m.jsx)(l.A,{participants:e,onDelete:e=>{b(e),j(!0)}})]}),(f||g)&&(0,m.jsx)("div",{className:"modal-backdrop fade show"}),f&&x&&(0,m.jsx)("div",{className:"modal show d-block",children:(0,m.jsx)("div",{className:"modal-dialog",children:(0,m.jsxs)("div",{className:"modal-content",children:[(0,m.jsxs)("div",{className:"modal-header",children:[(0,m.jsx)("h5",{className:"modal-title",children:"Cancel Registration"}),(0,m.jsx)("button",{type:"button",className:"btn-close",onClick:()=>j(!1)})]}),(0,m.jsxs)("div",{className:"modal-body",children:[!1,"Are you sure you want to permanently delete all data related to this participant?"]}),(0,m.jsxs)("div",{className:"modal-footer",children:[(0,m.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>j(!1),children:"Cancel"}),!1,(0,m.jsx)("button",{className:"btn btn-outline-danger fw-bolder ms-auto",onClick:()=>{j(!1),N(!0)},children:"Hard Delete"})]})]})})}),g&&(0,m.jsx)("div",{className:"modal show d-block",children:(0,m.jsx)("div",{className:"modal-dialog",children:(0,m.jsxs)("div",{className:"modal-content",children:[(0,m.jsxs)("div",{className:"modal-header",children:[(0,m.jsx)("h5",{className:"modal-title",children:"Confirm Permanent Deletion"}),(0,m.jsx)("button",{type:"button",className:"btn-close",onClick:()=>N(!1)})]}),(0,m.jsx)("div",{className:"modal-body",children:(0,m.jsxs)("p",{children:[(0,m.jsx)("strong",{children:"Are you absolutely sure?"})," This action cannot be undone."]})}),(0,m.jsxs)("div",{className:"modal-footer",children:[(0,m.jsx)("button",{className:"btn btn-outline-danger  fw-bolder",onClick:()=>{(async e=>{if(x)try{const a=await P(x,e);a?.data?.success?v(a.data.message||"Participant deleted successfully!"):C(a?.data?.message||"Impossible to delete the participant for now, please try again later.")}catch(e){C("An unexpected error occurred while deleting the participant.")}})("hard"),N(!1)},children:"Yes, Delete"}),(0,m.jsx)("button",{className:"btn btn-outline-secondary fw-bolder",onClick:()=>N(!1),children:"No"})]})]})})})]})};
/* harmony default export */}
/***/,
/***/3388:
/***/(e,a,t)=>{
/* harmony export */t.d(a,{
/* harmony export */E:()=>/* binding */i
/* harmony export */});
/* harmony import */var s=t(3318),l=t(6540),n=t(1083);
/* harmony import */const i=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[a,t]=(0,l.useState)([]),[i,r]=(0,l.useState)(!0),[c,o]=(0,l.useState)(null);// Runs only once when the component mounts
return(0,l.useEffect)((()=>{(async()=>{try{const a=e?"?confirmed_only=1":"",l=await(0,s/* .retry */.L)((()=>n/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/onsite_participants.php${a}`)));if(!l.data.success||!Array.isArray(l.data.data))throw new Error(l.data.message||"Database access error, please try again.");t(l.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{r(!1)}})()}),[]),{participants:a,loading:i,error:c,setParticipants:t}};
/***/},
/***/7806:
/***/(e,a,t)=>{
/* harmony export */t.d(a,{
/* harmony export */A:()=>/* binding */n
/* harmony export */});
/* harmony import */var s=t(6540),l=t(1083);
/* harmony import */const n=(e,a)=>{const[t,n]=(0,s.useState)(null),[i,r]=(0,s.useState)(!1);return{deleteParticipant:async(t,s)=>{if(!t)return null;r(!0),n(null);try{const i=await l/* ["default"] */.A.post("https://imc2025.imo.net/php/admin/api/delete_participant.php",{id:t.id,delete_type:s});return i.data.success?(e((e=>e.filter((e=>e.id!==t.id)))),a((e=>e.filter((e=>e.id!==t.id))))):n(i.data.message||"Failed to delete participant."),i}catch(e){const a=e.response?.data?.message||"An unexpected error occurred.";return n(a),{data:{success:!1,message:a}}}finally{r(!1)}},errorDelete:t,isDeleting:i}};
/***/},
/***/8057:
/***/(e,a,t)=>{
/* harmony export */t.d(a,{
/* harmony export */A:()=>i
/* harmony export */});
/* harmony import */var s=t(8027),l=(t(6540),t(4976),t(4848));
/* harmony import */const n={xls:(0/* .FaFileExcel */,l.jsx)(s.Ru,{})},i=e=>{let{link:a,className:t,format:s="xls",title:i="Download"}=e;
return(0,l.jsxs)("a",{href:a,className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${t}`,"aria-label":`Download ${i} in ${s.toUpperCase()} format`,children:[n[s]||null," ",i]})}}
/***/}]);