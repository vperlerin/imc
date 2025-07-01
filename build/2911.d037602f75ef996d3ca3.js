"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[2911],{
/***/1299:
/***/(e,a,t)=>{
// EXPORTS
t.d(a,{A:()=>/* binding */m});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=t(6942),r=t.n(s),o=t(6540),l=t(6645),n=t(4976),i=t(1083),c=t(3318);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var d=t(4848);// ./src/admin/components/rooms/index.js
const m=({className:e,showLink:a=!1})=>{const{availableRooms:t,loading:s,error:m}=(()=>{const[e,a]=(0,o.useState)([]),[t,s]=(0,o.useState)(!1),[r,l]=(0,o.useState)(null),n=(0,o.useCallback)((async()=>{s(!0),l(null);try{const e=await(0,c/* retry */.L)((()=>i/* default */.A.get("https://imc2025.imo.net/php/api/get_left_accommodations.php")));e.data.success?a(e.data.data||[]):l(e.data.message||"Error fetching available rooms.")}catch(e){l(e.message||"Error fetching available rooms.")}finally{s(!1)}}),[]);
// Fetch available rooms on mount
// Fetch available rooms on mount
return(0,o.useEffect)((()=>{n()}),[n]),{availableRooms:e,loading:t,error:r,refetchAvailableRooms:n}})();if(m)
return(0,d.jsxs)("div",{className:"text-danger",children:["Error: ",m]});
// Function to format room availability
const h=(e,a)=>{const t={single:1,double:2,quadruple:4}[e]||1,s=Math.floor(a),r=Math.round((a-s)*t);// Default to 1 if type is unknown
let o=`${s} rooms left`;return r>0&&(o+=` + ${r} bed${r>1?"s":""}`),o};
return(0,d.jsxs)("div",{className:r()(e,"position-relative",a&&" border rounded-2 p-3 "),children:[s&&(0/* default */,d.jsx)(l.A,{}),a&&(0,d.jsx)("h5",{children:(0/* Link */,d.jsx)(n.N_,{to:"/admin/accomodations",children:"Available Rooms by Type"})}),m&&(0,d.jsx)("div",{className:"alert alert-danger fw-bolder",children:m}),!m&&!s&&(0,d.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:t?.filter((e=>"no"!==e.registration_type)).map((e=>{const a=e.registration_type.toLowerCase(),t=Math.floor(e.available_rooms)<=0;
return(0,d.jsxs)("div",{className:r()("p-3 border rounded-2",{"text-danger":t}),children:[a.charAt(0).toUpperCase()+a.slice(1),":",(0,d.jsxs)("strong",{children:[" ",h(a,parseFloat(e.available_rooms))]}),(0,d.jsxs)("small",{className:"text-muted",children:[" / ",e.total_rooms]})]},e.registration_type_id)}))})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,a,t)=>{
/* harmony export */t.d(a,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=(e,{interval:a=100,retries:t=14}={})=>new Promise(((r,o)=>{e().then(r).catch((l=>{setTimeout((()=>{t?s(e,{interval:1.5*a,retries:t-1}).then(r,o):o(l)}),a)}))}));
/***/},
/***/5071:
/***/(e,a,t)=>{
// ESM COMPAT FLAG
t.r(a),
// EXPORTS
t.d(a,{default:()=>/* binding */h});
// EXTERNAL MODULE: ./node_modules/react/index.js
var s=t(6540),r=t(408),o=t(7647),l=t(6645),n=t(3318),i=t(1083);
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
var c=t(8057),d=t(1299),m=t(4848);
// EXTERNAL MODULE: ./src/admin/components/rooms/index.js + 1 modules
// ./src/admin/pages/accomodations/index.js
const h=({typeFilter:e=""})=>{const[a,t]=(0,s.useState)(e||"not_no"),[h,p]=(0,s.useState)(""),[u,x]=(0,s.useState)(null),[f,j]=(0,s.useState)("asc"),{participants:g,loading:v,error:b}=(e=>{const[a,t]=(0,s.useState)([]),[r,o]=(0,s.useState)(!0),[l,c]=(0,s.useState)(null);return(0,s.useEffect)((()=>{if(!e)return o(!1),void c("Type filter is required ('no' or 'not_no').");(async()=>{try{const a=await(0,n/* retry */.L)((()=>i/* default */.A.get("https://imc2025.imo.net/php/api/get_accomodations.php",{params:{type:e}})));if(!a.data.success||!Array.isArray(a.data.data))throw new Error(a.data.message||"Database access error, please try again.");t(a.data.data)}catch(e){c(e.message||"Failed to fetch participants. Please refresh the page.")}finally{o(!1)}})()}),[e]),{participants:a,loading:r,error:l,setParticipants:t}})(a),_="last_name",N=e=>{j(u===e&&"asc"===f?"desc":"asc"),x(e)},y=(0,s.useMemo)((()=>{let e=g?[...g]:[];
// Apply search filter
if(h){const a=h.toLowerCase();e=e.filter((e=>e[_]?.toLowerCase().includes(a)))}
// Apply sorting
return u&&e.sort(((e,a)=>{let t=e[u]??"",s=a[u]??"";return"confirmed"===u?(t="1"===e.confirmation_sent?1:0,s="1"===a.confirmation_sent?1:0,"asc"===f?t-s:s-t):"created_at"===u?(t=new Date(t).getTime()||0,s=new Date(s).getTime()||0,"asc"===f?t-s:s-t):"number"!=typeof t&&isNaN(parseFloat(t))?(t=t.toString().toLowerCase(),s=s.toString().toLowerCase(),"asc"===f?t.localeCompare(s):s.localeCompare(t)):(t=parseFloat(t)||0,s=parseFloat(s)||0,"asc"===f?t-s:s-t)})),e}),[g,h,u,f]);
return(0/* default */,m.jsx)(o.A,{isMaxWidth:!0,title:"Participants' Accommodations",children:v?(0/* default */,m.jsx)(l.A,{}):b?(0,m.jsxs)("p",{className:"text-danger",children:["Error: ",b]}):(0,m.jsxs)(m.Fragment,{children:[(0/* default */,m.jsx)(d.A,{className:"mb-4"}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${_.replace("_"," ")}`,value:h,onChange:e=>p(e.target.value)}),(0/* CiSearch */,m.jsx)(r.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,m.jsxs)("select",{className:"form-select w-auto",value:a,onChange:e=>t(e.target.value),children:[(0,m.jsx)("option",{value:"not_no",children:"Staying at the hostel"}),(0,m.jsx)("option",{value:"no",children:"No Accommodation"})]}),(0/* default */,m.jsx)(c.A,{className:"ms-auto",link:`https://imc2025.imo.net/php/doc_accommodations.php?type=${a}`})]}),(0,m.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{className:"sortable",onClick:()=>N("created_at"),children:"Reg. Date"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>N("last_name"),children:"Name"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>N("registration_type"),children:"Accommodation"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>N("confirmed"),children:"Confirmed"}),(0,m.jsx)("th",{children:"Comments"})]})}),(0,m.jsx)("tbody",{children:y.length>0?y.map((e=>(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:e.created_at?.split(" ")[0]||"n/a"}),(0,m.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,m.jsx)("td",{children:e.registration_type||""}),(0,m.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,m.jsx)("td",{children:e.comments||""})]},e.participant_id))):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"5",className:"text-center",children:"No participants found."})})})]})})]})})};
/* harmony default export */}
/***/}]);