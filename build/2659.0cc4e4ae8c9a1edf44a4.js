"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[2659],{
/***/3318:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */L:()=>/* binding */a
/* harmony export */});const a=(e,{interval:t=1e3,retries:s=6}={})=>new Promise(((i,r)=>{e().then(i).catch((n=>{setTimeout((()=>{s?a(e,{interval:1.5*t,retries:s-1}).then(i,r):r(n)}),t)}))}));
/***/},
/***/3680:
/***/(e,t,s)=>{
// ESM COMPAT FLAG
s.r(t),
// EXPORTS
s.d(t,{default:()=>/* binding */p});
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
var a=s(408),i=s(7647),r=s(6645),n=s(6540),l=s(3318),c=s(1083);
// EXTERNAL MODULE: ./src/admin/components/page-contain/index.js + 10 modules
// EXTERNAL MODULE: ./src/api/specific-data/index.js
var o=s(4493),d=s(8057),h=s(4848);
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
// ./src/admin/pages/participants/workshops/index.js
const p=({workshopId:e})=>{const[t,s]=(0,n.useState)(""),[p,m]=(0,n.useState)("all"),[u,x]=(0,n.useState)(null),[f,g]=(0,n.useState)("asc"),{participants:j,loading:w}=(e=>{const[t,s]=(0,n.useState)([]),[a,i]=(0,n.useState)(!0),[r,o]=(0,n.useState)(null);// Re-fetch when workshopId changes
return(0,n.useEffect)((()=>{if(!e)return i(!1),void o("Workshop ID is required.");(async()=>{try{const t=await(0,l/* retry */.L)((()=>c/* default */.A.get("https://imc2026.imo.net/php/api/get_workshops_participants.php",{params:{workshop_id:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");s(t.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{i(!1)}})()}),[e]),{participants:t,loading:a,error:r,setParticipants:s}})(e),{workshops:_,loading:k}=(0,o/* useApiSpecificData */.Q)(),N="last_name",b=_?.find((t=>t.id===String(e))),y=[{url:"/admin/participants/workshops/",name:`${b?b.title:"Workshop"} Participants`}],v=e=>{u===e?g("asc"===f?"desc":"asc"):(x(e),g("asc"))};
// Filter participants based on search and type
let S=j||[];if("all"!==p&&(S=S.filter((e=>"online"===p?"1"===e.is_online:"0"===e.is_online))),t){const e=t.toLowerCase();S=S.filter((t=>(t[N]?String(t[N]).toLowerCase():"").includes(e)))}
// Sort participants based on selected column
return u&&(S=[...S].sort(((e,t)=>{let s=e[u]??"",a=t[u]??"";
// Convert values for proper sorting
return["created_at"].includes(u)?(s=new Date(s).getTime()||0,a=new Date(a).getTime()||0):(s=s.toString().toLowerCase(),a=a.toString().toLowerCase()),s<a?"asc"===f?-1:1:s>a?"asc"===f?1:-1:0}))),(0/* default */,h.jsx)(i.A,{breadcrumb:y,isMaxWidth:!0,title:b?b.title:"Workshop Participants",children:w||k?(0/* default */,h.jsx)(r.A,{}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"d-flex gap-2 mb-3",children:[(0,h.jsxs)("select",{className:"form-select w-auto",value:p,onChange:e=>m(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All"}),(0,h.jsx)("option",{value:"online",children:"Online"}),(0,h.jsx)("option",{value:"onsite",children:"On-Site"})]}),(0,h.jsxs)("div",{className:"position-relative w-auto",children:[(0,h.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${N.replace("_"," ")}`,value:t,onChange:e=>s(e.target.value)}),(0/* CiSearch */,h.jsx)(a.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0/* default */,h.jsx)(d.A,{className:"ms-auto",link:`https://imc2026.imo.net/php/doc_workshops.php?workshop_id=${e}`})]}),(0,h.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,h.jsxs)("table",{className:"table table-striped",children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{className:"sortable",onClick:()=>v("created_at"),children:"Reg. Date"}),(0,h.jsx)("th",{className:"sortable",onClick:()=>v("is_online"),children:"Type"}),(0,h.jsx)("th",{className:"sortable",onClick:()=>v("last_name"),children:"Name"}),(0,h.jsx)("th",{className:"sortable",onClick:()=>v("registration_type_description"),children:"Reg. Type"}),(0,h.jsx)("th",{className:"sortable",onClick:()=>v("confirmation_sent"),children:"Confirmed"})]})}),(0,h.jsx)("tbody",{children:S.length>0?S.map((e=>(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,h.jsx)("td",{children:"0"===e.is_online?"ON-SITE":"ONLINE"}),(0,h.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,h.jsx)("td",{children:e.registration_type_description||"n/a"}),(0,h.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"})]},e.id))):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:"8",className:"text-center",children:"No participants found for this workshop."})})})]})})]})})};
/* harmony default export */}
/***/,
/***/4493:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */Q:()=>/* binding */l
/* harmony export */,l:()=>/* binding */n
/* harmony export */});
/* harmony import */var a=s(3318),i=s(6540),r=s(1083);
/* harmony import */
// api/specific-data/index.js
const n=async()=>{const e=await(0,a/* .retry */.L)((()=>r/* ["default"] */.A.get("https://imc2026.imo.net/php/get_specific_data.php")));if(!e?.data?.success)throw new Error(e?.data?.message||"Failed to fetch specific IMC data. Please, refresh the page.");return e.data.data||{}},l=()=>{const[e,t]=(0,i.useState)([]),[s,a]=(0,i.useState)([]),[r,l]=(0,i.useState)([]),[c,o]=(0,i.useState)([]),[d,h]=(0,i.useState)(!0),[p,m]=(0,i.useState)(null),u=(0,i.useCallback)((async()=>{h(!0),m(null);try{const e=await n();t(e.workshops||[]),a(e.payment_methods||[]),l(e.registration_types||[]),o(e.sessions||[])}catch(e){m(e.message||"Failed to fetch specific IMC data. Please, refresh the page.")}finally{h(!1)}}),[]);return(0,i.useEffect)((()=>{u()}),[u]),{error:p,loading:d,paymentMethods:s,refetchSpecificData:u,registrationTypes:r,sessions:c,workshops:e}}}
/***/,
/***/8057:
/***/(e,t,s)=>{
/* harmony export */s.d(t,{
/* harmony export */A:()=>n
/* harmony export */});
/* harmony import */var a=s(8027),i=(s(6540),s(4976),s(4848));
/* harmony import */const r={xls:(0/* .FaFileExcel */,i.jsx)(a.Ru,{className:"mt-1"})},n=({className:e,format:t="xls",link:s,subTitle:a="",title:n="Download"})=>(0,i.jsxs)("a",{href:s,className:`btn btn-outline-success d-inline-flex align-items-start gap-2 ${e}`,"aria-label":`Download ${n} in ${t.toUpperCase()} format`,children:[r[t]||null,(0,i.jsxs)("div",{className:"d-flex flex-column align-items-start",children:[n,a&&(0,i.jsx)("span",{className:"text-muted fw-normal",children:a})]})]})}
/***/}]);