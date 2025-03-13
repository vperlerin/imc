"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[2911],{
/***/5071:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */p});
// EXTERNAL MODULE: ./node_modules/react/index.js
var s=a(6540),r=a(408),n=a(7647),l=a(6645),i=a(3318),c=a(1083);
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
var o=a(8057),d=a(1299),m=a(4848);
// EXTERNAL MODULE: ./src/admin/components/rooms/index.js + 1 modules
// ./src/admin/pages/accomodations/index.js
const p=e=>{let{typeFilter:t=""}=e;const[a,p]=(0,s.useState)(t||"not_no"),[h,u]=(0,s.useState)(""),[x,j]=(0,s.useState)(null),[g,f]=(0,s.useState)("asc"),{participants:b,loading:N,error:w}=(e=>{const[t,a]=(0,s.useState)([]),[r,n]=(0,s.useState)(!0),[l,o]=(0,s.useState)(null);return(0,s.useEffect)((()=>{if(!e)return n(!1),void o("Type filter is required ('no' or 'not_no').");(async()=>{try{const t=await(0,i/* retry */.L)((()=>c/* default */.A.get("https://imc2025.imo.net/php/api/get_accomodations.php",{params:{type:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");a(t.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{n(!1)}})()}),[e]),{participants:t,loading:r,error:l,setParticipants:a}})(a),v="last_name",y=e=>{f(x===e&&"asc"===g?"desc":"asc"),j(e)},_=(0,s.useMemo)((()=>{let e=b?[...b]:[];
// Apply search filter
if(h){const t=h.toLowerCase();e=e.filter((e=>e[v]?.toLowerCase().includes(t)))}
// Apply sorting
return x&&e.sort(((e,t)=>{let a=e[x]??"",s=t[x]??"";
// Convert values properly for sorting
return"created_at"===x?(a=new Date(a).getTime()||0,s=new Date(s).getTime()||0):(a=a.toString().toLowerCase(),s=s.toString().toLowerCase()),"asc"===g?a.localeCompare(s):s.localeCompare(a)})),e}),[b,h,x,g]);
return(0/* default */,m.jsx)(n.A,{breadcrumb:[{url:"/admin/accommodations/",name:"Participants' Accommodations"}],isMaxWidth:!0,title:"Participants' Accommodations",children:N?(0/* default */,m.jsx)(l.A,{}):w?(0,m.jsxs)("p",{className:"text-danger",children:["Error: ",w||errorRooms]}):(0,m.jsxs)(m.Fragment,{children:[(0/* default */,m.jsx)(d.A,{className:"mb-4"}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${v.replace("_"," ")}`,value:h,onChange:e=>u(e.target.value)}),(0/* CiSearch */,m.jsx)(r.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,m.jsxs)("select",{className:"form-select w-auto",value:a,onChange:e=>p(e.target.value),children:[(0,m.jsx)("option",{value:"not_no",children:"Staying at the hostel"}),(0,m.jsx)("option",{value:"no",children:"No Accommodation"})]}),(0/* default */,m.jsx)(o.A,{className:"ms-auto",link:`https://imc2025.imo.net/php/doc_accommodations.php?type=${a}`})]}),(0,m.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{onClick:()=>y("created_at"),children:"Reg. Date"}),(0,m.jsxs)("th",{className:"sortable",onClick:()=>y("last_name"),children:["Name ","last_name"===x&&("asc"===g?"🔼":"🔽")]}),(0,m.jsxs)("th",{className:"sortable",onClick:()=>y("description"),children:["Accommodation ","description"===x&&("asc"===g?"🔼":"🔽")]})]})}),(0,m.jsx)("tbody",{children:_.length>0?_.map((e=>(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:e.created_at?.split(" ")[0]||"n/a"}),(0,m.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,m.jsx)("td",{children:e.registration_type||"n/a"})]},e.participant_id))):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"5",className:"text-center",children:"No participants found."})})})]})})]})})};
/* harmony default export */}
/***/,
/***/8057:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>l
/* harmony export */});
/* harmony import */var s=a(8027),r=(a(6540),a(4976),a(4848));
/* harmony import */const n={xls:(0/* .FaFileExcel */,r.jsx)(s.Ru,{})},l=e=>{let{link:t,className:a,format:s="xls",title:l="Download"}=e;
return(0,r.jsxs)("a",{href:t,className:`btn btn-outline-success d-inline-flex align-items-center gap-2 ${a}`,"aria-label":`Download ${l} in ${s.toUpperCase()} format`,children:[n[s]||null," ",l]})}}
/***/}]);