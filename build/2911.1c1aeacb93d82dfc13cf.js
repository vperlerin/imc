"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[2911],{
/***/1299:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */p});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),r=a.n(s),n=a(6540),o=a(6645),l=a(4976),i=a(1083),c=a(3318);// ./src/admin/api/accomodations/index.js
const d=()=>{const[e,t]=(0,n.useState)([]),[a,s]=(0,n.useState)(!1),[r,o]=(0,n.useState)(null),l=(0,n.useCallback)((async()=>{s(!0),o(null);try{const e=await(async()=>{const e=await(0,c/* retry */.L)((()=>i/* default */.A.get("https://imc2026.imo.net/php/api/get_left_accommodations.php")));if(!e?.data?.success)throw new Error(e?.data?.message||"Error fetching available rooms.");return e.data.data||[]})();t(e)}catch(e){o(e.message||"Error fetching available rooms.")}finally{s(!1)}}),[]);return(0,n.useEffect)((()=>{l()}),[l]),{availableRooms:e,loading:a,error:r,refetchAvailableRooms:l}};
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var m=a(4848);// ./src/admin/components/rooms/index.js
const p=({className:e,showLink:t=!1})=>{const{availableRooms:a,loading:s,error:i}=d();if(i)
return(0,m.jsxs)("div",{className:"text-danger",children:["Error: ",i]});const c=(0,n.useMemo)((()=>(Array.isArray(a)?a:[]).filter((e=>"no"!==(e?.type||e?.registration_type))).map((e=>{const t=e?.id??e?.registration_type_id??null,a=(e?.type??e?.registration_type??"").toString(),s=e?.room_left??e?.available_rooms??0,r=e?.total??e?.total_rooms??null,n=e?.used??null;return{id:t,type:a,roomLeft:Number(s)||0,total:null===r?null:Number(r)||0,used:null===n?null:Number(n)||0}}))),[a]);
return(0,m.jsxs)("div",{className:r()(e,"position-relative",t&&" border rounded-2 p-3 "),children:[s&&(0/* default */,m.jsx)(o.A,{}),t&&(0,m.jsx)("h5",{children:(0/* Link */,m.jsx)(l.N_,{to:"/admin/accomodations",children:"Available Rooms by Type"})}),!s&&(0,m.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:c.map((e=>{const t=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"Unknown",a=e.roomLeft<=0,{main:s,sub:n}=(e=>
// Prefer the new live fields
null!==e.total?{main:`${e.roomLeft} left`,sub:` / ${e.total}`}:{main:`${e.roomLeft} left`,sub:""})(e);
return(0,m.jsxs)("div",{className:r()("p-3 border rounded-2",{"text-danger":a}),children:[t,":",(0,m.jsxs)("strong",{children:[" ",s]}),n&&(0,m.jsx)("small",{className:"text-muted",children:n})]},e.id??e.type)}))})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=(e,{interval:t=1e3,retries:a=6}={})=>new Promise(((r,n)=>{e().then(r).catch((o=>{setTimeout((()=>{a?s(e,{interval:1.5*t,retries:a-1}).then(r,n):n(o)}),t)}))}));
/***/},
/***/5071:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */p});
// EXTERNAL MODULE: ./node_modules/react/index.js
var s=a(6540),r=a(408),n=a(7647),o=a(6645),l=a(3318),i=a(1083);
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
var c=a(8057),d=a(1299),m=a(4848);
// EXTERNAL MODULE: ./src/admin/components/rooms/index.js + 1 modules
// ./src/admin/pages/accomodations/index.js
const p=({typeFilter:e=""})=>{const[t,a]=(0,s.useState)(e||"not_no"),[p,h]=(0,s.useState)(""),[u,x]=(0,s.useState)(null),[f,j]=(0,s.useState)("asc"),{participants:g,loading:y,error:b}=(e=>{const[t,a]=(0,s.useState)([]),[r,n]=(0,s.useState)(!0),[o,c]=(0,s.useState)(null);return(0,s.useEffect)((()=>{if(!e)return n(!1),void c("Type filter is required ('no' or 'not_no').");(async()=>{try{const t=await(0,l/* retry */.L)((()=>i/* default */.A.get("https://imc2026.imo.net/php/api/get_accomodations.php",{params:{type:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");a(t.data.data)}catch(e){c(e.message||"Failed to fetch participants. Please refresh the page.")}finally{n(!1)}})()}),[e]),{participants:t,loading:r,error:o,setParticipants:a}})(t),v="last_name",N=e=>{j(u===e&&"asc"===f?"desc":"asc"),x(e)},_=(0,s.useMemo)((()=>{let e=g?[...g]:[];
// Apply search filter
if(p){const t=p.toLowerCase();e=e.filter((e=>e[v]?.toLowerCase().includes(t)))}
// Apply sorting
return u&&e.sort(((e,t)=>{let a=e[u]??"",s=t[u]??"";return"confirmed"===u?(a="1"===e.confirmation_sent?1:0,s="1"===t.confirmation_sent?1:0,"asc"===f?a-s:s-a):"created_at"===u?(a=new Date(a).getTime()||0,s=new Date(s).getTime()||0,"asc"===f?a-s:s-a):"number"!=typeof a&&isNaN(parseFloat(a))?(a=a.toString().toLowerCase(),s=s.toString().toLowerCase(),"asc"===f?a.localeCompare(s):s.localeCompare(a)):(a=parseFloat(a)||0,s=parseFloat(s)||0,"asc"===f?a-s:s-a)})),e}),[g,p,u,f]);
return(0/* default */,m.jsx)(n.A,{isMaxWidth:!0,title:"Participants' Accommodations",children:y?(0/* default */,m.jsx)(o.A,{}):b?(0,m.jsxs)("p",{className:"text-danger",children:["Error: ",b]}):(0,m.jsxs)(m.Fragment,{children:[(0/* default */,m.jsx)(d.A,{className:"mb-4"}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${v.replace("_"," ")}`,value:p,onChange:e=>h(e.target.value)}),(0/* CiSearch */,m.jsx)(r.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,m.jsxs)("select",{className:"form-select w-auto",value:t,onChange:e=>a(e.target.value),children:[(0,m.jsx)("option",{value:"not_no",children:"Staying at the hostel"}),(0,m.jsx)("option",{value:"no",children:"No Accommodation"})]}),(0/* default */,m.jsx)(c.A,{className:"ms-auto",link:`https://imc2026.imo.net/php/doc_accommodations.php?type=${t}`})]}),(0,m.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{className:"sortable",onClick:()=>N("created_at"),children:"Reg. Date"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>N("last_name"),children:"Name"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>N("registration_type"),children:"Accommodation"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>N("confirmed"),children:"Confirmed"}),(0,m.jsx)("th",{children:"Comments"})]})}),(0,m.jsx)("tbody",{children:_.length>0?_.map((e=>(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:e.created_at?.split(" ")[0]||"n/a"}),(0,m.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,m.jsx)("td",{children:e.registration_type||""}),(0,m.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,m.jsx)("td",{children:e.comments||""})]},e.participant_id))):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"5",className:"text-center",children:"No participants found."})})})]})})]})})};
/* harmony default export */}
/***/}]);